import { GoogleGenerativeAI } from '@google/generative-ai';

// Prefer a model set in env so you can switch between 'gemini-pro' (if you have access)
// and a public fallback like 'models/text-bison-001'.
const apiKey = process.env.GOOGLE_AI_API_KEY;
if (!apiKey) {
  console.warn('[gemini] GOOGLE_AI_API_KEY is not set. Generative calls will likely fail.');
}

const genAI = new GoogleGenerativeAI(apiKey || '');

/**
 * Sanitize model output by removing markdown/code fences and inline backticks.
 * Returns a cleaned string suitable for display or JSON extraction.
 */
function sanitizeModelText(text: string) {
  if (!text) return '';
  let cleaned = text;
  // Remove fenced code blocks like ```json\n...\n``` or ```\n...\n```
  cleaned = cleaned.replace(/```(?:json|[\w-]+)?\n([\s\S]*?)\n```/gi, '$1');
  // Remove any remaining triple backticks
  cleaned = cleaned.replace(/```/g, '');
  // Remove inline code backticks
  cleaned = cleaned.replace(/`([^`]+)`/g, '$1');
  return cleaned.trim();
}

/**
 * Try to parse JSON from arbitrary model text. It first sanitizes the text,
 * then attempts JSON.parse; if that fails it tries to extract the first
 * {...} block and parse that.
 */
function parseJsonFromText(text: string) {
  const cleaned = sanitizeModelText(text);
  try {
    return JSON.parse(cleaned);
  } catch (e) {
    // Try to extract a JSON object substring between the first { and last }
    const start = cleaned.indexOf('{');
    const end = cleaned.lastIndexOf('}');
    if (start !== -1 && end !== -1 && end > start) {
      const sub = cleaned.slice(start, end + 1);
      return JSON.parse(sub);
    }
    // Re-throw the original parse error if we couldn't salvage JSON
    throw e;
  }
}

export interface ConversationContext {
  topic: string;
  userLevel: 'beginner' | 'intermediate' | 'advanced';
  previousQuestions: string[];
  userResponses: string[];
  currentFocus: string;
}

export class SocraticTeacher {
  // Allow overriding the model via env var. Default to a Gemini flash model that
  // is commonly available when Gemini access is enabled for the project.
  private chosenModelName = process.env.GOOGLE_AI_MODEL || 'models/gemini-2.5-flash';
  // Log which model is being used so it's easy to debug.
  constructor() {
    // ...no-op constructor body, used only to ensure logging runs when class is instantiated.
    console.info('[gemini] using model:', this.chosenModelName);
  }

  private model = genAI.getGenerativeModel({ model: this.chosenModelName });

  async assessUserUnderstanding(userInput: string, topic: string): Promise<{
    level: 'beginner' | 'intermediate' | 'advanced';
    keyMisunderstandings: string[];
    strengths: string[];
    accuracyPercentage: number;
    isCorrect: boolean;
  }> {
    const prompt = `
    Analyze this student response about ${topic}: "${userInput}"
    
    Assess their understanding level and provide detailed analysis:
    1. Understanding level (beginner/intermediate/advanced)
    2. Key misunderstandings or gaps (be specific)
    3. Areas of strength (what they got right)
    4. Accuracy percentage (0-100)
    5. Whether the answer is fundamentally correct (true/false)
    
    Respond with valid JSON only, and do NOT include any markdown, code fences, or explanatory text. Example:
    {"level":"beginner","keyMisunderstandings":["specific error 1","specific error 2"],"strengths":["correct point 1","correct point 2"],"accuracyPercentage":65,"isCorrect":false}
    `;

    try {
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      const raw = response.text();
      // Try to parse the model output robustly: strip markdown/code fences and extract JSON.
      try {
        const parsed = parseJsonFromText(raw);
        // Ensure we have the new fields with defaults
        return {
          level: parsed.level || 'beginner',
          keyMisunderstandings: parsed.keyMisunderstandings || [],
          strengths: parsed.strengths || [],
          accuracyPercentage: parsed.accuracyPercentage || 0,
          isCorrect: parsed.isCorrect || false
        };
      } catch (parseErr) {
        console.error('[gemini] failed to parse JSON from model output:', raw);
        throw parseErr;
      }
    } catch (error: any) {
      console.error('Error assessing understanding:', error?.status, error?.statusText, error);
      return {
        level: 'beginner',
        keyMisunderstandings: [],
        strengths: [],
        accuracyPercentage: 0,
        isCorrect: false
      };
    }
  }

  async generateFeedback(userResponse: string, topic: string, assessment: {
    level: 'beginner' | 'intermediate' | 'advanced';
    keyMisunderstandings: string[];
    strengths: string[];
    accuracyPercentage: number;
    isCorrect: boolean;
  }): Promise<string> {
    const prompt = `
    You are a Socratic teacher providing detailed feedback on a student's answer. Your job is to:
    
    1. **Tell them exactly if their answer is correct or incorrect**
    2. **Provide the correct answer clearly**
    3. **Show their accuracy percentage**
    4. **Explain what they got right and what they missed**

    **Topic:** ${topic}
    **Student's Answer:** "${userResponse}"
    **Assessment:**
    - Level: ${assessment.level}
    - Accuracy: ${assessment.accuracyPercentage}%
    - Is Correct: ${assessment.isCorrect}
    - Strengths: ${assessment.strengths.join(', ') || 'None identified'}
    - Misunderstandings: ${assessment.keyMisunderstandings.join(', ') || 'None identified'}

    **Output Format:**
    Feedback: **Correctness:** ${assessment.isCorrect ? 'Correct' : assessment.accuracyPercentage > 50 ? 'Partially Correct' : 'Incorrect'} - You're about ${assessment.accuracyPercentage}% accurate!

    **What you got right:** ${assessment.strengths.length > 0 ? assessment.strengths.join(', ') : 'Let me help you identify the key concepts'}

    **The correct answer:** [Provide the complete, accurate answer to the question about ${topic}]

    **What to improve:** ${assessment.keyMisunderstandings.length > 0 ? assessment.keyMisunderstandings.join(', ') : 'Focus on understanding the core concepts better'}

    Be encouraging but honest about accuracy. Always provide the complete correct answer so they can learn from it. Use clear, simple language appropriate for a ${assessment.level} level student.
    `;

    try {
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      const text = sanitizeModelText(response.text()).trim();
      
      // Extract just the feedback content
      const feedbackMatch = text.match(/Feedback:\s*([\s\S]+)/);
      return feedbackMatch ? feedbackMatch[1].trim() : text;
    } catch (error: any) {
      console.error('Error generating feedback:', error?.status, error?.statusText, error);
      const correctnessText = assessment.isCorrect ? 'Correct' : assessment.accuracyPercentage > 50 ? 'Partially Correct' : 'Incorrect';
      return `**Correctness:** ${correctnessText} - You're about ${assessment.accuracyPercentage}% accurate! Let me help you understand this better.`;
    }
  }

  async generateSocraticQuestion(context: ConversationContext, userResponse: string): Promise<string> {
    const prompt = `
    You are a Socratic teacher. Your goal is to guide the student to discover answers themselves while providing clear feedback.

    **Rules:**
    1.  **After 3 questions, you MUST provide a comprehensive summary** that includes the correct answers to all previous questions.
    2.  For the first 3 questions, ask thoughtful questions and provide hints, but DO NOT give direct answers yet.
    3.  Always be encouraging and acknowledge when students are on the right track.

    **Context:**
    - Topic: ${context.topic}
    - User Level: ${context.userLevel}
    - Previous Questions Asked: ${context.previousQuestions.length}
    - User's Latest Response: "${userResponse}"
    - Current Focus: ${context.currentFocus}

    **Decision:**
    - If Previous Questions Asked >= 3, provide a **SummaryAnswer**.
    - Otherwise, provide a **SocraticQuestion**.

    **Output Format (SocraticQuestion):**
    Question: <one focused question that builds on the student's response and helps them think deeper>
    Hint: <a scaffolded hint that nudges them toward the right answer without revealing it; be specific about what to consider>
    FollowUp: <a follow-up question to check their understanding after the hint>

    **Output Format (SummaryAnswer):**
    Summary: <a comprehensive explanation that:
    - Acknowledges their learning journey
    - Provides the correct answers to the key questions we've explored
    - Explains the core concepts clearly
    - Shows how their responses helped us get to these answers
    Start with something encouraging like "Excellent work! Let's bring everything together.">
    
    NextStep: <suggest a related topic or deeper question to explore next, building on what they've learned>

    Be encouraging, clear, and educational. When providing the summary, make sure to include the actual correct answers they've been working toward.
    `;

    try {
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      return sanitizeModelText(response.text()).trim();
    } catch (error: any) {
      console.error('Error generating question:', error?.status, error?.statusText, error);
      if (context.previousQuestions.length >= 3) {
        return `Summary: Great work exploring ${context.topic}! You've made excellent progress in understanding the key concepts. Let me provide you with the complete picture and correct answers to help solidify your learning.\n\nNextStep: What aspect of ${context.topic} would you like to explore further?`;
      }
      return "Question: What do you think might be the key concept we should explore here?\nHint: Think about the fundamental principles involved.\nFollowUp: Can you explain your reasoning?";
    }
  }

  async generateInitialQuestion(topic: string): Promise<string> {
    const prompt = `
    You are a Socratic teacher starting a new learning session. For the topic "${topic}", create an engaging opening that:

    1. **Asks 2-3 diagnostic questions** to understand what the student already knows
    2. **Explains that you'll provide feedback** on whether their answers are correct
    3. **Sets clear expectations** about the learning process

    **Output format (plain text):**
    Welcome! Let's explore **${topic}** together. I'll ask you some questions to understand what you already know, and I'll give you feedback on whether your answers are correct, along with the right answers to help you learn.

    **Q1:** <first diagnostic question — open-ended, invites prior knowledge>
    **Q2:** <second diagnostic question — probes deeper understanding or examples>
    **Q3:** <third diagnostic question — asks about practical application or confidence>

    **Hint:** <a brief, encouraging nudge that helps them get started — no direct answers>

    Requirements:
    - Keep each question clear and focused
    - Make it clear that honest answers help me teach better
    - Encourage them to share what they think, even if unsure
    - Do NOT include markdown or code fences; return only plain text
    `;

    try {
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      return sanitizeModelText(response.text()).trim();
    } catch (error: any) {
      console.error('Error generating initial question:', error?.status, error?.statusText, error);
      return `Welcome! Let's explore **${topic}** together. I'll help you learn by asking questions and giving you feedback on your answers.\n\n**Q1:** What comes to mind when you think about ${topic}?\n**Q2:** Can you give me an example related to ${topic}?\n**Q3:** How confident do you feel about your current understanding?\n\n**Hint:** Share your honest thoughts - there are no wrong answers at this stage!`;
    }
  }
}

export const socraticTeacher = new SocraticTeacher();

// Utility: list the models available to the configured API key/project.
// Set env `GOOGLE_AI_LIST_MODELS=true` to enable this at startup (useful for debugging).
export async function listAvailableModels() {
  try {
    // Try the library method if available (some library versions expose it).
    let res: any = null;
    if (typeof (genAI as any).listModels === 'function') {
      res = await (genAI as any).listModels();
    } else {
      // Fallback: call the public REST endpoint to list models. This uses the v1
      // endpoint and appends the API key (if provided). The response shape may differ.
      if (!apiKey) throw new Error('GOOGLE_AI_API_KEY is not set; cannot list models');
      const url = `https://generativelanguage.googleapis.com/v1/models?key=${encodeURIComponent(apiKey)}`;
      const r = await fetch(url);
      if (!r.ok) throw new Error(`List models failed: ${r.status} ${r.statusText}`);
      res = await r.json();
    }

    // Attempt to print a concise list; fall back to full response if structure differs.
    const names = (res?.models || res?.model || []).map((m: any) => m.name || m.model || m.id).filter(Boolean);
    console.info('[gemini] available models:', names.length ? names : JSON.stringify(res));
    return res;
  } catch (err) {
    const e = err as any;
    console.error('[gemini] error listing models:', e?.status || e?.message || 'unknown', e?.statusText || '', e);
    throw err;
  }
}

if (process.env.GOOGLE_AI_LIST_MODELS === 'true') {
  // Fire-and-forget; log errors to console so dev can see what's allowed.
  listAvailableModels().catch(() => {});
}