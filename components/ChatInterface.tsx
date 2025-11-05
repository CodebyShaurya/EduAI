'use client';

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Send, Bot, User, BookOpen, Plus, MessageCircle, Trash2, Download, FileText, MessageSquare, Menu, X, Search, Globe, PenTool, Sparkles, Mic, ChevronDown, MoreHorizontal, Upload, Camera, Image as ImageIcon, Share, Edit, Archive, Settings, LogOut, Languages } from 'lucide-react';
import { cn } from '@/lib/utils';
import jsPDF from 'jspdf';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

interface ParsedAIResponse {
  feedback?: string;
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
  const [isDownloading, setIsDownloading] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedModel, setSelectedModel] = useState('gpt-o3');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Parse AI response to extract structured parts
  const parseAIResponse = (text: string): ParsedAIResponse => {
    const result: ParsedAIResponse = {};
    
    // Check for Feedback pattern (answer correctness)
    const feedbackMatch = text.match(/Feedback:\s*([\s\S]+?)(?=\n\n|Question:|Q1:|Summary:|$)/);
    if (feedbackMatch) result.feedback = feedbackMatch[1].trim();
    
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
    if (parsed.feedback || parsed.questions || parsed.question || parsed.summary) {
      return (
        <div className="text-left space-y-3 sm:space-y-4 max-w-3xl w-full">
          {/* Feedback on user's answer */}
          {parsed.feedback && (
            <div className="bg-gradient-to-r from-cyan-50 to-blue-50 dark:from-cyan-900/20 dark:to-blue-900/20 border-l-4 border-cyan-600 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 mt-0.5">
                  <svg className="w-5 h-5 text-cyan-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-cyan-900 dark:text-cyan-100 text-sm sm:text-base mb-2">📊 Your Answer Feedback</h3>
                  <div className="space-y-2 text-sm sm:text-base text-cyan-800 dark:text-cyan-200 leading-relaxed">
                    {parsed.feedback.split('\n\n').map((section, idx) => (
                      <div key={idx} className={cn(
                        "p-2 rounded",
                        section.includes('**Correctness:**') && "bg-white/50 dark:bg-black/20 border border-cyan-200 dark:border-cyan-700",
                        section.includes('**What you got right:**') && "bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700",
                        section.includes('**The correct answer:**') && "bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700",
                        section.includes('**What to improve:**') && "bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-700"
                      )}>
                        {renderBold(section)}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Initial diagnostic questions */}
          {parsed.questions && parsed.questions.length > 0 && (
            <div className="space-y-2 sm:space-y-3">
              <h3 className="font-bold text-base sm:text-lg text-foreground">Questions</h3>
              {parsed.questions.map((q, idx) => (
                <p key={idx} className="text-sm sm:text-base text-muted-foreground leading-relaxed break-words">
                  {idx + 1}. {renderBold(q)}
                </p>
              ))}
            </div>
          )}
          
          {/* Follow-up question */}
          {parsed.question && (
            <div className="space-y-2">
              <h3 className="font-bold text-base sm:text-lg text-foreground">Question</h3>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed break-words">{renderBold(parsed.question)}</p>
            </div>
          )}
          
          {/* Hint */}
          {parsed.hint && (
            <div className="space-y-2">
              <h3 className="font-bold text-base sm:text-lg text-foreground">Hint</h3>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed break-words">{renderBold(parsed.hint)}</p>
            </div>
          )}
          
          {/* Follow-up */}
          {parsed.followUp && (
            <div className="space-y-2">
              <h3 className="font-bold text-base sm:text-lg text-foreground">Follow-up</h3>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed break-words">{renderBold(parsed.followUp)}</p>
            </div>
          )}

          {/* Summary */}
          {parsed.summary && (
            <div className="space-y-2">
              <h3 className="font-bold text-base sm:text-lg text-foreground">Summary</h3>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed break-words">{renderBold(parsed.summary)}</p>
            </div>
          )}
          
          {/* Next Step */}
          {parsed.nextStep && (
            <div className="space-y-2">
              <h3 className="font-bold text-base sm:text-lg text-foreground">Next Step</h3>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed break-words">{renderBold(parsed.nextStep)}</p>
            </div>
          )}
        </div>
      );
    }
    
    // Fallback: render plain text if no structure detected
    return <p className="text-gray-900 text-sm sm:text-base leading-relaxed text-left max-w-3xl w-full break-words">{renderBold(content)}</p>;
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

  const downloadSummary = async () => {
    if (!messages.length || !topic) return;
    
    setIsDownloading(true);
    try {
      const response = await fetch('/api/summary', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages, topic }),
      });
      
      if (!response.ok) throw new Error('Failed to generate summary');
      
      const { summary } = await response.json();
      
      const pdf = new jsPDF();
      pdf.setFontSize(20);
      pdf.text(`Learning Summary: ${topic}`, 20, 30);
      
      pdf.setFontSize(12);
      const lines = pdf.splitTextToSize(summary, 170);
      pdf.text(lines, 20, 50);
      
      pdf.save(`${topic}-summary.pdf`);
    } catch (error) {
      console.error('Error downloading summary:', error);
    } finally {
      setIsDownloading(false);
    }
  };

  const downloadChat = () => {
    if (!messages.length || !topic) return;
    
    const pdf = new jsPDF();
    pdf.setFontSize(20);
    pdf.text(`Chat History: ${topic}`, 20, 30);
    
    let yPosition = 50;
    pdf.setFontSize(12);
    
    messages.forEach((message) => {
      const sender = message.sender === 'user' ? 'Student' : 'AI Tutor';
      const text = `${sender}: ${message.content}`;
      const lines = pdf.splitTextToSize(text, 170);
      
      if (yPosition + lines.length * 7 > 280) {
        pdf.addPage();
        yPosition = 20;
      }
      
      pdf.text(lines, 20, yPosition);
      yPosition += lines.length * 7 + 10;
    });
    
    pdf.save(`${topic}-chat.pdf`);
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
    <div className="relative h-screen bg-white dark:bg-neutral-800">
      {/* Sidebar */}
      <div className={cn(
        "fixed inset-y-0 z-60 start-0 w-80 bg-white border-e border-gray-200 transition-all duration-300 transform overflow-hidden dark:bg-neutral-800 dark:border-neutral-700",
        isSidebarOpen ? "translate-x-0" : "-translate-x-full",
        "md:block md:translate-x-0"
      )}>
        <div className="relative flex flex-col h-full max-h-full">
          {/* Sidebar Header */}
          <header className="py-2.5 px-4 flex justify-between items-center gap-x-2">
            <div className="-ms-2 flex items-center gap-x-1">
              <Link href="/" className="shrink-0 inline-flex justify-center items-center size-9 rounded-lg text-xl font-semibold hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700">
                <svg className="shrink-0 size-5 text-cyan-700 dark:text-cyan-400" width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" clipRule="evenodd" d="M18.0835 3.23358C9.88316 3.23358 3.23548 9.8771 3.23548 18.0723V35.5832H0.583496V18.0723C0.583496 8.41337 8.41851 0.583252 18.0835 0.583252C27.7485 0.583252 35.5835 8.41337 35.5835 18.0723C35.5835 27.7312 27.7485 35.5614 18.0835 35.5614H16.7357V32.911H18.0835C26.2838 32.911 32.9315 26.2675 32.9315 18.0723C32.9315 9.8771 26.2838 3.23358 18.0835 3.23358Z" fill="currentColor" />
                  <path fillRule="evenodd" clipRule="evenodd" d="M18.0833 8.62162C12.8852 8.62162 8.62666 12.9245 8.62666 18.2879V35.5833H5.97468V18.2879C5.97468 11.5105 11.3713 5.97129 18.0833 5.97129C24.7954 5.97129 30.192 11.5105 30.192 18.2879C30.192 25.0653 24.7954 30.6045 18.0833 30.6045H16.7355V27.9542H18.0833C23.2815 27.9542 27.54 23.6513 27.54 18.2879C27.54 12.9245 23.2815 8.62162 18.0833 8.62162Z" fill="currentColor" />
                  <path d="M24.8225 18.1012C24.8225 21.8208 21.8053 24.8361 18.0833 24.8361C14.3614 24.8361 11.3442 21.8208 11.3442 18.1012C11.3442 14.3815 14.3614 11.3662 18.0833 11.3662C21.8053 11.3662 24.8225 14.3815 24.8225 18.1012Z" fill="currentColor" />
                </svg>
              </Link>

              <button type="button" className="flex md:hidden justify-center items-center gap-x-3 size-6 bg-white border border-gray-200 text-sm text-gray-600 hover:bg-gray-100 rounded-full disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:bg-gray-100 dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700" onClick={() => setIsSidebarOpen(false)}>
                <X className="shrink-0 size-3.5" />
              </button>
            </div>
          </header>

          {/* Sidebar Navigation */}
          <div className="mb-5 px-2 flex flex-col gap-y-5">
            <ul className="flex flex-col gap-y-0.5">
              <li>
                <button 
                  onClick={() => {
                    startNewChat();
                    setIsSidebarOpen(false);
                  }}
                  className="group relative w-full flex items-center gap-1 py-1.5 px-2.5 text-sm bg-gray-200/70 text-cyan-700 rounded-lg before:absolute before:inset-y-0 before:-start-2 before:rounded-e-full before:w-1 before:h-full before:bg-cyan-700 hover:bg-gray-200/70 focus:outline-hidden focus:bg-gray-200/70 dark:bg-neutral-700 dark:text-cyan-400 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
                >
                  <span className="-ms-[5px] flex shrink-0 justify-center items-center size-6">
                    <Plus className="shrink-0 size-4 group-hover:scale-115 group-focus:scale-115 transition-transform duration-300" />
                  </span>
                  <span className="truncate">New chat</span>
                </button>
              </li>
              {/* <li>
                <button className="group w-full flex items-center gap-1 py-1.5 px-2.5 text-sm text-gray-800 truncate rounded-lg hover:bg-gray-100/70 focus:outline-hidden focus:bg-gray-100/70 dark:hover:bg-neutral-700/50 dark:focus:bg-neutral-700/50 dark:text-neutral-200">
                  <span className="-ms-[5px] flex shrink-0 justify-center items-center size-6">
                    <Search className="shrink-0 size-4" />
                  </span>
                  <span className="truncate">Search chats</span>
                </button>
              </li>
              <li>
                <button className="group w-full flex items-center gap-1 py-1.5 px-2.5 text-sm text-gray-800 truncate rounded-lg hover:bg-gray-100/70 focus:outline-hidden focus:bg-gray-100/70 dark:hover:bg-neutral-700/50 dark:focus:bg-neutral-700/50 dark:text-neutral-200">
                  <span className="-ms-[5px] flex shrink-0 justify-center items-center size-6">
                    <Globe className="shrink-0 size-4 group-hover:rotate-180 group-focus:rotate-180 transition-transform duration-300" />
                  </span>
                  <span className="truncate">Explore</span>
                </button>
              </li>
              <li>
                <button className="group w-full flex items-center gap-1 py-1.5 px-2.5 text-sm text-gray-800 truncate rounded-lg hover:bg-gray-100/70 focus:outline-hidden focus:bg-gray-100/70 dark:hover:bg-neutral-700/50 dark:focus:bg-neutral-700/50 dark:text-neutral-200">
                  <span className="-ms-[5px] flex shrink-0 justify-center items-center size-6">
                    <MessageCircle className="shrink-0 size-4" />
                  </span>
                  <span className="truncate">Chat details</span>
                </button>
              </li> */}
            </ul>
          </div>

          {/* Chat History */}
          <div className="pb-4 px-2 size-full flex flex-col gap-y-5 overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-neutral-700 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500">
            <div className="flex flex-col">
              <span className="block ps-2.5 mb-2 text-sm text-gray-400 dark:text-neutral-500">
                Recent chats
              </span>
              
              <ul className="flex flex-col gap-y-0.5">
                {chatSessions.map((session) => (
                  <li key={session.id}>
                    <div className="relative group">
                      <button
                        onClick={() => {
                          loadChatSession(session);
                          setIsSidebarOpen(false);
                        }}
                        className={cn(
                          "w-full flex items-center gap-x-2 py-2 ps-2.5 pe-8 text-sm text-gray-800 truncate rounded-lg hover:bg-gray-100/70 focus:outline-hidden focus:bg-gray-100/70 dark:hover:bg-neutral-700/50 dark:focus:bg-neutral-700/50 dark:text-neutral-200",
                          currentSessionId === session.id ? "bg-gray-100/70 dark:bg-neutral-700/50" : ""
                        )}
                      >
                        <span className="truncate">{session.topic}</span>
                      </button>

                      <div className="absolute top-1/2 end-0 z-1 -translate-y-1/2 group-hover:opacity-100 opacity-0 transition-opacity duration-300">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <button className="flex justify-center items-center gap-x-3 size-8 text-sm text-gray-600 hover:bg-gray-100 rounded-lg disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:bg-gray-100 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700">
                              <MoreHorizontal className="shrink-0 size-4" />
                            </button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-32">
                            <DropdownMenuItem>
                              <Share className="shrink-0 size-3.5 mr-3" />
                              Share
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Edit className="shrink-0 size-3.5 mr-3" />
                              Rename
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Archive className="shrink-0 size-3.5 mr-3" />
                              Archive
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              onClick={(e) => {
                                e.stopPropagation();
                                deleteChatSession(session.id);
                              }}
                              className="text-red-600 hover:bg-red-50 focus:bg-red-50 dark:text-red-500 dark:hover:bg-red-500/20 dark:focus:bg-red-500/20"
                            >
                              <Trash2 className="shrink-0 size-3.5 mr-3" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  </li>
                ))}
                {chatSessions.length === 0 && (
                  <p className="text-sm text-gray-400 text-center py-4 dark:text-neutral-500">
                    No previous chats
                  </p>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="md:ps-65 transition-all duration-300 pb-4 h-screen flex flex-col">
        {/* Header */}
        {/* <header className="md:ms-65 transition-all duration-300 fixed top-0 inset-x-0 flex flex-wrap md:justify-start md:flex-nowrap z-48 md:z-61  py-2.5 dark:bg-neutral-800">
          <nav className="px-4 sm:px-5.5 flex basis-full justify-between items-center w-full mx-auto">
            Left Side
            <div className="flex items-center sm:gap-x-1.5 truncate">
              <button 
                type="button" 
                className="md:hidden flex justify-center items-center flex-none gap-x-3 size-9 text-sm text-gray-500 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:bg-gray-100 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
                onClick={() => setIsSidebarOpen(true)}
              >
                <Menu className="shrink-0 size-4" />
              </button>

              <div  className="flex justify-center items-center gap-x-1.5 py-2 px-2.5 text-sm whitespace-nowrap text-cyan-700 rounded-lg hover:bg-cyan-700/10 focus:outline-hidden focus:bg-cyan-700/10 disabled:opacity-50 disabled:pointer-events-none dark:text-cyan-500 dark:hover:bg-cyan-700/20 dark:focus:bg-cyan-700/20">
                
                .
              </div>
            </div>

            Right Side
            <div className="flex items-center sm:gap-x-1.5">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex justify-center items-center gap-x-3 size-9 text-sm text-gray-600 hover:bg-gray-100 rounded-lg disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:bg-gray-100 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700">
                    <MoreHorizontal className="shrink-0 size-4" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-32">
                  <DropdownMenuItem>
                    <Share className="shrink-0 size-3.5 mr-3" />
                    Share
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Edit className="shrink-0 size-3.5 mr-3" />
                    Rename
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Archive className="shrink-0 size-3.5 mr-3" />
                    Archive
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-red-600">
                    <Trash2 className="shrink-0 size-3.5 mr-3" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="p-0.5 inline-flex shrink-0 items-center gap-x-3 text-start rounded-full hover:bg-gray-200 focus:outline-hidden focus:bg-gray-200 dark:hover:bg-neutral-800 dark:hover:text-neutral-200 dark:focus:bg-neutral-800 dark:focus:text-neutral-200 dark:text-neutral-500">
                    <img className="shrink-0 size-8 rounded-full h-10" src="https://images.unsplash.com/photo-1659482633369-9fe69af50bfb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=3&w=320&h=320&q=80" alt="Avatar" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-60">
                  <div className="py-2 px-3.5">
                    <span className="font-medium text-gray-800 dark:text-neutral-300">
                      James Collison
                    </span>
                    <p className="text-sm text-gray-500 dark:text-neutral-500">
                      jamescollison@site.com
                    </p>
                    <div className="mt-1.5">
                      <button className="flex justify-center items-center gap-x-1.5 py-2 px-2.5 font-medium text-[13px] bg-cyan-700 text-white rounded-lg hover:bg-cyan-600 focus:outline-hidden focus:bg-cyan-600 disabled:opacity-50 disabled:pointer-events-none w-full">
                        Upgrade plan
                      </button>
                    </div>
                  </div>
                  <div className="p-1 border-t border-gray-200 dark:border-neutral-800">
                    <DropdownMenuItem>
                      <User className="shrink-0 size-4 mr-3" />
                      Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Settings className="shrink-0 size-4 mr-3" />
                      Settings
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <LogOut className="shrink-0 size-4 mr-3" />
                      Log out
                    </DropdownMenuItem>
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </nav>
        </header> */}

        {/* Chat Content */}
        {!hasStarted ? (
          <div className="h-full flex flex-col justify-between sm:justify-center max-w-3xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-16">
            <div className="flex flex-col justify-center items-center grow sm:flex-none">
              <h1 className="mb-8 text-3xl text-center text-gray-800 dark:text-neutral-200">
                What can I help with?
              </h1>
            </div>

            <div>
              {/* Main Input */}
              <div className="bg-white border border-gray-300 rounded-2xl shadow-xs dark:bg-neutral-800 dark:border-neutral-600">
                <div className="pb-2 px-2">
                  <textarea 
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && topic.trim() && startNewTopic(topic)}
                    className="max-h-36 mt-2 pt-4 pb-2 ps-2 pe-4 block w-full bg-transparent border-transparent resize-none text-gray-800 placeholder-gray-500 focus:outline-hidden focus:border-transparent focus:ring-transparent disabled:opacity-50 disabled:pointer-events-none dark:bg-transparent dark:text-neutral-200 dark:placeholder-neutral-500 overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500" 
                    placeholder="Ask anything..."
                  />

                  <div className="pt-2 flex justify-between items-center gap-x-1">
                    <div className="flex items-center gap-x-1">
                      {/* <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <button className="flex justify-center items-center gap-x-3 size-8 text-sm text-gray-600 hover:bg-gray-100 rounded-lg disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:bg-gray-100 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700">
                            <Plus className="shrink-0 size-4.5" />
                          </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-50">
                          <DropdownMenuItem>
                            <Upload className="shrink-0 size-3.5 mr-3" />
                            Upload a file
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Camera className="shrink-0 size-3.5 mr-3" />
                            Add a screenshot
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu> */}

                      {/* <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <button className="flex justify-center items-center gap-x-1 py-1.5 px-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:bg-gray-100 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700">
                            <PenTool className="shrink-0 size-4.5" />
                            Tools
                          </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-50">
                          <DropdownMenuItem>
                            <ImageIcon className="shrink-0 size-3.5 mr-3" />
                            Create an image
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Globe className="shrink-0 size-3.5 mr-3" />
                            Search the web
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <PenTool className="shrink-0 size-3.5 mr-3" />
                            Write or code
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Search className="shrink-0 size-3.5 mr-3" />
                            Run deep research
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Bot className="shrink-0 size-3.5 mr-3" />
                            Think for longer
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu> */}
                    </div>

                    <div className="flex items-center gap-x-1">
                      {/* <select 
                        value={selectedModel}
                        onChange={(e) => setSelectedModel(e.target.value)}
                        className="py-1.5 ps-3 pe-7 text-sm bg-white text-gray-800 rounded-lg border-0 hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:bg-neutral-800 dark:text-neutral-200 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
                      >
                        <option value="claude-4-sonnet">Claude-4-sonnet</option>
                        <option value="claude-3.5-sonnet">Claude-3.5-sonnet</option>
                        <option value="gpt-o3">gpt-o3</option>
                        <option value="gpt-4.1">gpt-4.1</option>
                        <option value="gpt-4o">gpt-4o</option>
                      </select> */}

                      {/* <button className="flex justify-center items-center gap-x-1.5 size-8 text-sm text-gray-600 hover:bg-gray-100 rounded-lg disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:bg-gray-100 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700">
                        <Mic className="shrink-0 size-4" />
                      </button> */}

                      <button 
                        onClick={() => startNewTopic(topic)}
                        disabled={!topic.trim() || isLoading}
                        className="inline-flex shrink-0 justify-center items-center size-8 text-sm font-medium rounded-lg text-white bg-cyan-700 hover:bg-cyan-600 disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:bg-cyan-600"
                      >
                        <Send className="shrink-0 size-4 rotate-90" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Action Tags */}
              <div className="mt-4">
                <div className="flex flex-wrap justify-center gap-1.5 sm:gap-2">
                  {[
                    { icon: "❤️", label: "Health" },
                    { icon: "🎓", label: "Learn" },
                    { icon: "💻", label: "Technology" },
                    { icon: "🧘", label: "Life stuff" },
                    { icon: "🔬", label: "Science" },
                    { icon: "🌍", label: "Language" }
                  ].map((tag, index) => (
                    <button
                      key={index}
                      onClick={() => setTopic(tag.label)}
                      className="py-1.5 px-2.5 inline-flex items-center gap-x-1.5 text-sm text-gray-800 bg-gray-100 hover:text-cyan-700 rounded-lg focus:outline-hidden focus:text-cyan-700 dark:bg-neutral-700 dark:text-neutral-200 dark:hover:text-neutral-400 dark:focus:text-neutral-400"
                    >
                      <span>{tag.icon}</span>
                      {tag.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Chat Messages Area */
          <div className="flex-1 overflow-y-auto pt-16 pb-4">
            <div className="max-w-4xl mx-auto px-4 space-y-4">
              {messages.map((message) => (
                message.sender === 'ai' ? (
                  <div key={message.id} className="flex justify-center">
                    <div className="w-full max-w-3xl px-2">
                      {renderAIMessage(message.content)}
                    </div>
                  </div>
                ) : (
                  <div key={message.id} className="flex gap-2 sm:gap-3 justify-end">
                    <div className="rounded-lg p-3 sm:p-4 text-sm max-w-[85%] sm:max-w-[80%] bg-cyan-700 text-white ml-auto break-words">
                      {message.content}
                    </div>
                    <Avatar className="h-6 w-6 sm:h-8 sm:w-8 flex-shrink-0">
                      <AvatarFallback>
                        <User className="h-3 w-3 sm:h-4 sm:w-4" />
                      </AvatarFallback>
                    </Avatar>
                  </div>
                )
              ))}

              {isLoading && (
                <div className="flex justify-center px-2">
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
        )}

        {/* Bottom Input (for active chat) */}
        {hasStarted && (
          <div className="border-t p-2 sm:p-4 bg-white dark:bg-neutral-800">
            <div className="max-w-4xl mx-auto">
              <div className="bg-white border border-gray-300 rounded-2xl shadow-xs dark:bg-neutral-800 dark:border-neutral-600">
                <div className="pb-2 px-2">
                  <textarea 
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && sendMessage()}
                    disabled={isLoading}
                    className="max-h-36 mt-2 pt-4 pb-2 ps-2 pe-4 block w-full bg-transparent border-transparent resize-none text-gray-800 placeholder-gray-500 focus:outline-hidden focus:border-transparent focus:ring-transparent disabled:opacity-50 disabled:pointer-events-none dark:bg-transparent dark:text-neutral-200 dark:placeholder-neutral-500 overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500" 
                    placeholder="Share your thoughts..."
                  />

                  <div className="pt-2 flex justify-between items-center gap-x-1">
                    <div className="flex items-center gap-x-1">
                      {/* <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <button className="flex justify-center items-center gap-x-3 size-8 text-sm text-gray-600 hover:bg-gray-100 rounded-lg disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:bg-gray-100 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700">
                            <Plus className="shrink-0 size-4.5" />
                          </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-50">
                          <DropdownMenuItem>
                            <Upload className="shrink-0 size-3.5 mr-3" />
                            Upload a file
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Camera className="shrink-0 size-3.5 mr-3" />
                            Add a screenshot
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu> */}

                      {messages.length > 0 && (
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="sm" disabled={isDownloading}>
                              <Download className="h-4 w-4 mr-2" />
                              {isDownloading ? 'Generating...' : 'Download'}
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={downloadSummary} disabled={isDownloading}>
                              <FileText className="h-4 w-4 mr-2" />
                              Download Summary
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={downloadChat}>
                              <MessageSquare className="h-4 w-4 mr-2" />
                              Download Chat
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      )}
                    </div>

                    <div className="flex items-center gap-x-1">
                      <button className="flex justify-center items-center gap-x-1.5 size-8 text-sm text-gray-600 hover:bg-gray-100 rounded-lg disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:bg-gray-100 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700">
                        <Mic className="shrink-0 size-4" />
                      </button>

                      <button 
                        onClick={sendMessage}
                        disabled={!input.trim() || isLoading}
                        className="inline-flex shrink-0 justify-center items-center size-8 text-sm font-medium rounded-lg text-white bg-cyan-700 hover:bg-cyan-600 disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:bg-cyan-600"
                      >
                        <Send className="shrink-0 size-4 rotate-90" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-50 md:hidden" 
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
}