import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Features from '../components/Features';
import HowItWorks from '../components/HowItWorks';
import Security from '../components/Security';
import Footer from '../components/Footer';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-slate-950 font-sans text-slate-200 flex flex-col selection:bg-violet-500/30">
      <Navbar />
      <main className="flex-1 w-full overflow-x-hidden">
        <Hero />
        <Features />
        <HowItWorks />
        <Security />
      </main>
      <Footer />
    </div>
  );
};


export default LandingPage;
