'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Utensils, Waves, Ship, CheckCircle2 } from 'lucide-react';
import { RESORT_DATA } from '@/data/resortData';

export default function ExperienceSection() {
  const [activeTab, setActiveTab] = useState(0);
  const currentExp = RESORT_DATA.experiences[activeTab];

  const easeSlow = [0.22, 1, 0.36, 1];

  return (
    <section id="experiences" className="relative w-full min-h-[900px] flex items-center bg-sandDark text-limestone-100 overflow-hidden py-24 md:py-36">
      {/* Background Full-Bleed Imagery with Smooth Crossfade */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentExp.id}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ duration: 1.4, ease: easeSlow }}
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${currentExp.image})` }}
          />
        </AnimatePresence>

        {/* Ambient Dark Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-sandDark via-sandDark/75 to-sandDark/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-sandDark via-transparent to-sandDark/60" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 w-full">
        <div className="max-w-2xl">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: easeSlow }}
            className="text-xs font-mono tracking-[0.35em] text-terracotta uppercase block mb-3"
          >
            04 / THE TERRACE & EXPERIENCE
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.4, ease: easeSlow }}
            className="font-serif text-4xl sm:text-6xl text-limestone-100 font-extralight mb-8 leading-tight"
          >
            Slow Hours Above the Water
          </motion.h2>

          {/* Experience Category Tabs */}
          <div className="flex flex-wrap gap-3 mb-10 border-b border-limestone-200/15 pb-6">
            {RESORT_DATA.experiences.map((exp, idx) => (
              <button
                key={exp.id}
                onClick={() => setActiveTab(idx)}
                className={`flex items-center space-x-2 px-5 py-2.5 rounded-full text-xs font-mono tracking-widest uppercase transition-all duration-500 ${
                  activeTab === idx
                    ? 'bg-terracotta text-limestone-50 shadow-lg shadow-terracotta/20'
                    : 'bg-sandDark/50 text-limestone-300/70 border border-limestone-200/10 hover:border-terracotta/40 hover:text-limestone-100'
                }`}
              >
                {idx === 0 && <Utensils className="w-3.5 h-3.5" />}
                {idx === 1 && <Waves className="w-3.5 h-3.5" />}
                {idx === 2 && <Ship className="w-3.5 h-3.5" />}
                <span>{exp.category}</span>
              </button>
            ))}
          </div>

          {/* Dynamic Tab Body */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentExp.id}
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.8, ease: easeSlow }}
              className="space-y-6"
            >
              <h3 className="font-serif text-3xl sm:text-4xl text-limestone-100 font-light">
                {currentExp.title}
              </h3>

              <p className="font-serif italic text-xl text-terracotta font-light">
                "{currentExp.quote}"
              </p>

              <p className="font-sans text-sm font-light text-limestone-200/90 leading-relaxed max-w-xl">
                {currentExp.description}
              </p>

              {/* Highlights */}
              <div className="pt-4 space-y-2.5">
                {currentExp.details.map((detail, dIdx) => (
                  <div key={dIdx} className="flex items-center space-x-3 text-xs font-sans text-limestone-300/80 font-light">
                    <CheckCircle2 className="w-3.5 h-3.5 text-terracotta shrink-0" />
                    <span>{detail}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
