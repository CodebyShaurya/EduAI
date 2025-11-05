import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { socraticTeacher, ConversationContext } from '@/lib/gemini';

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { message, topic, context } = await request.json();

    if (!message || !topic) {
      return NextResponse.json({ error: 'Message and topic are required' }, { status: 400 });
    }

    let response: string;
    let nextContext: ConversationContext;

    if (!context || context.previousQuestions.length === 0) {
      // First interaction - generate initial question
      response = await socraticTeacher.generateInitialQuestion(topic);
      nextContext = {
        topic,
        userLevel: 'beginner',
        previousQuestions: [response],
        userResponses: [],
        currentFocus: topic,
      };
    } else {
      // Subsequent interactions - assess and generate follow-up question
      const assessment = await socraticTeacher.assessUserUnderstanding(message, context.currentFocus);
      
      // Generate feedback on user's answer
      const feedback = await socraticTeacher.generateFeedback(message, context.currentFocus, assessment);
      
      const updatedContextForQuestionGen: ConversationContext = {
        ...context,
        userLevel: assessment.level,
        userResponses: [...context.userResponses, message],
        currentFocus: assessment.keyMisunderstandings[0] || context.currentFocus,
      };

      const nextQuestion = await socraticTeacher.generateSocraticQuestion(updatedContextForQuestionGen, message);
      
      // Combine feedback with next question
      response = `${feedback}\n\n${nextQuestion}`;
      
      // After 3 questions, the response will be a summary.
      // We reset the questions list for the next topic.
      const isSummary = (context.previousQuestions.length ?? 0) >= 3;

      nextContext = {
        topic,
        userLevel: assessment.level,
        // If it's a summary, reset the questions. Otherwise, add the new one.
        previousQuestions: isSummary ? [] : [...context.previousQuestions, response],
        userResponses: [...context.userResponses, message],
        currentFocus: assessment.keyMisunderstandings[0] || context.currentFocus,
      };
    }

    return NextResponse.json({ 
      response,
      context: nextContext
    });

  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}