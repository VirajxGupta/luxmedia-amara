'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import dynamic from 'next/dynamic';
import { Sun, Sunset, Moon, Sparkles } from 'lucide-react';

const AmaraWaterCanvas = dynamic(() => import('./canvas/AmaraWaterCanvas'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-sandDark text-limestone-200/50 text-xs font-mono tracking-widest uppercase">
      Loading Horizon...
    </div>
  ),
});

export default function WaterSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeProgress, setActiveProgress] = useState(0.05);
  const [isManual, setIsManual] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (isManual || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const totalScrollable = rect.height - windowHeight;

      if (totalScrollable > 0) {
        // Compute exact progress between 0.0 and 1.0 inside this section
        const currentScroll = -rect.top;
        const progress = Math.min(Math.max(currentScroll / totalScrollable, 0), 1);
        setActiveProgress(progress);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial position check

    return () => window.removeEventListener('scroll', handleScroll);
  }, [isManual]);

  const easeSlow = [0.22, 1, 0.36, 1];

  const timePresets = [
    {
      time: '12:00 PM',
      label: 'Midday Solstice',
      val: 0.05,
      icon: Sun,
      quote: 'Sunbeams cast gold across the cliff face.',
    },
    {
      time: '05:30 PM',
      label: 'Amalfi Sunset',
      val: 0.5,
      icon: Sunset,
      quote: 'The Mediterranean turns to liquid copper.',
    },
    {
      time: '09:00 PM',
      label: 'Tyrrhenian Dusk',
      val: 0.95,
      icon: Moon,
      quote: 'Quiet midnight indigo under Capri stars.',
    },
  ];

  const currentPreset =
    activeProgress < 0.35
      ? timePresets[0]
      : activeProgress < 0.7
      ? timePresets[1]
      : timePresets[2];

  return (
    <section
      id="water"
      ref={containerRef}
      className="relative w-full h-[200vh] bg-sandDark text-limestone-100"
    >
      {/* Sticky Viewport Frame - 100% Guaranteed Animating 3D View */}
      <div className="sticky top-0 w-full h-screen overflow-hidden flex flex-col justify-between p-6 sm:p-10 lg:p-12">
        {/* Fullscreen 3D Canvas Background */}
        <div className="absolute inset-0 z-0">
          <AmaraWaterCanvas scrollProgress={activeProgress} />
          {/* Subtle Edge Gradients */}
          <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-sandDark/80 to-transparent pointer-events-none" />
          <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-sandDark/90 to-transparent pointer-events-none" />
        </div>

        {/* Top Header */}
        <div className="relative z-10 max-w-7xl mx-auto w-full flex justify-between items-start pointer-events-none">
          <div className="space-y-1">
            <span className="text-[10px] font-mono tracking-[0.35em] text-terracotta uppercase block">
              01 / THE ELEMENT & LIGHT
            </span>
            <h2 className="font-serif italic text-xl sm:text-2xl text-limestone-100/90 font-light">
              Water & Coastal Shift
            </h2>
          </div>

          <div className="hidden sm:flex items-center space-x-2 text-[10px] font-mono text-limestone-300/60 uppercase tracking-widest bg-sandDark/40 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-limestone-200/10 pointer-events-auto">
            <Sparkles className="w-3 h-3 text-terracotta" />
            <span>Continuous 60FPS Waves</span>
          </div>
        </div>

        {/* Bottom Unobtrusive Sub-Bar */}
        <div className="relative z-10 max-w-7xl mx-auto w-full flex flex-col sm:flex-row items-end sm:items-center justify-between gap-6 pointer-events-auto">
          {/* Synchronized 1-Line Quote */}
          <div className="max-w-md">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentPreset.time}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.4, ease: easeSlow }}
                className="space-y-1"
              >
                <div className="flex items-center space-x-2 text-[10px] font-mono text-terracotta uppercase tracking-widest">
                  <currentPreset.icon className="w-3 h-3" />
                  <span>{currentPreset.time} • {currentPreset.label}</span>
                </div>
                <p className="font-serif italic text-lg sm:text-xl text-limestone-100/95 font-light leading-snug drop-shadow-md">
                  "{currentPreset.quote}"
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Sleek Daylight Controls */}
          <div className="flex items-center space-x-1.5 bg-sandDark/75 backdrop-blur-md p-1.5 rounded-full border border-limestone-200/15 shadow-2xl">
            {timePresets.map((preset) => {
              const IconComp = preset.icon;
              const isSelected = isManual
                ? Math.abs(activeProgress - preset.val) < 0.15
                : currentPreset.time === preset.time;

              return (
                <button
                  key={preset.time}
                  onClick={() => {
                    setIsManual(true);
                    setActiveProgress(preset.val);
                  }}
                  className={`flex items-center space-x-2 px-3.5 py-1.5 rounded-full text-xs font-mono transition-all duration-300 ${
                    isSelected
                      ? 'bg-terracotta text-limestone-50 shadow-md'
                      : 'text-limestone-300/70 hover:text-limestone-100 hover:bg-limestone-200/5'
                  }`}
                >
                  <IconComp className="w-3.5 h-3.5" />
                  <span className="hidden md:inline">{preset.time}</span>
                </button>
              );
            })}

            {isManual && (
              <button
                onClick={() => setIsManual(false)}
                className="text-[10px] font-mono text-limestone-300/60 hover:text-terracotta underline uppercase px-2"
              >
                Sync
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
