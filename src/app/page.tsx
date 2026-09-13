'use client';

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import WaterSection from '@/components/WaterSection';
import SettingSection from '@/components/SettingSection';
import SuitesSection from '@/components/SuitesSection';
import ExperienceSection from '@/components/ExperienceSection';
import ReserveSection from '@/components/ReserveSection';
import ReservationModal from '@/components/ReservationModal';

export default function Home() {
  const [reservationOpen, setReservationOpen] = useState(false);
  const [selectedSuiteForReservation, setSelectedSuiteForReservation] = useState<string | undefined>(undefined);

  const handleOpenReservation = (suiteName?: string) => {
    setSelectedSuiteForReservation(suiteName);
    setReservationOpen(true);
  };

  return (
    <main className="relative min-h-screen bg-sandDark text-limestone-100 selection:bg-terracotta selection:text-limestone-50 noise-overlay">
      {/* Fixed Navigation Header */}
      <Navbar onOpenReservation={() => handleOpenReservation()} />

      {/* Section 1: Hero */}
      <Hero onExploreClick={() => {
        const el = document.getElementById('water');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }} />

      {/* Section 2: The Water & Light Interactive R3F 3D Canvas */}
      <WaterSection />

      {/* Section 3: The Setting & Location Philosophy */}
      <SettingSection />

      {/* Section 4: The Suites Grid */}
      <SuitesSection onReserveSuite={(suiteName) => handleOpenReservation(suiteName)} />

      {/* Section 5: Table / Terrace / Experiences */}
      <ExperienceSection />

      {/* Section 6: Reserve & Contact */}
      <ReserveSection onOpenReservation={() => handleOpenReservation()} />

      {/* Interactive Reservation Inquiry Modal Dialog */}
      <ReservationModal
        isOpen={reservationOpen}
        onClose={() => setReservationOpen(false)}
        initialSuiteName={selectedSuiteForReservation}
      />
    </main>
  );
}
