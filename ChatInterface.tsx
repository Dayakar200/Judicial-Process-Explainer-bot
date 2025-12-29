
import React, { useState, useRef, useEffect } from 'react';
import { Message, MessageRole } from './types';
import { getGeminiResponse } from './geminiService';

const ChatInterface: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: MessageRole.BOT,
      content: "Hello! I am your Judicial Court Process & Case Flow Explainer Bot. I can help you understand the stages of a lawsuit, how hearings work, and general court procedures. How can I help clarify the legal process for you today?",
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: MessageRole.USER,
      content: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await getGeminiResponse(input);
      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: MessageRole.BOT,
        content: response.text,
        timestamp: new Date(),
        sources: response.sources
      };
      setMessages(prev => [...prev, botMsg]);
    } catch (error) {
      const errorMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: MessageRole.BOT,
        content: "I apologize, but I encountered an error while processing your request. Please try again later.",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[650px] bg-white rounded-[1.5rem] shadow-xl overflow-hidden border border-slate-100">
      <div className="bg-[#1e293b] p-5 text-white flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-[#254bdb] rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-white">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75z" />
            </svg>
          </div>
          <div>
            <h3 className="font-bold text-[14px] leading-none">Process Explainer Bot</h3>
            <p className="text-[11px] text-slate-400 mt-1 font-medium">Public Legal Awareness System</p>
          </div>
        </div>
        <div className="text-[10px] px-3 py-1.5 bg-[#854d0e]/20 text-[#eab308] rounded-md border border-[#eab308]/30 uppercase tracking-[0.1em] font-extrabold">
          Informational Only
        </div>
      </div>

      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-6 space-y-6 scroll-smooth bg-[#f8fafc]"
      >
        {messages.map((msg) => (
          <div 
            key={msg.id} 
            className={`flex ${msg.role === MessageRole.USER ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`max-w-[90%] rounded-2xl px-5 py-4 shadow-sm ${
              msg.role === MessageRole.USER 
                ? 'bg-[#254bdb] text-white rounded-tr-none' 
                : 'bg-white border border-slate-100 text-slate-700 rounded-tl-none'
            }`}>
              <div className="text-[14px] leading-relaxed font-medium whitespace-pre-wrap">
                {msg.content}
              </div>
              {msg.sources && msg.sources.length > 0 && (
                <div className="mt-4 pt-3 border-t border-slate-50">
                  <p className="text-[9px] font-extrabold text-slate-400 mb-2 uppercase tracking-widest">Procedural Sources:</p>
                  <div className="flex flex-wrap gap-2">
                    {msg.sources.map((source, idx) => (
                      <a 
                        key={idx} 
                        href={source.uri} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-[10px] bg-slate-50 text-[#254bdb] px-2.5 py-1.5 rounded-lg border border-slate-100 hover:bg-white transition-all font-bold"
                      >
                        {source.title.substring(0, 30)}{source.title.length > 30 ? '...' : ''}
                      </a>
                    ))}
                  </div>
                </div>
              )}
              <div className={`text-[9px] mt-2 font-bold opacity-40 uppercase tracking-tighter ${msg.role === MessageRole.USER ? 'text-right' : 'text-left'}`}>
                {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white border border-slate-100 rounded-2xl rounded-tl-none px-5 py-4 shadow-sm flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
              <div className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
              <div className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
            </div>
          </div>
        )}
      </div>

      <div className="p-5 bg-white border-t border-slate-100">
        <div className="flex gap-3 bg-slate-50 p-1 rounded-2xl border border-slate-100 focus-within:ring-2 focus-within:ring-blue-500/20 transition-all">
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="e.g., Explain the discovery phase..."
            className="flex-1 bg-transparent border-none px-4 py-2 text-sm text-slate-700 outline-none placeholder:text-slate-400 font-medium"
          />
          <button 
            onClick={handleSend}
            disabled={isLoading || !input.trim()}
            className="bg-[#254bdb] text-white p-2.5 rounded-xl hover:bg-blue-700 disabled:opacity-50 transition-all shadow-md shadow-blue-500/10 active:scale-95"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" />
            </svg>
          </button>
        </div>
        <p className="text-[10px] text-center text-slate-400 mt-3 font-medium">
          Procedural information only. Not a substitute for professional legal advice.
        </p>
      </div>
    </div>
  );
};

export default ChatInterface;
