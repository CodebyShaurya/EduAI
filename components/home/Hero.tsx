'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles, Brain, Zap, TrendingUp, Star } from 'lucide-react';
import { motion } from 'framer-motion';

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Animated 3D-like Background */}
      <div className="absolute inset-0 -z-10">
        {/* Mesh gradient background */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/20 via-background to-background" />
        
        {/* Animated grid */}
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]" style={{
          maskImage: 'radial-gradient(ellipse at center, transparent 20%, black)',
          WebkitMaskImage: 'radial-gradient(ellipse at center, transparent 20%, black)',
        }} />
        
        {/* Floating 3D cards */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-64 h-64 rounded-3xl bg-gradient-to-br from-primary/10 to-secondary/10 backdrop-blur-3xl"
            style={{
              left: `${20 + i * 15}%`,
              top: `${10 + i * 15}%`,
            }}
            animate={{
              y: [0, -30, 0],
              rotate: [0, 5, 0],
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 5 + i,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.5,
            }}
          />
        ))}
      </div>

      {/* Particle effects */}
      <div className="absolute inset-0 -z-5 overflow-hidden pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-primary/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [-20, -100],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
        <div className="text-center max-w-5xl mx-auto">
          {/* Animated Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-primary/10 via-purple-500/10 to-secondary/10 border border-primary/20 mb-12 backdrop-blur-xl relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-purple-500/20 to-secondary/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
            <motion.span 
              className="relative flex h-3 w-3"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
            </motion.span>
            <span className="text-sm font-semibold bg-gradient-to-r from-primary via-purple-500 to-secondary bg-clip-text text-transparent relative">
              AI-Powered Socratic Learning Platform
            </span>
          </motion.div>
          
          {/* Main Heading with 3D effect */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-8"
          >
            <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tighter mb-6 relative">
              <motion.span 
                className="block text-foreground leading-none mb-4"
                style={{
                  textShadow: '0 0 40px rgba(59, 130, 246, 0.3)',
                }}
              >
                Think
              </motion.span>
              <motion.span 
                className="block leading-none relative"
                animate={{
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "linear",
                }}
                style={{
                  backgroundSize: '200% 200%',
                }}
              >
                <span className="bg-gradient-to-r from-primary via-purple-500 via-pink-500 to-secondary bg-clip-text text-transparent">
                  Deeper
                </span>
              </motion.span>
            </h1>
            <motion.div 
              className="flex items-center justify-center gap-3 text-xl md:text-2xl text-muted-foreground mt-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <Star className="w-6 h-6 text-yellow-500 fill-yellow-500" />
              <span>Learn Smarter, Not Harder</span>
              <Star className="w-6 h-6 text-yellow-500 fill-yellow-500" />
            </motion.div>
          </motion.div>
          
          {/* Description with glassmorphism */}
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-4xl mx-auto leading-relaxed relative"
          >
            Experience revolutionary AI tutoring with the <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Socratic method</span>. 
            Our intelligent system guides you through <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-secondary to-primary">discovery-based learning</span>.
          </motion.p>
          
          {/* Animated CTA Buttons */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex gap-4 justify-center flex-wrap mb-20"
          >
            <Link href="/chat">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button 
                  size="lg" 
                  className="group relative bg-gradient-to-r from-primary via-purple-600 to-secondary hover:shadow-2xl hover:shadow-primary/50 text-white px-12 py-8 text-xl font-bold rounded-2xl overflow-hidden transition-all duration-300"
                >
                  <motion.span 
                    className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/30 to-white/0"
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
                    Start Learning Free
                    <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
                  </span>
                </Button>
              </motion.div>
            </Link>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button 
                size="lg" 
                variant="outline" 
                className="px-12 py-8 text-xl font-bold rounded-2xl border-2 border-primary/30 hover:bg-primary/5 backdrop-blur-xl transition-all duration-300"
              >
                Explore Features
              </Button>
            </motion.div>
          </motion.div>
          
          {/* Animated Stats with 3D cards */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto"
          >
            {[
              { value: '10K+', label: 'Active Learners', icon: Brain, color: 'from-blue-500 to-cyan-500' },
              { value: '95%', label: 'Success Rate', icon: TrendingUp, color: 'from-green-500 to-emerald-500' },
              { value: '24/7', label: 'AI Available', icon: Zap, color: 'from-purple-500 to-pink-500' },
              { value: '∞', label: 'Topics', icon: Sparkles, color: 'from-orange-500 to-red-500' },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 + i * 0.1 }}
                whileHover={{ 
                  y: -10,
                  rotateY: 5,
                  rotateX: 5,
                }}
                className="relative group perspective-1000"
              >
                <div className="relative bg-card/30 backdrop-blur-2xl border border-border/50 rounded-3xl p-8 hover:border-primary/50 transition-all duration-500 overflow-hidden">
                  {/* Gradient overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
                  
                  {/* Icon */}
                  <motion.div 
                    className={`inline-flex p-3 rounded-2xl bg-gradient-to-br ${stat.color} mb-4`}
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <stat.icon className="w-6 h-6 text-white" />
                  </motion.div>
                  
                  {/* Value */}
                  <div className={`text-5xl font-black bg-gradient-to-br ${stat.color} bg-clip-text text-transparent mb-2`}>
                    {stat.value}
                  </div>
                  
                  {/* Label */}
                  <p className="text-sm text-muted-foreground font-medium">{stat.label}</p>
                  
                  {/* Shine effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                    animate={{
                      x: ['-100%', '100%'],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      repeatDelay: 2,
                      delay: i * 0.5,
                    }}
                  />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Bottom wave with animation */}
      <div className="absolute bottom-0 left-0 right-0 -z-10">
        <motion.svg 
          viewBox="0 0 1440 120" 
          className="w-full h-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.1 }}
          transition={{ duration: 1, delay: 1 }}
        >
          <motion.path 
            fill="currentColor" 
            className="text-primary"
            d="M0,64L48,69.3C96,75,192,85,288,80C384,75,480,53,576,48C672,43,768,53,864,64C960,75,1056,85,1152,80C1248,75,1344,53,1392,42.7L1440,32L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"
            animate={{
              d: [
                "M0,64L48,69.3C96,75,192,85,288,80C384,75,480,53,576,48C672,43,768,53,864,64C960,75,1056,85,1152,80C1248,75,1344,53,1392,42.7L1440,32L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z",
                "M0,32L48,42.7C96,53,192,75,288,80C384,85,480,75,576,69.3C672,64,768,64,864,69.3C960,75,1056,85,1152,85.3C1248,85,1344,75,1392,69.3L1440,64L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z",
                "M0,64L48,69.3C96,75,192,85,288,80C384,75,480,53,576,48C672,43,768,53,864,64C960,75,1056,85,1152,80C1248,75,1344,53,1392,42.7L1440,32L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z",
              ],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </motion.svg>
      </div>
    </section>
  );
}
