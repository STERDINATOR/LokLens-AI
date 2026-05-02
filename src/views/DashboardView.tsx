import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Vote, MapPin, Scale, Search, Flag, Book, MessageSquare, Bell, Clock, AlertTriangle, Newspaper, ChevronRight } from "lucide-react";
import { motion } from "motion/react";
import { LegalTerm } from "@/src/components/LegalTerm";
import { useLanguage } from "@/src/contexts/LanguageContext";
import { t } from "@/src/lib/translations";
import { getLiveNews } from "@/src/services/geminiService";

export default function DashboardView() {
  const { language, langName } = useLanguage();
  const navigate = useNavigate();
  const [news, setNews] = useState<any[]>([]);
  const [loadingNews, setLoadingNews] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      setLoadingNews(true);
      try {
        const data = await getLiveNews(langName);
        setNews(data);
      } catch (e) {
        console.error("Failed to fetch news on dashboard", e);
      }
      setLoadingNews(false);
    };
    fetchNews();
  }, [langName]);

  const OTB_FEATURES = [
    { icon: Newspaper, title: t("nav.news", language), desc: "Live AI curated feed", color: "text-blue-600 bg-blue-100 ring-blue-200 shadow-blue-500/20", route: "/news" },
    { icon: Clock, title: t("nav.timeline", language), desc: "View dynamic timeline", color: "text-indigo-600 bg-indigo-100 ring-indigo-200 shadow-indigo-500/20", route: "/timeline" },
    { icon: MapPin, title: t("nav.gps", language), desc: "Forms and Booth finder", color: "text-green-600 bg-green-100 ring-green-200 shadow-green-500/20", route: "/gps" },
    { icon: Scale, title: t("nav.learn", language), desc: "Constitutional protections", color: "text-slate-800 bg-slate-200 ring-slate-300 shadow-slate-500/20", route: "/learn" },
    { icon: Search, title: t("nav.candidate", language), desc: "Analyze affidavits & cases", color: "text-purple-600 bg-purple-100 ring-purple-200 shadow-purple-500/20", route: "/candidate" },
    { icon: AlertTriangle, title: t("nav.panic", language), desc: "Missing name, wrong booth", color: "text-red-600 bg-red-100 ring-red-200 shadow-red-500/20", route: "/panic" },
    { icon: Flag, title: "Vote Myth Buster", desc: "Facts vs Viral Fakes", color: "text-orange-600 bg-orange-100 ring-orange-200 shadow-orange-500/20", route: "/ask?q=myth" },
  ];

  return (
    <div className="max-w-7xl mx-auto w-full">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 pb-6 border-b border-slate-200/50 gap-4">
        <div>
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter mb-2">Citizen Command Center</h1>
          <p className="text-slate-500 font-extrabold uppercase tracking-widest text-xs flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" /> Your gateway to Indian democracy.
          </p>
        </div>
        <button className="bg-white p-4 border border-slate-200 rounded-[1.25rem] shadow-[0_4px_14px_rgb(15,23,42,0.06)] hover:shadow-md transition-all flex items-center justify-center group shrink-0">
          <Bell className="w-6 h-6 text-slate-600 group-hover:text-blue-600 transition-colors" />
        </button>
      </header>

      {/* Hero Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-950 text-white rounded-[3rem] p-10 md:p-16 mb-12 overflow-hidden relative shadow-[0_20px_50px_rgba(15,23,42,0.5)] border border-slate-700/50"
      >
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/20 rounded-full blur-[100px] pointer-events-none mix-blend-screen translate-x-1/3 -translate-y-1/3" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-purple-500/20 rounded-full blur-[100px] pointer-events-none mix-blend-screen translate-x-1/4 translate-y-1/4" />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay" />

        <div className="z-10 relative md:w-3/4 lg:w-2/3">
          <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-blue-500/10 border border-blue-400/20 text-blue-300 text-xs font-black uppercase tracking-widest mb-10 backdrop-blur-md shadow-inner">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_12px_rgba(52,211,153,0.8)]" /> Active Session
          </div>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-black mb-8 leading-[1.05] tracking-tighter">
            Democracy is not a <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400">spectacle.</span>
          </h2>
          <p className="text-blue-100/90 mb-12 max-w-xl text-xl font-medium leading-relaxed">
            Verify your polling booth, decode <LegalTerm term="RPA Rules" description="Representation of the People Act, 1951 - Governs elections in India" className="text-white border-b border-dashed border-blue-400/50 hover:border-blue-400" />, and interrogate candidate affidavits instantly.
          </p>
          <div className="flex flex-col sm:flex-row gap-5">
            <Link to="/gps" className="px-8 py-5 bg-white text-slate-900 rounded-[2rem] font-black text-xl hover:shadow-[0_0_30px_rgba(255,255,255,0.4)] hover:scale-105 transition-all text-center group flex items-center justify-center gap-3 ring-4 ring-white/10">
              <MapPin className="w-6 h-6 group-hover:animate-bounce" /> Find Polling Booth
            </Link>
            <Link to="/ask" className="px-8 py-5 bg-white/10 hover:bg-white/20 text-white rounded-[2rem] font-bold text-xl transition-all border border-white/20 backdrop-blur-md text-center flex items-center justify-center gap-3 group ring-4 ring-transparent hover:ring-white/10">
              <MessageSquare className="w-6 h-6 group-hover:scale-110 transition-transform" /> Ask AI Co-Pilot
            </Link>
          </div>
        </div>
      </motion.div>

      {/* Modules */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 relative z-10">
        {OTB_FEATURES.map((feature, i) => {
          const Icon = feature.icon;
          return (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05 }}
              key={i}
            >
              <Link 
                to={feature.route}
                className={`block bg-white/80 backdrop-blur-xl p-8 rounded-[2.5rem] border hover:border-slate-300 transition-all hover:-translate-y-2 h-full group relative overflow-hidden ${
                  feature.title === 'Candidate X-Ray' ? 'md:col-span-2 xl:col-span-1 border-blue-200 shadow-[0_8px_30px_rgb(59,130,246,0.1)] hover:shadow-[0_20px_40px_rgb(59,130,246,0.2)]' : 'border-white shadow-[0_8px_30px_rgb(15,23,42,0.04)] hover:shadow-[0_20px_40px_rgb(15,23,42,0.08)]'
                }`}
              >
                <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-slate-100 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-full blur-3xl -translate-y-10 translate-x-10 pointer-events-none" />
                
                <div className={`w-16 h-16 rounded-[1.5rem] flex items-center justify-center mb-6 ring-1 ring-black/5 shadow-sm group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-500 ${feature.color}`}>
                  <Icon className="w-8 h-8" />
                </div>
                <h3 className="font-extrabold text-2xl text-slate-900 group-hover:text-blue-600 transition-colors tracking-tight mb-3">{feature.title}</h3>
                <p className="text-base font-medium text-slate-500 leading-relaxed">{feature.desc}</p>
              </Link>
            </motion.div>
          );
        })}
      </div>
      
      {/* Quick Action */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-16 mb-16 bg-gradient-to-r from-blue-600 to-indigo-700 text-white border border-blue-500 rounded-[3rem] p-10 md:p-14 flex flex-col md:flex-row items-center justify-between gap-10 shadow-[0_20px_40px_rgba(59,130,246,0.3)] relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-3xl pointer-events-none transform -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-900/30 rounded-full blur-3xl pointer-events-none transform translate-y-1/3 -translate-x-1/3" />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay" />
        
        <div className="flex flex-col sm:flex-row gap-8 items-center text-center sm:text-left relative z-10 w-full md:w-auto">
          <div className="w-24 h-24 bg-white/20 backdrop-blur-md text-white rounded-[2rem] flex items-center justify-center shrink-0 shadow-inner ring-4 ring-white/30 transform rotate-3">
            <Vote className="w-12 h-12" />
          </div>
          <div>
            <h3 className="font-black text-4xl text-white tracking-tight mb-3">
              First Time Voter?
            </h3>
            <p className="text-lg text-blue-100 font-medium max-w-lg leading-relaxed">Turned 18 recently? Let's get you registered and ready in 5 minutes with our AI checklist.</p>
          </div>
        </div>
        <Link to="/ask?q=first-time-voter" className="relative z-10 shrink-0 w-full md:w-auto px-10 py-5 bg-white text-blue-700 rounded-[2rem] font-black text-xl hover:bg-slate-50 shadow-[0_8px_30px_rgb(255,255,255,0.2)] hover:shadow-[0_15px_40px_rgb(255,255,255,0.3)] hover:scale-105 transition-all text-center flex items-center justify-center gap-3 group">
          Start Checklist <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
        </Link>
      </motion.div>

      {/* Latest News */}
      <div className="mt-16 mb-8 flex justify-between items-end px-2">
        <div>
          <h3 className="font-extrabold text-3xl text-slate-900 flex items-center gap-3 mb-2 tracking-tight">
            <Newspaper className="w-8 h-8 text-blue-600" /> Latest Feed
          </h3>
          <p className="text-sm text-slate-500 font-bold tracking-widest uppercase flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" /> Live AI Curated Updates
          </p>
        </div>
        <Link to="/news" className="text-sm font-bold text-blue-600 bg-blue-50 px-4 py-2 rounded-xl hover:bg-blue-100 flex items-center gap-2 transition-all group border border-blue-100">
          View All <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      {loadingNews ? (
        <div className="flex overflow-x-auto gap-6 pb-8 snap-x">
          {[1, 2, 3].map(i => (
            <div key={i} className="min-w-[320px] sm:min-w-[400px] bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm animate-pulse snap-center shrink-0">
              <div className="w-24 h-6 bg-slate-100 rounded-xl mb-6"></div>
              <div className="w-full h-8 bg-slate-200 rounded-xl mb-4"></div>
              <div className="w-4/5 h-8 bg-slate-100 rounded-xl mb-6"></div>
              <div className="w-full h-20 bg-slate-50 rounded-xl mb-6"></div>
              <div className="w-1/3 h-4 bg-slate-100 rounded-lg"></div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex overflow-x-auto gap-6 pb-8 snap-x no-scrollbar -mx-4 px-4 md:mx-0 md:px-0">
          {news.slice(0, 5).map((item, idx) => (
            <div 
              key={idx} 
              onClick={() => navigate('/news')}
              className="min-w-[320px] sm:min-w-[400px] bg-white p-8 rounded-[2.5rem] border border-slate-200 hover:border-blue-300 transition-all shadow-[0_8px_30px_rgb(15,23,42,0.04)] hover:shadow-[0_20px_40px_rgb(15,23,42,0.08)] cursor-pointer snap-center shrink-0 flex flex-col group relative overflow-hidden h-full"
            >
              <div className="absolute top-0 right-0 p-8 opacity-0 group-hover:opacity-100 transition-opacity translate-x-4 group-hover:translate-x-0 duration-300">
                 <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center border border-blue-100">
                   <ChevronRight className="w-5 h-5 text-blue-600" />
                 </div>
              </div>
              <div className="flex items-center justify-between mb-6">
                <span className="bg-slate-50 text-slate-700 border border-slate-200 px-4 py-1.5 rounded-xl text-[10px] font-extrabold uppercase tracking-widest">{item.source}</span>
              </div>
              <h4 className="font-extrabold text-2xl text-slate-900 mb-4 leading-[1.3] group-hover:text-blue-600 transition-colors line-clamp-3 pr-10">{item.title}</h4>
              <p className="text-base text-slate-600 font-medium line-clamp-3 mb-8 leading-relaxed opacity-80">{item.summary}</p>
              
              <div className="mt-auto flex items-center gap-2 text-xs text-slate-400 font-bold uppercase tracking-widest pt-6 border-t border-slate-100">
                <Clock className="w-4 h-4" />
                <span>{item.time}</span>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}
