'use client';

import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Calendar, Menu, X, Compass } from 'lucide-react';
import { oceanAudio } from '@/utils/audio';
import { RESORT_DATA } from '@/data/resortData';

interface NavbarProps {
  onOpenReservation: () => void;
}

export default function Navbar({ onOpenReservation }: NavbarProps) {
  const [isMuted, setIsMuted] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [amalfiTime, setAmalfiTime] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);

    // Update Amalfi local time (CET / CEST)
    const updateTime = () => {
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Europe/Rome',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      };
      setAmalfiTime(new Intl.DateTimeFormat([], options).format(new Date()));
    };
    updateTime();
    const interval = setInterval(updateTime, 30000);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearInterval(interval);
    };
  }, []);

  const toggleSound = () => {
    if (!oceanAudio) return;
    const playing = oceanAudio.toggle();
    setIsMuted(!playing);
  };

  const navLinks = [
    { label: 'Sanctuary', href: '#setting' },
    { label: 'Water & Light', href: '#water' },
    { label: 'Suites', href: '#suites' },
    { label: 'Experiences', href: '#experiences' },
    { label: 'Contact', href: '#reserve' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
          scrolled
            ? 'bg-sandDark/85 backdrop-blur-md py-4 border-b border-limestone-200/10 shadow-2xl'
            : 'bg-gradient-to-b from-sandDark/70 via-sandDark/30 to-transparent py-7'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between">
          {/* Brand Logo */}
          <a
            href="#"
            className="group flex flex-col items-start transition-opacity duration-300 hover:opacity-80"
          >
            <span className="font-italiana text-3xl lg:text-4xl tracking-[0.25em] text-limestone-100 uppercase font-normal">
              AMARA
            </span>
            <span className="text-[9px] tracking-[0.3em] text-terracotta uppercase font-mono mt-0.5">
              Amalfi Coast • Italy
            </span>

          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-9 text-xs tracking-[0.2em] uppercase font-light text-limestone-200/80">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="transition-colors duration-300 hover:text-limestone-100 hover:underline underline-offset-8 decoration-terracotta/60"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right Action Bar */}
          <div className="flex items-center space-x-5">
            {/* Live Amalfi Time & Sea Temp */}
            <div className="hidden xl:flex items-center space-x-2 text-[11px] font-mono text-limestone-300/70 border-r border-limestone-200/15 pr-5">
              <Compass className="w-3.5 h-3.5 text-terracotta opacity-80" />
              <span>AMALFI {amalfiTime || '18:00'} • 24°C</span>
            </div>

            {/* Audio Wave Sound Toggle */}
            <button
              onClick={toggleSound}
              title={isMuted ? 'Listen to the Sound of Amalfi' : 'Mute Sea Waves'}
              className="flex items-center space-x-2 px-3 py-2 rounded-full border border-limestone-200/20 bg-sandDark/40 text-limestone-200 text-xs hover:border-terracotta/60 transition-all duration-300 group"
            >
              {isMuted ? (
                <>
                  <VolumeX className="w-3.5 h-3.5 text-limestone-400 group-hover:text-terracotta transition-colors" />
                  <span className="hidden sm:inline text-[11px] tracking-widest text-limestone-300/80">
                    SOUND: OFF
                  </span>
                </>
              ) : (
                <>
                  <Volume2 className="w-3.5 h-3.5 text-terracotta animate-pulse" />
                  <span className="hidden sm:inline text-[11px] tracking-widest text-terracotta font-medium">
                    SEA: ACTIVE
                  </span>
                  <span className="flex items-end space-x-0.5 h-3 ml-1">
                    <span className="w-0.5 bg-terracotta h-2 animate-bounce"></span>
                    <span className="w-0.5 bg-terracotta h-3 animate-bounce [animation-delay:0.15s]"></span>
                    <span className="w-0.5 bg-terracotta h-1.5 animate-bounce [animation-delay:0.3s]"></span>
                  </span>
                </>
              )}
            </button>

            {/* Reserve CTA Button */}
            <button
              onClick={onOpenReservation}
              className="group flex items-center space-x-2 px-5 py-2.5 rounded-full bg-terracotta/90 text-limestone-50 text-xs tracking-[0.18em] uppercase transition-all duration-500 hover:bg-terracotta hover:shadow-[0_0_20px_rgba(193,104,59,0.35)]"
            >
              <Calendar className="w-3.5 h-3.5 opacity-80 group-hover:scale-110 transition-transform" />
              <span className="font-medium">Reserve</span>
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-limestone-200 p-2"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-sandDark/95 backdrop-blur-xl flex flex-col justify-center items-center px-8 md:hidden">
          <nav className="flex flex-col items-center space-y-8 text-center">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="font-serif text-2xl text-limestone-100 tracking-widest hover:text-terracotta transition-colors"
              >
                {link.label}
              </a>
            ))}
            <div className="pt-6 border-t border-limestone-200/10 w-full">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenReservation();
                }}
                className="w-full py-4 rounded-full bg-terracotta text-limestone-50 text-xs tracking-[0.25em] uppercase font-medium"
              >
                Reserve Stay
              </button>
            </div>
          </nav>
        </div>
      )}
    </>
  );
}
