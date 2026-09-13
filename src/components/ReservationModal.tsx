'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, CheckCircle2, User, Mail, Phone, Sparkles } from 'lucide-react';
import { RESORT_DATA } from '@/data/resortData';

interface ReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialSuiteName?: string;
}

export default function ReservationModal({ isOpen, onClose, initialSuiteName }: ReservationModalProps) {
  const [selectedSuite, setSelectedSuite] = useState(initialSuiteName || RESORT_DATA.suites[0].name);
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState('2 Guests');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [specialNotes, setSpecialNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const resetAndClose = () => {
    setSubmitted(false);
    onClose();
  };

  const easeSlow = [0.22, 1, 0.36, 1];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={resetAndClose}
          className="absolute inset-0 bg-sandDark/85 backdrop-blur-md"
        />

        {/* Dialog Window */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 30, scale: 0.98 }}
          transition={{ duration: 0.6, ease: easeSlow }}
          className="relative z-10 w-full max-w-2xl bg-sandDark border border-limestone-200/15 rounded-sm p-8 sm:p-12 text-limestone-100 shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto"
        >
          {/* Close button */}
          <button
            onClick={resetAndClose}
            className="absolute top-5 right-5 w-9 h-9 rounded-full bg-sandDark/60 border border-limestone-200/20 text-limestone-300 hover:text-terracotta flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {!submitted ? (
            <div>
              <span className="text-xs font-mono tracking-[0.3em] text-terracotta uppercase block mb-1">
                PRIVATE RESERVATION INQUIRY
              </span>
              <h3 className="font-serif text-3xl sm:text-4xl text-limestone-100 font-light mb-3">
                Begin Your Exhale
              </h3>
              <p className="text-xs font-sans text-limestone-300/70 font-light mb-8">
                Our concierge team responds within two hours to confirm availability and personalize your cliffside stay.
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Suite Selection */}
                <div>
                  <label className="text-[11px] font-mono text-limestone-300/70 uppercase tracking-widest block mb-2">
                    Select Suite Sanctuary
                  </label>
                  <select
                    value={selectedSuite}
                    onChange={(e) => setSelectedSuite(e.target.value)}
                    className="w-full bg-sandDark-card border border-limestone-200/15 rounded-sm px-4 py-3 text-xs text-limestone-100 font-sans focus:outline-none focus:border-terracotta"
                  >
                    {RESORT_DATA.suites.map((s) => (
                      <option key={s.id} value={s.name} className="bg-sandDark text-limestone-100">
                        {s.name} — ({s.priceTag})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Dates & Headcount */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="text-[11px] font-mono text-limestone-300/70 uppercase tracking-widest block mb-2">
                      Arrival Date
                    </label>
                    <input
                      type="date"
                      value={checkIn}
                      onChange={(e) => setCheckIn(e.target.value)}
                      required
                      className="w-full bg-sandDark-card border border-limestone-200/15 rounded-sm px-4 py-2.5 text-xs text-limestone-100 font-sans focus:outline-none focus:border-terracotta"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-mono text-limestone-300/70 uppercase tracking-widest block mb-2">
                      Departure Date
                    </label>
                    <input
                      type="date"
                      value={checkOut}
                      onChange={(e) => setCheckOut(e.target.value)}
                      required
                      className="w-full bg-sandDark-card border border-limestone-200/15 rounded-sm px-4 py-2.5 text-xs text-limestone-100 font-sans focus:outline-none focus:border-terracotta"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-mono text-limestone-300/70 uppercase tracking-widest block mb-2">
                      Guests
                    </label>
                    <select
                      value={guests}
                      onChange={(e) => setGuests(e.target.value)}
                      className="w-full bg-sandDark-card border border-limestone-200/15 rounded-sm px-4 py-2.5 text-xs text-limestone-100 font-sans focus:outline-none focus:border-terracotta"
                    >
                      <option value="1 Guest">1 Guest</option>
                      <option value="2 Guests">2 Guests</option>
                      <option value="3 Guests">3 Guests</option>
                      <option value="4 Guests">4 Guests</option>
                    </select>
                  </div>
                </div>

                {/* Contact Information */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[11px] font-mono text-limestone-300/70 uppercase tracking-widest block mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      placeholder="Lord / Lady / Mr. / Ms."
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      className="w-full bg-sandDark-card border border-limestone-200/15 rounded-sm px-4 py-2.5 text-xs text-limestone-100 font-sans focus:outline-none focus:border-terracotta placeholder:text-limestone-300/30"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-mono text-limestone-300/70 uppercase tracking-widest block mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      placeholder="sanctuary@domain.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full bg-sandDark-card border border-limestone-200/15 rounded-sm px-4 py-2.5 text-xs text-limestone-100 font-sans focus:outline-none focus:border-terracotta placeholder:text-limestone-300/30"
                    />
                  </div>
                </div>

                {/* Special Requests */}
                <div>
                  <label className="text-[11px] font-mono text-limestone-300/70 uppercase tracking-widest block mb-2">
                    Special Concierge Requests & Preferences
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Dietary requirements, heli transfer request, private Riva charter notes..."
                    value={specialNotes}
                    onChange={(e) => setSpecialNotes(e.target.value)}
                    className="w-full bg-sandDark-card border border-limestone-200/15 rounded-sm px-4 py-2.5 text-xs text-limestone-100 font-sans focus:outline-none focus:border-terracotta placeholder:text-limestone-300/30 resize-none"
                  />
                </div>

                {/* Submit Action */}
                <div className="pt-4 flex items-center justify-between">
                  <span className="text-[11px] font-mono text-limestone-300/50 uppercase">
                    No immediate charge required
                  </span>
                  <button
                    type="submit"
                    className="px-8 py-3.5 rounded-full bg-terracotta text-limestone-50 text-xs tracking-[0.2em] uppercase font-medium hover:bg-terracotta-light transition-all shadow-lg shadow-terracotta/20"
                  >
                    Submit Stay Inquiry
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <div className="text-center py-12 space-y-6">
              <div className="w-16 h-16 rounded-full bg-terracotta/15 border border-terracotta text-terracotta flex items-center justify-center mx-auto animate-pulse">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="font-serif text-4xl text-limestone-100 font-light">
                Inquiry Transmitted
              </h3>
              <p className="font-serif italic text-lg text-terracotta font-light">
                "We look forward to welcoming you to the cliff face."
              </p>
              <p className="text-xs font-sans text-limestone-300/70 font-light max-w-md mx-auto leading-relaxed">
                Confirmation details for your inquiry for <strong className="text-limestone-100">{selectedSuite}</strong> have been sent to <strong className="text-limestone-100">{email}</strong>. Reference ID: <span className="font-mono text-terracotta">AMARA-{Math.floor(100000 + Math.random() * 900000)}</span>.
              </p>
              <button
                onClick={resetAndClose}
                className="mt-6 px-8 py-3 rounded-full border border-limestone-200/20 text-xs tracking-[0.2em] uppercase text-limestone-200 hover:border-terracotta transition-colors"
              >
                Return to Sanctuary
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
