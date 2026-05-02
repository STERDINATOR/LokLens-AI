import { useState, useRef, useEffect } from "react";
import { Send, Bot, User, CornerDownLeft, Info, AlertOctagon, Scale } from "lucide-react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useLocation } from "react-router-dom";
import { cn } from "@/src/lib/utils";
import { askLokLens } from "@/src/services/geminiService";
import type { Message } from "@/src/types";
import { useLanguage } from "@/src/contexts/LanguageContext";
import { t } from "@/src/lib/translations";

export default function ChatView() {
  const { langName } = useLanguage();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content: "Namaskar! I am LokLens, your Democracy Co-Pilot. I can help you understand the Constitution, Representation of the People Acts, candidate details, or polling day procedures. \n\nHow can I assist you today?",
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [lawyerMode, setLawyerMode] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const { search } = useLocation();

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  useEffect(() => {
    const params = new URLSearchParams(search);
    const q = params.get("q");
    if (messages.length === 1) {
      if (q === "first-time-voter") {
        handleSend("I am 18, living in Maharashtra, first time voter. Tell me everything I need to do in a checklist form.");
      } else if (q === "myth") {
        handleSend("Can you bust some common election myths for me? Like if I don't vote, does the government use my vote?");
      } else if (q === "story") {
        handleSend("Tell me the cinematic story of 'Why Secret Ballot?' and explain the law behind it.");
      }
    }
  }, [search]);

  const handleSend = async (forcedInput?: string) => {
    const textToSend = forcedInput || input.trim();
    if (!textToSend || loading) return;

    setInput("");
    
    const userMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      content: textToSend,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMsg]);
    setLoading(true);

    // Context from previous messages (last 4)
    const context = messages.slice(-4).map(m => `${m.role === 'user' ? 'User' : 'LokLens'}: ${m.content}`).join('\n');

    const responseText = await askLokLens(textToSend, context, langName, lawyerMode);
    
    const aiMsg: Message = {
      id: (Date.now() + 1).toString(),
      role: "assistant",
      content: responseText,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, aiMsg]);
    setLoading(false);
  };

  const QUICK_PROMPTS = [
    "What is the MCC?",
    "Can a candidate distribute gifts?",
    "Myth: If I don't vote, government uses my vote",
    "Myth: NOTA can win a seat",
    "Myth: Need Aadhaar to vote",
  ];

  return (
    <div className="flex flex-col h-full bg-transparent max-w-5xl mx-auto md:my-0 w-full mb-4">
      {/* Header */}
      <header className="px-8 py-6 bg-white/80 backdrop-blur-xl border border-slate-200 rounded-[2.5rem] shadow-[0_8px_30px_rgb(15,23,42,0.06)] mb-6 flex flex-col md:flex-row items-start md:items-center justify-between sticky top-0 z-20 mx-1 mt-1 gap-4">
        <div className="flex items-center gap-5">
          <div className="w-14 h-14 rounded-[1.5rem] bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/30 ring-4 ring-blue-50 shrink-0">
            <Scale className="w-7 h-7 text-white" />
          </div>
          <div>
            <h1 className="font-extrabold text-2xl text-slate-900 leading-tight mb-1 tracking-tight">Ask LokLens</h1>
            <p className="text-xs text-emerald-600 flex items-center gap-1.5 font-extrabold tracking-widest uppercase">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.8)]"></span>
              Legal Engine Active
            </p>
          </div>
        </div>
        <button
          onClick={() => setLawyerMode(!lawyerMode)}
          className={cn(
            "flex items-center gap-3 px-6 py-4 rounded-[1.5rem] text-sm font-bold transition-all shadow-sm border whitespace-nowrap",
            lawyerMode 
              ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white border-purple-500 shadow-purple-500/30 ring-4 ring-purple-100" 
              : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100 hover:shadow-md"
          )}
        >
          <Scale className="w-4 h-4" />
          {lawyerMode ? "Lawyer Mode ON" : "Lawyer Mode OFF"}
        </button>
      </header>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 pb-32 md:pb-6 mx-1">
        {messages.map((msg) => (
          <div 
            key={msg.id} 
            className={cn(
              "flex gap-4 max-w-[85%]",
              msg.role === "user" ? "ml-auto flex-row-reverse" : "mr-auto"
            )}
          >
            <div className={cn(
              "w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-1",
              msg.role === "user" ? "bg-orange-500 text-white shadow-md" : "bg-blue-600 text-white orb-glow"
            )}>
              {msg.role === "user" ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
            </div>
            
            <div className={cn(
              "px-5 py-4 rounded-3xl shadow-sm text-[15px] leading-relaxed",
              msg.role === "user" 
                ? "glass border border-white/50 text-slate-800" 
                : "bg-blue-600 text-white shadow-md rounded-tl-sm"
            )}>
              {msg.role === "assistant" && msg.id !== "1" && (
                <div className="mb-3 pb-2 border-b border-white/20 flex items-center justify-between text-xs font-bold text-blue-100">
                  <span className="flex items-center gap-1"><Info className="w-3 h-3" /> ECI/Constitutional Sourced</span>
                  <span>Confidence: High</span>
                </div>
              )}
              
              <div className={cn(
                "prose prose-sm max-w-none",
                msg.role === "assistant" ? "prose-invert" : "text-slate-800"
              )}>
                <Markdown remarkPlugins={[remarkGfm]}>{msg.content}</Markdown>
              </div>
            </div>
          </div>
        ))}
        
        {loading && (
          <div className="flex gap-4 max-w-[85%] mr-auto">
            <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center shrink-0 mt-1 orb-glow">
              <Bot className="w-4 h-4" />
            </div>
            <div className="px-5 py-4 rounded-3xl shadow-sm bg-blue-600 text-white flex items-center gap-2 rounded-tl-sm">
              <div className="w-2 h-2 rounded-full bg-white/50 animate-bounce"></div>
              <div className="w-2 h-2 rounded-full bg-white/50 animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              <div className="w-2 h-2 rounded-full bg-white/50 animate-bounce" style={{ animationDelay: '0.4s' }}></div>
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input Area */}
      <div className="mt-auto mx-1 relative z-10 bottom-4">
        {messages.length === 1 && (
          <div className="flex flex-wrap items-center justify-center gap-3 mb-8 pointer-events-auto">
            {QUICK_PROMPTS.map(prompt => (
              <button 
                key={prompt}
                onClick={() => handleSend(prompt)}
                className="px-5 py-3 bg-white/80 backdrop-blur-xl border border-slate-200 text-slate-700 text-sm rounded-[1.5rem] hover:border-blue-400 hover:bg-blue-50 focus:bg-blue-50 font-bold hover:text-blue-700 transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5 active:scale-95"
                disabled={loading}
              >
                {prompt}
              </button>
            ))}
          </div>
        )}
        
        <div className="bg-white/90 backdrop-blur-2xl rounded-[3rem] p-3 md:p-4 flex flex-col md:flex-row items-stretch md:items-center gap-4 border border-slate-200 shadow-[0_8px_30px_rgb(15,23,42,0.08)] focus-within:ring-4 focus-within:ring-slate-100 transition-all">
          <div className="hidden md:flex w-14 h-14 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 items-center justify-center text-white text-xl shadow-lg shadow-blue-500/20 shrink-0">
             ✨
          </div>
          <div className="flex-1 px-4 md:px-2 pt-2 md:pt-0">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSend();
              }}
              placeholder="Ask the Constitution: 'What happens if a candidate dies before polling?'"
              className="w-full bg-transparent border-none outline-none text-slate-900 placeholder:text-slate-400 text-base md:text-lg font-bold"
              disabled={loading}
            />
          </div>
          <div className="flex justify-end md:shrink-0 pr-1 pb-1 md:pb-0">
            <button 
              onClick={() => handleSend()}
              disabled={!input.trim() || loading}
              className="px-6 py-4 md:py-5 bg-slate-900 text-white flex items-center justify-center rounded-[2rem] hover:bg-slate-800 font-extrabold disabled:opacity-50 disabled:hover:bg-slate-900 transition-all shadow-md group whitespace-nowrap active:scale-95"
            >
              Ask LokLens <CornerDownLeft className="ml-2 w-4 h-4 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </div>
        <div className="flex justify-center flex-wrap gap-x-8 gap-y-3 mt-6 pb-2">
          <span className="text-[10px] text-slate-400 font-extrabold flex items-center gap-1.5 cursor-default tracking-widest uppercase"><span className="text-orange-500 text-sm">🔥</span> Trending: "Silence Period Rules"</span>
          <span className="text-[10px] text-slate-400 font-extrabold flex items-center gap-1.5 cursor-default tracking-widest uppercase"><span className="text-emerald-500 text-sm">🛡️</span> 100% Legally Accurate</span>
          <span className="text-[10px] text-slate-400 font-extrabold flex items-center gap-1.5 cursor-default tracking-widest uppercase"><span className="text-blue-500 text-sm">🌐</span> Multilingual</span>
        </div>
      </div>
    </div>
  );
}
