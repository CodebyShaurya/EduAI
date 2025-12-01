'use client';

import { Card } from '@/components/ui/card';
import { CheckCircle, X, Sparkles, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

const comparisons = [
  {
    feature: 'Learning Approach',
    eduai: 'Asks diagnostic questions, builds on your understanding',
    traditional: 'Provides direct answers immediately',
  },
  {
    feature: 'Knowledge Retention',
    eduai: 'Deep understanding through self-discovery',
    traditional: 'Surface-level comprehension',
  },
  {
    feature: 'Critical Thinking',
    eduai: 'Develops problem-solving skills',
    traditional: 'Minimal independent thinking',
  },
  {
    feature: 'Personalization',
    eduai: 'Adapts to your level with hints',
    traditional: 'One-size-fits-all responses',
  },
];

export function Comparison() {
  return (
    <section className="py-32 md:py-40 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/30 to-background -z-10" />
      
      <motion.div
        className="absolute top-40 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.3, 1],
          x: [0, 50, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.div 
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-secondary/10 to-primary/10 border border-secondary/20 mb-8 backdrop-blur-sm"
            whileHover={{ scale: 1.05 }}
          >
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            >
              <Zap className="w-4 h-4 text-secondary" />
            </motion.div>
            <span className="text-sm font-semibold bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent">
              Why We're Different
            </span>
          </motion.div>
          
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-black mb-8 text-foreground">
            <span className="block mb-2">EduAI vs</span>
            <motion.span 
              className="bg-gradient-to-r from-secondary via-purple-500 to-primary bg-clip-text text-transparent"
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
              Traditional AI
            </motion.span>
          </h2>
          
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
            See why the Socratic method outperforms traditional Q&A systems
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {comparisons.map((comparison, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="perspective-1000"
            >
              <Card className="h-full border-border/50 hover:border-primary/30 transition-all duration-500 overflow-hidden bg-card/50 backdrop-blur-xl">
                <div className="p-6">
                  {/* Feature Title */}
                  <motion.h3 
                    className="text-lg font-bold text-foreground mb-6 text-center"
                    whileHover={{ scale: 1.05 }}
                  >
                    {comparison.feature}
                  </motion.h3>
                  
                  {/* EduAI */}
                  <motion.div 
                    className="mb-4 p-4 rounded-xl bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/20 relative overflow-hidden group"
                    whileHover={{ scale: 1.05 }}
                  >
                    <motion.div 
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-green-500/10 to-transparent"
                      animate={{
                        x: ['-100%', '100%'],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        repeatDelay: 2,
                      }}
                    />
                    
                    <div className="flex items-start gap-2 relative z-10">
                      <motion.div
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.6 }}
                      >
                        <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-500 flex-shrink-0 mt-0.5" />
                      </motion.div>
                      <div>
                        <p className="text-xs font-bold text-green-600 dark:text-green-500 mb-1">EduAI</p>
                        <p className="text-sm text-foreground leading-relaxed">{comparison.eduai}</p>
                      </div>
                    </div>
                  </motion.div>
                  
                  {/* Traditional AI */}
                  <motion.div 
                    className="p-4 rounded-xl bg-gradient-to-br from-red-500/10 to-pink-500/10 border border-red-500/20 relative overflow-hidden"
                    whileHover={{ scale: 1.05 }}
                  >
                    <div className="flex items-start gap-2">
                      <motion.div
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.6 }}
                      >
                        <X className="h-5 w-5 text-red-600 dark:text-red-500 flex-shrink-0 mt-0.5" />
                      </motion.div>
                      <div>
                        <p className="text-xs font-bold text-red-600 dark:text-red-500 mb-1">Traditional</p>
                        <p className="text-sm text-muted-foreground leading-relaxed">{comparison.traditional}</p>
                      </div>
                    </div>
                  </motion.div>
                </div>
                
                {/* Accent line */}
                <motion.div 
                  className="h-1 bg-gradient-to-r from-primary via-purple-500 to-secondary"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                />
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <motion.div
            className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20 backdrop-blur-sm"
            animate={{
              boxShadow: [
                '0 0 20px rgba(59, 130, 246, 0.2)',
                '0 0 40px rgba(59, 130, 246, 0.4)',
                '0 0 20px rgba(59, 130, 246, 0.2)',
              ],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
            }}
          >
            <Sparkles className="w-5 h-5 text-primary" />
            <span className="text-sm font-semibold text-foreground">
              Experience the difference yourself
            </span>
            <Sparkles className="w-5 h-5 text-secondary" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
