import { Link } from "react-router-dom";
import { Vote, MapPin, Scale, Search, Flag, Book, MessageSquare, Bell, Clock, AlertTriangle, Newspaper } from "lucide-react";
import { motion } from "motion/react";
import { LegalTerm } from "@/src/components/LegalTerm";
import { useLanguage } from "@/src/contexts/LanguageContext";
import { t } from "@/src/lib/translations";

export default function DashboardView() {
  const { language } = useLanguage();

  const OTB_FEATURES = [
    { icon: Newspaper, title: t("nav.news", language), desc: "Live AI curated feed", color: "text-blue-600 bg-blue-100 ring-blue-200", route: "/news" },
    { icon: Clock, title: t("nav.timeline", language), desc: "View dynamic timeline", color: "text-indigo-600 bg-indigo-100 ring-indigo-200", route: "/timeline" },
    { icon: MapPin, title: t("nav.gps", language), desc: "Forms and Booth finder", color: "text-green-600 bg-green-100 ring-green-200", route: "/gps" },
    { icon: Scale, title: t("nav.learn", language), desc: "Constitutional protections", color: "text-slate-800 bg-slate-200 ring-slate-300", route: "/learn" },
    { icon: Search, title: t("nav.candidate", language), desc: "Analyze affidavits & cases", color: "text-purple-600 bg-purple-100 ring-purple-200", route: "/candidate" },
    { icon: AlertTriangle, title: t("nav.panic", language), desc: "Missing name, wrong booth", color: "text-red-600 bg-red-100 ring-red-200", route: "/panic" },
    { icon: Flag, title: "Vote Myth Buster", desc: "Facts vs Viral Fakes", color: "text-orange-600 bg-orange-100 ring-orange-200", route: "/ask?q=myth" },
  ];

  return (
    <div className="max-w-7xl mx-auto w-full">
      <header className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-navy">Citizen Command Center</h1>
          <p className="text-muted-foreground mt-1">Your gateway to Indian democracy.</p>
        </div>
        <button className="glass p-2 border border-white/50 rounded-full shadow-sm hover:bg-white/40 transition-colors flex items-center justify-center">
          <Bell className="w-5 h-5 text-slate-800" />
        </button>
      </header>

      {/* Hero Section */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full glass text-slate-900 border border-slate-200/50 rounded-3xl p-8 mb-10 overflow-hidden relative shadow-lg"
      >
        <div className="z-10 relative md:w-2/3">
          <h2 className="text-2xl md:text-3xl font-bold mb-3 text-slate-800">{t("app.title", language)}</h2>
          <p className="text-slate-600 mb-6 text-sm md:text-base leading-relaxed">
            The <LegalTerm term="MCC">Model Code of Conduct</LegalTerm> is now active. Find your polling booth, verify your <LegalTerm term="EPIC">EPIC</LegalTerm> status on the electoral roll, and get ready to vote.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link to="/gps" className="px-5 py-2.5 bg-blue-600 text-white rounded-lg font-medium text-sm hover:bg-blue-700 transition-colors shadow-sm">
              Find Polling Booth
            </Link>
            <Link to="/ask" className="px-5 py-2.5 bg-white/50 hover:bg-white/80 text-blue-900 rounded-lg font-bold text-sm transition-colors border border-blue-200 backdrop-blur-sm">
              Ask AI Assistant
            </Link>
          </div>
        </div>
        
        {/* Decorative circle */}
        <div className="absolute right-0 top-0 w-64 h-64 bg-gradient-to-br from-saffron/20 to-india-green/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4" />
      </motion.div>

      {/* Modules */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {OTB_FEATURES.map((feature, i) => {
          const Icon = feature.icon;
          return (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              key={i}
            >
              <Link 
                to={feature.route}
                className="block glass p-6 rounded-3xl border border-white/50 shadow-sm hover:shadow-lg transition-all hover:-translate-y-1 h-full group"
              >
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-5 ring-1 ring-inset ${feature.color}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-base text-slate-800 group-hover:text-blue-600 transition-colors">{feature.title}</h3>
                <p className="text-xs font-medium text-slate-500 mt-1">{feature.desc}</p>
              </Link>
            </motion.div>
          );
        })}
      </div>
      
      {/* Quick Action */}
      <div className="mt-10 mb-8 glass border-blue-200/50 rounded-3xl p-6 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm">
        <div>
          <h3 className="font-bold text-lg text-blue-900 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
            First Time Voter?
          </h3>
          <p className="text-sm text-slate-600 mt-1">Turned 18 recently? Let's get you registered and ready in 5 minutes.</p>
        </div>
        <Link to="/ask?q=first-time-voter" className="shrink-0 px-6 py-3 bg-blue-600 text-white rounded-xl font-medium text-sm hover:bg-blue-700 transition-colors shadow-md">
          Start Checklist
        </Link>
      </div>

    </div>
  );
}
