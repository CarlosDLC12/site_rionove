export interface ProductVariant {
    color: string;
    colorHex?: string;
    stock?: number;
    images?: string[];
}

export interface Product {
    id: string; // or number, depending on DB
    title: string; // or name
    price: number;
    old_price?: number;
    image_url: string;
    description: string;
    category?: string;
    specs?: string[]; // Array of strings
    images?: string[];
    featured?: boolean;
    variants?: ProductVariant[];
    technicalSpecs?: Record<string, string>;
    slug?: string; // SEO-friendly URL
    stock?: number; // Real stock from Supabase
}

export interface CartItem extends Product {
    quantity: number;
    selectedColor?: string;
}
