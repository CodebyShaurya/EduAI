import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY!);

export async function POST(request: NextRequest) {
  try {
    const { messages, topic } = await request.json();

    // Use the same model as the main gemini service
    const modelName = process.env.GOOGLE_AI_MODEL || 'models/gemini-2.5-flash';
    const model = genAI.getGenerativeModel({ model: modelName });

    const chatHistory = messages
      .map((msg: any) => `${msg.sender === 'user' ? 'Student' : 'AI Tutor'}: ${msg.content}`)
      .join('\n\n');

    const prompt = `Create a comprehensive learning summary for the topic "${topic}" based on this educational conversation:

${chatHistory}

Please provide a structured summary that includes:
1. **Topic Overview**: Brief description of what was learned
2. **Key Concepts**: Main ideas and concepts discussed
3. **Learning Progress**: What the student discovered through the Socratic method
4. **Important Insights**: Key realizations and understanding gained
5. **Areas for Further Study**: Suggested next steps or related topics

Format the response in a clear, educational manner suitable for a learning summary document.`;

    const result = await model.generateContent(prompt);
    const summary = result.response.text();

    return NextResponse.json({ summary });
  } catch (error) {
    console.error('Error generating summary:', error);
    return NextResponse.json(
      { error: 'Failed to generate summary' },
      { status: 500 }
    );
  }
}