import { useProducts } from '../hooks/useProducts';
import { Layout } from '../components/layout/Layout';
import { Hero } from '../components/sections/Hero';
import { TrustSection } from '../components/sections/TrustSection';
import { ProductCard } from '../components/ui/ProductCard';

import { FAQ } from '../components/sections/FAQ';
import { ReviewsSection } from '../components/sections/ReviewsSection';

import { MOCK_PRODUCTS } from '../data/mockProducts';

export const Home = () => {
    const { products, loading } = useProducts();

    // Fallback in case there are no products loaded yet, use mock data.
    const displayProducts = products.length > 0 ? products : MOCK_PRODUCTS;

    return (
        <Layout>
            <Hero />
            <TrustSection />

            <section id="collection" className="bg-gray-50 py-20">
                <div className="container mx-auto px-6 max-w-6xl">
                    <h2 className="font-serif text-4xl md:text-5xl text-dark text-center font-bold">Nossa Coleção</h2>
                    <p className="font-sans text-lg text-dark/80 text-center mt-4 max-w-xl mx-auto">
                        Seleção exclusiva para Porto Velho.
                    </p>

                    {loading ? (
                        <div className="flex justify-center mt-12">
                            <div className="w-12 h-12 border-4 border-accent border-t-transparent rounded-full animate-spin"></div>
                        </div>
                    ) : (
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10 mt-16">
                            {displayProducts.map((product) => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>
                    )}
                </div>
            </section>

            <ReviewsSection />
            <FAQ />

        </Layout>
    );
};
