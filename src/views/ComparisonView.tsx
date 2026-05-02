import { useLocation, Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Scale, TrendingUp, AlertTriangle, BookOpen, CheckCircle2, XCircle } from "lucide-react";
import { motion } from "motion/react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function ComparisonView() {
  const location = useLocation();
  const navigate = useNavigate();
  const { candidates } = location.state || { candidates: [] };

  if (!candidates || candidates.length < 2) {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <h2 className="text-2xl font-bold mb-4">No candidates selected for comparison.</h2>
        <Link to="/candidate" className="text-blue-600 hover:underline">Go back to select candidates</Link>
      </div>
    );
  }

  const chartData = candidates.map((c: any) => ({
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
    <div className="max-w-6xl mx-auto w-full pb-20">
      <header className="mb-10">
        <button 
          onClick={() => navigate(-1)}
          className="mb-6 flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-slate-900 transition-colors bg-white border border-slate-200 px-4 py-2 rounded-full shadow-sm"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Search
        </button>
        <h1 className="text-4xl md:text-5xl font-black text-slate-900 flex items-center gap-4 tracking-tighter">
          <Scale className="w-10 h-10 text-blue-600" /> Candidate Duel
        </h1>
        <p className="text-lg text-slate-600 font-medium ml-14">Side-by-side verification of power and transparency.</p>
      </header>

      {/* Comparison Matrix */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Net Worth Chart */}
        <div className="lg:col-span-2 bg-white/80 backdrop-blur-xl p-8 rounded-[3rem] border border-slate-200 shadow-[0_8px_30px_rgb(15,23,42,0.04)]">
           <h3 className="text-2xl font-black text-slate-900 mb-8 flex items-center gap-3 tracking-tight">
             <TrendingUp className="w-8 h-8 text-blue-600" /> Wealth Disclosure Analysis
           </h3>
           <div className="h-[400px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontWeight: 'bold'}} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b'}} />
                  <Tooltip content={<CustomTooltip />} cursor={{fill: '#f1f5f9'}} />
                  <Legend iconType="circle" wrapperStyle={{ paddingTop: '20px' }}/>
                  <Bar dataKey="Assets" fill="#22c55e" radius={[10, 10, 0, 0]} maxBarSize={100} />
                  <Bar dataKey="Liabilities" fill="#f43f5e" radius={[10, 10, 0, 0]} maxBarSize={100} />
                </BarChart>
              </ResponsiveContainer>
           </div>
        </div>

        {candidates.map((candidate: any, idx: number) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.1 }}
            className="space-y-8"
          >
            {/* Profile */}
            <div className={`p-8 rounded-[3rem] border relative overflow-hidden shadow-xl ${idx === 0 ? 'bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-100' : 'bg-gradient-to-br from-purple-50 to-pink-50 border-purple-100'}`}>
              <div className="flex flex-col items-center text-center">
                <div className="w-32 h-32 bg-white rounded-full border-8 border-white shadow-2xl mb-6 overflow-hidden ring-4 ring-black/5">
                  <img 
                    src={candidate.photoUrl || `https://api.dicebear.com/7.x/notionists/svg?seed=${candidate.name.split(' ')[0]}&backgroundColor=ffffff`} 
                    alt="Candidate" 
                    className="w-full h-full object-cover" 
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = `https://api.dicebear.com/7.x/notionists/svg?seed=${candidate.name.split(' ')[0]}&backgroundColor=ffffff`;
                    }}
                  />
                </div>
                <h2 className="text-3xl font-black text-slate-900 mb-2 leading-tight">{candidate.name}</h2>
                <p className="text-blue-600 font-bold uppercase tracking-[0.2em] text-xs mb-6">{candidate.constituency}</p>
                <div className="flex flex-wrap justify-center gap-2">
                  {candidate.status.map((s: string, i: number) => (
                    <span key={i} className="px-4 py-2 bg-white/60 backdrop-blur-md rounded-full text-[10px] font-black uppercase tracking-widest text-slate-700 shadow-sm border border-white">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Comparison Metrics */}
            <div className="bg-white/80 backdrop-blur-xl p-8 rounded-[3rem] border border-slate-200 shadow-[0_8px_30px_rgb(15,23,42,0.04)] space-y-10">
              {/* Crime Metric */}
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h4 className="font-black text-slate-900 uppercase tracking-widest text-xs flex items-center gap-2">
                    <AlertTriangle className={candidate.cases.count > 0 ? "text-red-500 w-4 h-4" : "text-emerald-500 w-4 h-4"} />
                    Legal Record
                  </h4>
                  <span className={`px-4 py-1 rounded-full text-xs font-black ${candidate.cases.count > 0 ? 'bg-red-100 text-red-600' : 'bg-emerald-100 text-emerald-600'}`}>
                    {candidate.cases.count} Cases
                  </span>
                </div>
                <p className="text-sm text-slate-600 font-medium leading-relaxed bg-slate-50 p-4 rounded-2xl border border-slate-100">
                  {candidate.cases.desc}
                </p>
              </div>

              {/* Education */}
              <div>
                <h4 className="font-black text-slate-900 uppercase tracking-widest text-xs flex items-center gap-2 mb-4">
                  <BookOpen className="text-blue-500 w-4 h-4" />
                  Education
                </h4>
                <div className="space-y-2">
                  {candidate.education.map((edu: string, i: number) => (
                    <div key={i} className="flex items-center gap-3 text-sm font-bold text-slate-700 bg-white p-3 rounded-xl border border-slate-100 shadow-sm">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                      {edu}
                    </div>
                  ))}
                </div>
              </div>

              {/* Transparency */}
              <div>
                <h4 className="font-black text-slate-900 uppercase tracking-widest text-xs flex items-center gap-2 mb-4">
                  <Scale className="text-purple-500 w-4 h-4" />
                  Transparency
                </h4>
                {candidate.transparency ? (
                  <div className="bg-purple-50 p-5 rounded-[2rem] border border-purple-100 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:scale-150 transition-transform duration-700">
                      <CheckCircle2 className="w-12 h-12 text-purple-600" />
                    </div>
                    <p className="text-sm text-purple-900 font-bold leading-relaxed relative z-10">
                      {candidate.transparency}
                    </p>
                  </div>
                ) : (
                  <div className="bg-slate-50 p-5 rounded-[2rem] border border-slate-200 flex items-center gap-3 text-slate-500 italic text-sm">
                    <XCircle className="w-5 h-5 shrink-0" />
                    No specific transparency measures found.
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
