/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import { BrowserRouter, Routes, Route, Link, useLocation } from "react-router-dom";
import { Home, MapPin, MessageSquare, BookOpen, AlertTriangle, Clock, Search, Newspaper, Scale, Vote, ChevronRight, Award } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/src/lib/utils";

import DashboardView from "@/src/views/DashboardView";
import LandingView from "@/src/views/LandingView";
import GpsView from "@/src/views/GpsView";
import ChatView from "@/src/views/ChatView";
import LearnView from "@/src/views/LearnView";
import PanicView from "@/src/views/PanicView";
import TimelineView from "@/src/views/TimelineView";
import CandidateView from "@/src/views/CandidateView";
import ComparisonView from "@/src/views/ComparisonView";
import KnowledgeView from "@/src/views/KnowledgeView";
import NewsView from "@/src/views/NewsView";
import { LanguageProvider, useLanguage } from "@/src/contexts/LanguageContext";
import { t, Language } from "@/src/lib/translations";

function Navigation() {
  const location = useLocation();
  const { language } = useLanguage();

  const links = [
    { to: "/dashboard", icon: Home, label: t("nav.home", language) },
    { to: "/gps", icon: MapPin, label: "GPS" },
    { to: "/news", icon: Newspaper, label: "News" },
    { to: "/ask", icon: MessageSquare, label: "Ask AI" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-2xl border-t border-slate-200 md:hidden pb-safe shadow-[0_-10px_25px_rgba(15,23,42,0.05)]">
      <div className="flex justify-around items-center h-20 px-2 max-w-md mx-auto">
        {links.map((link) => {
          const Icon = link.icon;
          const isActive = location.pathname === link.to;
          return (
            <Link
              key={link.to}
              to={link.to}
              className={cn(
                "flex flex-col items-center justify-center w-full h-full space-y-1.5 transition-all relative",
                isActive ? "text-blue-600" : "text-slate-400 hover:text-slate-700"
              )}
            >
              {isActive && (
                <motion.div 
                  layoutId="nav-pill"
                  className="absolute -top-1 w-8 h-1 bg-blue-600 rounded-full"
                  transition={{ type: "spring", bounce: 0.3, duration: 0.6 }}
                />
              )}
              <div className={cn(
                "flex items-center justify-center w-10 h-10 rounded-[1.25rem] transition-all duration-300",
                isActive ? "bg-blue-50 text-blue-600 shadow-sm" : "bg-transparent text-slate-400"
              )}>
                <Icon className={cn("w-5 h-5", isActive ? "stroke-[2.5px]" : "stroke-2")} />
              </div>
              <span className={cn("text-[10px] font-black uppercase tracking-widest", isActive ? "text-blue-600" : "text-slate-400")}>{link.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

function Sidebar() {
  const location = useLocation();
  const { language, setLanguage } = useLanguage();

  const links = [
    { to: "/dashboard", icon: Home, label: t("nav.home", language) },
    { to: "/gps", icon: MapPin, label: t("nav.gps", language) },
    { to: "/news", icon: Newspaper, label: t("nav.news", language) },
    { to: "/timeline", icon: Clock, label: t("nav.timeline", language) },
    { to: "/ask", icon: MessageSquare, label: t("nav.ask", language) },
    { to: "/candidate", icon: Search, label: t("nav.candidate", language) },
    { to: "/knowledge", icon: BookOpen, label: "Civic Ops" },
    { to: "/learn", icon: Award, label: t("nav.learn", language) },
    { to: "/panic", icon: AlertTriangle, label: t("nav.panic", language) },
  ];

  return (
    <aside className="hidden md:flex flex-col w-72 h-screen bg-white/95 backdrop-blur-2xl border-r border-slate-200 z-50 fixed left-0 top-0 pt-8 shadow-[10px_0_30px_rgba(15,23,42,0.02)]">
      {/* Brand */}
      <div className="px-8 mb-10">
        <Link to="/" className="flex items-center gap-3.5 group cursor-pointer">
          <div className="w-12 h-12 rounded-[1.25rem] bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center text-white shadow-lg shadow-blue-600/20 group-hover:scale-110 group-hover:-rotate-3 transition-all duration-300 ring-4 ring-blue-50">
            <Vote className="w-6 h-6" />
          </div>
          <div className="flex flex-col">
            <h1 className="font-black text-2xl tracking-tighter text-slate-900 leading-none mb-1">LokLens</h1>
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-600 leading-none">Civic OS v1.0</p>
          </div>
        </Link>
      </div>
      
      {/* Language Switcher */}
      <div className="px-8 mb-10">
        <div className="bg-slate-100 p-1.5 rounded-[1.25rem] flex items-center gap-1 border border-slate-200/50 shadow-inner">
          {[
            { id: 'en', label: 'English', short: 'EN' },
            { id: 'hi', label: 'Hindi', short: 'हिं' },
            { id: 'mr', label: 'Marathi', short: 'म' }
          ].map((lang) => (
            <button 
              key={lang.id}
              onClick={() => setLanguage(lang.id as any)} 
              className={cn(
                "flex-1 text-[11px] font-black py-2 rounded-xl transition-all duration-300 uppercase tracking-wider",
                language === lang.id 
                  ? "bg-white text-blue-600 shadow-md ring-1 ring-slate-200/50" 
                  : "text-slate-500 hover:text-slate-800 hover:bg-slate-200/50"
              )}
            >
              {lang.short}
            </button>
          ))}
        </div>
      </div>

      {/* Nav Links */}
      <nav className="flex-1 space-y-1 overflow-y-auto px-4 pb-6 scrollbar-hide">
        {links.map((link) => {
          const Icon = link.icon;
          const isActive = location.pathname === link.to;
          return (
            <Link
              key={link.to}
              to={link.to}
              className={cn(
                "px-5 py-3.5 flex items-center gap-4 rounded-2xl cursor-pointer transition-all border border-transparent group relative overflow-hidden",
                isActive 
                  ? "bg-blue-50/80 text-blue-700 font-bold border-blue-100/50 shadow-sm" 
                  : "text-slate-500 hover:bg-slate-50/80 hover:text-slate-900"
              )}
            >
              {isActive && (
                <motion.div 
                  layoutId="sidebar-active-pill"
                  className="absolute left-0 top-0 bottom-0 w-1.5 bg-blue-600 rounded-r-full"
                />
              )}
              <div className={cn(
                "w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 shadow-sm border",
                isActive ? "bg-white border-blue-200 text-blue-600" : "bg-white border-slate-100 text-slate-400 group-hover:border-blue-100 group-hover:text-blue-500"
              )}>
                <Icon className={cn("w-5 h-5", isActive ? "stroke-[2.5px]" : "stroke-2 group-hover:scale-110 transition-transform")} />
              </div>
              <span className={cn("text-[15px] font-bold tracking-tight", isActive ? "text-slate-900" : "text-slate-500")}>{link.label}</span>
              {isActive && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse" />}
            </Link>
          );
        })}
      </nav>

      {/* Footer Info */}
      <div className="mt-auto p-6 bg-slate-50/80 border-t border-slate-100 backdrop-blur-sm">
        <div className="bg-white rounded-3xl p-5 space-y-4 border border-slate-200 shadow-sm relative overflow-hidden group">
          <div className="absolute -right-8 -bottom-8 w-24 h-24 bg-blue-50 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" />
          <div className="relative z-10">
            <div className="text-[11px] font-black text-slate-900 uppercase tracking-widest flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-xl bg-blue-50 flex items-center justify-center border border-blue-100">
                <Scale className="w-4 h-4 text-blue-600" />
              </div>
              Legal Guard
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between text-[10px] text-slate-500 font-bold uppercase tracking-widest">
                <span>ECI DB</span>
                <span className="text-blue-600 font-black tracking-normal">v2024.5.2.REL</span>
              </div>
              <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden p-0.5">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: "96%" }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                  className="bg-blue-600 h-full rounded-full" 
                />
              </div>
              <div className="flex items-center gap-2.5 text-[10px] text-emerald-600 font-black bg-emerald-50/50 w-full px-4 py-3 rounded-2xl border border-emerald-100 mt-2 shadow-sm">
                <div className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]"></span>
                </div>
                ECI VERIFIED STATUS
              </div>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-slate-50 flex flex-row overflow-hidden relative">
          
          <div className="md:hidden absolute top-4 right-4 z-[60] flex gap-1">
            <LanguageSwitcherMobile />
          </div>

          <Sidebar />
          <main className="flex-1 md:ml-72 h-screen p-4 md:p-10 relative flex flex-col overflow-y-auto overflow-x-hidden pb-24 md:pb-10 scroll-smooth">
            <AnimatePresence mode="wait">
              <Routes>
                <Route path="/" element={<LandingView />} />
                <Route path="/dashboard" element={<DashboardView />} />
                <Route path="/gps" element={<GpsView />} />
                <Route path="/news" element={<NewsView />} />
                <Route path="/ask" element={<ChatView />} />
                <Route path="/learn" element={<LearnView />} />
                <Route path="/panic" element={<PanicView />} />
                <Route path="/timeline" element={<TimelineView />} />
                <Route path="/candidate" element={<CandidateView />} />
                <Route path="/compare" element={<ComparisonView />} />
                <Route path="/knowledge" element={<KnowledgeView />} />
              </Routes>
            </AnimatePresence>
          </main>
          <Navigation />
        </div>
      </BrowserRouter>
    </LanguageProvider>
  );
}

function LanguageSwitcherMobile() {
  const { language, setLanguage } = useLanguage();
  return (
    <div className="bg-white/90 backdrop-blur-md rounded-lg shadow-sm border border-slate-200 p-1 flex gap-1">
      <button onClick={() => setLanguage('en')} className={cn("text-xs font-bold w-7 h-7 flex items-center justify-center rounded transition-all", language === 'en' ? "bg-blue-600 text-white" : "text-slate-600")}>EN</button>
      <button onClick={() => setLanguage('hi')} className={cn("text-xs font-bold w-7 h-7 flex items-center justify-center rounded transition-all", language === 'hi' ? "bg-blue-600 text-white" : "text-slate-600")}>हिं</button>
      <button onClick={() => setLanguage('mr')} className={cn("text-xs font-bold w-7 h-7 flex items-center justify-center rounded transition-all", language === 'mr' ? "bg-blue-600 text-white" : "text-slate-600")}>म</button>
    </div>
  );
}
