import * as Dialog from "@radix-ui/react-dialog";
import { Info, X } from "lucide-react";

const DICTIONARY: Record<string, { title: string, description: string }> = {
  MCC: { title: "Model Code of Conduct", description: "A set of guidelines issued by the Election Commission of India for conduct of political parties and candidates during elections, mainly concerning speeches, polling day, polling booths, election manifestos, processions, and general conduct." },
  VVPAT: { title: "Voter Verifiable Paper Audit Trail", description: "An independent verification printer machine attached to electronic voting machines that allows voters to verify that their vote was cast correctly. It generates a paper slip containing the name and symbol of the candidate." },
  NOTA: { title: "None of the Above", description: "A ballot option designed to allow the voter to indicate disapproval of all of the candidates in a voting system. Note: NOTA cannot 'win' an election. Even if NOTA gets the highest votes, the candidate with the next highest votes is declared the winner." },
  AFFIDAVIT: { title: "Candidate Affidavit (Form 26)", description: "A sworn legal document filed by a candidate detailing their criminal record, assets, liabilities, and educational qualifications. It is mandatory for nominations." },
  EVM: { title: "Electronic Voting Machine", description: "An electronic device used to record votes replacing paper ballots. It consists of a Control Unit and a Balloting Unit." },
  EPIC: { title: "Elector's Photo Identity Card", description: "Also known as a Voter ID card. It is an identity document issued by the Election Commission of India to adult domiciles of India who have reached the age of 18." },
  DELIMITATION: { title: "Delimitation", description: "The act of redrawing boundaries of Lok Sabha and Assembly seats to represent changes in population. It is done by a Delimitation Commission." }
};

export function LegalTerm({ term, children }: { term: string, children?: React.ReactNode }) {
  const definition = DICTIONARY[term.toUpperCase()];
  if (!definition) return <>{children || term}</>;

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <span className="inline-flex items-center gap-0.5 cursor-pointer text-blue-700 font-bold border-b-2 border-dashed border-blue-400/50 hover:bg-blue-100 hover:border-blue-500 transition-colors rounded px-1 selection:bg-blue-200">
          {children || term}
        </span>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 transition-opacity" />
        <Dialog.Content className="fixed left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] w-[90vw] max-w-md glass border border-white/60 p-6 rounded-3xl shadow-2xl z-50 text-slate-800">
          <div className="flex justify-between items-start mb-4">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <Info className="w-6 h-6 text-blue-600" />
              {definition.title}
            </h2>
            <Dialog.Close className="p-1.5 rounded-full hover:bg-white/50 transition-colors">
              <X className="w-5 h-5 text-slate-500" />
            </Dialog.Close>
          </div>
          <p className="text-slate-700 leading-relaxed font-medium bg-white/50 p-4 rounded-2xl border border-white/60">
            {definition.description}
          </p>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
