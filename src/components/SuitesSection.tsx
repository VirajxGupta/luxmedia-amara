'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Maximize2 } from 'lucide-react';
import { RESORT_DATA, Suite } from '@/data/resortData';
import SuiteModal from './SuiteModal';

interface SuitesSectionProps {
  onReserveSuite: (suiteName: string) => void;
}

export default function SuitesSection({ onReserveSuite }: SuitesSectionProps) {
  const [selectedSuite, setSelectedSuite] = useState<Suite | null>(null);

  const easeSlow = [0.22, 1, 0.36, 1];

  return (
    <section id="suites" className="relative w-full py-32 md:py-44 bg-sandDark text-limestone-100 overflow-hidden">
      {/* Background Dark Subtle Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-sandDark via-sandDark-card to-sandDark pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20">
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 1.4, ease: easeSlow }}
            className="max-w-xl"
          >
            <span className="text-xs font-mono tracking-[0.35em] text-terracotta uppercase block mb-3">
              03 / SANCTUARY SUITES
            </span>
            <h2 className="font-serif text-4xl sm:text-6xl text-limestone-100 font-extralight leading-tight">
              Twenty-Two Cliffside Havens
            </h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 1.4, ease: easeSlow, delay: 0.2 }}
            className="mt-6 md:mt-0 font-sans text-sm text-limestone-300/70 font-light max-w-md"
          >
            Each suite is individually oriented toward open water, offering private travertine terraces, unhurried privacy, and uninterrupted horizons.
          </motion.p>
        </div>

        {/* Spare Suite Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-14">
          {RESORT_DATA.suites.map((suite, idx) => (
            <motion.div
              key={suite.id}
              initial={{ opacity: 0, y: 45 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 1.6, ease: easeSlow, delay: idx * 0.15 }}
              onClick={() => setSelectedSuite(suite)}
              className="group cursor-pointer flex flex-col bg-sandDark-card border border-limestone-200/10 rounded-sm overflow-hidden hover:border-terracotta/40 transition-all duration-700 hover:shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
            >
              {/* Image Frame */}
              <div className="relative aspect-[16/10] overflow-hidden bg-sandDark">
                <img
                  src={suite.image}
                  alt={suite.name}
                  className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-sandDark-card via-transparent to-transparent opacity-80" />

                {/* Size Badge */}
                <div className="absolute top-4 left-4 bg-sandDark/70 backdrop-blur-md px-3 py-1.5 rounded-full text-[11px] font-mono text-limestone-200/80 border border-limestone-200/10 flex items-center space-x-1.5">
                  <Maximize2 className="w-3 h-3 text-terracotta" />
                  <span>{suite.size}</span>
                </div>

                {/* Expand Overlay Button */}
                <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-sandDark/70 backdrop-blur-md border border-limestone-200/20 text-limestone-200 group-hover:bg-terracotta group-hover:text-limestone-50 group-hover:border-terracotta flex items-center justify-center transition-all duration-500">
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>

              {/* Card Footer Content */}
              <div className="p-8 flex flex-col justify-between flex-grow space-y-4">
                <div>
                  <span className="text-[11px] font-mono tracking-widest text-terracotta uppercase block mb-1">
                    {suite.subtitle}
                  </span>
                  <h3 className="font-serif text-2xl sm:text-3xl text-limestone-100 font-light group-hover:text-terracotta transition-colors">
                    {suite.name}
                  </h3>
                </div>

                <p className="text-xs font-sans text-limestone-300/75 font-light leading-relaxed">
                  {suite.description}
                </p>

                <div className="pt-4 border-t border-limestone-200/10 flex items-center justify-between text-xs font-mono">
                  <span className="text-limestone-300/60 uppercase">{suite.view}</span>
                  <span className="text-terracotta font-medium tracking-wide group-hover:underline underline-offset-4">
                    Explore Details & Tariff →
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Suite Detail Modal */}
      <SuiteModal
        suite={selectedSuite}
        onClose={() => setSelectedSuite(null)}
        onReserveSuite={onReserveSuite}
      />
    </section>
  );
}
