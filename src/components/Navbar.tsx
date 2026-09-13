'use client';

import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Calendar, Menu, X, Compass } from 'lucide-react';
import { oceanAudio } from '@/utils/audio';

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
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);

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
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-sandDark/90 backdrop-blur-md py-3 sm:py-4 border-b border-limestone-200/10 shadow-2xl'
            : 'bg-gradient-to-b from-sandDark/80 via-sandDark/40 to-transparent py-4 sm:py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 flex items-center justify-between">
          {/* Brand Logo */}
          <a
            href="#"
            className="group flex flex-col items-start transition-opacity duration-300 hover:opacity-80 shrink-0"
          >
            <span className="font-italiana text-2xl sm:text-3xl lg:text-4xl tracking-[0.2em] sm:tracking-[0.25em] text-limestone-100 uppercase font-normal">
              AMARA
            </span>
            <span className="text-[8px] sm:text-[9px] tracking-[0.2em] sm:tracking-[0.3em] text-terracotta uppercase font-mono mt-0.5">
              Amalfi Coast • Italy
            </span>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-8 text-xs tracking-[0.2em] uppercase font-light text-limestone-200/80">
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
          <div className="flex items-center space-x-2 sm:space-x-4 shrink-0">
            {/* Live Amalfi Time */}
            <div className="hidden xl:flex items-center space-x-2 text-[11px] font-mono text-limestone-300/70 border-r border-limestone-200/15 pr-4">
              <Compass className="w-3.5 h-3.5 text-terracotta opacity-80" />
              <span>AMALFI {amalfiTime || '18:00'} • 24°C</span>
            </div>

            {/* Audio Wave Sound Toggle */}
            <button
              onClick={toggleSound}
              title={isMuted ? 'Listen to Sea Sound' : 'Mute Sound'}
              className="flex items-center space-x-1.5 px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-full border border-limestone-200/20 bg-sandDark/40 text-limestone-200 text-xs hover:border-terracotta/60 transition-all group"
            >
              {isMuted ? (
                <VolumeX className="w-3.5 h-3.5 text-limestone-400 group-hover:text-terracotta transition-colors" />
              ) : (
                <Volume2 className="w-3.5 h-3.5 text-terracotta animate-pulse" />
              )}
              <span className="hidden md:inline text-[11px] tracking-widest text-limestone-300/80">
                {isMuted ? 'SOUND' : 'SEA'}
              </span>
            </button>

            {/* Reserve CTA Button */}
            <button
              onClick={onOpenReservation}
              className="flex items-center space-x-1.5 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-terracotta text-limestone-50 text-[11px] sm:text-xs tracking-[0.15em] uppercase font-medium transition-all hover:bg-terracotta-light shadow-md shrink-0"
            >
              <Calendar className="w-3.5 h-3.5 opacity-90" />
              <span>Reserve</span>
            </button>

            {/* Mobile / Tablet Hamburger Menu Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden text-limestone-100 p-2 rounded-md hover:bg-sandDark-card text-terracotta transition-colors shrink-0 flex items-center justify-center border border-limestone-200/10 ml-1"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-sandDark/95 backdrop-blur-2xl flex flex-col justify-center items-center px-6 lg:hidden">
          <nav className="flex flex-col items-center space-y-7 text-center w-full max-w-sm">
            <span className="text-[10px] font-mono tracking-[0.3em] text-terracotta uppercase">
              AMARA SANCTUARY MENU
            </span>
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="font-italiana text-3xl text-limestone-100 tracking-widest hover:text-terracotta transition-colors"
              >
                {link.label}
              </a>
            ))}
            <div className="pt-6 border-t border-limestone-200/15 w-full">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenReservation();
                }}
                className="w-full py-3.5 rounded-full bg-terracotta text-limestone-50 text-xs tracking-[0.25em] uppercase font-medium shadow-lg"
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
