/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import { BrowserRouter, Routes, Route, Link, useLocation } from "react-router-dom";
import { Home, MapPin, MessageSquare, BookOpen, AlertTriangle, Clock, Search, Newspaper } from "lucide-react";
import { cn } from "@/src/lib/utils";

import DashboardView from "@/src/views/DashboardView";
import GpsView from "@/src/views/GpsView";
import ChatView from "@/src/views/ChatView";
import LearnView from "@/src/views/LearnView";
import PanicView from "@/src/views/PanicView";
import TimelineView from "@/src/views/TimelineView";
import CandidateView from "@/src/views/CandidateView";
import NewsView from "@/src/views/NewsView";
import { LanguageProvider, useLanguage } from "@/src/contexts/LanguageContext";
import { t, Language } from "@/src/lib/translations";

function Navigation() {
  const location = useLocation();
  const { language } = useLanguage();

  const links = [
    { to: "/", icon: Home, label: t("nav.home", language) },
    { to: "/gps", icon: MapPin, label: "GPS" },
    { to: "/news", icon: Newspaper, label: "News" },
    { to: "/ask", icon: MessageSquare, label: "LokLens" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 glass border-t md:hidden">
      <div className="flex justify-around items-center h-16">
        {links.map((link) => {
          const Icon = link.icon;
          const isActive = location.pathname === link.to;
          return (
            <Link
              key={link.to}
              to={link.to}
              className={cn(
                "flex flex-col items-center justify-center w-full h-full space-y-1 transition-colors",
                isActive ? "text-blue-700 font-bold" : "text-slate-500 hover:text-slate-800"
              )}
            >
              <Icon className={cn("w-5 h-5", isActive ? "opacity-100" : "opacity-80")} />
              <span className="text-[10px] font-medium">{link.label}</span>
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
    { to: "/", icon: Home, label: t("nav.home", language) },
    { to: "/gps", icon: MapPin, label: t("nav.gps", language) },
    { to: "/news", icon: Newspaper, label: t("nav.news", language) },
    { to: "/timeline", icon: Clock, label: t("nav.timeline", language) },
    { to: "/ask", icon: MessageSquare, label: t("nav.ask", language) },
    { to: "/candidate", icon: Search, label: t("nav.candidate", language) },
    { to: "/learn", icon: BookOpen, label: t("nav.learn", language) },
    { to: "/panic", icon: AlertTriangle, label: t("nav.panic", language) },
  ];

  return (
    <aside className="hidden md:flex flex-col w-64 h-screen glass border-r z-20 fixed left-0 top-0 pt-4">
      <div className="flex items-center justify-between px-6 mb-6">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🔍</span>
          <h1 className="font-bold text-xl tracking-tight text-slate-800">LokLens AI</h1>
        </div>
      </div>
      
      <div className="px-6 mb-6 flex gap-1">
        <button onClick={() => setLanguage('en')} className={cn("text-xs font-bold px-2 py-1 object-cover rounded-md transition-all border", language === 'en' ? "bg-blue-600 text-white border-blue-600" : "bg-white text-slate-600 border-slate-200")}>EN</button>
        <button onClick={() => setLanguage('hi')} className={cn("text-xs font-bold px-2 py-1 object-cover rounded-md transition-all border", language === 'hi' ? "bg-blue-600 text-white border-blue-600" : "bg-white text-slate-600 border-slate-200")}>हिं</button>
        <button onClick={() => setLanguage('mr')} className={cn("text-xs font-bold px-2 py-1 object-cover rounded-md transition-all border", language === 'mr' ? "bg-blue-600 text-white border-blue-600" : "bg-white text-slate-600 border-slate-200")}>म</button>
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto">
        {links.map((link) => {
          const Icon = link.icon;
          const isActive = location.pathname === link.to;
          return (
            <Link
              key={link.to}
              to={link.to}
              className={cn(
                "px-4 py-3 flex items-center gap-3 cursor-pointer transition-colors",
                isActive 
                  ? "sidebar-active rounded-l-none rounded-r-lg text-blue-900 font-semibold" 
                  : "text-slate-600 hover:bg-slate-100/50 rounded-lg mx-2"
              )}
            >
              <Icon className="w-5 h-5 opacity-80" />
              <span className="text-sm font-medium">{link.label}</span>
            </Link>
          );
        })}
      </nav>
      <div className="mt-auto p-4">
        <div className="glass rounded-xl p-3 text-[10px] space-y-1.5 border-slate-200">
          <p className="font-bold text-slate-800 uppercase tracking-widest">Legal Grounding</p>
          <p className="text-slate-500">Updates: ECI 2024</p>
          <div className="flex items-center gap-1 text-green-600 font-medium">
            <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div> Verified Source
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
        <div className="min-h-screen bg-transparent flex flex-row overflow-hidden relative">
          
          <div className="md:hidden absolute top-4 right-4 z-[60] flex gap-1">
            <LanguageSwitcherMobile />
          </div>

          <Sidebar />
          <main className="flex-1 md:ml-64 h-screen p-4 md:p-8 relative flex flex-col overflow-y-auto overflow-x-hidden pb-20 md:pb-8">
            <Routes>
              <Route path="/" element={<DashboardView />} />
              <Route path="/gps" element={<GpsView />} />
              <Route path="/news" element={<NewsView />} />
              <Route path="/ask" element={<ChatView />} />
              <Route path="/learn" element={<LearnView />} />
              <Route path="/panic" element={<PanicView />} />
              <Route path="/timeline" element={<TimelineView />} />
              <Route path="/candidate" element={<CandidateView />} />
            </Routes>
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
