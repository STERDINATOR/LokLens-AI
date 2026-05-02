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
        <header className="mb-10 p-8 glass border border-slate-200/60 rounded-[2.5rem] shadow-[0_8px_30px_rgb(15,23,42,0.04)] bg-white/80 backdrop-blur-xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-slate-100 rounded-full blur-3xl pointer-events-none transform -translate-y-1/2 translate-x-1/2 opacity-50 group-hover:opacity-100 transition-opacity duration-700" />
          <button 
            onClick={() => setSelectedElection(null)}
            className="mb-8 flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-slate-900 transition-colors bg-white border border-slate-200 px-4 py-2 rounded-full shadow-sm hover:shadow w-fit relative z-10"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Global Calendar
          </button>
          
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 flex items-center gap-4 mb-3 tracking-tighter relative z-10">
            <div className={`w-16 h-16 ${election.color} text-white rounded-[1.25rem] flex items-center justify-center shadow-lg shrink-0`}>
              <election.icon className="w-8 h-8" />
            </div>
            {election.name} Timeline
          </h1>
          <p className="text-lg text-slate-600 font-medium ml-[5.5rem] relative z-10">Track every stage of this election cycle in real-time.</p>
          
          <div className="mt-10 flex flex-col md:flex-row gap-6 relative z-10">
            <div className="flex-1 bg-white border border-slate-200 p-3 rounded-[1.5rem] flex items-center gap-3 shadow-inner shadow-slate-100 focus-within:border-blue-300 focus-within:ring-2 focus-within:ring-blue-100 transition-all">
              <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center ml-1 border border-slate-100">
                <Search className="w-5 h-5 text-slate-400 shrink-0" />
              </div>
              <input 
                type="text" 
                placeholder="Ask about a stage: 'When does the silence period start?'"
                className="bg-transparent border-none outline-none w-full text-slate-800 font-medium placeholder:text-slate-400"
              />
              <button className={`${election.color} text-white px-6 py-3 mr-1 rounded-[1.25rem] text-sm font-bold shadow-md hover:scale-105 transition-transform`}>Ask AI</button>
            </div>
            
            <div className={`${election.color} text-white p-5 rounded-[1.5rem] flex flex-col justify-center items-center shrink-0 shadow-lg relative overflow-hidden min-w-[280px]`}>
              <div className="absolute -right-4 -top-4 w-24 h-24 bg-white/20 rounded-full blur-xl mix-blend-screen"></div>
              <p className="text-white/80 text-xs font-black uppercase tracking-widest mb-2">Polling Day In</p>
              <div className="flex gap-4 text-center items-end">
                <div className="flex flex-col"><span className="text-3xl font-black leading-none drop-shadow-md">{timeLeft.days}</span><span className="text-[10px] font-bold text-white/80 mt-1">DAYS</span></div>
                <span className="text-2xl font-bold opacity-50 drop-shadow-sm">:</span>
                <div className="flex flex-col"><span className="text-3xl font-black leading-none drop-shadow-md">{timeLeft.hours}</span><span className="text-[10px] font-bold text-white/80 mt-1">HRS</span></div>
                <span className="text-2xl font-bold opacity-50 drop-shadow-sm">:</span>
                <div className="flex flex-col"><span className="text-3xl font-black leading-none drop-shadow-md">{timeLeft.mins}</span><span className="text-[10px] font-bold text-white/80 mt-1">MIN</span></div>
                <span className="text-2xl font-bold opacity-50 drop-shadow-sm">:</span>
                <div className="flex flex-col w-8"><span className="text-3xl font-black leading-none drop-shadow-md">{timeLeft.secs}</span><span className="text-[10px] font-bold text-white/80 mt-1">SEC</span></div>
              </div>
            </div>
          </div>
        </header>

        {election.stages.length > 0 ? (
          <div className="bg-white/80 backdrop-blur-xl border border-slate-200 p-8 md:p-12 rounded-[3rem] relative shadow-[0_8px_30px_rgb(15,23,42,0.04)] overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-slate-50 rounded-full blur-3xl pointer-events-none opacity-50" />
            <div className="absolute top-12 bottom-12 left-[44px] md:left-[50%] w-1.5 bg-slate-100 rounded-full md:-translate-x-1/2"></div>
            
            <div className="space-y-10 relative">
              {election.stages.map((stage, i) => {
                const isLeft = i % 2 === 0;
                return (
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    key={i} 
                    className={`flex flex-col md:flex-row items-start md:items-center gap-8 ${isLeft ? 'md:flex-row-reverse' : ''}`}
                  >
                    <div className={`md:w-1/2 w-full pl-20 md:pl-0 flex ${isLeft ? 'md:justify-start' : 'md:justify-end'}`}>
                      <div className={`
                        p-6 md:p-8 rounded-[2rem] border transition-all duration-300 w-full md:w-[90%] relative group
                        ${stage.status === 'completed' ? 'bg-slate-50/50 border-slate-200' : ''}
                        ${stage.status === 'active' ? 'bg-white border-blue-200 shadow-[0_15px_35px_rgb(59,130,246,0.12)] ring-4 ring-blue-50 scale-[1.02] z-20' : ''}
                        ${stage.status === 'upcoming' ? 'bg-white/30 border-slate-100 opacity-60' : ''}
                      `}>
                        <div className="flex items-start justify-between gap-4 mb-3">
                          <h3 className={`font-black text-xl md:text-2xl leading-tight ${stage.status === 'active' ? 'text-blue-900' : 'text-slate-900'}`}>
                            {stage.name}
                          </h3>
                          {stage.status === 'active' && (
                            <span className="flex h-3 w-3 relative shrink-0 mt-2">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                              <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
                            </span>
                          )}
                        </div>
                        <p className={`text-base font-medium leading-relaxed mb-4 ${stage.status === 'active' ? 'text-blue-700/80' : 'text-slate-600'}`}>{stage.desc}</p>
                        
                        {stage.term && (
                          <LegalTerm term={stage.term} className={stage.status === 'active' ? 'bg-blue-600 text-white border-blue-500 shadow-md shadow-blue-200' : 'bg-slate-900 text-white border-slate-800'}>
                            <span className="text-[10px] font-black uppercase tracking-widest flex items-center gap-2 group-hover:gap-3 transition-all cursor-pointer">
                              Read Statute <ChevronRight className="w-3.5 h-3.5" />
                            </span>
                          </LegalTerm>
                        )}
                      </div>
                    </div>
                    
                    <div className={`
                      absolute left-[44px] md:left-[50%] w-12 h-12 rounded-2xl border-4 border-white flex items-center justify-center -translate-x-1/2 z-10 shadow-lg transition-transform duration-500
                      ${stage.status === 'completed' ? 'bg-emerald-500 scale-90' : ''}
                      ${stage.status === 'active' ? 'bg-blue-600 scale-110 rotate-12 shadow-blue-500/30' : ''}
                      ${stage.status === 'upcoming' ? 'bg-slate-200' : ''}
                    `}>
                      {stage.status === 'completed' && <CheckCircle2 className="w-6 h-6 text-white" />}
                      {stage.status === 'active' && <Activity className="w-6 h-6 text-white animate-pulse" />}
                      {stage.status === 'upcoming' && <div className="w-4 h-4 bg-slate-400/50 rounded-full"></div>}
                    </div>
                    
                    <div className="md:w-1/2 hidden md:block"></div>
                  </motion.div>
                )
              })}
            </div>
          </div>
        ) : (
          <div className="bg-white/80 backdrop-blur-xl border border-slate-200 p-16 rounded-[3rem] text-center max-w-2xl mx-auto shadow-sm">
             <div className="w-24 h-24 bg-slate-50 rounded-[2rem] flex items-center justify-center mx-auto mb-8 border border-slate-100">
               <Calendar className="w-12 h-12 text-slate-300" />
             </div>
             <h3 className="text-3xl font-black text-slate-900 mb-3 tracking-tight">Timeline Not Available</h3>
             <p className="text-lg text-slate-500 font-medium leading-relaxed">The detailed stage timeline for this election has not been announced by the ECI yet. Check back soon for updates.</p>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto w-full h-full pb-20">
      <header className="mb-10 bg-white/80 backdrop-blur-xl border border-slate-200/50 rounded-[2.5rem] p-8 md:p-10 shadow-[0_8px_30px_rgb(15,23,42,0.04)] relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-100 rounded-full blur-3xl pointer-events-none transform -translate-y-1/2 translate-x-1/2 opacity-50 group-hover:opacity-100 transition-opacity duration-700" />
        <h1 className="text-4xl md:text-5xl font-black text-slate-900 flex items-center gap-4 mb-3 tracking-tighter relative z-10">
          <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-[1.25rem] flex items-center justify-center border border-blue-100 shadow-sm shrink-0">
             <Calendar className="w-8 h-8" />
          </div>
          Interactive Election Calendar
        </h1>
        <p className="text-lg text-slate-600 font-medium ml-[5.5rem] relative z-10">Global view of all upcoming National, State, and Local elections.</p>
      </header>

      <div className="space-y-6 relative z-10">
        {ELECTIONS.map((election) => {
          const timeLeft = formatCountdown(election.date);
          const Icon = election.icon;

          return (
            <motion.div 
              key={election.id}
              whileHover={{ y: -5, scale: 1.01 }}
              onClick={() => setSelectedElection(election.id)}
              className="bg-white/90 backdrop-blur-xl p-8 rounded-[2.5rem] border border-slate-200 shadow-[0_8px_30px_rgb(15,23,42,0.04)] hover:shadow-[0_20px_40px_rgb(15,23,42,0.08)] cursor-pointer transition-all flex flex-col md:flex-row items-center gap-8 relative overflow-hidden group"
            >
              <div className={`absolute top-0 bottom-0 left-0 w-3 shadow-[0_0_20px_inherit] ${election.color}`}></div>
              
              <div className={`w-20 h-20 rounded-[1.5rem] ${election.color} text-white flex items-center justify-center shrink-0 shadow-lg ring-4 ring-white group-hover:scale-110 group-hover:-rotate-6 transition-transform duration-500`}>
                <Icon className="w-10 h-10" />
              </div>
              
              <div className="flex-1 text-center md:text-left z-10">
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mb-3">
                  <h3 className="text-3xl font-extrabold text-slate-900 group-hover:text-blue-600 transition-colors tracking-tight">{election.name}</h3>
                  {election.status === 'active' && <span className="bg-red-50 text-red-600 border border-red-100 text-[10px] px-3 py-1 rounded-full font-black uppercase flex items-center gap-1.5 shadow-sm"><span className="w-2 h-2 bg-red-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(239,68,68,0.8)]"></span> Live Countdown</span>}
                </div>
                
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 mb-4">
                  {election.tags.map(tag => (
                    <span key={tag} className="bg-slate-100 border border-slate-200 text-slate-700 px-3 py-1.5 rounded-xl text-xs font-bold shadow-sm">{tag}</span>
                  ))}
                </div>
                
                <p className="text-base font-bold text-slate-500 flex items-center justify-center md:justify-start gap-2">
                  Current Phase: <span className="text-slate-800 bg-slate-100 px-3 py-1 rounded-lg">{election.stage}</span>
                </p>
              </div>

              <div className="text-center bg-slate-50 p-5 rounded-[2rem] border border-slate-200 min-w-[240px] shadow-inner group-hover:bg-blue-50/50 group-hover:border-blue-100 transition-colors">
                 <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-3">Time Remaining</p>
                 <div className="flex gap-3 justify-center">
                    <div className="flex flex-col"><span className="text-3xl font-black text-slate-800 leading-none group-hover:text-blue-600 transition-colors">{timeLeft.days}</span><span className="text-[10px] font-bold text-slate-400 mt-1">DAYS</span></div>
                    <span className="text-2xl font-bold text-slate-300 mt-1">:</span>
                    <div className="flex flex-col"><span className="text-3xl font-black text-slate-800 leading-none group-hover:text-blue-600 transition-colors">{timeLeft.hours}</span><span className="text-[10px] font-bold text-slate-400 mt-1">HRS</span></div>
                    <span className="text-2xl font-bold text-slate-300 mt-1">:</span>
                    <div className="flex flex-col"><span className="text-3xl font-black text-slate-800 leading-none group-hover:text-blue-600 transition-colors">{timeLeft.mins}</span><span className="text-[10px] font-bold text-slate-400 mt-1">MIN</span></div>
                    <span className="text-2xl font-bold text-slate-300 mt-1">:</span>
                    <div className="flex flex-col w-6"><span className="text-3xl font-black text-slate-800 leading-none group-hover:text-blue-600 transition-colors">{timeLeft.secs}</span><span className="text-[10px] font-bold text-slate-400 mt-1">SEC</span></div>
                 </div>
              </div>
              
              <ChevronRight className="w-8 h-8 text-slate-300 group-hover:text-blue-500 group-hover:translate-x-2 transition-all hidden lg:block ml-2" />
            </motion.div>
          )
        })}
      </div>
    </div>
  );
}
