import { useState, useEffect, useRef, useCallback } from "react";
import { motion } from "motion/react";
import { Newspaper, ChevronRight, Clock, RefreshCw } from "lucide-react";
import { useLanguage } from "@/src/contexts/LanguageContext";
import { getLiveNews } from "@/src/services/geminiService";
import { t } from "@/src/lib/translations";

export default function NewsView() {
  const { language, langName } = useLanguage();
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [news, setNews] = useState<any[]>([]);
  const [error, setError] = useState(false);
  const [page, setPage] = useState(1);
  const observerTarget = useRef<HTMLDivElement>(null);

  const fetchNews = async (pageNum = 1, isRefresh = false) => {
    if (pageNum === 1) setLoading(true);
    else setLoadingMore(true);
    setError(false);
    try {
      const data = await getLiveNews(langName, pageNum);
      if (pageNum === 1 || isRefresh) {
        setNews(data);
        setPage(1);
      } else {
        setNews((prev) => [...prev, ...data]);
      }
    } catch (e) {
      setError(true);
    }
    if (pageNum === 1) setLoading(false);
    else setLoadingMore(false);
  };

  useEffect(() => {
    fetchNews(1, true);
  }, [language]);

  const handleObserver = useCallback((entries: IntersectionObserverEntry[]) => {
    const target = entries[0];
    if (target.isIntersecting && !loading && !loadingMore && !error) {
      setPage((prev) => {
        const next = prev + 1;
        fetchNews(next);
        return next;
      });
    }
  }, [loading, loadingMore, error]);

  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver, { threshold: 1.0 });
    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }
    return () => {
      if (observerTarget.current) observer.unobserve(observerTarget.current);
    };
  }, [handleObserver]);

  return (
    <div className="max-w-5xl mx-auto w-full h-full overflow-y-auto">
      <header className="mb-12 flex justify-between items-end">
        <div>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 text-blue-700 text-xs font-bold uppercase tracking-widest mb-4">
            <Newspaper className="w-4 h-4" />
            Live AI Feed
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tighter mb-4 leading-tight">
            {t("nav.news", language)}
          </h1>
          <p className="text-lg text-slate-600 font-medium max-w-2xl">
            Real-time news and updates curated for you.
          </p>
        </div>
        <button 
          onClick={() => fetchNews(1, true)}
          disabled={loading || loadingMore}
          className="bg-white hover:bg-slate-50 p-4 rounded-2xl shadow-sm hover:shadow-md transition-all border border-slate-200 disabled:opacity-50 shrink-0"
        >
          <RefreshCw className={`w-5 h-5 text-slate-600 ${loading ? 'animate-spin' : ''}`} />
        </button>
      </header>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          {[1, 2, 3, 4].map(i => (
             <div key={i} className="bg-white/80 backdrop-blur-xl p-8 rounded-[2.5rem] border border-slate-100 shadow-sm animate-pulse">
               <div className="w-24 h-6 bg-slate-100 rounded-xl mb-6"></div>
               <div className="w-full h-8 bg-slate-200 rounded-xl mb-4"></div>
               <div className="w-4/5 h-8 bg-slate-100 rounded-xl mb-6"></div>
               <div className="w-full h-20 bg-slate-50 rounded-xl mb-6"></div>
               <div className="w-1/3 h-4 bg-slate-100 rounded-lg"></div>
             </div>
          ))}
        </div>
      ) : error && news.length === 0 ? (
        <div className="text-center py-20 text-slate-500 glass rounded-[2.5rem]">
          <p className="font-bold text-lg mb-2">Failed to load live feed.</p>
          <button onClick={() => fetchNews(1, true)} className="mt-4 px-6 py-3 bg-slate-900 rounded-xl text-white font-bold hover:bg-slate-800 transition-colors">Try Again</button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-20 mt-8">
          {news.map((item, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: (idx % 5) * 0.1 }}
              className="bg-white/80 backdrop-blur-xl p-8 rounded-[2.5rem] border border-slate-200 hover:border-blue-300 transition-all shadow-[0_8px_30px_rgb(15,23,42,0.04)] hover:shadow-[0_20px_40px_rgb(15,23,42,0.08)] relative overflow-hidden group cursor-pointer flex flex-col h-full"
            >
              <div className="absolute top-0 right-0 p-8 opacity-0 group-hover:opacity-100 transition-opacity translate-x-4 group-hover:translate-x-0 duration-300">
                <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center border border-blue-100">
                   <ChevronRight className="w-5 h-5 text-blue-600" />
                 </div>
              </div>
              
              <div className="flex items-center gap-2 mb-6">
                <span className="bg-slate-50 text-slate-700 border border-slate-200 px-4 py-1.5 rounded-xl text-[10px] font-extrabold uppercase tracking-widest">{item.source}</span>
              </div>
              
              <h2 className="text-2xl font-extrabold text-slate-900 mb-4 leading-[1.3] group-hover:text-blue-600 transition-colors pr-12">
                {item.title}
              </h2>
              
              <p className="text-base text-slate-600 font-medium line-clamp-4 mb-8 leading-relaxed opacity-80 flex-1">
                {item.summary}
              </p>
              
              <div className="flex items-center gap-2 text-xs text-slate-400 font-bold uppercase tracking-widest pt-6 border-t border-slate-100 mt-auto">
                <Clock className="w-4 h-4" />
                <span>{item.time}</span>
              </div>
            </motion.div>
          ))}
          
          <div ref={observerTarget} className="col-span-1 md:col-span-2 py-12 flex justify-center">
             {loadingMore && <div className="w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center border border-slate-100"><RefreshCw className="w-5 h-5 text-blue-600 animate-spin" /></div>}
             {!loadingMore && error && <div className="text-red-500 text-sm font-bold bg-red-50 px-4 py-2 rounded-xl">Failed to load more feed.</div>}
          </div>
        </div>
      )}
    </div>
  );
}
