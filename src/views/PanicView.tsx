import * as Dialog from "@radix-ui/react-dialog";
import { AlertTriangle, UserX, Map, Megaphone, FileWarning, ShieldAlert, BadgeInfo, X } from "lucide-react";
import { LegalTerm } from "@/src/components/LegalTerm";

export default function PanicView() {
  const PANIC_MODULES = [
    {
      icon: UserX,
      title: "My name is missing",
      desc: "Already at the booth? Can't find your name?",
      color: "bg-orange-50 text-orange-600 border-orange-200",
      action: "Check Roll",
      steps: [
        "1. Check with the Booth Level Officer (BLO) sitting outside the polling station.",
        "2. Ensure you are checking the correct Part Number of the electoral roll.",
        <>3. Search your name on the Voter Helpline App or eci.gov.in using your <LegalTerm term="EPIC">EPIC</LegalTerm> number.</>,
        "4. If your name is deleted, you cannot vote today. File Form 6 for the next election."
      ]
    },
    {
      icon: Map,
      title: "Wrong booth",
      desc: "Directed to the wrong location?",
      color: "bg-blue-50 text-blue-600 border-blue-200",
      action: "Find Correct",
      steps: [
        "1. Do not argue with polling officers; they can only allow voters in their specific part list.",
        <>2. Send an SMS: ECI &lt;space&gt; &lt;<LegalTerm term="EPIC">EPIC</LegalTerm> No&gt; to 1950.</>,
        "3. Wait for the reply which contains your correct Booth Number and Name.",
        "4. Approach the help desk outside the station for directions."
      ]
    },
    {
      icon: BadgeInfo,
      title: "ID lost / Forgot EPIC",
      desc: "Don't have your Voter ID card?",
      color: "bg-green-50 text-green-600 border-green-200",
      action: "View Allowed IDs",
      steps: [
        <>1. You CAN vote without an <LegalTerm term="EPIC">EPIC</LegalTerm> card if your name is on the electoral roll.</>,
        "2. Produce any of these 12 alternative IDs: Aadhaar Card, PAN Card, Driving License, Indian Passport, MNREGA Job Card, Bank Passbook with photo, Smart Card issued by RGI, Health Insurance Smart Card, Pension document with photo, Official ID cards issued to MPs/MLAs, Official identity cards issued by Central/State govt.",
        "3. Approach the Presiding Officer and present the alternative ID."
      ]
    },
    {
      icon: Megaphone,
      title: "Hate Speech / Bribe",
      desc: "Witnessing cash, liquor, or hate speech?",
      color: "bg-rose-50 text-rose-600 border-rose-200",
      action: "Report cVIGIL",
      steps: [
        "1. Maintain a safe distance and do not engage directly.",
        "2. Download the Election Commission's 'cVIGIL' app.",
        "3. Quietly record a photo or max 2-minute video of the incident.",
        "4. Upload it anonymously. ECI guarantees a flying squad response within 100 minutes."
      ]
    },
    {
      icon: ShieldAlert,
      title: "Violence nearby",
      desc: "Booth capturing or intimidation?",
      color: "bg-red-50 text-red-600 border-red-300",
      action: "Alert Control Room",
      steps: [
        "1. Prioritize your physical safety. Move away from the immediate vicinity.",
        "2. Inform the Presiding Officer or the micro-observer immediately if safe to do so.",
        "3. Dial 100 for local police or 1950 for the ECI control room.",
        "4. The Sector Magistrate in charge of the route will be dispatched with Central Armed Police Forces (CAPF)."
      ]
    },
    {
      icon: FileWarning,
      title: "Machine issue",
      desc: <> <LegalTerm term="EVM">EVM</LegalTerm> malfunction or <LegalTerm term="VVPAT">VVPAT</LegalTerm> out of paper? </>,
      color: "bg-amber-50 text-amber-600 border-amber-200",
      action: "Guidance",
      steps: [
        "1. Inform the Presiding Officer inside the booth immediately.",
        "2. Do NOT press multiple buttons or hit the machine.",
        "3. The Presiding Officer will pause voting and alert the Sector Officer.",
        "4. If a machine is replaced, a mock poll will be conducted before voting resumes. Wait patiently."
      ]
    }
  ];

  return (
    <div className="max-w-4xl mx-auto w-full">
      <header className="mb-10 lg:mb-16">
        <div className="bg-gradient-to-br from-rose-500 to-red-600 rounded-[3rem] p-10 md:p-14 relative overflow-hidden shadow-[0_20px_40px_rgb(225,29,72,0.2)] text-center flex flex-col items-center">
          <div className="absolute top-0 right-0 p-8 opacity-10">
             <AlertTriangle className="w-64 h-64 text-white transform rotate-12 -translate-y-16 translate-x-16" />
          </div>
          <div className="absolute top-0 left-0 p-8 opacity-10">
             <AlertTriangle className="w-48 h-48 text-white transform -rotate-12 -translate-y-10 -translate-x-10" />
          </div>
          
          <div className="w-24 h-24 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center mb-6 ring-8 ring-white/10 relative z-10">
            <AlertTriangle className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight mb-4 relative z-10 leading-tight">Polling Day<br />Panic Mode</h1>
          <p className="text-red-100 font-bold text-lg md:text-xl max-w-2xl relative z-10 leading-relaxed uppercase tracking-widest">
            If you are facing an emergency at the polling booth, select the issue below for immediate ECI-approved legal steps.
          </p>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {PANIC_MODULES.map((module, i) => {
          const Icon = module.icon;
          return (
            <Dialog.Root key={i}>
              <Dialog.Trigger asChild>
                <div className={`p-8 rounded-[2.5rem] bg-white/80 backdrop-blur-xl border border-slate-200 transition-all cursor-pointer hover:shadow-xl hover:-translate-y-1.5 focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-500 flex flex-col group h-full relative overflow-hidden`}>
                  <div className={`absolute top-0 left-0 w-full h-1.5 ${module.color.includes('red') || module.color.includes('rose') ? 'bg-gradient-to-r from-rose-500 to-red-600' : module.color.includes('orange') || module.color.includes('amber') ? 'bg-gradient-to-r from-amber-400 to-orange-500' : module.color.includes('green') ? 'bg-gradient-to-r from-emerald-400 to-green-500' : 'bg-gradient-to-r from-blue-400 to-indigo-500'}`}></div>
                  
                  <div className="flex-1">
                    <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 ${module.color} shadow-sm group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-300`}>
                      <Icon className="w-8 h-8" />
                    </div>
                    <div>
                      <h3 className="font-extrabold text-2xl text-slate-900 leading-tight mb-3 group-hover:text-slate-700 transition-colors">{module.title}</h3>
                      <p className="text-slate-600 text-base font-medium leading-relaxed">{module.desc}</p>
                    </div>
                  </div>
                  <div className="w-full py-4 mt-8 bg-slate-50 border border-slate-200 group-hover:bg-slate-100 text-slate-700 font-extrabold rounded-2xl transition-colors shadow-sm text-center uppercase tracking-widest text-xs flex justify-center items-center gap-2">
                    {module.action} <AlertTriangle className="w-3.5 h-3.5 opacity-50" />
                  </div>
                </div>
              </Dialog.Trigger>
              <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 bg-slate-900/40 backdrop-blur-md z-50 transition-opacity" />
                <Dialog.Content className="fixed left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] w-[90vw] max-w-lg bg-white/90 backdrop-blur-2xl border border-slate-200 p-8 rounded-[2.5rem] shadow-2xl z-50 text-slate-800">
                  <div className="flex justify-between items-start mb-8">
                    <div className="flex items-center gap-4">
                      <div className={`p-4 rounded-2xl ${module.color.split(' ')[0]} ${module.color.split(' ')[1]} ring-1 ring-inset ${module.color.split(' ')[2]} shadow-sm`}>
                        <Icon className="w-8 h-8" />
                      </div>
                      <div>
                        <Dialog.Title asChild>
                          <h2 className="text-2xl font-extrabold text-slate-900">{module.title}</h2>
                        </Dialog.Title>
                        <p className="text-slate-500 text-xs tracking-widest uppercase font-bold mt-1">Step-by-step guidance</p>
                      </div>
                    </div>
                    <Dialog.Close className="p-2 rounded-full hover:bg-slate-100 transition-colors border border-transparent hover:border-slate-200">
                      <X className="w-6 h-6 text-slate-500" />
                    </Dialog.Close>
                  </div>
                  <div className="space-y-4">
                    {module.steps.map((step, idx) => (
                      <div key={idx} className="bg-slate-50 p-5 rounded-2xl border border-slate-200 text-slate-700 font-medium leading-relaxed shadow-sm flex gap-3 items-start">
                        <span className="font-bold text-slate-900 shrink-0">{idx + 1}.</span>
                        <span>{typeof step === 'string' ? step.substring(3) : step}</span>
                      </div>
                    ))}
                  </div>
                </Dialog.Content>
              </Dialog.Portal>
            </Dialog.Root>
          )
        })}
      </div>

      <div className="mt-12 bg-slate-900 text-white p-8 md:p-10 rounded-[3rem] flex flex-col md:flex-row items-center justify-between gap-8 shadow-[0_20px_40px_rgb(15,23,42,0.2)] border border-slate-800 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-10 blur-xl">
           <ShieldAlert className="w-64 h-64 text-red-500" />
        </div>
        <div className="relative z-10">
          <h3 className="font-extrabold text-2xl flex items-center gap-3 mb-2">
            <ShieldAlert className="w-8 h-8 text-red-500" />
            National Election Helpline
          </h3>
          <p className="text-slate-300 text-base font-medium">For immediate assistance, dial the universal voter helpline.</p>
        </div>
        <a href="tel:1950" className="px-10 py-5 bg-white text-slate-900 hover:bg-slate-50 font-black text-3xl rounded-[2rem] transition-colors shrink-0 shadow-lg relative z-10 tracking-tight text-center w-full md:w-auto">
          Dial 1950
        </a>
      </div>
    </div>
  );
}
