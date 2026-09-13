'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, Calendar, Maximize2, Eye, Sparkles } from 'lucide-react';
import { Suite } from '@/data/resortData';

interface SuiteModalProps {
  suite: Suite | null;
  onClose: () => void;
  onReserveSuite: (suiteName: string) => void;
}

export default function SuiteModal({ suite, onClose, onReserveSuite }: SuiteModalProps) {
  if (!suite) return null;

  const easeSlow = [0.22, 1, 0.36, 1];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-sandDark/85 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 30, scale: 0.98 }}
          transition={{ duration: 0.6, ease: easeSlow }}
          className="relative z-10 w-full max-w-4xl bg-sandDark border border-limestone-200/15 rounded-sm overflow-hidden shadow-2xl text-limestone-100 max-h-[90vh] flex flex-col md:flex-row"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-sandDark/60 backdrop-blur-md border border-limestone-200/20 text-limestone-200 hover:text-terracotta hover:border-terracotta/50 flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Left Hero Image */}
          <div className="md:w-1/2 relative min-h-[300px] md:min-h-[500px]">
            <img
              src={suite.image}
              alt={suite.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-sandDark via-transparent to-transparent md:hidden" />
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs font-mono text-limestone-200/80 bg-sandDark/60 backdrop-blur-md px-3 py-2 rounded-sm border border-limestone-200/10">
              <span className="flex items-center space-x-1.5">
                <Maximize2 className="w-3.5 h-3.5 text-terracotta" />
                <span>{suite.size}</span>
              </span>
              <span className="flex items-center space-x-1.5">
                <Eye className="w-3.5 h-3.5 text-terracotta" />
                <span>{suite.view}</span>
              </span>
            </div>
          </div>

          {/* Right Details Content */}
          <div className="md:w-1/2 p-6 sm:p-8 md:p-10 overflow-y-auto flex flex-col justify-between space-y-6">
            <div>
              <span className="text-xs font-mono tracking-[0.3em] text-terracotta uppercase block mb-1">
                SUITE SANCTUARY
              </span>
              <h3 className="font-serif text-3xl sm:text-4xl text-limestone-100 font-light mb-2">
                {suite.name}
              </h3>
              <p className="text-xs font-mono tracking-widest text-limestone-300/70 uppercase mb-6">
                {suite.subtitle}
              </p>

              <p className="text-sm font-sans font-light text-limestone-200/90 leading-relaxed mb-6">
                {suite.fullDetails}
              </p>

              {/* Suite Amenities */}
              <div className="space-y-3 pt-4 border-t border-limestone-200/10">
                <h4 className="text-xs font-mono tracking-[0.2em] text-terracotta uppercase">
                  Bespoke Amenities & Services
                </h4>
                <ul className="space-y-2.5">
                  {suite.features.map((feat, idx) => (
                    <li key={idx} className="flex items-start space-x-2.5 text-xs text-limestone-200/80 font-sans font-light">
                      <Check className="w-3.5 h-3.5 text-terracotta shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Bottom Pricing & CTA */}
            <div className="pt-6 border-t border-limestone-200/15 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono tracking-widest text-limestone-300/60 uppercase block">
                  Tariff Rate
                </span>
                <span className="font-serif text-xl text-limestone-100">
                  {suite.priceTag}
                </span>
              </div>

              <button
                onClick={() => {
                  onClose();
                  onReserveSuite(suite.name);
                }}
                className="flex items-center space-x-2 px-6 py-3 rounded-full bg-terracotta text-limestone-50 text-xs tracking-[0.2em] uppercase font-medium hover:bg-terracotta-light transition-colors"
              >
                <Calendar className="w-4 h-4" />
                <span>Reserve Suite</span>
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
