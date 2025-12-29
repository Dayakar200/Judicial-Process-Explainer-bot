
import { CaseStep } from './types';

export const CASE_FLOW_STEPS: CaseStep[] = [
  {
    id: 1,
    title: "Initial Filing & Pleading",
    description: "The official start of a legal action.",
    details: [
      "Complaint/Petition submission",
      "Summons issuance",
      "Service of process to the defendant",
      "Answer or Motion to Dismiss filing"
    ]
  },
  {
    id: 2,
    title: "Discovery Phase",
    description: "Information exchange between parties.",
    details: [
      "Interrogatories (written questions)",
      "Depositions (oral testimony)",
      "Request for production of documents",
      "Expert witness designations"
    ]
  },
  {
    id: 3,
    title: "Pre-Trial Proceedings",
    description: "Narrowing issues and exploring settlement.",
    details: [
      "Status conferences with the judge",
      "Summary judgment motions",
      "Pre-trial motions (Evidentiary rulings)",
      "Mediation or settlement negotiations"
    ]
  },
  {
    id: 4,
    title: "The Trial",
    description: "Formal presentation of evidence.",
    details: [
      "Jury selection (Voir Dire)",
      "Opening statements",
      "Witness testimony and cross-examination",
      "Closing arguments and jury instructions"
    ]
  },
  {
    id: 5,
    title: "Judgment & Post-Trial",
    description: "Final decision and enforcement.",
    details: [
      "Verdict or bench decision",
      "Entry of final judgment",
      "Post-trial motions (New trial requests)",
      "Execution of judgment"
    ]
  },
  {
    id: 6,
    title: "Appellate Review",
    description: "Review by a higher court.",
    details: [
      "Notice of appeal filing",
      "Briefing process",
      "Oral arguments",
      "Affirming, reversing, or remanding the case"
    ]
  }
];

export const SYSTEM_INSTRUCTION = `You are the "Judicial Court Process & Case Flow Explainer Bot".
Your primary goal is public legal awareness.
You explain filing stages, hearing processes, court procedures, and case life cycles.
Rules:
1. Provide simple, neutral, and educational explanations.
2. DO NOT give any judgments, legal advice, or opinions on specific cases.
3. If a user asks for advice on what they SHOULD do, politely decline and explain the general procedure instead.
4. Use Google Search grounding to ensure you are explaining up-to-date procedural norms if asked about specific jurisdictions.
5. Focus on the flow of a case (the 'how' and 'what' of the system).
6. Always maintain a professional and informative tone.`;
