'use client';

import { Sparkles } from 'lucide-react';
import AuthButton from '@/components/AuthButton';
import { ThemeToggle } from '@/components/ThemeToggle';
import { Hero } from '@/components/home/Hero';
import { Features } from '@/components/home/Features';
import { Comparison } from '@/components/home/Comparison';
import { Testimonials } from '@/components/home/Testimonials';
import { Benefits } from '@/components/home/Benefits';
import { CTA } from '@/components/home/CTA';
import { Footer } from '@/components/home/Footer';
import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Subtle background gradients */}
      <div className="fixed inset-0 bg-gradient-to-br from-primary/5 via-background to-secondary/5 pointer-events-none -z-10" />
      
      {/* Modern Header with Glassmorphism */}
      <header className="sticky top-0 z-50 border-b border-border/40 backdrop-blur-xl bg-background/70 supports-[backdrop-filter]:bg-background/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative">
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg group-hover:shadow-xl group-hover:scale-105 transition-all duration-300">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <div className="absolute inset-0 w-11 h-11 rounded-xl bg-gradient-to-br from-primary to-secondary blur opacity-0 group-hover:opacity-50 transition-opacity duration-300" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  EduAI
                </h1>
                <p className="text-xs text-muted-foreground">Powered by Gemini</p>
              </div>
            </Link>
            
            {/* Navigation */}
            <div className="flex items-center gap-2 md:gap-4">
              <ThemeToggle />
              <AuthButton />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main>
        <Hero />
        <Features />
        <Comparison />
        <Testimonials />
        <Benefits />
        <CTA />
      </main>
      
      <Footer />
    </div>
  );
}