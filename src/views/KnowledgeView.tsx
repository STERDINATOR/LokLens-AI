import { useState } from "react";
import { Search, BookOpen, Scale, Landmark, Users, Zap, Shield, Info, ChevronRight, Gavel, Globe, History } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { LegalTerm } from "@/src/components/LegalTerm";

const SECTIONS = [
  {
    id: 'eci',
    title: 'Election Commission',
    icon: Shield,
    color: 'blue',
    items: [
      { 
        title: 'Model Code of Conduct (MCC)', 
        desc: 'Guidelines for political parties and candidates during election periods.',
        details: 'The MCC comes into force the moment the ECI announces the election schedule. It forbids ministers from announcing any new projects or using government machinery for campaigning. It also restricts the use of religious places for election propaganda.',
        link: 'MCC' 
      },
      { 
        title: 'Voter Registration', 
        desc: 'Official electoral enrollment procedures.',
        details: 'Citizens use Form 6 for new registration. NRIs use Form 6A. For deletions, Form 7 is filed, while Form 8 handles corrections. The electoral roll is updated continuously but stops revisions once the nomination deadline for an election is passed.',
        link: 'EPIC'
      },
      {
        title: 'VVPAT & voting',
        desc: 'Verification of electronic voting.',
        details: 'The Voter Verifiable Paper Audit Trail (VVPAT) prints a slip showing the candidate chosen. This slip is visible through a glass window for exactly 7 seconds before falling into the secure dropsbox. It allows voters to verify that their vote was cast as intended.',
      }
    ]
  },
  {
    id: 'laws',
    title: 'Legal Statutes',
    icon: Gavel,
    color: 'emerald',
    items: [
      { 
        title: 'RPA 1951: Key Sections', 
        desc: 'The backbone of electoral discipline.',
        details: 'Section 123 defines "Corrupt Practices" including bribery and religious appeals. Section 125 deals with promoting enmity between classes. Section 126 prohibits public meetings and campaigning during the "Silence Period" (48 hours before polling ends).',
        link: 'RPA 1951' 
      },
      { 
        title: 'Anti-Defection Law', 
        desc: 'The 52nd Amendment / 10th Schedule.',
        details: 'Members risk disqualification if they voluntarily give up party membership or defy a party whip. A merger is only valid if at least two-thirds (2/3) of the legislative party members agree to it. The Speaker/Chairman is the final deciding authority.',
        link: 'ANTI-DEFECTION'
      },
      {
        title: 'NOTA Rights',
        desc: 'The power to reject all candidates.',
        details: 'The Supreme Court in 2013 directed the ECI to provide a NOTA button. While it doesn\'t affect the outcome in terms of electing the second highest candidate, it serves as a measure of citizen dissatisfaction.',
        link: 'NOTA'
      }
    ]
  },
  {
    id: 'local',
    title: 'Local Governance',
    icon: Landmark,
    color: 'orange',
    items: [
      { 
        title: 'Gram Panchayat', 
        desc: 'Village level local self-government.',
        details: 'Headed by a Sarpanch. The Gram Panchayat is responsible for village infrastructure, sanitation, and social welfare schemes. It must hold a Gram Sabha meeting at least twice a year.',
        link: 'GRAM SABHA' 
      },
      { 
        title: 'Municipalities', 
        desc: 'Urban local bodies (ULBs).',
        details: 'Nagar Panchayats for transitional areas, Municipal Councils for smaller cities, and Municipal Corporations for large cities. The Mayor is the nominal head of a Corporation.',
      },
      {
        title: 'Ward Committees',
        desc: 'Micro-level civic engagement in cities.',
        details: 'Compulsory for cities with more than 3 lakh population. They allow citizens to participate directly in local budgeting and planning.',
      }
    ]
  }
];

