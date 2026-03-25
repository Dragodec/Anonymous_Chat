import React from 'react';
import { MessageSquare } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="border-t border-white/5 bg-slate-950/50 pt-16 pb-8 mt-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2 opacity-80 hover:opacity-100 transition-opacity">
            <MessageSquare className="w-6 h-6 text-violet-500" />
            <span className="text-xl font-bold text-white">QuickConnect</span>
          </div>
          
          <div className="flex gap-6 text-sm text-slate-400">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <a href="#" className="hover:text-white transition-colors">Contact</a>
            <a href="#" className="hover:text-white transition-colors">GitHub</a>
          </div>
        </div>
        
        <div className="mt-12 text-center text-sm text-slate-600 border-t border-white/5 pt-8">
          &copy; {new Date().getFullYear()} QuickConnect. Designed for absolute privacy.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
