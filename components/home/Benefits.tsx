'use client';

import { Card } from '@/components/ui/card';
import { CheckCircle, Brain, User, Sparkles } from 'lucide-react';

const benefits = [
  'Develops critical thinking and problem-solving skills',
  'Encourages active learning and engagement',
  'Builds confidence through self-discovery',
  'Adapts to individual learning pace and style',
  'Promotes deeper understanding of concepts',
  'Enhances retention through active participation',
];

export function Benefits() {
  return (
    <section className="py-24 md:py-32 relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left content */}
          <div className="order-2 lg:order-1">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6 backdrop-blur-sm">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Learning Benefits</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
              Transform Your <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Learning Experience</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Unlike traditional tutoring that gives you answers, our AI guides you to discover solutions yourself, 
              building lasting understanding and confidence.
            </p>
            
            <ul className="space-y-4">
              {benefits.map((benefit, index) => (
                <li 
                  key={index} 
                  className="flex items-start gap-3 group animate-fade-in" 
                  style={{ animationDelay: `${index * 100}ms`, opacity: 0 }}
                >
                  <div className="mt-0.5 p-1 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
                    <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                  </div>
                  <span className="text-muted-foreground group-hover:text-foreground transition-colors">{benefit}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right chat mockup */}
          <div className="order-1 lg:order-2 relative">
            {/* Decorative circles */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary/20 rounded-full blur-2xl" />
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-secondary/20 rounded-full blur-2xl" />
            
            <Card className="p-8 bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-xl border-border/50 shadow-2xl relative overflow-hidden">
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5" />
              
              <div className="space-y-6 relative">
                {/* AI Message */}
                <div className="flex items-start gap-3 animate-fade-in">
                  <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-lg">
                    <Brain className="h-5 w-5 text-white" />
                  </div>
                  <div className="flex-1 bg-muted/80 backdrop-blur-sm rounded-2xl rounded-tl-none p-4 shadow-md border border-border/50">
                    <p className="text-sm text-foreground leading-relaxed">
                      What do you think photosynthesis is? 🌱
                    </p>
                  </div>
                </div>
                
                {/* User Message */}
                <div className="flex items-start gap-3 justify-end animate-fade-in animation-delay-2000">
                  <div className="flex-1 bg-gradient-to-br from-primary/20 to-primary/10 backdrop-blur-sm rounded-2xl rounded-tr-none p-4 shadow-md border border-primary/20">
                    <p className="text-sm text-foreground text-right leading-relaxed">
                      Plants make food from sunlight?
                    </p>
                  </div>
                  <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-muted/80 backdrop-blur-sm flex items-center justify-center border border-border/50">
                    <User className="h-5 w-5 text-muted-foreground" />
                  </div>
                </div>
                
                {/* AI Follow-up */}
                <div className="flex items-start gap-3 animate-fade-in animation-delay-4000">
                  <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-lg">
                    <Brain className="h-5 w-5 text-white" />
                  </div>
                  <div className="flex-1 bg-muted/80 backdrop-blur-sm rounded-2xl rounded-tl-none p-4 shadow-md border border-border/50">
                    <p className="text-sm text-foreground leading-relaxed">
                      Great start! 🎯 What ingredients do you think plants need for this process?
                    </p>
                  </div>
                </div>
                
                {/* Typing indicator */}
                <div className="flex items-center gap-3 animate-fade-in animation-delay-4000">
                  <div className="flex-shrink-0 w-10 h-10" />
                  <div className="bg-muted/50 backdrop-blur-sm rounded-2xl px-4 py-3 border border-border/30">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-primary/60 rounded-full animate-bounce" />
                      <div className="w-2 h-2 bg-primary/60 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                      <div className="w-2 h-2 bg-primary/60 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
