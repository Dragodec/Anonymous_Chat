import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MessageSquare, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from './Button';
import { generateRoomId } from '../utils/helpers';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const isDevTunnel = localStorage.getItem('use_dev_tunnel') === 'true';
  const toggleDevTunnel = () => {
    localStorage.setItem('use_dev_tunnel', !isDevTunnel);
    window.location.reload();
  };

  const handleStartChat = () => {
    setIsOpen(false);
    navigate(`/room/${generateRoomId()}`);
  };

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const navLinks = [
    { name: 'Features', href: '#features' },
    { name: 'How it Works', href: '#how-it-works' },
    { name: 'Security', href: '#security' },
  ];

  return (
    <>
      <nav className="fixed w-full z-40 top-0 left-0 border-b border-white/5 bg-slate-950/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <Link to="/" className="flex items-center gap-2 group z-50">
              <div className="bg-violet-600/20 p-2 rounded-xl group-hover:bg-violet-600/30 transition-colors">
                <MessageSquare className="w-6 h-6 text-violet-500" />
              </div>
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
                QuickConnect
              </span>
            </Link>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
              {navLinks.map((link) => (
                <a key={link.name} href={link.href} className="hover:text-white transition-colors">
                  {link.name}
                </a>
              ))}
            </div>

            <div className="hidden md:flex items-center gap-4">
              <button 
                onClick={toggleDevTunnel}
                className="px-3 py-1.5 text-xs font-mono rounded-md border border-yellow-500/30 text-yellow-500 hover:bg-yellow-500/10 transition-colors"
                title="DEV: Swap Backend Route"
              >
                {isDevTunnel ? 'ENV: TUNNEL' : 'ENV: LOCAL'}
              </button>
              <Button onClick={handleStartChat} className="px-6 py-2 shadow-[0_0_15px_rgba(124,58,237,0.3)]">
                Start Chat
              </Button>
            </div>

            {/* Mobile Hamburger Toggle */}
            <button 
              className="md:hidden p-2 text-slate-300 hover:text-white z-50 relative"
              onClick={() => setIsOpen(true)}
              aria-label="Open Menu"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay - Full Screen (Moved OUTSIDE the nav to escape CSS stacking context constraints) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ y: '-100%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: '-100%', opacity: 0 }}
            transition={{ type: 'spring', damping: 30, stiffness: 250 }}
            className="fixed inset-0 z-[100] bg-slate-950 flex flex-col items-center justify-center md:hidden"
          >
            <button 
              className="absolute top-6 right-6 p-3 text-slate-400 hover:text-white bg-white/5 hover:bg-white/10 rounded-full transition-colors z-[110]"
              onClick={() => setIsOpen(false)}
              aria-label="Close Menu"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="flex flex-col items-center justify-center space-y-10 w-full relative z-10">
              <div className="flex flex-col items-center space-y-8">
                {navLinks.map((link) => (
                  <a 
                    key={link.name} 
                    href={link.href} 
                    onClick={() => setIsOpen(false)}
                    className="text-4xl font-extrabold text-slate-300 hover:text-white transition-colors tracking-tight"
                  >
                    {link.name}
                  </a>
                ))}
              </div>
              
              <div className="flex flex-col gap-4 pt-8 w-full max-w-[220px]">
                <button 
                  onClick={toggleDevTunnel}
                  className="w-full py-2 text-xs font-mono rounded-md border border-yellow-500/30 text-yellow-500 hover:bg-yellow-500/10 transition-colors mb-2"
                >
                  {isDevTunnel ? 'ENV: TUNNEL' : 'ENV: LOCAL'}
                </button>
                <Button className="w-full py-4 text-lg shadow-[0_0_20px_rgba(124,58,237,0.3)]" onClick={handleStartChat}>
                  Start Chat
                </Button>
              </div>
            </div>
            
            {/* Background decoration */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-violet-600/10 rounded-full blur-[80px] pointer-events-none" />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
