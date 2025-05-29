export type OrderStatus = 'pending' | 'confirmed' | 'cancelled' | 'shipped' | 'delivered';

export interface Order {
    id: string;
    customerName: string;
    contact: string; // e.g., phone number
    product: string; // Simple string for MVP, could be Product interface
    quantity: number;
    totalPrice: string; // e.g., "100.000 COP"
    deliveryAddress: string;
    timestamp: string; // ISO 8601 string
    status: OrderStatus;
    // Add more fields like payment status, assigned agent etc.
}