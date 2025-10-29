'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Brain, MessageCircle, Lightbulb, Target, Users, TrendingUp, CircleCheck as CheckCircle, ArrowRight, BookOpen, Zap, Award, X, Sparkles, Code2, Database, Cpu } from 'lucide-react';
import AuthButton from '@/components/AuthButton';

const features = [
  {
    icon: Brain,
    title: 'Socratic Method',
    description: 'Learn through guided questioning that builds critical thinking skills',
    gradient: 'from-blue-500 to-cyan-500',
  },
  {
    icon: Target,
    title: 'Personalized Learning',
    description: 'Adaptive questioning based on your understanding level and progress',
    gradient: 'from-purple-500 to-pink-500',
  },
  {
    icon: MessageCircle,
    title: 'Interactive Conversations',
    description: 'Engage in meaningful dialogues that deepen your comprehension',
    gradient: 'from-green-500 to-emerald-500',
  },
  {
    icon: TrendingUp,
    title: 'Progressive Discovery',
    description: 'Build knowledge step by step through self-guided exploration',
    gradient: 'from-orange-500 to-red-500',
  },
];

const comparison = [
  {
    feature: 'Learning Approach',
    eduai: 'Asks diagnostic questions, builds on your understanding',
    gpt: 'Provides direct answers immediately',
    eduaiIcon: CheckCircle,
    gptIcon: X,
  },
  {
    feature: 'Knowledge Retention',
    eduai: 'Deep understanding through self-discovery',
    gpt: 'Surface-level comprehension from passive reading',
    eduaiIcon: CheckCircle,
    gptIcon: X,
  },
  {
    feature: 'Critical Thinking',
    eduai: 'Develops problem-solving and analytical skills',
    gpt: 'Minimal development of independent thinking',
    eduaiIcon: CheckCircle,
    gptIcon: X,
  },
  {
    feature: 'Personalization',
    eduai: 'Adapts to your level with scaffolded hints',
    gpt: 'One-size-fits-all responses',
    eduaiIcon: CheckCircle,
    gptIcon: X,
  },
  {
    feature: 'Long-term Benefits',
    eduai: 'Builds lasting understanding and confidence',
    gpt: 'Quick answers but dependency on AI',
    eduaiIcon: CheckCircle,
    gptIcon: X,
  },
];

const testimonials = [
  {
    name: 'Sarah Chen',
    role: 'Computer Science Student',
    image: '👩‍💻',
    content: 'EduAI helped me truly understand algorithms instead of just memorizing them. The Socratic approach made complex concepts click!',
    rating: 5,
  },
  {
    name: 'Marcus Johnson',
    role: 'High School Teacher',
    image: '👨‍🏫',
    content: 'I recommend EduAI to all my students. It teaches them HOW to think, not just WHAT to think. Game-changer for education.',
    rating: 5,
  },
  {
    name: 'Priya Patel',
    role: 'Medical Student',
    image: '👩‍⚕️',
    content: 'Studying for exams with EduAI has been incredible. The guided questions help me connect concepts and retain information better.',
    rating: 5,
  },
];



