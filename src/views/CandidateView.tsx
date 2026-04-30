import { useState } from "react";
import { Search, Upload, AlertTriangle, TrendingUp, BookOpen, Scale, FileText, CheckCircle2 } from "lucide-react";
import { motion } from "motion/react";
import { LegalTerm } from "@/src/components/LegalTerm";

export default function CandidateView() {
  const [analyzing, setAnalyzing] = useState(false);
  const [query, setQuery] = useState("");
  const [candidates, setCandidates] = useState<any[]>([]);

  const MOCK_CANDIDATES: any = {
    "rajesh": {
      name: "Rajesh K. Mehta",
      constituency: "Pune (Lok Sabha)",
      status: ["Incumbent", "Age: 52", "Graduate Professional"],
      assets: { current: "₹ 24.5 Cr", prev: "₹ 4.7 Cr", growth: "+420%", progress: [85, 15] },
      liabilities: "₹ 1.2 Cr",
      cases: { count: 2, desc: "Offences related to unlawful assembly (IPC 143)." },
      education: ["LL.B from Pune University (1995)", "B.A. from Fergusson College (1992)"]
    },
    "sunita": {
      name: "Sunita Sharma",
      constituency: "Pune (Lok Sabha)",
      status: ["Challenger", "Age: 45", "Post Graduate"],
      assets: { current: "₹ 3.2 Cr", prev: "N/A", growth: "New", progress: [90, 10] },
      liabilities: "₹ 35 Lakhs",
      cases: { count: 0, desc: "No criminal cases pending." },
      education: ["M.A. Economics from Delhi University (2001)", "B.A. from Mumbai University (1998)"]
    }
  };

  const simulateAnalysis = () => {
    if (!query.trim()) return;
    setAnalyzing(true);
    setTimeout(() => {
      setAnalyzing(false);
      const key = query.toLowerCase().includes("sunita") ? "sunita" : "rajesh";
      const newCandidate = MOCK_CANDIDATES[key];
      if (!candidates.find((c) => c.name === newCandidate.name)) {
        setCandidates(prev => [...prev, newCandidate]);
      }
      setQuery("");
    }, 1500);
  };

  return (
    <div className="max-w-4xl mx-auto w-full pb-20">
      <header className="mb-8 p-6 glass border border-white/50 rounded-3xl">
        <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-3">
          <Search className="w-8 h-8 text-purple-600" />
          Candidate Truth Decoder
        </h1>
        <p className="text-slate-600 font-medium mt-2">Analyze candidate affidavits to reveal assets, liabilities, criminal records, and background facts.</p>
      </header>

      <div className="glass p-6 rounded-3xl border border-white/50 mb-8 shadow-sm">
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <div className="flex-1 bg-white/60 border border-white/60 rounded-2xl p-2 flex items-center shadow-inner">
            <Search className="w-5 h-5 text-slate-500 ml-3" />
            <input 
              type="text" 
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search candidate (e.g., Rajesh Mehta, Sunita Sharma)..."
              className="flex-1 bg-transparent border-none outline-none px-4 py-2 text-slate-800 font-medium"
            />
          </div>
          <div className="flex items-center justify-center px-4 font-bold text-slate-400 uppercase text-xs tracking-widest">OR</div>
          <button className="bg-slate-100 hover:bg-slate-200 border border-slate-300 text-slate-700 px-6 py-3 rounded-2xl font-bold flex items-center justify-center gap-2 transition-colors">
            <Upload className="w-4 h-4" />
            Upload <LegalTerm term="AFFIDAVIT">Affidavit PDF</LegalTerm>
          </button>
        </div>
        <button 
          onClick={simulateAnalysis}
          disabled={!query.trim() || analyzing}
          className="w-full bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white font-bold py-3.5 rounded-2xl shadow-md transition-colors flex items-center justify-center gap-2"
        >
          {analyzing ? (
            <><div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Decoding Affidavit...</>
          ) : (
             "Run Truth Decoder AI"
          )}
        </button>
      </div>

      {candidates.length > 0 && !analyzing && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {candidates.length > 1 && (
             <div className="bg-slate-800 text-white p-3 rounded-2xl flex items-center justify-between text-sm shadow-md">
                <span className="font-bold flex items-center gap-2"><Scale className="w-4 h-4 text-orange-400" /> Comparison Mode Active</span>
                <span className="text-slate-300 font-medium">{candidates.length} candidates selected</span>
             </div>
          )}
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
            {candidates.map((result, index) => (
              <div key={index} className="space-y-6">
                {/* Header Card */}
                <div className="glass p-6 rounded-3xl border border-white/50 flex flex-col md:flex-row items-center gap-6 shadow-sm relative overflow-hidden h-full">
                  <div className="absolute top-0 right-0 p-4 opacity-5">
                    <Scale className="w-48 h-48" />
                  </div>
                  <div className="w-24 h-24 bg-slate-200 border-4 border-white shadow-md rounded-full shrink-0 flex items-center justify-center overflow-hidden">
                     <img src={`https://api.dicebear.com/7.x/notionists/svg?seed=${result.name.split(' ')[0]}&backgroundColor=e2e8f0`} alt="Candidate" className="w-full h-full object-cover" />
                  </div>
                  <div className="text-center md:text-left z-10 w-full">
                    <div className="flex items-center gap-2 justify-center md:justify-start">
                      <h2 className="text-2xl font-bold text-slate-900">{result.name}</h2>
                      <CheckCircle2 className="w-5 h-5 text-blue-500 shrink-0" />
                    </div>
                    <p className="text-slate-600 font-medium mb-3">Contesting: {result.constituency}</p>
                    <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
                      {result.status.map((s: string, idx: number) => (
                        <span key={idx} className={`px-2.5 py-1 rounded-full text-[10px] uppercase tracking-wider font-bold border ${
                          idx === 0 ? 'bg-purple-100 text-purple-700 border-purple-200' :
                          idx === 1 ? 'bg-slate-200 text-slate-700 border-slate-300' :
                          'bg-green-100 text-green-700 border-green-200'
                        }`}>
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Financials */}
                <div className="glass p-6 rounded-3xl border border-white/50 shadow-sm flex flex-col">
                  <h3 className="font-bold text-slate-800 flex items-center gap-2 mb-6">
                    <TrendingUp className="w-5 h-5 text-green-600" /> Financial Intelligence
                  </h3>
                  
                  <div className="space-y-5">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-slate-500 font-medium">Declared Assets (2024)</span>
                        <span className="font-bold text-slate-900">{result.assets.current}</span>
                      </div>
                      <div className="w-full bg-slate-200 rounded-full h-2">
                        <div className={`bg-green-500 h-2 rounded-full`} style={{ width: `${result.assets.progress[0]}%` }}></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-slate-500 font-medium">Declared Liabilities</span>
                        <span className="font-bold text-slate-900">{result.liabilities}</span>
                      </div>
                      <div className="w-full bg-slate-200 rounded-full h-2">
                        <div className={`bg-orange-500 h-2 rounded-full`} style={{ width: `${result.assets.progress[1]}%` }}></div>
                      </div>
                    </div>

                    {result.assets.growth !== "New" && (
                      <div className="bg-white/50 border border-red-100 rounded-2xl p-4 mt-4">
                         <p className="text-xs font-bold text-red-600 uppercase tracking-widest mb-1">AI Flag: Growth</p>
                         <p className="text-slate-800 text-sm font-medium">Assets increased by <span className="font-bold text-red-600">{result.assets.growth}</span> since the 2019 affidavit ({result.assets.prev}).</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Criminal/Legal */}
                <div className="glass p-6 rounded-3xl border border-white/50 shadow-sm flex flex-col">
                  <h3 className="font-bold text-slate-800 flex items-center gap-2 mb-6">
                    <AlertTriangle className="w-5 h-5 text-red-500" /> Legal & Disclosures
                  </h3>
                  
                  <div className={`${result.cases.count > 0 ? 'bg-red-50/50 border-red-200' : 'bg-green-50/50 border-green-200'} border rounded-2xl p-4 mb-4`}>
                    <div className="flex justify-between items-start">
                       <div>
                         <p className="text-sm font-bold text-slate-900 mb-1">Criminal Cases Pending</p>
                         <p className="text-xs text-slate-600">{result.cases.desc}</p>
                       </div>
                       <span className={`${result.cases.count > 0 ? 'bg-red-600' : 'bg-green-600'} text-white font-bold text-xl px-3 py-1 rounded-xl shadow-sm`}>{result.cases.count}</span>
                    </div>
                  </div>

                  <div className="bg-slate-50/50 border border-slate-200 rounded-2xl p-4">
                    <p className="text-sm font-bold text-slate-900 mb-2">Education Claims</p>
                    <ul className="text-sm text-slate-600 space-y-1">
                      {result.education.map((edu: string, idx: number) => (
                        <li key={idx} className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" /> {edu}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}
