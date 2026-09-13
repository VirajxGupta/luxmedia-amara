'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Compass, MapPin, Layers, Anchor } from 'lucide-react';
import { RESORT_DATA } from '@/data/resortData';

export default function SettingSection() {
  const easeSlow = [0.22, 1, 0.36, 1];

  return (
    <section id="setting" className="relative w-full py-20 md:py-44 bg-limestone-50 text-sandDark overflow-hidden">
      {/* Background Subtle Travertine Texture Overlay */}
      <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#2A241C_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10">

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20">
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 1.4, ease: easeSlow }}
            className="max-w-2xl"
          >
            <span className="text-xs font-mono tracking-[0.35em] text-terracotta uppercase block mb-3">
              02 / THE LOCATION & PHILOSOPHY
            </span>
            <h2 className="font-serif text-4xl sm:text-6xl text-sandDark font-extralight leading-tight">
              {RESORT_DATA.setting.title}
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 1.4, ease: easeSlow, delay: 0.2 }}
            className="mt-6 md:mt-0 flex items-center space-x-2 text-xs font-mono text-sandDark/60 uppercase tracking-widest"
          >
            <MapPin className="w-4 h-4 text-terracotta" />
            <span>RAVELLO CLIFFSIDE • 40.6340° N, 14.6027° E</span>
          </motion.div>
        </div>

        {/* Editorial Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Editorial Copy */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 1.6, ease: easeSlow }}
            className="lg:col-span-5 space-y-8"
          >
            <p className="font-serif italic text-2xl text-terracotta font-light leading-relaxed">
              "{RESORT_DATA.setting.subtitle}"
            </p>

            <div className="space-y-6 text-sandDark/80 font-sans text-base font-light leading-relaxed">
              {RESORT_DATA.setting.paragraphs.map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}
            </div>

            {/* Architectural Highlights */}
            <div className="pt-6 border-t border-sandDark/15 space-y-6">
              {RESORT_DATA.setting.highlights.map((item, idx) => (
                <div key={idx} className="flex items-start space-x-4">
                  <div className="w-8 h-8 rounded-full bg-terracotta/10 flex items-center justify-center text-terracotta shrink-0 mt-1">
                    {idx === 0 && <Layers className="w-4 h-4" />}
                    {idx === 1 && <Compass className="w-4 h-4" />}
                    {idx === 2 && <Anchor className="w-4 h-4" />}
                  </div>
                  <div>
                    <h4 className="font-serif text-lg font-normal text-sandDark">
                      {item.title}
                    </h4>
                    <p className="text-xs text-sandDark/65 font-sans font-light mt-0.5">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right Parallax Cliffside Image Frame */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 40 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 1.8, ease: easeSlow }}
            className="lg:col-span-7 relative group"
          >
            <div className="relative aspect-[4/3] rounded-sm overflow-hidden shadow-2xl bg-sandDark/10">
              <img
                src={RESORT_DATA.setting.image}
                alt="Amara Cliffside Resort Amalfi"
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-sandDark/60 via-transparent to-transparent opacity-80" />

              {/* Floating Image Badge */}
              <div className="absolute bottom-8 left-8 right-8 flex justify-between items-end text-limestone-100">
                <div>
                  <span className="text-[10px] font-mono tracking-[0.25em] text-terracotta uppercase block">
                    SANCTUARY ELEVATION
                  </span>
                  <span className="font-serif text-xl font-light">
                    300 Meters Above Tyrrhenian Sea
                  </span>
                </div>
                <span className="text-xs font-mono tracking-widest text-limestone-200/70 border border-limestone-100/20 px-3 py-1.5 rounded-full backdrop-blur-sm">
                  RAVELLO, ITALY
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
