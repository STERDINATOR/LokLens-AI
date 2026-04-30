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
      <header className="mb-8 p-6 glass border border-red-200/50 rounded-3xl flex flex-col items-center text-center">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
          <AlertTriangle className="w-8 h-8 text-red-600" />
        </div>
        <h1 className="text-3xl font-bold text-red-900 mb-2">Polling Day Panic Mode</h1>
        <p className="text-red-700/80 max-w-lg">If you are facing an emergency at the polling booth, select the issue below for immediate ECI-approved legal steps.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {PANIC_MODULES.map((module, i) => {
          const Icon = module.icon;
          return (
            <Dialog.Root key={i}>
              <Dialog.Trigger asChild>
                <div className={`p-6 rounded-3xl border border-white/60 glass transition-all cursor-pointer hover:shadow-lg hover:-translate-y-1 flex flex-col justify-between group`}>
                  <div className="flex items-start gap-4 mb-4">
                    <div className={`p-3 rounded-2xl ${module.color.split(' ')[0]} ${module.color.split(' ')[1]} ring-1 ring-inset ${module.color.split(' ')[2]}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-slate-900 group-hover:text-blue-700 transition-colors">{module.title}</h3>
                      <p className="text-slate-600 text-sm mt-1">{module.desc}</p>
                    </div>
                  </div>
                  <button className="w-full py-3 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold rounded-xl text-sm transition-colors mt-2 shadow-sm border border-slate-200">
                    {module.action}
                  </button>
                </div>
              </Dialog.Trigger>
              <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 transition-opacity" />
                <Dialog.Content className="fixed left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] w-[90vw] max-w-lg glass border border-white/60 p-6 rounded-3xl shadow-2xl z-50 text-slate-800">
                  <div className="flex justify-between items-start mb-6">
                    <div className="flex items-center gap-4">
                      <div className={`p-3 rounded-2xl ${module.color.split(' ')[0]} ${module.color.split(' ')[1]} ring-1 ring-inset ${module.color.split(' ')[2]}`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <div>
                        <h2 className="text-xl font-bold">{module.title}</h2>
                        <p className="text-slate-500 text-sm font-medium">Step-by-step guidance</p>
                      </div>
                    </div>
                    <Dialog.Close className="p-1.5 rounded-full hover:bg-white/50 transition-colors">
                      <X className="w-5 h-5 text-slate-500" />
                    </Dialog.Close>
                  </div>
                  <div className="space-y-3">
                    {module.steps.map((step, idx) => (
                      <div key={idx} className="bg-white/50 p-4 rounded-2xl border border-white/60 text-slate-700 font-medium leading-relaxed">
                        {step}
                      </div>
                    ))}
                  </div>
                </Dialog.Content>
              </Dialog.Portal>
            </Dialog.Root>
          )
        })}
      </div>

      <div className="mt-8 bg-slate-900 text-white p-6 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-6 shadow-lg">
        <div>
          <h3 className="font-bold text-lg flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-red-400" />
            National Election Helpline
          </h3>
          <p className="text-slate-300 text-sm mt-1">For immediate assistance, dial the universal voter helpline.</p>
        </div>
        <a href="tel:1950" className="px-8 py-4 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-xl rounded-xl transition-colors shrink-0 backdrop-blur-sm">
          Dial 1950
        </a>
      </div>
    </div>
  );
}
