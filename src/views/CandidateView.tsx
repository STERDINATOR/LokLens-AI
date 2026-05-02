import { useState } from "react";
import { Search, Upload, AlertTriangle, TrendingUp, BookOpen, Scale, FileText, CheckCircle2, Plus, Minus, MoveRight } from "lucide-react";
import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";
import { LegalTerm } from "@/src/components/LegalTerm";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { searchCandidates } from "@/src/services/geminiService";
import { useLanguage } from "@/src/contexts/LanguageContext";

export default function CandidateView() {
  const navigate = useNavigate();
  const { langName } = useLanguage();
  const [analyzing, setAnalyzing] = useState(false);
  const [query, setQuery] = useState("");
  const [candidates, setCandidates] = useState<any[]>([]);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  const toggleSelection = (index: number) => {
    setSelectedIds(prev => 
      prev.includes(index) 
        ? prev.filter(id => id !== index) 
        : prev.length < 2 ? [...prev, index] : prev
    );
  };

  const handleCompare = () => {
    const selectedData = selectedIds.map(id => candidates[id]);
    navigate('/compare', { state: { candidates: selectedData } });
  };

  const MOCK_CANDIDATES: any = {
    "rajesh": {
      name: "Rajesh K. Mehta",
      constituency: "Pune (Lok Sabha)",
      status: ["Incumbent", "Age: 52", "Graduate Professional"],
      assets: { current: "₹ 24.5 Cr", prev: "₹ 4.7 Cr", growth: "+420%", progress: [85, 15] },
      liabilities: "₹ 1.2 Cr",
      rawAssets: 24.5,
      rawLiabilities: 1.2,
      cases: { count: 2, desc: "Offences related to unlawful assembly (IPC 143)." },
      education: ["LL.B from Pune University (1995)", "B.A. from Fergusson College (1992)"]
    },
    "sunita": {
      name: "Sunita Sharma",
      constituency: "Pune (Lok Sabha)",
      status: ["Challenger", "Age: 45", "Post Graduate"],
      assets: { current: "₹ 3.2 Cr", prev: "N/A", growth: "New", progress: [90, 10] },
      liabilities: "₹ 35 Lakhs",
      rawAssets: 3.2,
      rawLiabilities: 0.35,
      cases: { count: 0, desc: "No criminal cases pending." },
      education: ["M.A. Economics from Delhi University (2001)", "B.A. from Mumbai University (1998)"]
    }
  };

  const [error, setError] = useState(false);

  const simulateAnalysis = async () => {
    if (!query.trim()) return;
    setAnalyzing(true);
    setError(false);
    try {
      const results = await searchCandidates(query, langName);
      // Filter out candidates that are already present
      const newCandidates = results.filter((res: any) => !candidates.find(c => c.name === res.name));
      if (newCandidates.length > 0) {
        setCandidates(prev => [...prev, ...newCandidates]);
      }
      setQuery("");
    } catch (e) {
      console.error(e);
      setError(true);
    }
    setAnalyzing(false);
  };

  const chartData = candidates.map(c => ({
    name: c.name.split(' ')[0],
    Assets: c.rawAssets,
    Liabilities: c.rawLiabilities,
  }));

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white/90 backdrop-blur-md p-3 rounded-xl border border-slate-200 shadow-lg text-sm">
          <p className="font-bold text-slate-800 mb-2">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} style={{ color: entry.color }} className="font-medium">
              {entry.name}: ₹ {entry.value} Cr
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="max-w-5xl mx-auto w-full pb-20">
      <header className="mb-12 p-10 bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-100/50 rounded-[3rem] relative overflow-hidden shadow-sm">
        <div className="absolute right-0 top-0 w-80 h-80 bg-purple-400/10 rounded-full blur-[80px]" />
        <div className="absolute left-10 -bottom-20 w-64 h-64 bg-pink-400/10 rounded-full blur-[60px]" />
        
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-100 text-purple-700 text-xs font-bold uppercase tracking-widest mb-4 relative z-10">
          <Search className="w-4 h-4" />
          AI Analyzer
        </div>
        
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 flex items-center gap-3 relative z-10 tracking-tight leading-tight mb-4">
          Candidate X-Ray
        </h1>
        <p className="text-slate-600 font-medium max-w-2xl text-lg relative z-10 leading-relaxed">
          Deep scan candidate <LegalTerm term="AFFIDAVIT"><span className="text-purple-600 cursor-pointer underline decoration-purple-300 decoration-2 underline-offset-4 hover:decoration-purple-500 transition-colors">affidavits</span></LegalTerm> to reveal hidden assets, liabilities, and criminal records. Build your own comparison matrix.
        </p>
      </header>

      <div className="bg-white/80 backdrop-blur-xl p-8 md:p-10 rounded-[2.5rem] border border-slate-200 mb-10 shadow-[0_8px_30px_rgb(15,23,42,0.06)] relative overflow-hidden">
        <div className="flex flex-col lg:flex-row gap-6 mb-8 relative z-10">
          <div className="flex-1 bg-white border border-slate-200 hover:border-purple-400 focus-within:border-purple-500 focus-within:ring-4 focus-within:ring-purple-50 transition-all rounded-[1.5rem] p-3 flex items-center shadow-sm">
            <Search className="w-6 h-6 text-slate-400 ml-3" />
            <input 
              type="text" 
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && simulateAnalysis()}
              placeholder="Search candidate (e.g., Rajesh Mehta, Sunita Sharma)..."
              className="flex-1 bg-transparent border-none outline-none px-4 py-3 text-slate-900 font-semibold text-lg placeholder:text-slate-400"
            />
          </div>
          <div className="flex items-center justify-center px-4 font-extrabold text-slate-300 uppercase text-xs tracking-[0.2em]">OR</div>
          <button className="bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 px-8 py-4 rounded-[1.5rem] font-bold flex items-center justify-center gap-3 transition-colors shadow-sm whitespace-nowrap">
            <Upload className="w-5 h-5 text-slate-500" />
            Upload PDF
          </button>
        </div>
        <button 
          onClick={simulateAnalysis}
          disabled={!query.trim() || analyzing}
          className="w-full bg-slate-900 hover:bg-slate-800 disabled:opacity-50 text-white font-bold py-5 rounded-[1.5rem] shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all flex items-center justify-center gap-3 text-lg relative z-10"
        >
          {analyzing ? (
            <><div className="w-6 h-6 border-4 border-white/30 border-t-white rounded-full animate-spin" /> Deep Scanning Affidavit...</>
          ) : (
               "Run Truth Decoder AI"
          )}
        </button>
        {error && <p className="text-red-500 font-bold text-sm mt-4 text-center bg-red-50 py-3 rounded-xl border border-red-100">Failed to deeply analyze candidate. Please try a different name or constituency.</p>}
      </div>

      {candidates.length > 0 && !analyzing && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          {candidates.length > 1 && (
             <div className="bg-slate-800 text-white p-6 rounded-[2rem] flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl border border-slate-700">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-orange-500 rounded-2xl flex items-center justify-center shadow-lg shadow-orange-500/20">
                    <Scale className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-black text-xl tracking-tight">Comparison Matrix</h3>
                    <p className="text-slate-400 text-sm font-medium">{selectedIds.length} of 2 candidates selected</p>
                  </div>
                </div>
                <button 
                  onClick={handleCompare}
                  disabled={selectedIds.length < 2}
                  className="bg-white text-slate-900 disabled:opacity-50 disabled:cursor-not-allowed px-8 py-4 rounded-2xl font-black flex items-center gap-3 hover:bg-slate-100 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 group"
                >
                  Compare Now <MoveRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
             </div>
          )}

          {candidates.length > 1 && (
            <div className="glass p-8 rounded-3xl border border-white/50 shadow-sm mb-8 w-full">
               <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                 <TrendingUp className="w-6 h-6 text-blue-600" /> Net Worth Comparison (in Crores)
               </h3>
               <div className="h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                      <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontWeight: 'bold'}} />
                      <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b'}} />
                      <Tooltip content={<CustomTooltip />} cursor={{fill: '#f1f5f9'}} />
                      <Legend iconType="circle" wrapperStyle={{ paddingTop: '20px' }}/>
                      <Bar dataKey="Assets" fill="#22c55e" radius={[4, 4, 0, 0]} maxBarSize={60} />
                      <Bar dataKey="Liabilities" fill="#f97316" radius={[4, 4, 0, 0]} maxBarSize={60} />
                    </BarChart>
                  </ResponsiveContainer>
               </div>
            </div>
          )}
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            {candidates.map((result, index) => (
              <div key={index} className="space-y-6">
                {/* Header Card */}
                <div className={`bg-white/80 backdrop-blur-xl p-8 rounded-[2rem] border flex flex-col md:flex-row items-center gap-6 shadow-[0_8px_30px_rgb(15,23,42,0.04)] hover:shadow-xl relative overflow-hidden h-full transform transition-all hover:-translate-y-1 ${selectedIds.includes(index) ? 'border-blue-500 ring-2 ring-blue-500/20' : 'border-slate-200'}`}>
                  <div className="absolute top-0 right-0 p-4 opacity-5">
                    <Scale className="w-56 h-56 transform rotate-12" />
                  </div>
                  
                  {/* Selection Toggle */}
                  <button 
                    onClick={() => toggleSelection(index)}
                    className={`absolute top-6 right-6 p-2 rounded-xl border transition-all z-20 ${
                      selectedIds.includes(index) 
                        ? 'bg-blue-600 border-blue-600 text-white shadow-lg' 
                        : 'bg-white border-slate-200 text-slate-400 hover:text-blue-600 hover:border-blue-200'
                    }`}
                  >
                    {selectedIds.includes(index) ? <Minus className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                  </button>

                  <div className="w-32 h-32 bg-slate-50 border-4 border-white shadow-lg rounded-[2rem] shrink-0 flex items-center justify-center overflow-hidden z-10 rotate-3">
                     <img 
                       src={result.photoUrl || `https://api.dicebear.com/7.x/notionists/svg?seed=${result.name.split(' ')[0]}&backgroundColor=f8fafc`} 
                       alt="Candidate" 
                       className="w-full h-full object-cover transform -rotate-3 hover:scale-110 transition-transform duration-500" 
                       referrerPolicy="no-referrer"
                       onError={(e) => {
                         const target = e.target as HTMLImageElement;
                         target.src = `https://api.dicebear.com/7.x/notionists/svg?seed=${result.name.split(' ')[0]}&backgroundColor=f8fafc`;
                       }}
                     />
                  </div>
                  <div className="text-center md:text-left z-10 w-full flex-1">
                    <div className="flex items-center gap-3 justify-center md:justify-start mb-1">
                      <h2 className="text-3xl font-extrabold text-slate-900 leading-tight">{result.name}</h2>
                      <CheckCircle2 className="w-6 h-6 text-blue-600 shrink-0" />
                    </div>
                    <p className="text-slate-500 font-extrabold mb-5 uppercase tracking-widest text-xs">Contesting: {result.constituency}</p>
                    <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
                      {result.status.map((s: string, idx: number) => (
                        <span key={idx} className={`px-4 py-1.5 rounded-xl text-[10px] uppercase tracking-widest font-extrabold border ${
                          idx === 0 ? 'bg-purple-50 text-purple-700 border-purple-200 shadow-sm' :
                          idx === 1 ? 'bg-slate-50 text-slate-600 border-slate-200 shadow-sm' :
                          'bg-emerald-50 text-emerald-700 border-emerald-200 shadow-sm'
                        }`}>
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Financials */}
                <div className="bg-white/80 backdrop-blur-xl p-8 rounded-[2rem] border border-slate-200 shadow-[0_8px_30px_rgb(15,23,42,0.04)] flex flex-col hover:shadow-xl hover:border-green-300 transition-all">
                  <h3 className="font-extrabold text-slate-900 flex items-center gap-3 mb-8 text-xl">
                    <TrendingUp className="w-6 h-6 text-green-600" /> Financial Intelligence
                  </h3>
                  
                  <div className="space-y-8">
                    <div>
                      <div className="flex justify-between items-end mb-3">
                        <span className="text-slate-500 font-extrabold uppercase tracking-widest text-[11px]">Declared Assets (2024)</span>
                        <span className="font-black text-slate-900 text-2xl tracking-tight">{result.assets.current}</span>
                      </div>
                      <div className="w-full bg-slate-100 rounded-full h-3 shadow-inner">
                        <div className={`bg-gradient-to-r from-emerald-400 to-green-500 h-3 rounded-full shadow-[0_0_10px_rgba(34,197,94,0.4)]`} style={{ width: `${result.assets.progress[0]}%` }}></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between items-end mb-3">
                        <span className="text-slate-500 font-extrabold uppercase tracking-widest text-[11px]">Declared Liabilities</span>
                        <span className="font-black text-slate-900 text-2xl tracking-tight">{result.liabilities}</span>
                      </div>
                      <div className="w-full bg-slate-100 rounded-full h-3 shadow-inner">
                        <div className={`bg-gradient-to-r from-amber-400 to-orange-500 h-3 rounded-full shadow-[0_0_10px_rgba(249,115,22,0.4)]`} style={{ width: `${result.assets.progress[1]}%` }}></div>
                      </div>
                    </div>

                    {result.assets.growth !== "New" && (
                      <div className="bg-gradient-to-br from-red-50 focus-within:ring-rose-50 border border-red-200 rounded-[1.5rem] p-6 shadow-sm relative overflow-hidden group">
                         <div className="absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b from-rose-500 to-red-600 group-hover:w-2 transition-all"></div>
                         <p className="text-[10px] font-extrabold text-red-600 uppercase tracking-widest mb-3 flex items-center gap-1.5"><AlertTriangle className="w-3.5 h-3.5" /> AI Flag: Asset Surge</p>
                         <p className="text-slate-800 text-lg font-bold leading-snug">Assets increased by <span className="font-black text-red-600 px-2 py-0.5 bg-white border border-red-100 shadow-sm rounded-lg mx-1">{result.assets.growth}</span> since the 2019 affidavit (was {result.assets.prev}).</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Criminal/Legal */}
                <div className="bg-white/80 backdrop-blur-xl p-8 rounded-[2rem] border border-slate-200 shadow-[0_8px_30px_rgb(15,23,42,0.04)] flex flex-col hover:shadow-xl hover:border-red-300 transition-all">
                  <h3 className="font-extrabold text-slate-900 flex items-center gap-3 mb-8 text-xl">
                    <AlertTriangle className="w-6 h-6 text-red-500" /> Legal & Disclosures
                  </h3>
                  
                  <div className={`${result.cases.count > 0 ? 'bg-gradient-to-br from-red-50 to-rose-50 border-red-200' : 'bg-gradient-to-br from-green-50 to-emerald-50 border-green-200'} border rounded-[1.5rem] p-6 mb-6 shadow-sm`}>
                    <div className="flex justify-between items-start gap-4">
                       <div>
                         <p className="text-lg font-extrabold text-slate-900 mb-2">Criminal Cases Pending</p>
                         <p className={`text-sm font-medium ${result.cases.count > 0 ? 'text-red-900' : 'text-green-900'}`}>{result.cases.desc}</p>
                       </div>
                       <span className={`flex items-center justify-center w-14 h-14 shrink-0 ${result.cases.count > 0 ? 'bg-gradient-to-br from-rose-500 to-red-600 shadow-red-500/30' : 'bg-gradient-to-br from-emerald-500 to-green-600 shadow-green-500/30'} text-white font-black text-2xl rounded-2xl shadow-lg ring-4 ring-white`}>{result.cases.count}</span>
                    </div>
                  </div>

                  <div className="bg-slate-50 border border-slate-200 rounded-[1.5rem] p-6 shadow-sm mb-6">
                    <p className="text-sm font-extrabold text-slate-900 mb-4 uppercase tracking-widest">Education Claims</p>
                    <ul className="text-sm text-slate-700 font-bold space-y-3">
                      {result.education.map((edu: string, idx: number) => (
                        <li key={idx} className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" /> <span className="leading-relaxed">{edu}</span></li>
                      ))}
                    </ul>
                  </div>

                  {result.transparency ? (
                    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-[1.5rem] p-6 shadow-sm">
                      <p className="text-sm font-extrabold text-blue-900 mb-3 flex items-center gap-2 uppercase tracking-widest"><BookOpen className="w-4 h-4" /> Transparency Record</p>
                      <p className="text-sm text-blue-900/80 font-medium leading-relaxed">{result.transparency}</p>
                    </div>
                  ) : (
                    <div className="bg-slate-50 border border-slate-200 p-6 rounded-[1.5rem] text-slate-500 italic text-sm flex items-center gap-3 italic">
                      <Scale className="w-5 h-5 shrink-0" />
                      No specific transparency measures found.
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}
