import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "motion/react";
import { 
  Vote, ShieldCheck, MapPin, Scale, Search, Compass, ChevronRight, Star, 
  Bot, Sparkles, Zap, Clock, Users, ArrowRight, PlayCircle
} from "lucide-react";

export default function LandingView() {
  const { scrollYProgress } = useScroll();
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const features = [
    {
      icon: MapPin,
      title: "Live Democracy GPS",
      desc: "Instantly locate your constituency, polling booth, and representatives based on your PIN code or live location.",
      color: "from-blue-500 to-cyan-400",
      bgLight: "bg-blue-50",
      textCol: "text-blue-600",
      colSpan: "md:col-span-2",
    },
    {
      icon: Bot,
      title: "AI Co-pilot",
      desc: "Chat with LokLens for instant answers on election laws, timings, and rules.",
      color: "from-purple-500 to-fuchsia-400",
      bgLight: "bg-purple-50",
      textCol: "text-purple-600",
      colSpan: "md:col-span-1",
    },
    {
      icon: Scale,
      title: "Lawyer Mode",
      desc: "Get deep-dive constitutional insights and legal precedents instantly.",
      color: "from-amber-500 to-orange-400",
      bgLight: "bg-amber-50",
      textCol: "text-amber-600",
      colSpan: "md:col-span-1",
    },
    {
      icon: Search,
      title: "Candidate X-Ray",
      desc: "Analyze affidavits, financial growth, and criminal records side-by-side with AI comparisons.",
      color: "from-emerald-500 to-teal-400",
      bgLight: "bg-emerald-50",
      textCol: "text-emerald-600",
      colSpan: "md:col-span-2",
    },
  ];

  return (
    <div className="w-full min-h-screen flex flex-col items-center overflow-x-hidden relative">
      
      {/* Dynamic Background Glow */}
      <div 
        className="fixed inset-0 pointer-events-none z-[-1] opacity-50 transition-opacity duration-300"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(59, 130, 246, 0.1), transparent 40%)`
        }}
      />
      
      {/* Decorative Orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-blue-400/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-[20%] right-[-5%] w-72 h-72 bg-purple-400/20 rounded-full blur-3xl pointer-events-none" />

      {/* Hero Section */}
      <section className="relative w-full max-w-7xl mx-auto px-4 pt-32 pb-24 md:pt-48 md:pb-32 flex flex-col items-center text-center">
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full glass border border-white/60 shadow-[0_0_40px_rgba(59,130,246,0.3)] text-slate-800 text-sm font-extrabold uppercase tracking-widest mb-10"
        >
          <Sparkles className="w-5 h-5 text-blue-600" />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">
            India's Legendary Civic OS
          </span>
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
          className="text-6xl md:text-8xl lg:text-[8rem] font-extrabold text-slate-900 tracking-tighter leading-[0.95] mb-10"
        >
          Democracy, <br className="hidden md:block"/> 
          <span className="relative inline-block mt-2">
            <span className="absolute -inset-4 bg-gradient-to-r from-blue-200 to-purple-200 blur-2xl opacity-60 rounded-full"></span>
            <span className="relative bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">
              Decoded.
            </span>
          </span>
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
          className="text-xl md:text-2xl lg:text-3xl text-slate-600 max-w-4xl mx-auto leading-relaxed mb-14 font-medium tracking-wide"
        >
          LokLens is your live, location-aware, law-grounded AI co-pilot. 
          Unmask candidates, decode the constitution, and reclaim your civic power.
        </motion.p>
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6 w-full sm:w-auto"
        >
          <Link to="/dashboard" className="w-full sm:w-auto px-10 py-5 bg-gradient-to-r from-slate-900 to-slate-800 hover:from-blue-600 hover:to-indigo-600 text-white rounded-[2rem] font-extrabold text-xl shadow-[0_8px_30px_rgb(15,23,42,0.4)] hover:shadow-[0_8px_40px_rgba(59,130,246,0.5)] hover:-translate-y-1 transition-all flex items-center justify-center gap-3 group border border-white/10">
            Launch Command Center <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
          </Link>
          <Link to="/ask" className="w-full sm:w-auto px-10 py-5 bg-white/60 hover:bg-white text-slate-800 border border-slate-200 rounded-[2rem] font-extrabold text-xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all flex items-center justify-center gap-3 backdrop-blur-md group">
            <Bot className="w-6 h-6 text-blue-600 group-hover:scale-110 group-hover:rotate-12 transition-transform" /> Try AI Co-Pilot
          </Link>
        </motion.div>

        {/* Floating Chat UI Mockup */}
        <motion.div 
          style={{ y: y2 }}
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
          className="mt-28 w-full max-w-4xl bg-white/70 backdrop-blur-3xl border border-white p-2 rounded-[2.5rem] shadow-[0_20px_80px_rgba(15,23,42,0.1)] relative"
        >
          <div className="absolute inset-0 bg-gradient-to-t from-slate-50/80 to-transparent rounded-[2.5rem] pointer-events-none" />
          <div className="bg-slate-50/50 backdrop-blur-xl rounded-[2rem] border border-white/50 p-6 md:p-10 overflow-hidden relative shadow-inner">
            
            {/* Mock Header */}
            <div className="flex items-center gap-4 mb-10 border-b border-slate-200/50 pb-6">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
                <Bot className="w-6 h-6 text-white" />
              </div>
              <div className="text-left flex-1">
                <h3 className="font-extrabold text-lg text-slate-900 leading-tight">LokLens AI</h3>
                <p className="text-xs text-emerald-600 font-bold flex items-center gap-1.5 tracking-wide uppercase">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span> Online & Ready
                </p>
              </div>
              <div className="hidden sm:flex px-4 py-2 bg-amber-50 text-amber-700 rounded-xl text-xs font-bold items-center gap-2 border border-amber-200/50 shadow-sm">
                <Scale className="w-4 h-4" /> Lawyer Mode Active
              </div>
            </div>

            {/* Mock Messages */}
            <div className="space-y-8 text-left relative z-10 w-full max-w-2xl mx-auto">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-slate-200 shrink-0 flex items-center justify-center font-bold text-slate-500 text-xs shadow-inner">
                  ME
                </div>
                <div className="bg-white border border-slate-200/60 shadow-sm p-5 rounded-[1.5rem] rounded-tl-sm relative group">
                  <div className="absolute top-1/2 -left-2 w-4 h-4 bg-white border-l border-b border-slate-200/60 transform rotate-45 -translate-y-1/2"></div>
                  <p className="text-[15px] font-bold text-slate-700 relative z-10">What are the absolute rules around the Silence Period before an election?</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 shrink-0 flex items-center justify-center shadow-lg shadow-blue-500/30">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <div className="bg-slate-900 border border-slate-800 shadow-[0_8px_30px_rgb(15,23,42,0.4)] p-7 rounded-[2rem] rounded-tl-sm w-full relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-8 opacity-5">
                    <Scale className="w-32 h-32 text-blue-400 transform rotate-12" />
                  </div>
                  <div className="absolute top-1/2 -left-2 w-4 h-4 bg-slate-900 border-l border-b border-slate-800 transform rotate-45 -translate-y-1/2"></div>
                  
                  <div className="relative z-10">
                    <p className="text-[15px] font-medium text-slate-300 leading-relaxed mb-5">
                      Under <span className="font-extrabold text-white bg-blue-500/20 px-2 py-0.5 rounded border border-blue-500/30">Section 126 of the RPA, 1951</span>, a strict silence period is enforced 48 hours before the conclusion of polling.
                    </p>
                    <ul className="text-sm font-medium text-slate-200 space-y-4 mb-6 p-5 bg-white/5 rounded-2xl border border-white/10 shadow-inner">
                      <li className="flex items-start gap-3"><span className="text-blue-400 font-extrabold mt-0.5">01</span> No public meetings, rallies, or processions.</li>
                      <li className="flex items-start gap-3"><span className="text-blue-400 font-extrabold mt-0.5">02</span> No cinematograph, television or similar apparatus appeals.</li>
                    </ul>
                    <div className="flex gap-4 items-start bg-slate-800 text-slate-300 p-5 rounded-[1.5rem] text-sm font-medium leading-relaxed border border-slate-700 shadow-inner mt-4">
                      <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center shrink-0 border border-emerald-500/30">
                        <ShieldCheck className="w-4 h-4 text-emerald-400" />
                      </div>
                      <div>
                        <strong className="text-white block mb-1 tracking-widest uppercase text-xs font-black">LEGAL PRECEDENT</strong>
                        <span className="opacity-90">Promulgated to ensure voters have a peaceful period to reflect without influence. Violations are punishable by imprisonment up to 2 years, or fine, or both.</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </motion.div>
      </section>

      {/* Stats Divider */}
      <section className="w-full max-w-6xl mx-auto px-4 py-16 md:py-24 border-y border-slate-200/50 bg-white/30 backdrop-blur-sm z-10 my-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
          {[
            { label: "State Statutes", value: "300+" },
            { label: "Avg. Response Time", value: "✨ 1.2s", color: "text-amber-500" },
            { label: "Constituencies Mapped", value: "4,120", icon: MapPin },
            { label: "Democratic Power", value: "Yours", highlight: true },
          ].map((stat, i) => (
            <div key={i} className="text-center group border-r border-slate-200/40 last:border-0">
              <h4 className={`text-4xl md:text-5xl font-black tracking-tighter mb-3 transition-transform group-hover:scale-105 ${stat.highlight ? 'bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600' : stat.color || 'text-slate-900'}`}>
                {stat.value}
              </h4>
              <p className="text-xs font-extrabold text-slate-500 uppercase tracking-widest flex items-center justify-center gap-1.5">
                {stat.icon && <stat.icon className="w-4 h-4" />} {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Bento Grid Features */}
      <section className="w-full max-w-7xl mx-auto px-4 py-24 md:py-32 z-10 relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[800px] bg-gradient-to-b from-blue-50/50 to-transparent pointer-events-none -z-10" />
        
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tighter mb-6 leading-tight">
            Everything you need. <br/> <span className="text-slate-400">Nothing you don't.</span>
          </h2>
          <p className="text-xl md:text-2xl text-slate-600 max-w-3xl mx-auto font-medium leading-relaxed">
            A comprehensive suite of tools built for the Indian voter. Cutting through the noise to bring you facts, fast.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 auto-rows-[minmax(340px,auto)]">
          {features.map((feature, i) => (
            <motion.div 
              key={i}
              whileHover={{ y: -5, scale: 1.01 }}
              transition={{ duration: 0.2 }}
              className={`bg-white/80 backdrop-blur-xl p-10 md:p-12 rounded-[3rem] border border-white hover:border-slate-200/80 transition-all shadow-[0_8px_30px_rgb(15,23,42,0.04)] hover:shadow-[0_20px_40px_rgb(15,23,42,0.08)] group flex flex-col justify-between overflow-hidden relative ${feature.colSpan}`}
            >
              {/* Card Background Gradient */}
              <div className={`absolute -bottom-24 -right-24 w-64 h-64 bg-gradient-to-br ${feature.color} opacity-20 rounded-full blur-3xl group-hover:opacity-30 group-hover:scale-150 transition-all duration-700 ease-out`} />
              
              <div className="relative z-10">
                <div className={`w-20 h-20 ${feature.bgLight} ${feature.textCol} rounded-[1.5rem] flex items-center justify-center mb-10 shadow-sm ring-1 ring-black/5 group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-500 ease-out`}>
                  <feature.icon className="w-10 h-10" />
                </div>
                <h3 className="text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">{feature.title}</h3>
                <p className="text-slate-600 text-lg md:text-xl leading-relaxed font-medium max-w-md">{feature.desc}</p>
              </div>

              {/* Decorative element based on type */}
              {feature.colSpan === 'md:col-span-2' && i === 0 && (
                <div className="mt-12 flex flex-wrap gap-4 overflow-hidden relative z-10">
                  {['📍 411014', '🏛️ Pune, MH', '🗳️ Assembly: 208'].map((tag, j) => (
                    <span key={j} className="px-5 py-3 bg-white border border-slate-200 rounded-2xl text-sm font-bold text-slate-700 shadow-sm group-hover:-translate-y-1 transition-transform" style={{ transitionDelay: `${j * 100}ms`}}>
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {feature.colSpan === 'md:col-span-2' && i === 3 && (
                <div className="mt-12 flex items-end gap-5 opacity-80 mix-blend-multiply group-hover:-translate-y-2 transition-transform">
                  <div className="w-16 h-32 bg-red-100 rounded-t-2xl relative"><div className="absolute bottom-0 w-full bg-red-400 rounded-t-2xl h-[40%] group-hover:h-[60%] transition-all duration-500"></div></div>
                  <div className="w-16 h-40 bg-green-100 rounded-t-2xl relative"><div className="absolute bottom-0 w-full bg-green-500 rounded-t-2xl h-[70%] group-hover:h-[85%] transition-all duration-500 delay-100"></div></div>
                  <div className="w-16 h-20 bg-slate-200 rounded-t-2xl"></div>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full px-4 pt-48 pb-24 z-10 relative">
        <div className="absolute inset-0 bg-slate-900 overflow-hidden">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-600/20 rounded-full blur-[120px] mix-blend-screen" />
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-purple-600/20 rounded-full blur-[100px] mix-blend-screen" />
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay" />
        </div>
        
        <div className="max-w-5xl mx-auto text-center relative z-10 py-20">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-3 px-8 py-3 rounded-full bg-white/10 border border-white/20 text-white text-sm font-extrabold uppercase tracking-widest mb-10 backdrop-blur-md"
          >
            <Compass className="w-5 h-5 text-emerald-400" /> Start Now
          </motion.div>
          <h2 className="text-6xl md:text-8xl font-black text-white tracking-tighter mb-10 leading-[1.1]">
            Ready to reclaim <br/> your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400">civic power?</span>
          </h2>
          <p className="text-2xl md:text-3xl text-slate-300 max-w-3xl mx-auto mb-16 font-medium leading-relaxed">
            Join the platform that turns opaque processes into clear, actionable intelligence.
          </p>
          <div className="flex justify-center gap-6">
            <Link to="/dashboard" className="w-full sm:w-auto px-12 py-6 bg-white text-slate-900 hover:bg-slate-50 rounded-[2.5rem] font-black text-2xl shadow-[0_0_60px_rgba(255,255,255,0.3)] transition-all flex items-center justify-center gap-4 group ring-4 ring-white/20 hover:scale-105">
              Enter Platform <ArrowRight className="w-8 h-8 group-hover:translate-x-2 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full bg-white border-t border-slate-200 py-16 px-6 z-10 relative">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center border border-blue-100">
               <Vote className="w-6 h-6 text-blue-600" />
            </div>
            <span className="font-black text-2xl tracking-tighter text-slate-900">LokLens</span>
          </div>
          <div className="text-slate-500 text-base font-bold bg-slate-50 px-6 py-2.5 rounded-full border border-slate-100">
            Built with <span className="text-rose-500">❤️</span> for Indian Democracy. Not affiliated with the ECI.
          </div>
          <div className="flex gap-6">
            {['Privacy', 'Terms', 'About'].map(link => (
              <a key={link} href="#" className="text-base font-extrabold text-slate-400 hover:text-slate-800 transition-colors uppercase tracking-widest">
                {link}
              </a>
            ))}
          </div>
        </div>
      </footer>

      {/* Utilities */}
      <style>{`
        .mask-fade-right {
          mask-image: linear-gradient(to right, black 60%, transparent 100%);
        }
      `}</style>
    </div>
  );
}

