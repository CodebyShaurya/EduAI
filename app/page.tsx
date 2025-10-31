'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Brain, MessageCircle, Lightbulb, Target, Users, TrendingUp, CircleCheck as CheckCircle, ArrowRight, BookOpen, Zap, Award, X, Sparkles, Code2, Database, Cpu, Terminal, GitBranch, Layers, Network, Hexagon, Binary, Activity, Shield, Rocket } from 'lucide-react';
import AuthButton from '@/components/AuthButton';
import { ThemeToggle } from '@/components/ThemeToggle';

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
    image: '👩💻',
    content: 'EduAI helped me truly understand algorithms instead of just memorizing them. The Socratic approach made complex concepts click!',
    rating: 5,
  },
  {
    name: 'Marcus Johnson',
    role: 'High School Teacher',
    image: '👨🏫',
    content: 'I recommend EduAI to all my students. It teaches them HOW to think, not just WHAT to think. Game-changer for education.',
    rating: 5,
  },
  {
    name: 'Priya Patel',
    role: 'Medical Student',
    image: '👩⚕️',
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
      {/* Advanced Animated Background */}
      <div className="fixed inset-0 bg-circuit-pattern opacity-[0.03] pointer-events-none -z-10" />
      <div className="fixed inset-0 bg-gradient-to-br from-primary/5 via-background to-secondary/5 pointer-events-none -z-10" />
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}} />
      </div>
      
      {/* Enhanced Header */}
      <header className="border-b border-border/50 glass-morphism sticky top-0 z-50 shadow-2xl">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="relative group">
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary to-secondary opacity-75 blur group-hover:opacity-100 transition-opacity" />
              <div className="relative h-12 w-12 rounded-xl bg-gradient-to-br from-primary via-primary to-secondary flex items-center justify-center shadow-xl border border-white/20">
                <Hexagon className="h-6 w-6 text-primary-foreground animate-pulse" />
                <div className="absolute inset-0 rounded-xl bg-white/10 animate-ping" />
              </div>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gradient-primary tracking-tight">
                EduAI
              </h1>
              <div className="flex items-center gap-2">
                {/* <Terminal className="h-3 w-3 text-muted-foreground" /> */}
                <span className="text-xs font-mono text-muted-foreground">v2.0.1 • Gemini AI</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            {/* <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-muted/50 border border-border/50"> */}
              {/* <Activity className="h-3 w-3 text-green-500 animate-pulse" /> */}
              {/* <span className="text-xs font-mono text-muted-foreground">Online</span> */}
            {/* </div> */}
            <ThemeToggle />
            <AuthButton />
          </div>
        </div>
      </header>

        {/* Enhanced Hero Section */}
        <section className="relative py-32 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full glass-morphism border-gradient mb-12 group hover:scale-105 transition-transform">
              <div className="relative">
                <Sparkles className="h-5 w-5 text-primary animate-pulse" />
                <div className="absolute inset-0 animate-ping">
                  <Sparkles className="h-5 w-5 text-primary/50" />
                </div>
              </div>
              <span className="text-sm font-semibold text-foreground tracking-wide">AI-POWERED SOCRATIC LEARNING</span>
              <div className="flex items-center gap-1">
                {/* <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" /> */}
                {/* <span className="text-xs font-mono text-muted-foreground">LIVE</span> */}
              </div>
            </div>
            
            <div className="max-w-5xl mx-auto">
              <h1 className="text-7xl font-black mb-8 leading-tight">
                <span className="block text-gradient-primary">Learn Through</span>
                <span className="block bg-gradient-to-r from-foreground via-primary to-secondary bg-clip-text text-transparent">Discovery</span>
                <span className="block text-4xl font-semibold text-muted-foreground mt-2">Not Direct Answers</span>
              </h1>
              <p className="text-2xl text-muted-foreground mb-12 leading-relaxed max-w-4xl mx-auto">
                Our <code className="bg-primary/10 text-primary px-2 py-1 rounded font-mono text-lg">AI tutor</code> uses the 
                <span className="text-primary font-bold"> Socratic method</span> to guide you toward understanding through 
                <span className="text-secondary font-bold">intelligent questioning</span>, building lasting comprehension.
              </p>
              <div className="flex gap-6 justify-center flex-wrap">
                <Link href="/chat">
                  <Button size="lg" 
                  className="group relative bg-gradient-to-r from-primary via-primary to-secondary 
                  hover:from-primary/90 hover:to-secondary/90  px-10 py-7 text-xl font-semibold text-foreground
                  shadow-2xl hover:shadow-primary/25 transition-all duration-300 
                  border-gradient glow-primary hover:scale-105">
                    <Rocket className="mr-3 h-6 w-6 group-hover:animate-bounce" />
                    Initialize Learning
                    <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Button size="lg" variant="outline" className="px-10 py-7 text-xl font-semibold border-2 border-border hover:border-primary/50 glass-morphism hover:bg-primary/5 group">
                  <Terminal className="mr-3 h-6 w-6 group-hover:text-primary transition-colors" />
                  <span className="font-mono">explore</span>
                </Button>
              </div>
            </div>
            
            {/* Enhanced Tech Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-20 max-w-6xl mx-auto">
              <Card className="glass-morphism border-gradient hover:glow-primary transition-all duration-300 group">
                <CardContent className="pt-8 pb-6">
                  <div className="flex items-center justify-center mb-4">
                    <GitBranch className="h-8 w-8 text-primary group-hover:animate-pulse" />
                  </div>
                  <div className="text-4xl font-black text-primary mb-2 font-mono">2-3</div>
                  <p className="text-sm text-muted-foreground font-medium">Diagnostic Queries</p>
                </CardContent>
              </Card>
              <Card className="glass-morphism border-gradient hover:glow-secondary transition-all duration-300 group">
                <CardContent className="pt-8 pb-6">
                  <div className="flex items-center justify-center mb-4">
                    <Shield className="h-8 w-8 text-secondary group-hover:animate-pulse" />
                  </div>
                  <div className="text-4xl font-black text-secondary mb-2 font-mono">100%</div>
                  <p className="text-sm text-muted-foreground font-medium">Socratic Protocol</p>
                </CardContent>
              </Card>
              <Card className="glass-morphism border-gradient hover:glow-primary transition-all duration-300 group">
                <CardContent className="pt-8 pb-6">
                  <div className="flex items-center justify-center mb-4">
                    <Network className="h-8 w-8 text-primary group-hover:animate-pulse" />
                  </div>
                  <div className="text-4xl font-black text-primary mb-2 font-mono">∞</div>
                  <p className="text-sm text-muted-foreground font-medium">Knowledge Domains</p>
                </CardContent>
              </Card>
              <Card className="glass-morphism border-gradient hover:glow-secondary transition-all duration-300 group">
                <CardContent className="pt-8 pb-6">
                  <div className="flex items-center justify-center mb-4">
                    <Binary className="h-8 w-8 text-secondary group-hover:animate-pulse" />
                  </div>
                  <div className="text-4xl font-black text-secondary mb-2 font-mono">AI</div>
                  <p className="text-sm text-muted-foreground font-medium">Neural Engine</p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Enhanced Floating Tech Elements */}
          <div className="absolute top-20 left-10 opacity-20 animate-float">
            <Code2 className="h-24 w-24 text-primary" />
          </div>
          <div className="absolute top-40 right-20 opacity-20 animate-float" style={{animationDelay: '2s'}}>
            <Database className="h-20 w-20 text-secondary" />
          </div>
          <div className="absolute bottom-20 left-20 opacity-20 animate-float" style={{animationDelay: '4s'}}>
            <Layers className="h-22 w-22 text-primary" />
          </div>
          <div className="absolute top-1/2 right-10 opacity-15 animate-float" style={{animationDelay: '1s'}}>
            <Terminal className="h-16 w-16 text-secondary" />
          </div>
          <div className="absolute bottom-40 right-1/4 opacity-15 animate-float" style={{animationDelay: '3s'}}>
            <Hexagon className="h-18 w-18 text-primary" />
          </div>
        </section>

        {/* Enhanced Features Section */}
        <section className="py-24 bg-muted/20 relative z-10 overflow-hidden">
          <div className="absolute inset-0 bg-circuit-pattern opacity-[0.02]" />
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-20">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
                <Terminal className="h-4 w-4 text-primary" />
                <span className="text-sm font-mono text-primary">SYSTEM.FEATURES</span>
              </div>
              <h2 className="text-5xl font-black mb-6 text-gradient-primary">Why Choose Socratic Learning?</h2>
              <p className="text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
                Experience a <code className="bg-primary/10 text-primary px-2 py-1 rounded font-mono">revolutionary approach</code> to education that empowers 
                <span className="text-primary font-semibold"> autonomous discovery</span>
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <Card key={index} className="group glass-morphism border-gradient hover:glow-primary transition-all duration-500 hover:scale-105 cursor-pointer relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <CardHeader className="relative z-10">
                    <div className={`h-16 w-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center group-hover:rotate-12 group-hover:scale-110 transition-all duration-300 shadow-2xl border border-white/20`}>
                      <feature.icon className="h-8 w-8 text-white" />
                    </div>
                    <CardTitle className="text-xl text-center text-foreground font-bold group-hover:text-primary transition-colors">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="relative z-10">
                    <CardDescription className="text-muted-foreground text-center leading-relaxed">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Enhanced Comparison Section */}
        <section className="py-24 bg-background relative z-10 overflow-hidden">
          <div className="absolute inset-0 bg-grid-pattern opacity-[0.02]" />
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-20">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 border border-secondary/20 mb-6">
                <GitBranch className="h-4 w-4 text-secondary" />
                <span className="text-sm font-mono text-secondary">COMPARISON.MATRIX</span>
              </div>
              <h2 className="text-5xl font-black mb-6 text-gradient-primary">EduAI vs Traditional AI Learning</h2>
              <p className="text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
                See why the <code className="bg-secondary/10 text-secondary px-2 py-1 rounded font-mono">Socratic protocol</code> outperforms 
                <span className="text-secondary font-semibold">traditional Q&A systems</span>
              </p>
            </div>

            <Card className="overflow-hidden glass-morphism border-gradient shadow-2xl">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b-2 border-border/50 bg-gradient-to-r from-primary/5 to-secondary/5">
                      <th className="text-left p-8 text-muted-foreground font-bold text-lg">System Feature</th>
                      <th className="text-center p-8">
                        <div className="flex flex-col items-center gap-3">
                          <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-xl border border-white/20 glow-primary">
                            <Hexagon className="h-7 w-7 text-primary-foreground" />
                          </div>
                          <span className="font-black text-foreground text-lg">EduAI</span>
                          <span className="text-xs font-mono text-primary">v2.0.1</span>
                        </div>
                      </th>
                      <th className="text-center p-8">
                        <div className="flex flex-col items-center gap-3">
                          <div className="h-14 w-14 rounded-2xl bg-muted border-2 border-border flex items-center justify-center">
                            <MessageCircle className="h-7 w-7 text-muted-foreground" />
                          </div>
                          <span className="font-black text-foreground text-lg">Traditional AI</span>
                          <span className="text-xs font-mono text-muted-foreground">legacy</span>
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {comparison.map((item, index) => (
                      <tr key={index} className="border-b border-border/50 hover:bg-gradient-to-r hover:from-primary/5 hover:to-secondary/5 transition-all duration-300 group">
                        <td className="p-8 font-bold text-foreground text-lg group-hover:text-primary transition-colors">{item.feature}</td>
                        <td className="p-8">
                          <div className="flex items-center justify-center gap-4">
                            <div className="p-2 rounded-full bg-green-500/10 border border-green-500/20">
                              <item.eduaiIcon className="h-6 w-6 text-green-500 flex-shrink-0" />
                            </div>
                            <span className="text-base text-muted-foreground font-medium">{item.eduai}</span>
                          </div>
                        </td>
                        <td className="p-8">
                          <div className="flex items-center justify-center gap-4">
                            <div className="p-2 rounded-full bg-red-500/10 border border-red-500/20">
                              <item.gptIcon className="h-6 w-6 text-red-500 flex-shrink-0" />
                            </div>
                            <span className="text-base text-muted-foreground font-medium">{item.gpt}</span>
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

        {/* Enhanced CTA Section */}
        <section className="py-32 bg-gradient-to-br from-primary via-primary to-secondary text-primary-foreground relative overflow-hidden z-10">
          {/* Advanced Tech Pattern Overlay */}
          <div className="absolute inset-0 opacity-15">
            <div className="absolute top-10 left-10 animate-float">
              <Code2 className="h-40 w-40" />
            </div>
            <div className="absolute bottom-10 right-10 animate-float" style={{animationDelay: '2s'}}>
              <Database className="h-36 w-36" />
            </div>
            <div className="absolute top-1/2 left-1/4 animate-float" style={{animationDelay: '1s'}}>
              <Terminal className="h-24 w-24" />
            </div>
            <div className="absolute bottom-1/4 left-10 animate-float" style={{animationDelay: '3s'}}>
              <Layers className="h-28 w-28" />
            </div>
          </div>
          <div className="absolute inset-0 bg-circuit-pattern opacity-10" />
          
          <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
            <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/10 border border-white/20 mb-8">
              <Rocket className="h-5 w-5 animate-pulse" />
              <span className="text-sm font-mono font-semibold">DEPLOYMENT.READY</span>
            </div>
            <h2 className="text-6xl font-black mb-8 leading-tight">
              Ready to <span className="text-yellow-300">Initialize</span><br />Your Learning Protocol?
            </h2>
            <p className="text-2xl mb-12 opacity-90 max-w-4xl mx-auto leading-relaxed">
              Join <code className="bg-white/10 px-3 py-1 rounded font-mono text-yellow-300">10,000+</code> students who are discovering the power of 
              <span className="font-bold text-yellow-300"> guided neural learning</span>
            </p>
            <Link href="/chat">
              <Button size="lg" className="group bg-white text-primary hover:bg-white/90 px-12 py-8 text-2xl font-bold shadow-2xl hover:shadow-white/25 transition-all duration-300 border-2 border-white/20 hover:scale-105">
                {/* <Terminal className="mr-4 h-8 w-8 group-hover:animate-pulse" /> */}
                <span className="font-mono">start learning</span>
                <ArrowRight className="ml-4 h-8 w-8 group-hover:translate-x-2 transition-transform" />
              </Button>
            </Link>
          </div>
        </section>

        {/* Enhanced Footer */}
        <footer className="glass-morphism border-t border-border/50 py-16 relative z-10 overflow-hidden">
          <div className="absolute inset-0 bg-circuit-pattern opacity-[0.02]" />
          <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="relative group">
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary to-secondary opacity-75 blur group-hover:opacity-100 transition-opacity" />
                <div className="relative h-14 w-14 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-xl border border-white/20">
                  <Hexagon className="h-7 w-7 text-primary-foreground animate-pulse" />
                </div>
              </div>
              <div>
                <h3 className="text-3xl font-black text-gradient-primary">EduAI</h3>
                <div className="flex items-center gap-2 justify-center">
                  <Activity className="h-3 w-3 text-green-500 animate-pulse" />
                  <span className="text-xs font-mono text-muted-foreground">SYSTEM.ONLINE</span>
                </div>
              </div>
            </div>
            <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
              Empowering learners through <code className="bg-primary/10 text-primary px-2 py-1 rounded font-mono">Socratic protocols</code> and 
              <span className="text-primary font-semibold">AI-guided discovery</span>
            </p>
            <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Terminal className="h-4 w-4" />
                <span className="font-mono">Powered by Gemini AI</span>
              </div>
              <div className="flex items-center gap-2">
                {/* <Code2 className="h-4 w-4" /> */}
                {/* <span className="font-mono">Next.js + Tailwind</span> */}
              </div>
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4" />
                <span className="font-mono">v2.0.1</span>
              </div>
            </div>
          </div>
        </footer>
    </div>
  );
}