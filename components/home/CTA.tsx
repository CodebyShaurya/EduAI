'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles, Star, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

export function CTA() {
  return (
    <section className="py-32 md:py-40 relative overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0">
        <motion.div 
          className="absolute inset-0 bg-gradient-to-br from-primary via-purple-600 to-secondary"
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{
            backgroundSize: '200% 200%',
          }}
        />
      </div>
      
      {/* Animated geometric shapes */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{
            left: `${15 + i * 15}%`,
            top: `${10 + (i % 2) * 60}%`,
          }}
          animate={{
            y: [0, -30, 0],
            rotate: [0, 180, 360],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 10 + i,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.5,
          }}
        >
          <div className="w-24 h-24 bg-white/10 backdrop-blur-sm rounded-2xl transform rotate-45" />
        </motion.div>
      ))}
      
      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(40)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [-20, -100],
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
          >
            <Sparkles className="w-4 h-4 text-white/50" />
          </motion.div>
        ))}
      </div>
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        {/* Animated Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white/20 backdrop-blur-xl border border-white/30 mb-10"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          >
            <Zap className="h-5 w-5 text-yellow-300 fill-yellow-300" />
          </motion.div>
          <span className="text-sm font-bold text-white">Join 10,000+ Happy Learners</span>
          <div className="flex -space-x-2">
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="w-6 h-6 rounded-full bg-white/30 border-2 border-white/50 backdrop-blur-sm"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * i }}
              />
            ))}
          </div>
        </motion.div>
        
        {/* Main Heading */}
        <motion.h2 
          className="text-5xl md:text-6xl lg:text-7xl font-black mb-8 text-white leading-tight"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Ready to <motion.span 
            className="inline-block text-yellow-300"
            animate={{ 
              rotate: [-2, 2, -2],
              scale: [1, 1.05, 1],
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            Transform
          </motion.span>
          <br />Your Learning Journey?
        </motion.h2>
        
        <motion.p 
          className="text-xl md:text-2xl text-white/90 mb-12 max-w-3xl mx-auto leading-relaxed"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          Start learning the smarter way. Ask questions, discover answers, and build lasting knowledge with our AI tutor.
        </motion.p>
        
        {/* CTA Buttons */}
        <motion.div 
          className="flex gap-4 justify-center flex-wrap mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <Link href="/chat">
            <motion.div
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button 
                size="lg" 
                className="group relative bg-white text-primary hover:bg-white/90 px-12 py-8 text-xl font-black rounded-2xl shadow-2xl hover:shadow-white/50 transition-all duration-300 overflow-hidden"
              >
                <motion.span 
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/20 to-transparent"
                  animate={{
                    x: ['-100%', '100%'],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatDelay: 1,
                  }}
                />
                <span className="relative flex items-center gap-3">
                  <Sparkles className="w-6 h-6" />
                  Get Started Free
                  <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
                </span>
              </Button>
            </motion.div>
          </Link>
          
          <motion.div
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button 
              size="lg" 
              variant="outline"
              className="px-12 py-8 text-xl font-bold rounded-2xl border-2 border-white/40 bg-white/10 text-white hover:bg-white/20 backdrop-blur-xl transition-all duration-300"
            >
              Explore Features
            </Button>
          </motion.div>
        </motion.div>
        
        {/* Social Proof */}
        <motion.div 
          className="flex items-center justify-center gap-12 flex-wrap text-white/90"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <motion.div 
            className="flex items-center gap-2"
            whileHover={{ scale: 1.1 }}
          >
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.9 + i * 0.1 }}
                >
                  <Star className="w-6 h-6 text-yellow-300 fill-yellow-300" />
                </motion.div>
              ))}
            </div>
            <span className="ml-2 text-lg font-bold">4.9/5 rating</span>
          </motion.div>
          
          <motion.div 
            className="flex items-center gap-2"
            whileHover={{ scale: 1.1 }}
          >
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-3 h-3 bg-green-400 rounded-full"
            />
            <span className="text-lg font-bold">10K+ Active Students</span>
          </motion.div>
          
          <motion.div 
            className="flex items-center gap-2"
            whileHover={{ scale: 1.1 }}
          >
            <Zap className="w-6 h-6 text-yellow-300 fill-yellow-300" />
            <span className="text-lg font-bold">Available 24/7</span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
