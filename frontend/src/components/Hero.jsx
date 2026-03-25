import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Shield, Zap, Users } from 'lucide-react';
import Button from './Button';
import { generateRoomId } from '../utils/helpers';

const Hero = () => {
  const navigate = useNavigate();

  const handleStartChat = () => {
    navigate(`/room/${generateRoomId()}`);
  };
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center pt-32 md:pt-40 pb-20 overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-violet-600/10 sm:bg-violet-600/20 rounded-full blur-[100px] sm:blur-[120px] pointer-events-none" />
      <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] bg-blue-600/10 sm:bg-blue-600/20 rounded-full blur-[80px] sm:blur-[100px] pointer-events-none" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mt-20">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm text-sm text-slate-300 mb-8 animate-fade-in-up">
          <Shield className="w-4 h-4 text-emerald-400" />
          <span>100% Anonymous. Zero data stored.</span>
        </div>
        
        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tight mb-8">
          <span className="block text-white mb-2">Connect Instantly.</span>
          <span className="block bg-clip-text text-transparent bg-gradient-to-r from-violet-400 to-fuchsia-400 pb-2">
            Speak Freely.
          </span>
        </h1>
        
        <p className="mt-4 max-w-2xl mx-auto text-lg sm:text-xl text-slate-400 mb-10 px-4">
          Drop into secure, temporary chat rooms. No accounts. No logs. 
          Just instant connection that vanishes when you leave.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 px-4">
          <Button onClick={handleStartChat} className="w-full sm:w-auto text-lg px-8 py-4 group">
            Start 1-on-1 Anonymizing
            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>

        <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto text-left border-t border-white/5 pt-16 px-4">
          <div className="flex flex-col items-center md:items-start group">
            <div className="bg-white/5 p-4 rounded-2xl mb-5 group-hover:bg-white/10 transition-colors border border-white/5">
              <Zap className="w-6 h-6 text-yellow-400" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Lightning Fast</h3>
            <p className="text-slate-400 text-base md:text-left text-center">Powered by secure RAM cache & WebSockets for instant message delivery without lag.</p>
          </div>
          <div className="flex flex-col items-center md:items-start group">
            <div className="bg-white/5 p-4 rounded-2xl mb-5 group-hover:bg-white/10 transition-colors border border-white/5">
              <Shield className="w-6 h-6 text-emerald-400" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Self-Destructing</h3>
            <p className="text-slate-400 text-base md:text-left text-center">The moment the session ends, all messages and IDs are wiped forever.</p>
          </div>
          <div className="flex flex-col items-center md:items-start group">
            <div className="bg-white/5 p-4 rounded-2xl mb-5 group-hover:bg-white/10 transition-colors border border-white/5">
              <Users className="w-6 h-6 text-blue-400" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">1-on-1 Focused</h3>
            <p className="text-slate-400 text-base md:text-left text-center">Share a unique, temporary link to invite a peer to an isolated private room.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
