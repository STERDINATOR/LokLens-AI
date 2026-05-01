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
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-navy flex items-center gap-3">
          <Navigation className="w-8 h-8 text-saffron" />
          {t("gps.title", language)}
        </h1>
        <p className="text-muted-foreground mt-2">{t("gps.subtitle", language)}</p>
      </header>

      <div className="glass rounded-full shadow-sm border border-white/50 p-2 mb-8 flex items-center">
        <div className="pl-4">
          <Search className="w-5 h-5 text-slate-500" />
        </div>
        <input 
          type="text" 
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          placeholder="Enter PIN, City or tap Location icon" 
          className="flex-1 bg-transparent px-4 py-3 outline-none text-slate-800 font-medium"
          onKeyDown={(e) => e.key === 'Enter' && performSearch()}
        />
        <button 
          onClick={performSearch}
          className="px-6 py-3 bg-blue-600 text-white rounded-full font-bold text-sm hover:bg-blue-700 transition-colors shadow-sm"
        >
          {loading ? "Scanning" : "Search"}
        </button>
        <button 
          onClick={locateMe}
          className="ml-2 p-3 bg-white text-blue-600 rounded-full font-bold border border-blue-100 hover:bg-blue-50 transition-colors shadow-sm flex items-center justify-center"
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="glass p-6 rounded-3xl border border-white/50 flex items-start gap-4 hover:border-blue-300 transition-colors">
              <div className="w-12 h-12 bg-saffron/10 text-saffron rounded-xl flex items-center justify-center shrink-0">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-500">Parliamentary Constituency</p>
                <h3 className="text-xl font-bold text-slate-800">{data.pc || "Not Found"}</h3>
              </div>
            </div>
            
            <div className="glass p-6 rounded-3xl border border-white/50 flex items-start gap-4 hover:border-green-300 transition-colors">
              <div className="w-12 h-12 bg-india-green/10 text-india-green rounded-xl flex items-center justify-center shrink-0">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-500">Assembly Constituency</p>
                <h3 className="text-xl font-bold text-slate-800">{data.ac || "Not Found"}</h3>
              </div>
            </div>
          </div>

          {/* Representatives */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2 glass rounded-3xl border border-white/50 overflow-hidden flex flex-col">
              <div className="p-4 border-b border-white/30 bg-slate-50/50 flex items-center gap-2">
                <Users className="w-4 h-4 text-slate-600" />
                <h3 className="font-semibold text-slate-800">Current Representatives</h3>
              </div>
              <div className="divide-y divide-white/40 flex-1 relative">
                <div className="p-4 flex items-center justify-between hover:bg-slate-50/50 cursor-pointer">
                  <div>
                    <p className="text-xs font-semibold tracking-wider text-slate-500 uppercase">Member of Parliament</p>
                    <p className="font-bold text-slate-800 text-lg leading-tight mt-1">{data.mp || "Not Found"}</p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-slate-400" />
                </div>
                <div className="p-4 flex items-center justify-between hover:bg-slate-50/50 cursor-pointer">
                  <div>
                    <p className="text-xs font-semibold tracking-wider text-slate-500 uppercase">Member of Legislative Assembly</p>
                    <p className="font-bold text-slate-800 text-lg leading-tight mt-1">{data.mla || "Not Found"}</p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-slate-400" />
                </div>
              </div>
            </div>

            <div className="bg-slate-800 text-white rounded-3xl p-5 shadow-sm flex flex-col justify-between relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <MapPin className="w-24 h-24 text-white" />
              </div>
              <div className="relative z-10 h-full flex flex-col justify-center text-center">
                 <p className="text-saffron font-medium text-sm tracking-wide">Live Details Fetched</p>
                 <p className="text-white/80 text-xs mt-2">Booth & Part No. require ECI electoral roll search and cannot be fetched via standard live search.</p>
              </div>
            </div>
          </div>

          {/* History/Upcoming */}
          <div className="glass rounded-3xl border border-white/50 p-6 mt-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-slate-800 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-blue-600" />
                Election Timeline
              </h3>
            </div>
            
            <div className="relative pl-6 border-l-2 border-slate-200/50 space-y-6">
              <div className="relative">
                <span className="absolute w-3 h-3 bg-blue-600 rounded-full -left-[31px] top-1.5 shadow-[0_0_0_4px_white]"></span>
                <p className="text-xs font-bold text-blue-600 bg-blue-50 w-fit px-2 py-0.5 rounded uppercase mb-1">Upcoming / Current</p>
                <p className="font-semibold text-slate-800">{data.upcoming || "Not Found"}</p>
              </div>
              <div className="relative">
                <span className="absolute w-3 h-3 bg-slate-300 rounded-full -left-[31px] top-1.5 shadow-[0_0_0_4px_white]"></span>
                <p className="text-xs font-bold text-slate-500 uppercase mb-1">Past</p>
                <p className="font-semibold text-slate-800">{data.past || "Not Found"}</p>
                {data.turnout && <p className="text-sm text-slate-500 mt-1">Found Data: {data.turnout}</p>}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
