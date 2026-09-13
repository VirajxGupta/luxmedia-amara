'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { RESORT_DATA } from '@/data/resortData';

interface HeroProps {
  onExploreClick?: () => void;
}

export default function Hero({ onExploreClick }: HeroProps) {
  const easeSlow = [0.22, 1, 0.36, 1];

  return (
    <section className="relative w-full h-screen min-h-[700px] flex items-center justify-center overflow-hidden bg-sandDark">
      {/* Background Aerial Drone Simulation / High-Res Visual Layer */}
      <div className="absolute inset-0 z-0 select-none">
        {/* Background Image Poster with Subtle Ambient Scale Animation */}
        <div
          className="absolute inset-0 bg-cover bg-center scale-105 animate-[float_16s_ease-in-out_infinite_alternate]"
          style={{
            backgroundImage: `url(${RESORT_DATA.heroVideoPoster})`,
            filter: 'brightness(0.75) contrast(1.05)',
          }}
        />

        {/* Ambient Dark Atmospheric Gradient & Light Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-sandDark via-sandDark/40 to-sandDark/70" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-sandDark/30 to-sandDark/80" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center flex flex-col items-center">
        {/* Sub-header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.6, ease: easeSlow, delay: 0.2 }}
          className="flex items-center space-x-3 mb-6"
        >
          <span className="w-8 h-[1px] bg-terracotta/70"></span>
          <span className="text-xs font-mono tracking-[0.35em] text-terracotta uppercase">
            RAVELLO • AMALFI COAST • ITALY
          </span>
          <span className="w-8 h-[1px] bg-terracotta/70"></span>
        </motion.div>

        {/* Resort Wordmark */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.8, ease: easeSlow, delay: 0.4 }}
          className="font-italiana text-7xl sm:text-9xl md:text-[11rem] text-limestone-100 font-normal tracking-[0.2em] uppercase select-none leading-none mb-6"
        >
          AMARA
        </motion.h1>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.8, ease: easeSlow, delay: 0.7 }}
          className="font-serif italic text-2xl sm:text-3xl md:text-4xl text-limestone-200/90 font-light max-w-3xl leading-relaxed tracking-wide mb-3"
        >
          {RESORT_DATA.tagline}
        </motion.p>


        {/* Minimal Editorial Quote */}
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2.0, ease: easeSlow, delay: 1.0 }}
          className="text-xs font-sans tracking-[0.25em] text-limestone-300/60 uppercase mt-4"
        >
          A sanctuary carved into the cliffside 300 meters above the Mediterranean
        </motion.span>
      </div>

      {/* Scroll Cue */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.8, ease: easeSlow, delay: 1.4 }}
        className="absolute bottom-10 z-10 flex flex-col items-center cursor-pointer group"
        onClick={() => {
          if (onExploreClick) onExploreClick();
          else {
            const el = document.getElementById('water');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }
        }}
      >
        <span className="text-[10px] font-mono tracking-[0.3em] text-limestone-300/60 uppercase group-hover:text-terracotta transition-colors mb-3">
          SCROLL TO EXHALE
        </span>
        <div className="w-5 h-8 rounded-full border border-limestone-200/20 flex justify-center pt-1.5 group-hover:border-terracotta/50 transition-colors">
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut' }}
            className="w-1 h-2 bg-terracotta rounded-full"
          />
        </div>
      </motion.div>
    </section>
  );
}
