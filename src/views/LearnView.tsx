import { useState } from "react";
import { Link } from "react-router-dom";
import { LegalTerm } from "@/src/components/LegalTerm";
import { BookOpen, Scale, FileText, CheckCircle2, Award, Star, ShieldAlert } from "lucide-react";
import { motion } from "motion/react";

export default function LearnView() {
  const [activeTab, setActiveTab] = useState("constitution");
  const [points, setPoints] = useState(0);
  const [quizState, setQuizState] = useState<{[key: number]: number}>({});

  const level = points < 100 ? "Cadet Voter" : points < 200 ? "Civic Scholar" : "Legal Eagle";
  const progress = points < 100 ? (points / 100) * 100 : points < 200 ? ((points - 100) / 100) * 100 : 100;
  
  const handleQuizAnswer = (quizIndex: number, optionIndex: number) => {
    if (quizState[quizIndex] !== undefined) return;
    setQuizState({ ...quizState, [quizIndex]: optionIndex });
    if (QUIZZES[quizIndex].answer === optionIndex) {
      setPoints(p => p + QUIZZES[quizIndex].points);
    }
  };

  const CONSTITUTION_ARTICLES = [
    { title: "Article 324", desc: "Superintendence, direction, and control of elections vested in an Election Commission.", tag: "Core Power" },
    { title: "Article 325", desc: "No person to be ineligible for inclusion in, or to claim to be included in a special, electoral roll on grounds of religion, race, caste or sex.", tag: "Equality" },
    { title: "Article 326", desc: "Elections to be on the basis of adult suffrage (18+ years).", tag: "Voting Right" }
  ];

  const JUDGMENTS = [
    { title: "PUCL vs Union of India (2013)", desc: "The Supreme Court recognized the right to negative voting. It directed the Election Commission to provide a 'None of the Above' option on EVMs.", term: "NOTA" },
    { title: "Lily Thomas vs Union of India (2013)", desc: "The Supreme Court ruled that any Member of Parliament (MP), Member of the Legislative Assembly (MLA) or Member of a Legislative Council (MLC) who is convicted of a crime and given a minimum of two years' imprisonment loses membership of the House with immediate effect." },
    { title: "ADR vs Union of India (2002)", desc: "The Supreme Court mandated that candidates contesting elections must declare their criminal records, financial assets and liabilities, and educational qualifications via affidavit.", term: "AFFIDAVIT" }
  ];

  const ACTS = [
    { title: "Representation of People Act, 1950", desc: "Deals with allocation of seats, delimitation, and voter registration." },
    { title: "Representation of People Act, 1951", desc: "Deals with conduct of elections, qualifications, and corrupt practices." },
    { title: "Tenth Schedule (Anti-Defection)", desc: "Provisions as to disqualification on ground of defection." }
  ];

  const QUIZZES = [
    { question: "What is the minimum voting age in India according to Article 326?", options: ["18 Years", "21 Years", "25 Years", "No Limit"], answer: 0, points: 50 },
    { question: "Which Article vests the power of superintendence, direction, and control of elections in the ECI?", options: ["Article 370", "Article 324", "Article 14", "Article 21"], answer: 1, points: 50 },
    { question: "Can you be denied voting rights solely based on religion, race, caste, or sex?", options: ["Yes, under special circumstances", "No, prohibited by Article 325", "Only if the State Election Commission allows", "Yes, for local elections"], answer: 1, points: 50 },
  ];

  return (
    <div className="max-w-5xl mx-auto w-full h-full overflow-y-auto">
      <header className="mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 text-blue-700 text-xs font-bold uppercase tracking-widest mb-4 border border-blue-100">
          <BookOpen className="w-4 h-4" />
          Constitution Mode
        </div>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 tracking-tighter mb-4 leading-tight">
          Explore the legal<br className="hidden md:block"/> foundation of <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Indian Democracy.</span>
        </h1>
        <p className="text-lg md:text-xl text-slate-600 font-medium max-w-2xl leading-relaxed">
          Learn about your rights, electoral laws, and historical judgments that shaped the nation.
        </p>
      </header>

      {/* Tabs */}
      <div className="flex space-x-2 bg-slate-100/50 p-2 rounded-[1.5rem] mb-12 w-fit shrink-0 overflow-x-auto shadow-inner border border-slate-200">
        <button 
          onClick={() => setActiveTab("constitution")}
          className={`px-6 py-3 rounded-[1rem] text-sm font-extrabold transition-all ${activeTab === 'constitution' ? 'bg-white text-blue-600 shadow-[0_4px_14px_rgb(15,23,42,0.08)]' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-200/50'}`}
        >
          Constitution
        </button>
        <button 
          onClick={() => setActiveTab("acts")}
          className={`px-6 py-3 rounded-[1rem] text-sm font-extrabold transition-all ${activeTab === 'acts' ? 'bg-white text-blue-600 shadow-[0_4px_14px_rgb(15,23,42,0.08)]' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-200/50'}`}
        >
          Acts & Rules
        </button>
        <button 
          onClick={() => setActiveTab("judgments")}
          className={`px-6 py-3 rounded-[1rem] text-sm font-extrabold transition-all ${activeTab === 'judgments' ? 'bg-white text-blue-600 shadow-[0_4px_14px_rgb(15,23,42,0.08)]' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-200/50'}`}
        >
          Landmark Judgments
        </button>
        <button 
          onClick={() => setActiveTab("quizzes")}
          className={`px-6 py-3 rounded-[1rem] text-sm font-extrabold transition-all flex items-center gap-2 ${activeTab === 'quizzes' ? 'bg-white text-blue-600 shadow-[0_4px_14px_rgb(15,23,42,0.08)]' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-200/50'}`}
        >
          <Award className="w-5 h-5 text-amber-500" /> Quizzes
        </button>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-6">
          {activeTab === "constitution" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
              {CONSTITUTION_ARTICLES.map((item, i) => (
                <div key={i} className="bg-white/80 backdrop-blur-xl border border-slate-200 p-8 rounded-[2rem] hover:border-blue-300 transition-all shadow-[0_8px_30px_rgb(15,23,42,0.04)] hover:shadow-md group">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-extrabold text-slate-900 group-hover:text-blue-600 transition-colors">{item.title}</h3>
                    <span className="px-4 py-1.5 bg-blue-50 text-blue-700 text-[10px] font-extrabold rounded-xl uppercase tracking-widest border border-blue-100">{item.tag}</span>
                  </div>
                  <p className="text-slate-600 font-medium leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </motion.div>
          )}

          {activeTab === "acts" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
              {ACTS.map((item, i) => (
                <div key={i} className="bg-white/80 backdrop-blur-xl border border-slate-200 p-8 rounded-[2rem] hover:border-indigo-300 transition-all shadow-[0_8px_30px_rgb(15,23,42,0.04)] hover:shadow-md group flex gap-5">
                  <div className="mt-1 w-12 h-12 bg-slate-50 text-slate-500 rounded-xl flex items-center justify-center shrink-0 border border-slate-200 group-hover:bg-indigo-50 group-hover:text-indigo-600 group-hover:border-indigo-200 transition-colors">
                     <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-xl font-extrabold text-slate-900 mb-2 leading-tight group-hover:text-indigo-600 transition-colors">{item.title}</h3>
                    <p className="text-slate-600 font-medium leading-relaxed">
                      {item.desc} {item.title.includes("1950") && <LegalTerm term="DELIMITATION"><span className="text-indigo-600 font-bold ml-1 cursor-pointer">Read about Delimitation</span></LegalTerm>}
                    </p>
                  </div>
                </div>
              ))}
            </motion.div>
          )}
          
          {activeTab === "judgments" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
              {JUDGMENTS.map((item, i) => (
                <div key={i} className="bg-white/80 backdrop-blur-xl border border-slate-200 p-8 rounded-[2rem] hover:border-purple-300 transition-all shadow-[0_8px_30px_rgb(15,23,42,0.04)] hover:shadow-md relative overflow-hidden group">
                  <div className="absolute -right-8 -top-8 opacity-[0.03] group-hover:opacity-10 transition-opacity">
                    <Scale className="w-48 h-48 text-slate-900" />
                  </div>
                  <div className="flex justify-between items-start mb-4 relative z-10">
                    <h3 className="text-xl font-extrabold text-slate-900 group-hover:text-purple-600 transition-colors w-[85%] leading-snug">{item.title}</h3>
                  </div>
                  <p className="text-slate-600 font-medium leading-relaxed relative z-10">
                    {item.desc} {item.term && <LegalTerm term={item.term}><span className="text-purple-600 font-bold ml-1 cursor-pointer">Learn about {item.term}</span></LegalTerm>}
                  </p>
                </div>
              ))}
            </motion.div>
          )}

          {activeTab === "quizzes" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
              {QUIZZES.map((quiz, i) => {
                const isAnswered = quizState[i] !== undefined;
                const isCorrect = isAnswered && quizState[i] === quiz.answer;
                
                return (
                 <div key={i} className={`bg-white/80 backdrop-blur-xl border p-8 rounded-[2rem] shadow-[0_8px_30px_rgb(15,23,42,0.04)] transition-all ${isAnswered ? (isCorrect ? 'border-green-300 bg-green-50/50' : 'border-red-300 bg-red-50/50') : 'border-slate-200 hover:border-blue-300'}`}>
                   <div className="flex justify-between items-start mb-6">
                     <h3 className="text-xl font-extrabold text-slate-900 leading-tight">{quiz.question}</h3>
                     <span className="px-3 py-1.5 bg-slate-100 text-slate-700 text-xs font-bold rounded-xl flex items-center gap-1.5 shrink-0 border border-slate-200"><Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" /> {quiz.points} PTS</span>
                   </div>
                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {quiz.options.map((opt, optIdx) => {
                        const isSelected = quizState[i] === optIdx;
                        const isTargetAnswer = quiz.answer === optIdx;
                        let btnClass = "bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200 hover:border-blue-300";
                        if (isAnswered) {
                           if (isTargetAnswer) btnClass = "bg-gradient-to-r from-emerald-500 to-green-600 text-white border-green-600 shadow-md shadow-green-500/20";
                           else if (isSelected && !isCorrect) btnClass = "bg-gradient-to-r from-red-500 to-rose-600 text-white border-red-600 shadow-md shadow-red-500/20";
                           else btnClass = "bg-slate-50 text-slate-400 border-slate-100 opacity-50";
                        }
                        
                        return (
                          <button 
                            key={optIdx}
                            disabled={isAnswered}
                            onClick={() => handleQuizAnswer(i, optIdx)}
                            className={`px-5 py-4 rounded-[1.25rem] border text-base font-bold transition-all text-left ${btnClass}`}
                          >
                            {opt}
                          </button>
                        )
                      })}
                   </div>
                 </div>
                )
              })}
            </motion.div>
          )}
        </div>

        <div className="space-y-6">
          <div className="bg-gradient-to-br from-slate-900 to-indigo-950 rounded-[3rem] p-10 text-white text-center shadow-[0_20px_40px_rgba(15,23,42,0.4)] relative overflow-hidden border border-slate-700/50">
            <div className="absolute top-0 right-0 p-4 opacity-5">
               <Award className="w-64 h-64 transform rotate-12 -translate-y-10 translate-x-10" />
            </div>
            <div className="relative z-10">
              <div className="w-24 h-24 bg-gradient-to-br from-amber-400 to-orange-500 rounded-[2rem] mx-auto mb-8 flex items-center justify-center shadow-lg shadow-orange-500/30 ring-4 ring-slate-800 transform -rotate-3">
                <Award className="w-12 h-12 text-white" />
              </div>
              <h3 className="font-black text-3xl mb-2 tracking-tight">{level}</h3>
              <p className="text-sm text-amber-500 font-extrabold uppercase tracking-widest mb-8">{points} XP Earned</p>
              
              <div className="w-full bg-slate-800 rounded-full h-4 mb-4 overflow-hidden ring-1 ring-slate-700 p-0.5">
                 <div className="bg-gradient-to-r from-amber-400 to-orange-500 h-full rounded-full transition-all duration-1000 shadow-[0_0_15px_rgba(245,158,11,0.6)]" style={{ width: `${progress}%` }}></div>
              </div>
              <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">Complete quizzes to level up!</p>
            </div>
          </div>

          <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-950 rounded-[3rem] p-10 text-white text-center shadow-[0_20px_40px_rgba(15,23,42,0.5)] relative overflow-hidden border border-slate-700/50">
             <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none transform -translate-y-1/2 translate-x-1/2" />
             <div className="absolute top-0 left-0 p-4 opacity-10">
               <BookOpen className="w-48 h-48 transform -rotate-12 -translate-y-10 -translate-x-10 mix-blend-screen" />
             </div>
             <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03] mix-blend-overlay" />
             <div className="relative z-10">
                <div className="w-24 h-24 bg-gradient-to-br from-sky-400 to-blue-600 rounded-[2rem] mx-auto mb-8 flex items-center justify-center shadow-[0_0_30px_rgba(56,189,248,0.3)] ring-4 ring-white/10 transform rotate-3">
                  <BookOpen className="w-12 h-12 text-white" />
                </div>
                <h3 className="font-black text-3xl mb-4 tracking-tight">Story Mode</h3>
                <p className="text-lg text-slate-300 mb-10 font-medium leading-relaxed">Turn boring law into cinematic stories. Understand exactly why a law exists.</p>
                <Link to="/ask?q=explain-secret-ballot" className="w-full block group">
                  <button className="w-full py-5 bg-white text-slate-900 rounded-[2rem] font-black text-lg transition-all shadow-[0_8px_30px_rgba(255,255,255,0.2)] hover:shadow-[0_15px_40px_rgba(255,255,255,0.3)] group-hover:-translate-y-1 flex items-center justify-center gap-3 ring-4 ring-transparent hover:ring-white/20">
                    Try "Why Secret Ballot?"
                  </button>
                </Link>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
