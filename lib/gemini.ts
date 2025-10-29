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
  }> {
    const prompt = `
    Analyze this student response about ${topic}: "${userInput}"
    
    Assess their understanding level and identify:
    1. Understanding level (beginner/intermediate/advanced)
    2. Key misunderstandings or gaps
    3. Areas of strength
    
    Respond with valid JSON only, and do NOT include any markdown, code fences, or explanatory text. Example:
    {"level":"beginner","keyMisunderstandings":["..."],"strengths":["..."]}
    `;

    try {
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      const raw = response.text();
      // Try to parse the model output robustly: strip markdown/code fences and extract JSON.
      try {
        return parseJsonFromText(raw);
      } catch (parseErr) {
        console.error('[gemini] failed to parse JSON from model output:', raw);
        throw parseErr;
      }
    } catch (error: any) {
      console.error('Error assessing understanding:', error?.status, error?.statusText, error);
      return {
        level: 'beginner',
        keyMisunderstandings: [],
        strengths: []
      };
    }
  }

  async generateSocraticQuestion(context: ConversationContext, userResponse: string): Promise<string> {
    const prompt = `
    You are a Socratic teacher. Your goal is to guide the student to discover answers themselves.

    **Rules:**
    1.  **After 3 questions, you MUST provide a concise explanation** that builds on what the user has said. Do not just give a generic answer.
    2.  For the first 3 questions, DO NOT give direct answers. Ask thoughtful questions and provide short, scaffolded hints.
    3.  Always be concise and encouraging.

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
    Question: <one focused question that builds on the student's response>
    Hint: <a brief scaffolded hint that nudges the student but does NOT reveal the answer; 1-2 short sentences>
    FollowUp: <a short follow-up question to check understanding after the hint>

    **Output Format (SummaryAnswer):**
    Summary: <a concise explanation that directly addresses the student's last response and the current focus, incorporating what they've already understood. Start with something like "Great progress! Let's connect the dots.">
    NextStep: <a new open-ended question to move the conversation forward to a related sub-topic.>

    Be concise and avoid any extra commentary or markdown. Only return the labeled lines based on the decision.
    `;

    try {
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      return sanitizeModelText(response.text()).trim();
    } catch (error: any) {
      console.error('Error generating question:', error?.status, error?.statusText, error);
      return "What do you think might be the key concept we should explore here?";
    }
  }

  async generateInitialQuestion(topic: string): Promise<string> {
    const prompt = `
    You are a Socratic teacher. For a new topic, first ask 2–3 short diagnostic questions to gauge what the student already knows.

    Topic: "${topic}"

    Output format (plain text):
    Q1: <first diagnostic question — open-ended, invites prior knowledge>
    Q2: <second diagnostic question — probes misconceptions or depth>
    Q3: <optional third diagnostic question — asks about examples or confidence>

    After these diagnostic questions, include a single brief Hint line that gives a small, non-directive scaffold (no direct answer). Example:
    Hint: <a one-sentence nudge to help them articulate what they know; do NOT give the solution>

    Requirements:
    - Keep each question short and focused.
    - Do NOT provide direct answers or full explanations.
    - Do NOT include any markdown or code fences; return only the labeled lines above.
    `;

    try {
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      return sanitizeModelText(response.text()).trim();
    } catch (error: any) {
      console.error('Error generating initial question:', error?.status, error?.statusText, error);
      return `What comes to mind when you think about ${topic}? Share your initial thoughts.`;
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