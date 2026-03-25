import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Server, ShieldCheck, EyeOff } from 'lucide-react';
import Button from './Button';
import { generateRoomId } from '../utils/helpers';

const Security = () => {
  const navigate = useNavigate();

  const handleStartChat = () => {
    navigate(`/room/${generateRoomId()}`);
  };
  return (
    <section id="security" className="py-24 border-t border-white/5 relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute right-0 bottom-0 w-[600px] h-[600px] bg-emerald-600/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">Verification without identification.</h2>
            <p className="text-lg text-slate-400 mb-10 leading-relaxed">
              We leverage a simple in-memory RAM cache for our real-time broker. By design, this architecture physically prevents us from offering chat-history features, because the backend lacks the logic to commit data to a permanent drive.
            </p>
            
            <ul className="space-y-8">
              <li className="flex gap-4">
                <div className="mt-1">
                  <Server className="w-5 h-5 text-emerald-500" />
                </div>
                <div>
                  <strong className="block text-white mb-1">Volatile Memory Only</strong>
                  <span className="text-slate-400 text-sm leading-relaxed block">All incoming payloads exist only in RAM. A server reboot directly wipes the entire global chat state immediately.</span>
                </div>
              </li>
              <li className="flex gap-4">
                <div className="mt-1">
                  <EyeOff className="w-5 h-5 text-emerald-500" />
                </div>
                <div>
                  <strong className="block text-white mb-1">No IP Tracing</strong>
                  <span className="text-slate-400 text-sm leading-relaxed block">Our application logic intentionally strips IP addresses and headers before any temporary session variable is established.</span>
                </div>
              </li>
              <li className="flex gap-4">
                <div className="mt-1">
                  <ShieldCheck className="w-5 h-5 text-emerald-500" />
                </div>
                <div>
                  <strong className="block text-white mb-1">Native Ephemerality</strong>
                  <span className="text-slate-400 text-sm leading-relaxed block">While we implement standard Transport Layer Security, our core safeguard is the automatic destruction of data out-of-the-box.</span>
                </div>
              </li>
            </ul>

            <div className="mt-16 pt-8 sm:mt-20 border-t border-white/5">
              <Button onClick={handleStartChat} className="w-full sm:w-auto px-8 py-4 text-lg">Initiate Secure Link</Button>
            </div>
          </div>

          {/* Technical mock interface */}
          <div className="bg-[#0f1117]/80 backdrop-blur-md border border-white/10 rounded-2xl p-6 font-mono text-sm overflow-hidden shadow-2xl relative">
            <div className="absolute top-0 right-0 p-4 text-xs text-slate-600 font-sans tracking-widest hidden sm:block">SERVER ARCHITECTURE</div>
            <div className="flex gap-2 mb-6">
              <div className="w-3 h-3 rounded-full bg-red-500/30 border border-red-500/50"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500/30 border border-yellow-500/50"></div>
              <div className="w-3 h-3 rounded-full bg-green-500/30 border border-green-500/50"></div>
            </div>
            <div className="text-slate-300">
              <p><span className="text-violet-400">const</span> <span className="text-blue-300">RoomManager</span> = {'{'}</p>
              <p className="ml-4"><span className="text-yellow-200">cleanup</span>: <span className="text-violet-400">async</span> (<span className="text-orange-300">roomId</span>) <span className="text-violet-400">=&gt;</span> {'{'}</p>
              <p className="ml-8 text-slate-500 mt-2">// Physically purge from RAM cache</p>
              <p className="ml-8"><span className="text-violet-400">delete</span> cache[<span className="text-orange-300">{"`${roomId}`"}</span>];</p>
              <p className="ml-8 mt-4 text-slate-500">// Terminate active client connections</p>
              <p className="ml-8">sockets.<span className="text-blue-200">in</span>(roomId).<span className="text-blue-200">disconnectSockets</span>();</p>
              <p className="ml-4 mt-2">{'}'}</p>
              <p>{'}'};</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Security;
