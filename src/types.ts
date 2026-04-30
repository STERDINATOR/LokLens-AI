export type UserMode = "Citizen" | "Student" | "Journalist" | "Candidate" | "Lawyer" | "Poll Officer";

export interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

export interface ConstituencyInfo {
  state: string;
  district: string;
  assembly: string;
  parliamentary: string;
  mla: string;
  mp: string;
  nextElection: string;
}
