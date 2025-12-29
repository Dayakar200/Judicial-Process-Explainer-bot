
export enum MessageRole {
  USER = 'user',
  BOT = 'bot'
}

export interface Message {
  id: string;
  role: MessageRole;
  content: string;
  timestamp: Date;
  sources?: Array<{
    title: string;
    uri: string;
  }>;
}

export interface CaseStep {
  id: number;
  title: string;
  description: string;
  details: string[];
}
