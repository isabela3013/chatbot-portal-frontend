import type { Message } from "./message";


export type Channel = 'whatsapp' | 'instagram';

export interface Conversation {
    id: string;
    customerName: string;
    channel: Channel;
    lastMessage: string;
    timestamp: string; // ISO 8601 string
    unread: boolean;
    messages: Message[];
}