import React from 'react';
import { Trash2, Link as LinkIcon, DoorOpen } from 'lucide-react';

const Features = () => {
  return (
    <section id="features" className="py-24 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">Built for absolute privacy.</h2>
          <p className="text-lg text-slate-400">
            Most modern chat applications require your phone number, email address, and sync your contacts. That makes them terrible for secure, ad-hoc conversations. QuickConnect solves this by removing identity from the equation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <div className="mb-6 bg-violet-600/10 w-12 h-12 rounded-xl flex items-center justify-center border border-violet-500/20">
              <Trash2 className="w-6 h-6 text-violet-400" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-3">Zero-State Infrastructure</h3>
            <p className="text-slate-400 leading-relaxed text-sm">
              We do not use persistent databases for messages. Your chat lives strictly in volatile RAM and is completely erased the moment the session times out or participants leave the room.
            </p>
          </div>
          
          <div>
            <div className="mb-6 bg-blue-600/10 w-12 h-12 rounded-xl flex items-center justify-center border border-blue-500/20">
              <LinkIcon className="w-6 h-6 text-blue-400" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-3">Disposable Links</h3>
            <p className="text-slate-400 leading-relaxed text-sm">
              No searching for usernames or sending friend requests. Generate a secure, randomized room link, share it via any channel, and start communicating immediately without friction.
            </p>
          </div>

          <div>
            <div className="mb-6 bg-emerald-600/10 w-12 h-12 rounded-xl flex items-center justify-center border border-emerald-500/20">
              <DoorOpen className="w-6 h-6 text-emerald-400" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-3">Leave Without a Trace</h3>
            <p className="text-slate-400 leading-relaxed text-sm">
              When you close the tab, your WebSocket drops, your temporary ID is revoked instantly, and the room state gets destroyed. There is no 'undelete' button or history sync.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
