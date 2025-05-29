export type ProductType = 'product' | 'FAQ';

export interface Product {
    id: string;
    name: string;
    description: string;
    price?: string; // Optional for FAQs
    stock?: number; // Optional for FAQs
    type?: ProductType; // 'product' by default, or 'FAQ'
}