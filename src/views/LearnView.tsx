import { useState } from "react";
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
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-3">
          <Scale className="w-8 h-8 text-blue-600" />
          Constitution Mode
        </h1>
        <p className="text-slate-600 mt-2">Explore the legal foundation of Indian Democracy.</p>
      </header>

      {/* Tabs */}
      <div className="flex space-x-1 glass border border-white/50 p-1 rounded-xl mb-8 w-fit shrink-0 overflow-x-auto shadow-sm">
        <button 
          onClick={() => setActiveTab("constitution")}
          className={`px-4 py-2 rounded-lg text-sm font-bold transition-colors ${activeTab === 'constitution' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'}`}
        >
          Constitution
        </button>
        <button 
          onClick={() => setActiveTab("acts")}
          className={`px-4 py-2 rounded-lg text-sm font-bold transition-colors ${activeTab === 'acts' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'}`}
        >
          Acts & Rules
        </button>
        <button 
          onClick={() => setActiveTab("judgments")}
          className={`px-4 py-2 rounded-lg text-sm font-bold transition-colors ${activeTab === 'judgments' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'}`}
        >
          Landmark Judgments
        </button>
        <button 
          onClick={() => setActiveTab("quizzes")}
          className={`px-4 py-2 rounded-lg text-sm font-bold transition-colors flex items-center gap-2 ${activeTab === 'quizzes' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'}`}
        >
          <Award className="w-4 h-4" /> Quizzes
        </button>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-6">
          {activeTab === "constitution" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
              {CONSTITUTION_ARTICLES.map((item, i) => (
                <div key={i} className="glass border border-white/50 p-5 rounded-3xl hover:border-blue-300 transition-colors shadow-sm">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-bold text-slate-800">{item.title}</h3>
                    <span className="px-2.5 py-1 bg-blue-100 text-blue-700 text-[10px] font-bold rounded-full uppercase tracking-wider">{item.tag}</span>
                  </div>
                  <p className="text-slate-600 text-sm">{item.desc}</p>
                </div>
              ))}
            </motion.div>
          )}

          {activeTab === "acts" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
              {ACTS.map((item, i) => (
                <div key={i} className="glass border border-white/50 p-5 rounded-3xl hover:border-blue-300 transition-colors shadow-sm">
                  <div className="flex items-center gap-3 mb-2">
                    <FileText className="w-5 h-5 text-blue-600" />
                    <h3 className="text-lg font-bold text-slate-800 leading-tight">{item.title}</h3>
                  </div>
                  <p className="text-slate-600 text-sm pl-8">
                    {item.desc} {item.title.includes("1950") && <LegalTerm term="DELIMITATION"><span className="text-blue-600 font-bold ml-1 cursor-pointer">Read about Delimitation</span></LegalTerm>}
                  </p>
                </div>
              ))}
            </motion.div>
          )}
          
          {activeTab === "judgments" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
              {JUDGMENTS.map((item, i) => (
                <div key={i} className="glass border border-white/50 p-5 rounded-3xl hover:border-blue-300 transition-colors shadow-sm relative overflow-hidden">
                  <div className="absolute -right-4 -top-4 opacity-5">
                    <Scale className="w-24 h-24 text-slate-900" />
                  </div>
                  <div className="flex justify-between items-start mb-2 relative z-10">
                    <h3 className="text-lg font-bold text-slate-800">{item.title}</h3>
                  </div>
                  <p className="text-slate-600 text-sm relative z-10">
                    {item.desc} {item.term && <LegalTerm term={item.term}><span className="text-blue-600 font-bold ml-1 cursor-pointer">Learn about {item.term}</span></LegalTerm>}
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
                 <div key={i} className={`glass border p-5 rounded-3xl shadow-sm transition-all ${isAnswered ? (isCorrect ? 'border-green-300 bg-green-50/50' : 'border-red-300 bg-red-50/50') : 'border-white/50 hover:border-blue-300'}`}>
                   <div className="flex justify-between items-start mb-4">
                     <h3 className="text-lg font-bold text-slate-800">{quiz.question}</h3>
                     <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-bold rounded-full flex items-center gap-1 shrink-0"><Star className="w-3 h-3" /> {quiz.points} PTS</span>
                   </div>
                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {quiz.options.map((opt, optIdx) => {
                        const isSelected = quizState[i] === optIdx;
                        const isTargetAnswer = quiz.answer === optIdx;
                        let btnClass = "bg-white/60 hover:bg-white text-slate-700 border-white/60 hover:border-blue-300";
                        if (isAnswered) {
                           if (isTargetAnswer) btnClass = "bg-green-600 text-white border-green-600 shadow-md";
                           else if (isSelected && !isCorrect) btnClass = "bg-red-500 text-white border-red-500 shadow-md";
                           else btnClass = "bg-white/40 text-slate-400 border-white/20 opacity-50";
                        }
                        
                        return (
                          <button 
                            key={optIdx}
                            disabled={isAnswered}
                            onClick={() => handleQuizAnswer(i, optIdx)}
                            className={`px-4 py-3 rounded-xl border text-sm font-semibold transition-all text-left ${btnClass}`}
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
          <div className="bg-slate-800 rounded-3xl p-6 text-white text-center shadow-lg relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
               <Award className="w-32 h-32" />
            </div>
            <div className="relative z-10">
              <Award className="w-10 h-10 mx-auto mb-4 text-orange-400" />
              <h3 className="font-bold text-xl mb-1">{level}</h3>
              <p className="text-sm text-slate-300 mb-4">{points} XP Earned</p>
              
              <div className="w-full bg-slate-700 rounded-full h-2 mb-2 overflow-hidden">
                 <div className="bg-orange-400 h-full rounded-full transition-all duration-1000" style={{ width: `${progress}%` }}></div>
              </div>
              <p className="text-xs text-slate-400 font-medium">Complete quizzes to level up!</p>
            </div>
          </div>

          <div className="bg-slate-800 rounded-3xl p-6 text-white text-center shadow-lg">
            <BookOpen className="w-10 h-10 mx-auto mb-4 text-orange-400" />
            <h3 className="font-bold text-xl mb-2">Story Mode</h3>
            <p className="text-sm text-slate-300 mb-6">Turn boring law into cinematic stories. Understand exactly why a law exists.</p>
            <button className="w-full py-2.5 bg-white/10 hover:bg-white/20 border border-white/20 text-white rounded-xl font-bold text-sm transition-colors shadow-sm backdrop-blur-sm">
              Try "Why Secret Ballot?"
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
