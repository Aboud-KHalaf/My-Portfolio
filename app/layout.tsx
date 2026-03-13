import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css'; // Global styles

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

export const metadata: Metadata = {
  title: 'Aboud Khalaf | Flutter Developer & Mobile App Specialist',
  description: 'Portfolio of Aboud Khalaf, a top-tier Flutter Developer and Mobile App Specialist.',
};

import { FixedSocials } from '@/components/ui/fixed-socials';
import { FixedEmail } from '@/components/ui/fixed-email';
import { PageTransition } from '@/components/ui/page-transition';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} dark scroll-smooth`}>
      <body className="bg-[#020202] text-white antialiased selection:bg-indigo-500/30">
        {/* Universal Background Atmosphere */}
        <div className="fixed inset-0 z-[-1] opacity-50">
          <div className="absolute inset-0 bg-[#020202]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-20%,rgba(120,119,198,0.15),rgba(255,255,255,0))]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,rgba(63,94,251,0.05),rgba(252,70,107,0))]" />
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay" />
        </div>

        {/* Smooth transition overlays */}
        <div className="fixed inset-0 z-[-1] bg-black/20 pointer-events-none" />

        <FixedSocials />
        <FixedEmail />

        <PageTransition>
          {children}
        </PageTransition>
      </body>
    </html>
  );
}
