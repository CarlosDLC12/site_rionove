import { useState, useEffect } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../lib/firebase';
import type { Product } from '../types';

export const useProducts = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            try {
                // Consider a product active if the "active" field is true.
                const q = query(collection(db, 'products'), where('active', '==', true));
                const querySnapshot = await getDocs(q);

                const fetchedProducts: Product[] = [];
                querySnapshot.forEach((doc) => {
                    const data = doc.data();

                    // Emulating the translation between Firestore backend and the frontend Product interface
                    fetchedProducts.push({
                        id: doc.id,
                        title: data.name || data.title, // 'name' comes from management system
                        price: data.price,
                        old_price: data.oldPrice || undefined,
                        image_url: data.images ? data.images[0] : (data.image_url || ''),
                        images: data.images || [],
                        description: data.description || '',
                        category: data.category || '',
                        stock: data.stock || 0,
                        featured: data.featured || false,
                        // map other fields as necessary from Firestore structure
                    });
                });

                setProducts(fetchedProducts);
            } catch (err) {
                console.error("Error fetching products from Firebase:", err);
                setError(err as Error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    return { products, loading, error };
};
