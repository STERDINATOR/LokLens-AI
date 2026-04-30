import { useState, useRef, useEffect } from "react";
import { Send, Bot, User, CornerDownLeft, Info, AlertOctagon, Scale } from "lucide-react";
import Markdown from "react-markdown";
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
      <header className="px-6 py-4 glass border-white/50 rounded-t-3xl mb-4 flex items-center justify-between sticky top-0 z-10 mx-1 mt-1 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center orb-glow">
            <Scale className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="font-bold text-slate-800 leading-tight">Ask LokLens</h1>
            <p className="text-xs text-green-600 flex items-center gap-1 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block animate-pulse"></span>
              Legal Engine Active
            </p>
          </div>
        </div>
        <button
          onClick={() => setLawyerMode(!lawyerMode)}
          className={cn(
            "flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition-all shadow-sm border",
            lawyerMode 
              ? "bg-purple-600 text-white border-purple-500 shadow-purple-500/20" 
              : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
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
                <Markdown>{msg.content}</Markdown>
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
      <div className="mt-auto mx-1">
        {messages.length === 1 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {QUICK_PROMPTS.map(prompt => (
              <button 
                key={prompt}
                onClick={() => handleSend(prompt)}
                className="px-3 py-1.5 glass border-white/50 text-slate-700 text-xs rounded-full hover:border-blue-300 font-bold hover:text-blue-600 transition-colors shadow-sm"
                disabled={loading}
              >
                {prompt}
              </button>
            ))}
          </div>
        )}
        
        <div className="glass rounded-3xl p-2 flex items-center gap-4 border-blue-200/50 shadow-lg">
          <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-white text-xl orb-glow shrink-0">
             ✨
          </div>
          <div className="flex-1">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSend();
              }}
              placeholder="Ask the Constitution: 'What happens if a candidate dies before polling?'"
              className="w-full bg-transparent border-none outline-none text-slate-700 text-sm py-2 placeholder-slate-400 font-medium"
              disabled={loading}
            />
          </div>
          <div className="flex gap-2 pr-2 shrink-0">
            <button className="p-2 hover:bg-slate-100 rounded-lg text-slate-400 transition-colors">🎙️</button>
            <button 
              onClick={() => handleSend()}
              disabled={!input.trim() || loading}
              className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm"
            >
              Ask LokLens
            </button>
          </div>
        </div>
        <div className="flex justify-center gap-6 mt-3 pb-2">
          <span className="text-[10px] text-slate-500 font-bold flex items-center gap-1 cursor-default">🔥 Trending: "Silence Period Rules"</span>
          <span className="text-[10px] text-slate-500 font-bold flex items-center gap-1 cursor-default">🛡️ 100% Legally Accurate</span>
          <span className="text-[10px] text-slate-500 font-bold flex items-center gap-1 cursor-default">🌐 Multilingual Supported</span>
        </div>
      </div>
    </div>
  );
}
