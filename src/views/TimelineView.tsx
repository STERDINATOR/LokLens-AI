import { useState, useEffect } from "react";
import { Clock, Calendar, CheckCircle2, ChevronRight, Activity, Search, Globe, Map, Building2, ArrowLeft } from "lucide-react";
import { motion } from "motion/react";
import { LegalTerm } from "@/src/components/LegalTerm";

export default function TimelineView() {
  const [selectedElection, setSelectedElection] = useState<string | null>(null);
  const [timeUpdate, setTimeUpdate] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setTimeUpdate(t => t + 1), 1000);
    return () => clearInterval(timer);
  }, []);

  const ELECTIONS = [
    {
      id: "mh-assembly",
      name: "Maharashtra Assembly Elections",
      type: "state",
      icon: Map,
      color: "bg-orange-500",
      date: new Date(new Date().getTime() + 14 * 24 * 60 * 60 * 1000 + 8 * 60 * 60 * 1000), // 14 days + 8 hrs
      status: "active",
      tags: ["State", "Legislative Assembly"],
      stage: "Campaigning",
      stages: [
        { name: "Delimitation", status: "completed", desc: "Redrawing of boundaries map.", term: "DELIMITATION" },
        { name: "Voter List Revision", status: "completed", desc: "Addition/deletion of names in electoral roll." },
        { name: "Schedule Announcement", status: "completed", desc: "ECI announces election dates." },
        { name: "MCC Begins", status: "completed", desc: "Guidelines for parties enforced.", term: "MCC" },
        { name: "Nomination Filing", status: "completed", desc: "Candidates file their papers." },
        { name: "Scrutiny", status: "completed", desc: "Checking of nomination validities." },
        { name: "Withdrawal", status: "completed", desc: "Last date to withdraw candidacy." },
        { name: "Campaigning", status: "active", desc: "Public rallies, manifestos, canvassing." },
        { name: "Silence Period", status: "upcoming", desc: "48 hours before polling ends. No campaigning." },
        { name: "Polling Day", status: "upcoming", desc: "Citizens cast their votes via EVM.", term: "EVM" },
        { name: "Counting", status: "upcoming", desc: "Votes are counted and results declared." },
        { name: "Government Formation", status: "upcoming", desc: "Majority party stakes claim." }
      ]
    },
    {
      id: "national",
      name: "General Elections (Lok Sabha)",
      type: "national",
      icon: Globe,
      color: "bg-blue-600",
      date: new Date(new Date().setFullYear(new Date().getFullYear() + 4)),
      status: "upcoming",
      tags: ["National", "Parliament"],
      stage: "Pre-Election",
      stages: []
    },
    {
      id: "pmc",
      name: "Pune Municipal Corporation",
      type: "local",
      icon: Building2,
      color: "bg-green-600",
      date: new Date(new Date().getTime() + 90 * 24 * 60 * 60 * 1000), // ~3 months
      status: "upcoming",
      tags: ["Local Body", "Civic"],
      stage: "Delimitation",
      stages: []
    }
  ];

  const formatCountdown = (targetDate: Date) => {
    const difference = targetDate.getTime() - new Date().getTime();
    if (difference < 0) return { days: 0, hours: 0, mins: 0, secs: 0 };
    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
      mins: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
      secs: Math.floor((difference % (1000 * 60)) / 1000)
    };
  };

  if (selectedElection) {
    const election = ELECTIONS.find(e => e.id === selectedElection)!;
    const timeLeft = formatCountdown(election.date);
    
    return (
      <div className="max-w-5xl mx-auto w-full h-full pb-20">
        <header className="mb-8 p-6 glass border border-white/50 rounded-3xl">
          <button 
            onClick={() => setSelectedElection(null)}
            className="mb-4 flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-slate-800 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Global Calendar
          </button>
          
          <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-3 mb-2">
            <election.icon className={`w-8 h-8 text-${election.color.split('-')[1]}-600`} />
            {election.name} Timeline
          </h1>
          <p className="text-slate-600 font-medium">Track every stage of this election cycle in real-time.</p>
          
          <div className="mt-6 flex flex-col md:flex-row gap-6">
            <div className="flex-1 bg-white/40 border border-white/60 p-4 rounded-2xl flex items-center gap-3 shadow-inner">
              <Search className="w-5 h-5 text-slate-500 shrink-0" />
              <input 
                type="text" 
                placeholder="Ask about a stage: 'When does the silence period start?'"
                className="bg-transparent border-none outline-none w-full text-slate-800 font-medium"
              />
              <button className={`${election.color} text-white px-4 py-2 rounded-xl text-sm font-bold shadow-md opacity-90 hover:opacity-100 transition`}>Ask</button>
            </div>
            
            <div className={`${election.color} text-white p-4 rounded-2xl flex flex-col justify-center items-center shrink-0 orb-glow shadow-lg relative overflow-hidden min-w-[250px]`}>
              <div className="absolute -right-4 -top-4 w-16 h-16 bg-white/20 rounded-full blur-xl"></div>
              <p className="text-white/80 text-xs font-bold uppercase tracking-widest mb-1">Polling Day In</p>
              <div className="flex gap-3 text-center">
                <div className="flex flex-col"><span className="text-2xl font-bold leading-none">{timeLeft.days}</span><span className="text-[10px] text-white/70">DAYS</span></div>
                <span className="text-xl font-bold opacity-50">:</span>
                <div className="flex flex-col"><span className="text-2xl font-bold leading-none">{timeLeft.hours}</span><span className="text-[10px] text-white/70">HRS</span></div>
                <span className="text-xl font-bold opacity-50">:</span>
                <div className="flex flex-col"><span className="text-2xl font-bold leading-none">{timeLeft.mins}</span><span className="text-[10px] text-white/70">MIN</span></div>
                <span className="text-xl font-bold opacity-50">:</span>
                <div className="flex flex-col"><span className="text-2xl font-bold leading-none">{timeLeft.secs}</span><span className="text-[10px] text-white/70">SEC</span></div>
              </div>
            </div>
          </div>
        </header>

        {election.stages.length > 0 ? (
          <div className="glass border border-white/50 p-8 rounded-3xl relative">
            <div className="absolute top-8 bottom-8 left-[39px] md:left-[50%] w-1 bg-white/50 rounded-full md:-translate-x-1/2"></div>
            
            <div className="space-y-8 relative">
              {election.stages.map((stage, i) => {
                const isLeft = i % 2 === 0;
                return (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    key={i} 
                    className={`flex flex-col md:flex-row items-center gap-6 ${isLeft ? 'md:flex-row-reverse' : ''}`}
                  >
                    <div className={`md:w-1/2 w-full pl-16 md:pl-0 flex ${isLeft ? 'md:justify-start' : 'md:justify-end'}`}>
                      <div className={`
                        p-5 rounded-2xl border backdrop-blur-sm w-full md:w-[90%] shadow-sm transition-all
                        ${stage.status === 'completed' ? 'bg-white/40 border-white/60' : ''}
                        ${stage.status === 'active' ? 'bg-blue-50/80 border-blue-200 shadow-md transform scale-105' : ''}
                        ${stage.status === 'upcoming' ? 'bg-slate-50/30 border-slate-200/50 opacity-70' : ''}
                      `}>
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className={`font-bold text-lg ${stage.status === 'active' ? 'text-blue-900' : 'text-slate-800'}`}>
                            {stage.name}
                          </h3>
                          {stage.term && <LegalTerm term={stage.term}><span className="text-xs bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded cursor-pointer">What's this?</span></LegalTerm>}
                        </div>
                        <p className={`text-sm ${stage.status === 'active' ? 'text-blue-700' : 'text-slate-600'}`}>{stage.desc}</p>
                      </div>
                    </div>
                    
                    <div className="absolute left-[39px] md:left-[50%] w-8 h-8 rounded-full border-4 border-slate-100 flex items-center justify-center bg-white -translate-x-1/2 z-10 shadow-sm">
                      {stage.status === 'completed' && <CheckCircle2 className="w-5 h-5 text-green-500" />}
                      {stage.status === 'active' && <div className="w-3 h-3 bg-blue-600 rounded-full animate-pulse"></div>}
                      {stage.status === 'upcoming' && <div className="w-2 h-2 bg-slate-300 rounded-full"></div>}
                    </div>
                    
                    <div className="md:w-1/2 hidden md:block"></div>
                  </motion.div>
                )
              })}
            </div>
          </div>
        ) : (
          <div className="glass border border-white/50 p-8 rounded-3xl text-center">
             <Calendar className="w-16 h-16 text-slate-300 mx-auto mb-4" />
             <h3 className="text-xl font-bold text-slate-700">Timeline Not Available</h3>
             <p className="text-slate-500">The detailed stage timeline for this election has not been announced yet.</p>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto w-full h-full pb-20">
      <header className="mb-8 p-6 glass border border-white/50 rounded-3xl">
        <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-3 mb-2">
          <Calendar className="w-8 h-8 text-blue-600" />
          Interactive Election Calendar
        </h1>
        <p className="text-slate-600 font-medium">Global view of all upcoming National, State, and Local elections.</p>
      </header>

      <div className="space-y-6">
        {ELECTIONS.map((election) => {
          const timeLeft = formatCountdown(election.date);
          const Icon = election.icon;

          return (
            <motion.div 
              key={election.id}
              whileHover={{ y: -5 }}
              onClick={() => setSelectedElection(election.id)}
              className="glass p-6 rounded-3xl border border-white/50 shadow-sm cursor-pointer hover:border-blue-300 transition-all flex flex-col md:flex-row items-center gap-6 relative overflow-hidden group"
            >
              <div className={`absolute top-0 bottom-0 left-0 w-2 ${election.color}`}></div>
              
              <div className={`w-16 h-16 rounded-2xl ${election.color} text-white flex items-center justify-center shrink-0 shadow-md`}>
                <Icon className="w-8 h-8" />
              </div>
              
              <div className="flex-1 text-center md:text-left">
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 mb-2">
                  <h3 className="text-2xl font-bold text-slate-800 group-hover:text-blue-700 transition-colors">{election.name}</h3>
                  {election.status === 'active' && <span className="bg-red-100 text-red-600 text-[10px] px-2 py-0.5 rounded-full font-bold uppercase flex items-center gap-1"><span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse"></span> Live</span>}
                </div>
                
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 mb-3">
                  {election.tags.map(tag => (
                    <span key={tag} className="bg-slate-200 text-slate-700 px-2 py-1 rounded text-xs font-bold">{tag}</span>
                  ))}
                </div>
                
                <p className="text-sm font-semibold text-slate-500">Current Phase: <span className="text-slate-800">{election.stage}</span></p>
              </div>

              <div className="text-center bg-white/50 p-4 rounded-2xl border border-white/50 min-w-[200px]">
                 <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Countdown</p>
                 <div className="flex gap-2 justify-center">
                    <div className="flex flex-col"><span className="text-xl font-bold text-slate-800 leading-none">{timeLeft.days}</span><span className="text-[10px] text-slate-500">D</span></div>
                    <span className="text-lg font-bold text-slate-300">:</span>
                    <div className="flex flex-col"><span className="text-xl font-bold text-slate-800 leading-none">{timeLeft.hours}</span><span className="text-[10px] text-slate-500">H</span></div>
                    <span className="text-lg font-bold text-slate-300">:</span>
                    <div className="flex flex-col"><span className="text-xl font-bold text-slate-800 leading-none">{timeLeft.mins}</span><span className="text-[10px] text-slate-500">M</span></div>
                    <span className="text-lg font-bold text-slate-300">:</span>
                    <div className="flex flex-col"><span className="text-xl font-bold text-slate-800 leading-none">{timeLeft.secs}</span><span className="text-[10px] text-slate-500">S</span></div>
                 </div>
              </div>
              
              <ChevronRight className="w-6 h-6 text-slate-300 group-hover:text-blue-500 transition-colors hidden md:block" />
            </motion.div>
          )
        })}
      </div>
    </div>
  );
}
