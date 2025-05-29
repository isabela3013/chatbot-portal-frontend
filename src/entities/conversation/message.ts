export type Sender = 'customer' | 'bot' | 'agent';

export interface Message {
    sender: Sender;
    text: string;
    timestamp: string; // ISO 8601 string
}