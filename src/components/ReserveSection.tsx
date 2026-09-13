'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Mail, Phone, ArrowUpRight, Compass, Heart } from 'lucide-react';
import { RESORT_DATA } from '@/data/resortData';

interface ReserveSectionProps {
  onOpenReservation: () => void;
}

export default function ReserveSection({ onOpenReservation }: ReserveSectionProps) {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const easeSlow = [0.22, 1, 0.36, 1];

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail) setSubscribed(true);
  };

  return (
    <section id="reserve" className="relative w-full py-20 md:py-48 bg-sandDark text-limestone-100 overflow-hidden border-t border-limestone-200/10">
      {/* Background Subtle Gradient & Water Shimmer Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-mediterranean-navy/30 via-sandDark to-sandDark pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10">

        {/* Main CTA Block */}
        <div className="text-center max-w-3xl mx-auto mb-24">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: easeSlow }}
            className="text-xs font-mono tracking-[0.35em] text-terracotta uppercase block mb-4"
          >
            05 / RESERVATIONS & DISAPPEARANCE
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.4, ease: easeSlow, delay: 0.2 }}
            className="font-serif text-5xl sm:text-7xl font-extralight text-limestone-100 mb-6 leading-tight"
          >
            Disappear for a week.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.4, ease: easeSlow, delay: 0.4 }}
            className="font-serif italic text-xl sm:text-2xl text-limestone-200/80 font-light mb-10"
          >
            "The site should feel like the first exhale of that trip."
          </motion.p>

          {/* Quiet Underline CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.4, ease: easeSlow, delay: 0.6 }}
          >
            <button
              onClick={onOpenReservation}
              className="group inline-flex items-center space-x-3 text-lg font-serif text-limestone-100 border-b border-terracotta pb-2 hover:border-limestone-100 transition-colors"
            >
              <span className="tracking-wide">Reserve your stay at Amara</span>
              <ArrowUpRight className="w-5 h-5 text-terracotta group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </button>
          </motion.div>
        </div>

        {/* Quiet Info Grid (Restrained Type System) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16 pt-16 border-t border-limestone-200/10 text-xs font-mono text-limestone-300/70">
          {/* Location & Coordinates */}
          <div className="space-y-3">
            <span className="text-[10px] tracking-[0.3em] text-terracotta uppercase block">
              LOCATION & COORDINATES
            </span>
            <p className="font-serif text-base font-light text-limestone-200">
              {RESORT_DATA.address}
            </p>
            <p className="text-limestone-300/50">
              {RESORT_DATA.coordinates}
            </p>
            <a
              href="https://maps.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block pt-1 underline underline-offset-4 text-terracotta hover:text-limestone-100 transition-colors"
            >
              Open Satellite Cartography →
            </a>
          </div>

          {/* Concierge & Direct Contact */}
          <div className="space-y-3">
            <span className="text-[10px] tracking-[0.3em] text-terracotta uppercase block">
              CONCIERGE & DIRECT LINE
            </span>
            <p className="font-serif text-base font-light text-limestone-200">
              {RESORT_DATA.contact.email}
            </p>
            <p className="text-limestone-300/50">
              {RESORT_DATA.contact.phone}
            </p>
            <p className="text-limestone-300/50">
              Helipad access & private sea taxi available upon request
            </p>
          </div>

          {/* Private Journal Dispatch */}
          <div className="space-y-3">
            <span className="text-[10px] tracking-[0.3em] text-terracotta uppercase block">
              THE AMALFI DISPATCH
            </span>
            <p className="font-sans text-xs text-limestone-300/70 font-light">
              Receive quarterly notes on seasonal wine harvests, olive oil pressing, and private ocean weather.
            </p>
            {!subscribed ? (
              <form onSubmit={handleSubscribe} className="flex items-center space-x-2 pt-1">
                <input
                  type="email"
                  placeholder="journal@domain.com"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  required
                  className="bg-sandDark-card border border-limestone-200/15 rounded-full px-4 py-2 text-xs text-limestone-100 focus:outline-none focus:border-terracotta w-full"
                />
                <button
                  type="submit"
                  className="px-4 py-2 rounded-full bg-terracotta text-limestone-50 text-[11px] uppercase font-medium hover:bg-terracotta-light shrink-0"
                >
                  Join
                </button>
              </form>
            ) : (
              <p className="text-terracotta font-serif italic text-sm">
                Thank you. You are subscribed to the Dispatch.
              </p>
            )}
          </div>
        </div>

        {/* Minimal Footer Line */}
        <div className="mt-20 pt-8 border-t border-limestone-200/10 flex flex-col sm:flex-row justify-between items-center text-[10px] font-mono text-limestone-300/40 uppercase space-y-4 sm:space-y-0">
          <span>© {new Date().getFullYear()} AMARA CLIFFSIDE RESORT • ALL RIGHTS RESERVED</span>
          <div className="flex items-center space-x-6">
            <a href="#" className="hover:text-limestone-200 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-limestone-200 transition-colors">Sanctuary Rules</a>
            <a href="#" className="hover:text-limestone-200 transition-colors">Capri Charter</a>
          </div>
        </div>
      </div>
    </section>
  );
}
