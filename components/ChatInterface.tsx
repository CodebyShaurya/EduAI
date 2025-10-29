'use client';

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Send, Bot, User, BookOpen, Plus, MessageCircle, Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

interface ParsedAIResponse {
  questions?: string[];
  hint?: string;
  question?: string;
  followUp?: string;
  summary?: string;
  nextStep?: string;
}

interface ConversationContext {
  topic: string;
  userLevel: 'beginner' | 'intermediate' | 'advanced';
  previousQuestions: string[];
  userResponses: string[];
  currentFocus: string;
}

interface ChatSession {
  id: string;
  topic: string;
  messages: Message[];
  context: ConversationContext | null;
  lastUpdated: Date;
}

export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [topic, setTopic] = useState('');
  const [context, setContext] = useState<ConversationContext | null>(null);
  const [hasStarted, setHasStarted] = useState(false);
  const [chatSessions, setChatSessions] = useState<ChatSession[]>([]);
  const [currentSessionId, setCurrentSessionId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Parse AI response to extract structured parts
  const parseAIResponse = (text: string): ParsedAIResponse => {
    const result: ParsedAIResponse = {};
    
    // Check for Q1, Q2, Q3 pattern (initial diagnostic questions)
    const q1Match = text.match(/Q1:\s*([\s\S]+?)(?=\n|Q2:|Hint:|$)/);
    const q2Match = text.match(/Q2:\s*([\s\S]+?)(?=\n|Q3:|Hint:|$)/);
    const q3Match = text.match(/Q3:\s*([\s\S]+?)(?=\n|Hint:|$)/);
    
    if (q1Match || q2Match || q3Match) {
      result.questions = [];
      if (q1Match) result.questions.push(q1Match[1].trim());
      if (q2Match) result.questions.push(q2Match[1].trim());
      if (q3Match) result.questions.push(q3Match[1].trim());
    }
    
    // Check for Question/Hint/FollowUp pattern (follow-up responses)
    const questionMatch = text.match(/Question:\s*([\s\S]+?)(?=\n|Hint:|FollowUp:|Summary:|$)/);
    const hintMatch = text.match(/Hint:\s*([\s\S]+?)(?=\n|FollowUp:|Summary:|$)/);
    const followUpMatch = text.match(/FollowUp:\s*([\s\S]+?)(?=\n|Summary:|$)/);
    
    if (questionMatch) result.question = questionMatch[1].trim();
    if (hintMatch) result.hint = hintMatch[1].trim();
    if (followUpMatch) result.followUp = followUpMatch[1].trim();

    // Check for Summary/NextStep pattern
    const summaryMatch = text.match(/Summary:\s*([\s\S]+?)(?=\n|NextStep:|$)/);
    const nextStepMatch = text.match(/NextStep:\s*([\s\S]+?)$/);

    if (summaryMatch) result.summary = summaryMatch[1].trim();
    if (nextStepMatch) result.nextStep = nextStepMatch[1].trim();
    
    return result;
  };

  // Render string with **bold** markers converted to <strong>
  const renderBold = (text: string) => {
    if (!text) return null;
    const parts: Array<string | JSX.Element> = [];
    const regex = /\*\*(.+?)\*\*/g;
    let lastIndex = 0;
    let match: RegExpExecArray | null;
    let idx = 0;
    while ((match = regex.exec(text)) !== null) {
      const matchStart = match.index;
      const matchEnd = regex.lastIndex;
      if (matchStart > lastIndex) {
        parts.push(text.slice(lastIndex, matchStart));
      }
      parts.push(<strong key={`b-${idx}`}>{match[1]}</strong>);
      idx += 1;
      lastIndex = matchEnd;
    }
    if (lastIndex < text.length) {
      parts.push(text.slice(lastIndex));
    }
    // If no matches, return plain text
    if (parts.length === 1 && typeof parts[0] === 'string') return parts[0];
    return <>{parts.map((p, i) => typeof p === 'string' ? <span key={i}>{p}</span> : p)}</>;
  };

  const renderAIMessage = (content: string) => {
    const parsed = parseAIResponse(content);
    
    // If we have structured content, render it formatted
    if (parsed.questions || parsed.question || parsed.summary) {
      return (
        <div className="text-left space-y-4 max-w-3xl">
          {/* Initial diagnostic questions */}
          {parsed.questions && parsed.questions.length > 0 && (
            <div className="space-y-3">
              <h3 className="font-bold text-lg text-foreground">Questions</h3>
              {parsed.questions.map((q, idx) => (
                <p key={idx} className="text-base text-muted-foreground leading-relaxed">
                  {idx + 1}. {renderBold(q)}
                </p>
              ))}
            </div>
          )}
          
          {/* Follow-up question */}
          {parsed.question && (
            <div className="space-y-2">
              <h3 className="font-bold text-lg text-foreground">Question</h3>
              <p className="text-base text-muted-foreground leading-relaxed">{renderBold(parsed.question)}</p>
            </div>
          )}
          
          {/* Hint */}
          {parsed.hint && (
            <div className="space-y-2">
              <h3 className="font-bold text-lg text-foreground">Hint</h3>
              <p className="text-base text-muted-foreground leading-relaxed">{renderBold(parsed.hint)}</p>
            </div>
          )}
          
          {/* Follow-up */}
          {parsed.followUp && (
            <div className="space-y-2">
              <h3 className="font-bold text-lg text-foreground">Follow-up</h3>
              <p className="text-base text-muted-foreground leading-relaxed">{renderBold(parsed.followUp)}</p>
            </div>
          )}

          {/* Summary */}
          {parsed.summary && (
            <div className="space-y-2">
              <h3 className="font-bold text-lg text-foreground">Summary</h3>
              <p className="text-base text-muted-foreground leading-relaxed">{renderBold(parsed.summary)}</p>
            </div>
          )}
          
          {/* Next Step */}
          {parsed.nextStep && (
            <div className="space-y-2">
              <h3 className="font-bold text-lg text-foreground">Next Step</h3>
              <p className="text-base text-muted-foreground leading-relaxed">{renderBold(parsed.nextStep)}</p>
            </div>
          )}
        </div>
      );
    }
    
    // Fallback: render plain text if no structure detected
    return <p className="text-gray-900 text-base leading-relaxed text-left max-w-3xl">{renderBold(content)}</p>;
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const createNewSession = (newTopic: string): ChatSession => {
    const sessionId = Date.now().toString();
    const newSession: ChatSession = {
      id: sessionId,
      topic: newTopic,
      messages: [],
      context: null,
      lastUpdated: new Date(),
    };
    return newSession;
  };

  const updateCurrentSession = () => {
    if (!currentSessionId) return;
    
    setChatSessions(prev => prev.map(session => 
      session.id === currentSessionId 
        ? { ...session, messages, context, lastUpdated: new Date() }
        : session
    ));
  };

  useEffect(() => {
    updateCurrentSession();
  }, [messages, context]);

  const startNewTopic = async (newTopic: string) => {
    if (!newTopic.trim()) return;

    const newSession = createNewSession(newTopic);
    setChatSessions(prev => [newSession, ...prev]);
    setCurrentSessionId(newSession.id);
    
    setTopic(newTopic);
    setMessages([]);
    setContext(null);
    setHasStarted(true);
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: `I want to learn about ${newTopic}`,
          topic: newTopic,
          context: null,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to start conversation');
      }

      const data = await response.json();
      
      const aiMessage: Message = {
        id: Date.now().toString(),
        content: data.response,
        sender: 'ai',
        timestamp: new Date(),
      };
      
      setMessages([aiMessage]);
      setContext(data.context);
    } catch (error) {
      console.error('Error starting conversation:', error);
      const errorMessage: Message = {
        id: Date.now().toString(),
        content: "I'm sorry, I'm having trouble starting our conversation. Please try again.",
        sender: 'ai',
        timestamp: new Date(),
      };
      setMessages([errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const loadChatSession = (session: ChatSession) => {
    setCurrentSessionId(session.id);
    setTopic(session.topic);
    setMessages(session.messages);
    setContext(session.context);
    setHasStarted(true);
  };

  const deleteChatSession = (sessionId: string) => {
    setChatSessions(prev => prev.filter(session => session.id !== sessionId));
    if (currentSessionId === sessionId) {
      setCurrentSessionId(null);
      setHasStarted(false);
      setMessages([]);
      setTopic('');
      setContext(null);
    }
  };

  const startNewChat = () => {
    setCurrentSessionId(null);
    setHasStarted(false);
    setTopic('');
    setMessages([]);
    setContext(null);
  };

  const sendMessage = async () => {
    if (!input.trim() || isLoading || !topic) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    const currentInput = input;
    setInput('');
    setIsLoading(true);
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: currentInput, topic, context }),
      });

      if (!response.ok) {
        if (response.status === 401) {
          // Unauthorized - show helpful message
          const errMessage: Message = {
            id: Date.now().toString(),
            content: 'You must be signed in to continue. Please sign in and try again.',
            sender: 'ai',
            timestamp: new Date(),
          };
          setMessages(prev => [...prev, errMessage]);
          return;
        }

        throw new Error('Failed to get AI response');
      }

      const data = await response.json();

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: data.response || "I'm having trouble formulating a question right now. Let's try again.",
        sender: 'ai',
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, aiMessage]);
      // update context from server so follow-ups use the new state
      setContext(data.context || null);
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage: Message = {
        id: Date.now().toString(),
        content: "I'm sorry — something went wrong while contacting the AI. Please try again.",
        sender: 'ai',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-[calc(100vh-120px)] bg-white">
      {/* Sidebar */}
      <div className="w-64 bg-gray-50 border-r flex flex-col">
        <div className="p-4 border-b">
          <Button 
            onClick={startNewChat}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white"
          >
            <Plus className="h-4 w-4 mr-2" />
            New Chat
          </Button>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4">
          <h3 className="text-sm font-bold text-gray-500 mb-3">Previous Chats</h3>
          <div className="space-y-2">
            {chatSessions.map((session) => (
              <div
                key={session.id}
                className={cn(
                  "group flex items-center justify-between p-3 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors",
                  currentSessionId === session.id ? "bg-blue-50 border border-blue-200" : ""
                )}
                onClick={() => loadChatSession(session)}
              >
                <div className="flex items-center gap-2 flex-1 min-w-0">
                  <MessageCircle className="h-4 w-4 text-gray-400 flex-shrink-0" />
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {session.topic}
                    </p>
                    <p className="text-xs text-gray-500">
                      {session.messages.length} messages
                    </p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="opacity-0 group-hover:opacity-100 h-6 w-6 p-0 text-gray-400 hover:text-red-600"
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteChatSession(session.id);
                  }}
                >
                  <Trash2 className="h-3 w-3" />
                </Button>
              </div>
            ))}
            {chatSessions.length === 0 && (
              <p className="text-sm text-gray-400 text-center py-4">
                No previous chats
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {!hasStarted ? (
          /* Centered Initial State */
          <div className="flex-1 flex items-center justify-center p-8">
            <div className="max-w-2xl w-full">
              <Card className="p-8 text-center">
                <Bot className="h-16 w-16 mx-auto mb-6 text-blue-600" />
                <h2 className="text-2xl font-bold mb-4">Start Your Learning Journey</h2>
                <p className="text-muted-foreground mb-6">
                  I'm your AI tutor. I won't give you direct answers, but I'll guide you to discover them yourself through thoughtful questions.
                </p>
                <div className="flex gap-3">
                  <Input
                    placeholder="What would you like to explore? (e.g., photosynthesis, algebra, history)"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && startNewTopic(topic)}
                    className="flex-1"
                  />
                  <Button 
                    onClick={() => startNewTopic(topic)}
                    disabled={!topic.trim() || isLoading}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    Start Learning
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        ) : (
          /* Normal Chat Interface */
          <>
            {/* Chat Header */}
            <div className="border-b p-4 bg-white">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-lg">Learning: {topic}</h3>
                  <p className="text-sm text-muted-foreground">
                    Level: {context?.userLevel || 'Assessing...'} • Socratic Method
                  </p>
                </div>
              </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4">
              <div className="max-w-6xl mx-auto space-y-4">
                {messages.map((message) => (
                  message.sender === 'ai' ? (
                    <div key={message.id} className="flex justify-center">
                      <div className="w-full max-w-4xl">
                        {renderAIMessage(message.content)}
                      </div>
                    </div>
                  ) : (
                    <div
                      key={message.id}
                      className="flex gap-3 justify-end"
                    >
                      <div
                        className={cn(
                          "rounded-lg p-4 text-sm max-w-[80%] bg-blue-600 text-white ml-auto"
                        )}
                      >
                        {message.content}
                      </div>
                      <Avatar className="h-8 w-8 flex-shrink-0">
                        <AvatarFallback>
                          <User className="h-4 w-4" />
                        </AvatarFallback>
                      </Avatar>
                    </div>
                  )
                ))}

                {isLoading && (
                  <div className="flex justify-center">
                    <div className="max-w-3xl text-center">
                      <div className="inline-flex items-center gap-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>
            </div>

            {/* Input Area - Fixed at bottom */}
            <div className="border-t p-4 bg-white">
              <div className="max-w-4xl mx-auto">
                <div className="flex gap-3">
                  <Input
                    placeholder="Share your thoughts..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && sendMessage()}
                    disabled={isLoading}
                    className="flex-1"
                  />
                  <Button
                    onClick={sendMessage}
                    disabled={!input.trim() || isLoading}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}