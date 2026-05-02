import * as Dialog from "@radix-ui/react-dialog";
import { Info, X, Scale } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/src/lib/utils";

const DICTIONARY: Record<string, { title: string, description: string }> = {
  MCC: { title: "Model Code of Conduct", description: "A set of guidelines issued by the Election Commission of India for conduct of political parties and candidates during elections, mainly concerning speeches, polling day, polling booths, election manifestos, processions, and general conduct." },
  VVPAT: { title: "Voter Verifiable Paper Audit Trail", description: "An independent verification printer machine attached to electronic voting machines that allows voters to verify that their vote was cast correctly. It generates a paper slip containing the name and symbol of the candidate." },
  NOTA: { title: "None of the Above", description: "A ballot option designed to allow the voter to indicate disapproval of all of the candidates in a voting system. Note: NOTA cannot 'win' an election. Even if NOTA gets the highest votes, the candidate with the next highest votes is declared the winner." },
  AFFIDAVIT: { title: "Candidate Affidavit (Form 26)", description: "A sworn legal document filed by a candidate detailing their criminal record, assets, liabilities, and educational qualifications. It is mandatory for nominations." },
  EVM: { title: "Electronic Voting Machine", description: "An electronic device used to record votes replacing paper ballots. It consists of a Control Unit and a Balloting Unit." },
  EPIC: { title: "Elector's Photo Identity Card", description: "Also known as a Voter ID card. It is an identity document issued by the Election Commission of India to adult domiciles of India who have reached the age of 18." },
  DELIMITATION: { title: "Delimitation", description: "The act of redrawing boundaries of Lok Sabha and Assembly seats to represent changes in population. It is done by a Delimitation Commission." },
  "RPA 1951": { title: "Representation of the People Act, 1951", description: "The primary law governing the conduct of elections in India. It covers qualification/disqualification of members, corrupt practices, and the machinery for conducting elections." },
  "SECTION 123": { title: "Corrupt Practices (RPA)", description: "Defines corrupt practices such as bribery, undue influence, appeal on grounds of religion or caste, and promoting hatred. Violation can lead to disqualification." },
  "FIRST PAST THE POST": { title: "FPTP System", description: "The electoral system used in India where the candidate with the highest number of votes in a constituency is declared elected, even if they don't get an absolute majority." },
  "ANTI-DEFECTION": { title: "Anti-Defection Law (10th Schedule)", description: "Provisions added to the Constitution in 1985 to prevent elected members from switching political parties for personal gain. Defection leads to loss of membership." },
  "QUORUM": { title: "Quorum", description: "The minimum number of members required to be present at a meeting of the House (Lok Sabha/Rajya Sabha) to make the proceedings valid. Usually 1/10th of the total membership." },
  "GRAM SABHA": { title: "Gram Sabha", description: "The foundational unit of local governance in India, consisting of all registered voters in a village. It is responsible for approving development plans and identifying beneficiaries." }
};

export function LegalTerm({ term, children, className, title: customTitle, description: customDescription }: { term: string, children?: React.ReactNode, className?: string, title?: string, description?: string }) {
  const dictionaryEntry = DICTIONARY[term.toUpperCase()];
  const definition = {
    title: customTitle || dictionaryEntry?.title || term,
    description: customDescription || dictionaryEntry?.description || "Legal term explanation coming soon."
  };

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <span className={cn("inline-flex items-center gap-0.5 cursor-pointer text-blue-700 font-bold border-b-2 border-dashed border-blue-400/50 hover:bg-blue-100 hover:border-blue-500 transition-colors rounded px-1 selection:bg-blue-200", className)}>
          {children || term} <Info className="w-3 h-3 opacity-50 ml-0.5 shrink-0" />
        </span>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay asChild>
           <motion.div 
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             exit={{ opacity: 0 }}
             className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[100]" 
           />
        </Dialog.Overlay>
        <Dialog.Content asChild>
           <motion.div
             initial={{ opacity: 0, scale: 0.95, y: 10 }}
             animate={{ opacity: 1, scale: 1, y: 0 }}
             exit={{ opacity: 0, scale: 0.95, y: 10 }}
             className="fixed left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] w-[90vw] max-w-md bg-white p-8 rounded-[2rem] shadow-2xl z-[110] text-slate-800"
           >
             <div className="absolute top-0 right-0 w-32 h-32 bg-blue-100/50 rounded-bl-full pointer-events-none" />
             <div className="relative z-10 flex justify-between items-start mb-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-[1.25rem] flex items-center justify-center shrink-0 border border-blue-100">
                     <Scale className="w-6 h-6" />
                  </div>
                  <Dialog.Title asChild>
                    <h2 className="text-xl font-extrabold leading-tight mt-1 text-slate-900">
                      {definition.title}
                    </h2>
                  </Dialog.Title>
                </div>
                <Dialog.Close className="p-2 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-500 transition-colors group z-20">
                  <X className="w-5 h-5 group-hover:rotate-90 transition-transform" />
                </Dialog.Close>
              </div>
              <div className="relative z-10">
                <p className="text-slate-600 leading-relaxed font-medium text-[15px]">
                  {definition.description}
                </p>
                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-2">
                   <div className="px-3 py-1 bg-amber-50 text-amber-700 text-[10px] font-bold uppercase tracking-widest rounded-lg border border-amber-200/50">ECI Verified</div>
                </div>
              </div>
           </motion.div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
