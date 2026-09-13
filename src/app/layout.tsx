import type { Metadata } from 'next';
import { Playfair_Display, Italiana, Outfit } from 'next/font/google';
import './globals.css';

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  style: ['normal', 'italic'],
  variable: '--font-serif-display',
  display: 'swap',
});

const italiana = Italiana({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-serif-italiana',
  display: 'swap',
});

const outfit = Outfit({
  subsets: ['latin'],
  weight: ['200', '300', '400', '500', '600'],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'AMARA — Cliffside Resort, Amalfi Coast',
  description:
    'A sanctuary carved into the cliffside 300 meters above the Mediterranean. Twenty-two suites suspended between stone and sea.',
  keywords: ['Amalfi Coast Resort', 'Ravello Luxury Hotel', 'Cliffside Resort', 'Amara Amalfi'],
  openGraph: {
    title: 'AMARA — Cliffside Resort, Amalfi Coast',
    description: 'Twenty-two suites suspended between stone and sea.',
    url: 'https://amara-resort.it',
    siteName: 'AMARA Resort',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1200&q=85',
        width: 1200,
        height: 630,
        alt: 'Amara Cliffside Resort Amalfi Coast',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${italiana.variable} ${outfit.variable} scroll-smooth`}
    >
      <body className="bg-sandDark text-limestone-100 font-sans antialiased selection:bg-terracotta selection:text-limestone-50">
        {children}
      </body>
    </html>
  );
}
