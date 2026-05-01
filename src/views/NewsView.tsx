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
      <header className="mb-8 flex justify-between items-end">
        <div>
          <div className="flex items-center gap-2 text-blue-600 mb-2">
            <Newspaper className="w-5 h-5" />
            <span className="font-bold tracking-widest text-xs uppercase text-blue-500">Live AI Feed</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold text-slate-800 tracking-tight">
            {t("nav.news", language)}
          </h1>
          <p className="text-slate-500 mt-2 max-w-lg">
            Real-time news and updates curated for you.
          </p>
        </div>
        <button 
          onClick={() => fetchNews(1, true)}
          disabled={loading || loadingMore}
          className="bg-white/50 hover:bg-white/80 p-2 rounded-full shadow-sm transition-all border border-slate-200 disabled:opacity-50"
        >
          <RefreshCw className={`w-5 h-5 text-slate-600 ${loading ? 'animate-spin' : ''}`} />
        </button>
      </header>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="glass p-6 rounded-3xl animate-pulse">
              <div className="w-20 h-4 bg-slate-200 rounded mb-4"></div>
              <div className="w-full h-6 bg-slate-200 rounded mb-2"></div>
              <div className="w-3/4 h-6 bg-slate-200 rounded mb-4"></div>
              <div className="w-full h-16 bg-slate-200 rounded mb-4"></div>
              <div className="w-1/4 h-4 bg-slate-200 rounded"></div>
            </div>
          ))}
        </div>
      ) : error && news.length === 0 ? (
        <div className="text-center py-20 text-slate-500">
          <p>Failed to load live news.</p>
          <button onClick={() => fetchNews(1, true)} className="mt-4 px-4 py-2 bg-slate-200 rounded-lg text-slate-700">Try Again</button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-20">
          {news.map((item, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: (idx % 5) * 0.1 }}
              className="glass p-6 rounded-3xl border border-white hover:border-blue-300 transition-all shadow-sm hover:shadow-md relative overflow-hidden group cursor-pointer"
            >
              <div className="absolute top-0 right-0 p-6 opacity-0 group-hover:opacity-100 transition-opacity">
                <ChevronRight className="w-6 h-6 text-blue-500" />
              </div>
              
              <div className="flex items-center gap-2 mb-4">
                <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider">{item.source}</span>
              </div>
              
              <h2 className="text-xl font-bold text-slate-900 mb-3 leading-tight group-hover:text-blue-700 transition-colors">
                {item.title}
              </h2>
              
              <p className="text-slate-600 text-sm mb-6 line-clamp-3">
                {item.summary}
              </p>
              
              <div className="flex items-center gap-2 text-xs text-slate-400 font-medium mt-auto">
                <Clock className="w-3.5 h-3.5" />
                <span>{item.time}</span>
              </div>
            </motion.div>
          ))}
          
          <div ref={observerTarget} className="col-span-1 md:col-span-2 py-8 flex justify-center">
             {loadingMore && <RefreshCw className="w-6 h-6 text-slate-400 animate-spin" />}
             {!loadingMore && error && <div className="text-red-500 text-sm">Failed to load more.</div>}
          </div>
        </div>
      )}
    </div>
  );
}
