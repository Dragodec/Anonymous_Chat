import React from 'react';

const HowItWorks = () => {
  const steps = [
    {
      step: '01',
      title: 'Generate Room',
      description: 'Click "Start Chat" to instantly spin up a secure, random room URL. Zero sign-ups or forms involved.'
    },
    {
      step: '02',
      title: 'Share Link',
      description: 'Send that specific generated URL securely to whoever you need to communicate with.'
    },
    {
      step: '03',
      title: 'Connect',
      description: 'Exchange real-time messages. Data is piped securely between clients without permanent disk caching.'
    },
    {
      step: '04',
      title: 'Destroy',
      description: 'Close your browser tab. The room vanishes forever with no trace left behind.'
    }
  ];

  return (
    <section id="how-it-works" className="py-24 bg-white/[0.01] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">How it operates</h2>
          <p className="text-lg text-slate-400 max-w-2xl">
            A frictionless, predictable workflow designed to get you communicating anonymously in seconds.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 sm:gap-8">
          {steps.map((item, idx) => (
            <div key={idx} className="relative group">
              <div className="text-6xl sm:text-7xl font-black text-slate-700/80 mb-6 group-hover:text-violet-500/40 transition-colors drop-shadow-sm">{item.step}</div>
              <h3 className="text-lg font-semibold text-white mb-3">{item.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{item.description}</p>
              
              {/* Connector line for large screens */}
              {idx !== steps.length - 1 && (
                <div className="hidden lg:block absolute top-[40px] left-[85%] w-[80%] h-[2px] bg-gradient-to-r from-slate-800 to-transparent pointer-events-none" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
