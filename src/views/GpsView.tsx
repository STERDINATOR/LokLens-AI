import { useState } from "react";
import { Search, MapPin, Users, Calendar, ChevronRight, Activity, Navigation } from "lucide-react";
import { motion } from "motion/react";
import { getLiveGpsData } from "@/src/services/geminiService";
import { useLanguage } from "@/src/contexts/LanguageContext";
import { t } from "@/src/lib/translations";

export default function GpsView() {
  const { language, langName } = useLanguage();
  const [searched, setSearched] = useState(false);
  const [loading, setLoading] = useState(false);
  const [inputVal, setInputVal] = useState("");
  const [data, setData] = useState<any>(null);

  const performSearch = async (queryToSearch?: string | React.MouseEvent) => {
    const q = typeof queryToSearch === "string" ? queryToSearch : inputVal;
    if (!q.trim()) return;
    setLoading(true);
    setSearched(false);
    try {
      const liveData = await getLiveGpsData(q, langName);
      setData(liveData);
      setSearched(true);
    } catch (error) {
      console.error("GPS Error:", error);
    }
    setLoading(false);
  };

  const locateMe = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser");
      return;
    }
    setLoading(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        const query = `Coordinates: Latitude ${lat}, Longitude ${lng}`;
        setInputVal(query);
        performSearch(query);
      },
      () => {
        setLoading(false);
        alert("Unable to retrieve your location. Please ensure location permissions are granted.");
      }
    );
  };

  return (
    <div className="max-w-4xl mx-auto w-full pb-20">
      <header className="mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 text-blue-700 text-xs font-bold uppercase tracking-widest mb-4">
          <Navigation className="w-4 h-4" />
          Location Engine
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tighter mb-4 leading-tight">
          {t("gps.title", language)}
        </h1>
        <p className="text-lg text-slate-600 font-medium max-w-2xl">{t("gps.subtitle", language)}</p>
      </header>

      <div className="bg-white/80 backdrop-blur-xl rounded-[2.5rem] shadow-[0_8px_30px_rgb(15,23,42,0.06)] border border-slate-200 p-3 mb-12 flex items-center relative overflow-hidden focus-within:ring-4 focus-within:ring-blue-50 transition-all">
        <div className="pl-6 relative z-10 shrink-0">
          <Search className="w-6 h-6 text-slate-400" />
        </div>
        <input 
          type="text" 
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          placeholder="Enter PIN, City or tap Location icon" 
          className="flex-1 bg-transparent px-6 py-4 outline-none text-slate-900 font-bold placeholder:text-slate-400 text-lg relative z-10 w-full"
          onKeyDown={(e) => e.key === 'Enter' && performSearch()}
        />
        <button 
          onClick={performSearch}
          className="px-8 py-4 bg-slate-900 text-white rounded-[1.5rem] font-bold text-base hover:bg-slate-800 transition-colors shadow-[0_4px_14px_rgb(15,23,42,0.2)] hover:shadow-[0_6px_20px_rgb(15,23,42,0.23)] relative z-10 shrink-0 hidden sm:flex items-center gap-2"
        >
          {loading ? <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Scanning...</> : "Search"}
        </button>
        <button 
          onClick={performSearch}
          className="p-4 bg-slate-900 text-white rounded-[1.25rem] font-bold hover:bg-slate-800 transition-colors shadow-sm relative z-10 shrink-0 sm:hidden ml-2 flex items-center justify-center"
        >
          {loading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Search className="w-5 h-5" />}
        </button>
        <button 
          onClick={locateMe}
          className="ml-3 p-4 bg-blue-50 text-blue-600 rounded-[1.5rem] font-bold border border-blue-100 hover:bg-blue-100 transition-colors shadow-sm flex items-center justify-center relative z-10 shrink-0"
          title="Use Current Location"
        >
          <Navigation className="w-5 h-5" />
        </button>
      </div>

      {loading && (
        <div className="flex flex-col items-center justify-center py-20">
          <div className="w-12 h-12 border-4 border-navy/10 border-t-saffron rounded-full animate-spin"></div>
          <p className="text-muted-foreground mt-4 font-medium animate-pulse">Mapping coordinates to Election Commission data...</p>
        </div>
      )}

      {searched && !loading && data && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {/* Identity Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white/80 backdrop-blur-xl p-6 rounded-[2rem] border border-white flex items-start gap-5 hover:border-blue-300 transition-all shadow-[0_8px_30px_rgb(15,23,42,0.04)] hover:shadow-md group relative overflow-hidden">
              <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center shrink-0 border border-blue-100 group-hover:scale-110 group-hover:-rotate-3 transition-transform">
                <MapPin className="w-7 h-7" />
              </div>
              <div className="relative z-10">
                <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-1">Parliamentary Constituency</p>
                <h3 className="text-xl font-extrabold text-slate-900 group-hover:text-blue-600 transition-colors">{data.pc || "Not Found"}</h3>
              </div>
            </div>
            
            <div className="bg-white/80 backdrop-blur-xl p-6 rounded-[2rem] border border-white flex items-start gap-5 hover:border-indigo-300 transition-all shadow-[0_8px_30px_rgb(15,23,42,0.04)] hover:shadow-md group relative overflow-hidden">
              <div className="w-14 h-14 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center shrink-0 border border-indigo-100 group-hover:scale-110 group-hover:-rotate-3 transition-transform">
                <MapPin className="w-7 h-7" />
              </div>
              <div className="relative z-10">
                <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-1">Assembly Constituency</p>
                <h3 className="text-xl font-extrabold text-slate-900 group-hover:text-indigo-600 transition-colors">{data.ac || "Not Found"}</h3>
              </div>
            </div>

            <div className="bg-white/80 backdrop-blur-xl p-6 rounded-[2rem] border border-white flex items-start gap-5 hover:border-purple-300 transition-all shadow-[0_8px_30px_rgb(15,23,42,0.04)] hover:shadow-md group relative overflow-hidden md:col-span-2 lg:col-span-1">
              <div className="w-14 h-14 bg-purple-50 text-purple-600 rounded-2xl flex items-center justify-center shrink-0 border border-purple-100 group-hover:scale-110 group-hover:-rotate-3 transition-transform">
                <MapPin className="w-7 h-7" />
              </div>
              <div className="relative z-10">
                <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-1">Local Body</p>
                <h3 className="text-xl font-extrabold text-slate-900 group-hover:text-purple-600 transition-colors">{data.localBody || "Not Found"}</h3>
              </div>
            </div>
          </div>

          {/* Representatives */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 bg-white/80 backdrop-blur-xl rounded-[2.5rem] border border-white overflow-hidden flex flex-col shadow-[0_8px_30px_rgb(15,23,42,0.04)] relative">
              <div className="p-8 border-b border-slate-100 bg-slate-50/50 flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center border border-orange-100"><Users className="w-6 h-6 text-orange-500" /></div>
                <h3 className="font-extrabold text-slate-900 text-2xl">Current Representatives</h3>
              </div>
              <div className="divide-y divide-slate-100 flex-1 relative flex flex-col justify-center">
                <div className="p-8 flex items-center justify-between hover:bg-slate-50/80 cursor-pointer group transition-colors">
                  <div>
                    <p className="text-[11px] font-extrabold tracking-widest text-slate-400 uppercase mb-2">Member of Parliament</p>
                    <p className="font-extrabold text-slate-900 text-2xl leading-tight group-hover:text-blue-600 transition-colors">{data.mp || "Not Found"}</p>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors border border-slate-100 group-hover:border-blue-100">
                     <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-blue-600 transition-colors" />
                  </div>
                </div>
                <div className="p-8 flex items-center justify-between hover:bg-slate-50/80 cursor-pointer group transition-colors">
                  <div>
                    <p className="text-[11px] font-extrabold tracking-widest text-slate-400 uppercase mb-2">Member of Legislative Assembly</p>
                    <p className="font-extrabold text-slate-900 text-2xl leading-tight group-hover:text-indigo-600 transition-colors">{data.mla || "Not Found"}</p>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors border border-slate-100 group-hover:border-indigo-100">
                     <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-indigo-600 transition-colors" />
                  </div>
                </div>
                <div className="p-8 flex items-center justify-between hover:bg-slate-50/80 cursor-pointer group transition-colors">
                  <div>
                    <p className="text-[11px] font-extrabold tracking-widest text-slate-400 uppercase mb-2">Local Representative</p>
                    <p className="font-extrabold text-slate-900 text-2xl leading-tight group-hover:text-purple-600 transition-colors">{data.localRep || "Not Found"}</p>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-purple-50 group-hover:text-purple-600 transition-colors border border-slate-100 group-hover:border-purple-100">
                     <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-purple-600 transition-colors" />
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-slate-900 to-indigo-950 text-white rounded-[2.5rem] p-8 shadow-[0_8px_30px_rgb(15,23,42,0.15)] flex flex-col justify-between relative overflow-hidden h-full min-h-[300px]">
              <div className="absolute top-0 right-0 p-8 opacity-5">
                <MapPin className="w-48 h-48 text-white transform rotate-12 -translate-y-10" />
              </div>
              <div className="relative z-10 h-full flex flex-col justify-center text-center">
                 <div className="w-20 h-20 bg-blue-500/20 rounded-3xl mx-auto mb-6 flex items-center justify-center border border-blue-500/30">
                    <Activity className="w-10 h-10 text-blue-400" />
                 </div>
                 <p className="text-blue-400 font-extrabold text-lg tracking-widest uppercase mb-4 flex justify-center items-center gap-2"><span className="w-2.5 h-2.5 bg-blue-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(59,130,246,0.8)]" /> Live Connection</p>
                 <p className="text-slate-300 text-base leading-relaxed font-medium">Booth & Part No. require ECI electoral roll search and cannot be fetched via standard live search.</p>
              </div>
            </div>
          </div>

          {/* History/Upcoming */}
          <div className="bg-white/80 backdrop-blur-xl rounded-[2.5rem] border border-white p-8 mt-6 shadow-[0_8px_30px_rgb(15,23,42,0.04)]">
            <div className="flex items-center justify-between mb-8 pb-6 border-b border-slate-100">
              <h3 className="font-extrabold text-2xl text-slate-900 flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600"><Calendar className="w-5 h-5" /></div>
                Election Timeline
              </h3>
            </div>
            
            <div className="relative pl-8 space-y-10 before:absolute before:inset-0 before:ml-[11px] before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-blue-200 before:to-transparent">
              <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                <div className="flex items-center justify-center w-6 h-6 rounded-full border-4 border-white bg-blue-500 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 absolute top-2 -left-8 md:relative md:top-0 md:left-0 z-10"></div>
                <div className="w-[calc(100%-1rem)] md:w-[calc(50%-1.5rem)] bg-white p-6 rounded-2xl border border-blue-100 shadow-sm md:group-odd:text-right">
                   <p className="text-[10px] font-extrabold text-blue-600 tracking-widest uppercase mb-2 inline-flex items-center gap-1.5"><span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce" />Upcoming / Current</p>
                   <p className="font-extrabold text-slate-900 text-lg leading-tight">{data.upcoming || "Not Found"}</p>
                </div>
              </div>

              <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                <div className="flex items-center justify-center w-6 h-6 rounded-full border-4 border-white bg-slate-300 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 absolute top-2 -left-8 md:relative md:top-0 md:left-0 z-10"></div>
                <div className="w-[calc(100%-1rem)] md:w-[calc(50%-1.5rem)] bg-slate-50/80 p-6 rounded-2xl border border-slate-100 md:group-odd:text-right">
                   <p className="text-[10px] font-bold text-slate-400 tracking-widest uppercase mb-2">Past</p>
                   <p className="font-extrabold text-slate-700 text-lg leading-tight mb-2">{data.past || "Not Found"}</p>
                   {data.turnout && <p className="text-xs text-slate-500 font-medium">Recorded Turnout: <span className="font-bold text-slate-700">{data.turnout}</span></p>}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
