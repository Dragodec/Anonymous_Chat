import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Send, Copy, LogOut, CheckCircle2, AlertTriangle } from 'lucide-react';
import { generateParticipantId } from '../utils/helpers';
import Button from '../components/Button';
import apiInstance from '../apiInstance'; // Leveraging Axios instance config to DRY the baseURL

const RoomPage = () => {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [error, setError] = useState(null);
  
  // Persist the random ID in Session Storage so accidental refreshes don't generate a new ID and break the 2-person limit
  const [myId] = useState(() => {
    const sessionKey = `qc_${roomId}_id`;
    const savedId = sessionStorage.getItem(sessionKey);
    if (savedId) return savedId;
    
    const newId = generateParticipantId();
    sessionStorage.setItem(sessionKey, newId);
    return newId;
  });
  
  const [copied, setCopied] = useState(false);
  const messagesEndRef = useRef(null);
  const socketRef = useRef(null);

  // Auto-scroll to bottom of chat feed
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Master WebSocket Connection Architecture
  useEffect(() => {
    // Extract base URL from Axios instance to respect DRY principles
    const httpBaseUrl = apiInstance.defaults.baseURL || 'http://127.0.0.1:8000';
    const wsBaseUrl = httpBaseUrl.replace(/^http/, 'ws');
    
    const ws = new WebSocket(`${wsBaseUrl}/ws/${roomId}/${myId}`);
    socketRef.current = ws;

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        
        if (data.type === 'history') {
          setMessages(data.messages);
        } else if (data.type === 'message' || data.type === 'system') {
          // Append new incoming broadcast to the chronological feed
          setMessages((prev) => [...prev, data]);
        }
      } catch (err) {
        console.error("Failed to aggressively parse websocket buffer", err);
      }
    };

    ws.onclose = (event) => {
      if (event.code === 1008) {
        setError("This room has reached its rigorous capacity of 2 people. Your handshake was actively blocked.");
      } else if (!event.wasClean && event.code !== 1000) {
        setError(`Secure connection lost via generic drop (Code: ${event.code}). Return to the hub and recreate the link.`);
      }
    };

    return () => {
      ws.close();
    };
  }, [roomId, myId]);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim() || !socketRef.current) return;
    
    // We simply blast the raw string over the socket. 
    // The FastAPI backend stamps the official Timestamp and maps the True Sender ID locally onto the packet to prevent UI-level identity spoofing.
    if (socketRef.current.readyState === WebSocket.OPEN) {
      socketRef.current.send(input);
      setInput('');
    }
  };

  const leaveRoom = () => {
    if (socketRef.current) {
        socketRef.current.close();
    }
    navigate('/');
  };

  // Error State Render (Triggered cleanly when a 3rd person attempts to join)
  if (error) {
    return (
      <div className="flex flex-col h-[100svh] bg-slate-950 items-center justify-center text-center px-4">
        <div className="w-24 h-24 bg-red-500/10 rounded-full flex items-center justify-center mb-8 border border-red-500/20">
            <AlertTriangle className="w-10 h-10 text-red-500" />
        </div>
        <h2 className="text-3xl font-bold text-white mb-4 tracking-tight">Access Denied</h2>
        <p className="text-slate-400 max-w-sm mb-10 leading-relaxed text-sm">{error}</p>
        <Button onClick={() => navigate('/')} className="px-8 py-4">Return to Hub</Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-[100svh] bg-slate-950 text-slate-200">
      {/* Pinned Header */}
      <header className="flex-none h-16 border-b border-white/5 bg-slate-950/80 backdrop-blur-md px-4 md:px-8 flex items-center justify-between z-10 w-full">
        <div className="flex items-center gap-4">
          <div className="flex flex-col">
            <span className="text-sm font-bold text-white">Anonymous Room</span>
            <span className="text-xs text-slate-500 font-mono tracking-wider">{roomId}</span>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-4">
          <button 
            onClick={handleCopyLink}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-sm font-medium transition-colors"
          >
            {copied ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-slate-400" />}
            <span className="hidden sm:inline">{copied ? 'Copied Link' : 'Invite Link'}</span>
          </button>
          <button 
            onClick={leaveRoom}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-500 text-sm font-medium transition-colors border border-red-500/20"
          >
            <LogOut className="w-4 h-4" />
            <span className="hidden sm:inline">Leave</span>
          </button>
        </div>
      </header>

      {/* Internal Scrollable Chat Area */}
      <main data-lenis-prevent="true" className="flex-1 overflow-y-auto overflow-x-hidden p-4 md:p-8 space-y-6">
        {messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center space-y-4 pt-10">
            <div className="relative">
                <div className="absolute inset-0 bg-violet-600/20 blur-2xl rounded-full pointer-events-none" />
                <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10 shadow-2xl relative z-10">
                <span className="text-2xl">🔒</span>
                </div>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-white mb-2">Room is fully encrypted</h3>
              <p className="text-slate-400 max-w-sm text-sm leading-relaxed">
                Share the invite link with exactly one person to start a secure 1-on-1 chat. The room permanently self-destructs when you both leave.
              </p>
            </div>
          </div>
        ) : (
          messages.map((msg, index) => {
            // Handle System Messages gracefully (like user join/leave alerts)
            if (msg.type === 'system') {
                return (
                  <div key={index} className="flex justify-center w-full my-6">
                    <span className="px-4 py-1.5 rounded-full bg-white/5 text-[10px] text-slate-400 tracking-widest font-mono uppercase shadow-sm border border-white/5">
                      {msg.text}
                    </span>
                  </div>
                );
            }

            const isMe = msg.senderId === myId;
            return (
              <div key={msg.id || index} className={`flex flex-col w-full ${isMe ? 'items-end' : 'items-start'}`}>
                <div className="flex items-baseline gap-2 mb-1.5 px-1">
                  <span className={`text-[11px] font-bold tracking-wide ${isMe ? 'text-violet-400' : 'text-blue-400'}`}>
                    {msg.senderId} {isMe && '(You)'}
                  </span>
                  <span className="text-[10px] text-slate-600 font-medium">{msg.timestamp}</span>
                </div>
                <div 
                  className={`max-w-[85%] sm:max-w-[70%] px-4 py-3 rounded-2xl text-sm md:text-base leading-relaxed ${
                    isMe 
                      ? 'bg-violet-600 text-white rounded-tr-sm shadow-[0_4px_20px_rgba(124,58,237,0.15)]' 
                      : 'bg-[#1e2028] text-slate-200 border border-white/5 rounded-tl-sm shadow-xl'
                  }`}
                  style={{ wordBreak: 'break-word' }}
                >
                  {msg.text}
                </div>
              </div>
            );
          })
        )}
        <div ref={messagesEndRef} />
      </main>

      {/* Pinned Input Footer */}
      <footer className="flex-none p-4 md:px-8 md:pb-8 bg-slate-950 border-t border-white/5 pt-4">
        <form onSubmit={handleSend} className="relative flex items-center max-w-5xl mx-auto">
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Send an anonymous message..."
            className="w-full bg-[#16181d] border border-white/10 rounded-full pl-6 pr-14 py-4 text-slate-200 focus:outline-none focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500 shadow-xl placeholder-slate-500"
            autoComplete="off"
          />
          <button 
            type="submit"
            disabled={!input.trim()}
            className="absolute right-2 p-3 rounded-full bg-violet-600 text-white hover:bg-violet-700 disabled:opacity-30 disabled:hover:bg-violet-600 transition-colors shadow-[0_0_15px_rgba(124,58,237,0.3)]"
          >
            <Send className="w-5 h-5 -ml-0.5" />
          </button>
        </form>
      </footer>
    </div>
  );
};

export default RoomPage;
