'use client';

import { Sparkles, Heart } from 'lucide-react';
import Link from 'next/link';

export function Footer() {
  return (
    <footer className="relative border-t border-border/40 bg-muted/30 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          {/* Logo */}
          <Link href="/" className="inline-flex items-center gap-3 group mb-6">
            <div className="relative">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              EduAI
            </span>
          </Link>
          
          <p className="text-muted-foreground mb-6 max-w-md mx-auto leading-relaxed">
            Empowering learners through AI-powered Socratic methods and guided discovery
          </p>
          
          {/* Made with love */}
          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground mb-4">
            <span>Made with</span>
            <Heart className="w-4 h-4 text-red-500 fill-red-500 animate-pulse" />
            <span>by the EduAI Team</span>
          </div>
          
          {/* Credits */}
          <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground flex-wrap">
            <span>Powered by Gemini AI</span>
            <span className="w-1 h-1 bg-muted-foreground/50 rounded-full" />
            <span>© 2024 EduAI</span>
            <span className="w-1 h-1 bg-muted-foreground/50 rounded-full" />
            <span>All rights reserved</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