export default function KnowledgeView() {
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState(SECTIONS[0].id);
  const [expandedItem, setExpandedItem] = useState<string | null>(null);

  const filteredSections = SECTIONS.map(section => ({
    ...section,
    items: section.items.filter(item => 
      item.title.toLowerCase().includes(search.toLowerCase()) || 
      item.desc.toLowerCase().includes(search.toLowerCase()) ||
      item.details.toLowerCase().includes(search.toLowerCase())
    )
  })).filter(section => section.items.length > 0);

  return (
    <div className="max-w-6xl mx-auto w-full pb-20">
      <header className="mb-12">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-14 h-14 bg-gradient-to-br from-slate-800 to-slate-900 rounded-[1.5rem] flex items-center justify-center text-white shadow-xl shadow-slate-900/20">
            <BookOpen className="w-7 h-7" />
          </div>
          <div>
            <h1 className="text-4xl font-black text-slate-900 tracking-tighter">Civic Intelligence</h1>
            <p className="text-slate-500 font-medium tracking-tight">The complete encyclopedia of Indian governance & rights.</p>
          </div>
        </div>

        <div className="relative group">
          <div className="absolute inset-0 bg-blue-500/5 blur-2xl group-focus-within:bg-blue-500/10 transition-colors" />
          <div className="relative bg-white/80 backdrop-blur-xl border border-slate-200 rounded-[2rem] p-2 flex items-center shadow-lg group-focus-within:border-blue-400 group-focus-within:ring-4 group-focus-within:ring-blue-50 transition-all">
            <Search className="w-6 h-6 text-slate-400 ml-4 group-focus-within:text-blue-500 transition-colors" />
            <input 
              type="text" 
              placeholder="Search by law, rule, section, or keyword..." 
              className="flex-1 bg-transparent border-none focus:ring-0 px-4 py-3 text-lg font-bold text-slate-900 placeholder:text-slate-400"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            {search && (
              <button 
                onClick={() => setSearch("")}
                className="p-2 hover:bg-slate-100 rounded-full transition-colors mr-2"
              >
                <ChevronRight className="w-5 h-5 text-slate-400 rotate-90" />
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 mb-10 overflow-x-auto pb-2 scrollbar-hide">
        {SECTIONS.map(section => (
          <button
            key={section.id}
            onClick={() => setActiveTab(section.id)}
            className={`
              px-6 py-3 rounded-2xl flex items-center gap-3 font-black text-sm uppercase tracking-widest transition-all
              ${activeTab === section.id 
                ? 'bg-slate-900 text-white shadow-xl scale-105' 
                : 'bg-white text-slate-500 border border-slate-200 hover:border-slate-300'}
            `}
          >
            <section.icon className="w-5 h-5" />
            {section.title}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-8">
        <AnimatePresence mode="wait">
          {filteredSections.map(section => (
            activeTab === section.id && (
              <motion.div
                key={section.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-6"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {section.items.map((item, i) => (
                    <motion.div
                      key={item.title}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.05 }}
                      className={`
                        bg-white border rounded-[2.5rem] p-8 shadow-sm hover:shadow-xl transition-all group relative overflow-hidden
                        ${expandedItem === item.title ? 'md:col-span-2 border-blue-500 ring-4 ring-blue-50' : 'border-slate-200'}
                      `}
                    >
                      <div className="flex justify-between items-start gap-4 mb-4">
                        <div>
                          <h3 className="text-2xl font-black text-slate-900 tracking-tight mb-2 flex items-center gap-2">
                             {item.title}
                             {item.link && (
                               <LegalTerm term={item.link}>
                                 <Info className="w-4 h-4 text-blue-500 cursor-pointer" />
                               </LegalTerm>
                             )}
                          </h3>
                          <p className="text-slate-500 font-bold leading-relaxed">{item.desc}</p>
                        </div>
                        <button 
                          onClick={() => setExpandedItem(expandedItem === item.title ? null : item.title)}
                          className={`p-3 rounded-2xl transition-all ${expandedItem === item.title ? 'bg-blue-600 text-white rotate-90' : 'bg-slate-100 text-slate-500 group-hover:bg-slate-200'}`}
                        >
                          <ChevronRight className="w-5 h-5" />
                        </button>
                      </div>

                      <AnimatePresence>
                        {expandedItem === item.title && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden"
                          >
                            <div className="pt-6 mt-6 border-t border-slate-100">
                              <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-600 mb-4">In-Depth Guidance</h4>
                              <p className="text-slate-700 leading-relaxed font-medium text-lg">
                                {item.details}
                              </p>
                              <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100 flex items-center gap-3">
                                  <Shield className="w-6 h-6 text-emerald-500" />
                                  <div>
                                    <p className="text-[10px] font-black uppercase text-slate-400">Status</p>
                                    <p className="text-sm font-bold text-slate-700">Constitutionally Verified</p>
                                  </div>
                                </div>
                                <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100 flex items-center gap-3">
                                  <History className="w-6 h-6 text-blue-500" />
                                  <div>
                                    <p className="text-[10px] font-black uppercase text-slate-400">Last Update</p>
                                    <p className="text-sm font-bold text-slate-700">ECI May 2024</p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )
          ))}
        </AnimatePresence>
      </div>

      {!filteredSections.length && (
        <div className="bg-white border border-slate-200 p-20 rounded-[3rem] text-center max-w-2xl mx-auto shadow-sm">
           <div className="w-24 h-24 bg-slate-50 rounded-[2rem] flex items-center justify-center mx-auto mb-8 border border-slate-100">
             <Globe className="w-12 h-12 text-slate-300" />
           </div>
           <h3 className="text-3xl font-black text-slate-900 mb-3 tracking-tight">No results found</h3>
           <p className="text-lg text-slate-500 font-medium leading-relaxed">Try searching for broader terms like "Rules", "ECI", or specific Acts like "RPA".</p>
        </div>
      )}
    </div>
  );
}