const benefits = [
  'Develops critical thinking and problem-solving skills',
  'Encourages active learning and engagement',
  'Builds confidence through self-discovery',
  'Adapts to individual learning pace and style',
  'Promotes deeper understanding of concepts',
  'Enhances retention through active participation',
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background relative">
      {/* Animated Background Grid */}
      <div className="fixed inset-0 bg-grid-pattern opacity-[0.02] pointer-events-none -z-10" />
      <div className="fixed inset-0 bg-gradient-to-br from-primary/5 via-background to-secondary/5 pointer-events-none -z-10" />
      
      {/* Header */}
      <header className="border-b border-border bg-card/80 backdrop-blur-md sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative h-10 w-10 rounded-xl bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center shadow-lg">
              <Cpu className="h-5 w-5 text-primary-foreground animate-pulse" />
              <div className="absolute inset-0 rounded-xl bg-primary/20 animate-ping" />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-primary via-primary to-secondary bg-clip-text text-transparent">
                EduAI
              </h1>
              <p className="text-xs text-muted-foreground">Powered by Gemini</p>
            </div>
          </div>
          <AuthButton />
        </div>
      </header>

        {/* Hero Section */}
        <section className="relative py-24 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8">
              <Sparkles className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-foreground">AI-Powered Socratic Learning</span>
            </div>
            
            <div className="max-w-4xl mx-auto">
              <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-foreground via-primary to-secondary bg-clip-text text-transparent leading-tight">
                Learn Through Discovery,<br />Not Direct Answers
              </h1>
              <p className="text-xl text-muted-foreground mb-10 leading-relaxed">
                Our AI tutor uses the <span className="text-primary font-semibold">Socratic method</span> to guide you toward understanding through thoughtful questions, 
                building <span className="text-secondary font-semibold">critical thinking skills</span> and deeper comprehension.
              </p>
              <div className="flex gap-4 justify-center flex-wrap">
                <Link href="/chat">
                  <Button size="lg" className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 text-primary-foreground px-8 py-6 text-lg shadow-xl hover:shadow-2xl transition-all">
                    Start Learning
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Button size="lg" variant="outline" className="px-8 py-6 text-lg border-2 hover:bg-accent">
                  <Lightbulb className="mr-2 h-5 w-5" />
                  How It Works
                </Button>
              </div>
            </div>
            
            {/* Tech Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 max-w-4xl mx-auto">
              <Card className="bg-card/50 backdrop-blur border-border">
                <CardContent className="pt-6">
                  <div className="text-3xl font-bold text-primary mb-1">2-3</div>
                  <p className="text-sm text-muted-foreground">Diagnostic Questions</p>
                </CardContent>
              </Card>
              <Card className="bg-card/50 backdrop-blur border-border">
                <CardContent className="pt-6">
                  <div className="text-3xl font-bold text-secondary mb-1">100%</div>
                  <p className="text-sm text-muted-foreground">Socratic Method</p>
                </CardContent>
              </Card>
              <Card className="bg-card/50 backdrop-blur border-border">
                <CardContent className="pt-6">
                  <div className="text-3xl font-bold text-primary mb-1">∞</div>
                  <p className="text-sm text-muted-foreground">Topics Available</p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Floating Tech Elements */}
          <div className="absolute top-20 left-10 opacity-10">
            <Code2 className="h-20 w-20 text-primary animate-pulse" />
          </div>
          <div className="absolute top-40 right-20 opacity-10">
            <Database className="h-16 w-16 text-secondary animate-bounce" />
          </div>
          <div className="absolute bottom-20 left-20 opacity-10">
            <Cpu className="h-18 w-18 text-primary animate-pulse" />
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-muted/30 relative z-10">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4 text-foreground">Why Choose Socratic Learning?</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Experience a revolutionary approach to education that empowers you to discover answers yourself
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature, index) => (
                <Card key={index} className="group hover:shadow-2xl transition-all duration-300 border-border bg-card hover:scale-105 cursor-pointer">
                  <CardHeader>
                    <div className={`h-14 w-14 mx-auto mb-4 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center group-hover:rotate-6 transition-transform shadow-lg`}>
                      <feature.icon className="h-7 w-7 text-white" />
                    </div>
                    <CardTitle className="text-lg text-center text-foreground">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-muted-foreground text-center">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Comparison Section */}
        <section className="py-20 bg-background relative z-10">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4 text-foreground">EduAI vs Traditional AI Learning</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                See why the Socratic method outperforms traditional Q&A learning
              </p>
            </div>

            <Card className="overflow-hidden border-2 border-border shadow-2xl bg-card">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b-2 border-border bg-muted/50">
                      <th className="text-left p-6 text-muted-foreground font-semibold">Feature</th>
                      <th className="text-center p-6">
                        <div className="flex flex-col items-center gap-2">
                          <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                            <Brain className="h-5 w-5 text-primary-foreground" />
                          </div>
                          <span className="font-bold text-foreground">EduAI</span>
                        </div>
                      </th>
                      <th className="text-center p-6">
                        <div className="flex flex-col items-center gap-2">
                          <div className="h-10 w-10 rounded-lg bg-muted flex items-center justify-center">
                            <MessageCircle className="h-5 w-5 text-muted-foreground" />
                          </div>
                          <span className="font-bold text-foreground">Traditional AI</span>
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {comparison.map((item, index) => (
                      <tr key={index} className="border-b border-border hover:bg-muted/30 transition-colors">
                        <td className="p-6 font-medium text-foreground">{item.feature}</td>
                        <td className="p-6">
                          <div className="flex items-center justify-center gap-3">
                            <item.eduaiIcon className="h-5 w-5 text-green-500 flex-shrink-0" />
                            <span className="text-sm text-muted-foreground">{item.eduai}</span>
                          </div>
                        </td>
                        <td className="p-6">
                          <div className="flex items-center justify-center gap-3">
                            <item.gptIcon className="h-5 w-5 text-red-500 flex-shrink-0" />
                            <span className="text-sm text-muted-foreground">{item.gpt}</span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-20 bg-muted/30 relative z-10">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4 text-foreground">What Our Learners Say</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Real stories from students and educators using EduAI
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <Card key={index} className="bg-card border-border hover:shadow-xl transition-all duration-300 hover:scale-105">
                  <CardHeader>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="h-14 w-14 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-2xl shadow-lg">
                        {testimonial.image}
                      </div>
                      <div>
                        <h4 className="font-bold text-foreground">{testimonial.name}</h4>
                        <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                      </div>
                    </div>
                    <div className="flex gap-1 mb-3">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Sparkles key={i} className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                      ))}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground italic leading-relaxed">
                      "{testimonial.content}"
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-20 bg-background relative z-10">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-4xl font-bold mb-6 text-foreground">Transform Your Learning Experience</h2>
                <p className="text-lg text-muted-foreground mb-8">
                  Unlike traditional tutoring that gives you answers, our AI guides you to discover solutions yourself, 
                  building lasting understanding and confidence.
                </p>
                <ul className="space-y-4">
                  {benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="relative">
                <Card className="p-8 bg-gradient-to-br from-primary/10 to-secondary/10 border-2 border-border shadow-2xl">
                  <div className="space-y-6">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg">
                        <Brain className="h-4 w-4 text-primary-foreground" />
                      </div>
                      <div className="flex-1 bg-muted rounded-lg p-3 text-sm text-foreground">
                        What do you think photosynthesis is?
                      </div>
                    </div>
                    <div className="flex items-center gap-3 justify-end">
                      <div className="flex-1 bg-primary text-primary-foreground rounded-lg p-3 text-sm text-right shadow-md">
                        Plants make food from sunlight?
                      </div>
                      <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">
                        <Users className="h-4 w-4 text-muted-foreground" />
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg">
                        <Brain className="h-4 w-4 text-primary-foreground" />
                      </div>
                      <div className="flex-1 bg-muted rounded-lg p-3 text-sm text-foreground">
                        Good start! What ingredients do you think plants need for this process?
                      </div>
                    </div>
                  </div>
                </Card>

                {/* Floating icons */}
                <div className="absolute -top-4 -right-4 h-10 w-10 bg-yellow-500/20 rounded-full flex items-center justify-center backdrop-blur shadow-lg">
                  <Zap className="h-5 w-5 text-yellow-500" />
                </div>
                <div className="absolute -bottom-4 -left-4 h-10 w-10 bg-green-500/20 rounded-full flex items-center justify-center backdrop-blur shadow-lg">
                  <Award className="h-5 w-5 text-green-500" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-primary to-secondary text-primary-foreground relative overflow-hidden z-10">
          {/* Tech Pattern Overlay */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 left-10">
              <Code2 className="h-32 w-32 animate-pulse" />
            </div>
            <div className="absolute bottom-10 right-10">
              <Database className="h-28 w-28 animate-bounce" />
            </div>
          </div>
          
          <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
            <h2 className="text-4xl font-bold mb-6">Ready to Start Your Learning Journey?</h2>
            <p className="text-xl mb-8 opacity-90">
              Join thousands of students who are discovering the power of guided learning
            </p>
            <Link href="/chat">
              <Button size="lg" variant="secondary" className="bg-background text-foreground hover:bg-background/90 px-8 py-6 text-lg shadow-2xl">
                Begin Learning Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-card border-t border-border py-12 relative z-10">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg">
                <Cpu className="h-5 w-5 text-primary-foreground" />
              </div>
              <h3 className="text-2xl font-bold text-foreground">EduAI</h3>
            </div>
            <p className="text-muted-foreground mb-4">
              Empowering learners through the Socratic method and AI-guided discovery
            </p>
            <p className="text-sm text-muted-foreground">
              Powered by Google Gemini AI • Built with Next.js & Tailwind CSS
            </p>
          </div>
        </footer>
    </div>
  );
}