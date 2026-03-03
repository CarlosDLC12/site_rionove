import { ProductCard } from '../ui/ProductCard';
import type { Product } from '../../types';

interface RelatedProductsProps {
    currentProduct: Product;
    allProducts: Product[];
}

export const RelatedProducts = ({ currentProduct, allProducts }: RelatedProductsProps) => {
    // Lógica de recomendação baseada em categoria
    const getRelatedProducts = () => {
        // Primeiro, tentar produtos da mesma categoria
        let related = allProducts.filter(
            p => p.id !== currentProduct.id && p.category === currentProduct.category
        );

        // Se não houver produtos da mesma categoria, pegar produtos em destaque
        if (related.length === 0) {
            related = allProducts.filter(
                p => p.id !== currentProduct.id && p.featured
            );
        }

        // Se ainda não houver, pegar qualquer produto diferente
        if (related.length === 0) {
            related = allProducts.filter(p => p.id !== currentProduct.id);
        }

        // Retornar no máximo 3 produtos
        return related.slice(0, 3);
    };

    const relatedProducts = getRelatedProducts();

    if (relatedProducts.length === 0) return null;

    return (
        <section className="bg-gray-50 py-16 border-t border-gray-100">
            <div className="container mx-auto px-6 max-w-6xl">
                <div className="mb-10">
                    <h2 className="font-serif text-3xl font-bold text-dark text-center">
                        Você Também Pode Gostar
                    </h2>
                    <p className="text-gray-600 text-center mt-2">
                        Produtos selecionados especialmente para você
                    </p>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {relatedProducts.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </div>
        </section>
    );
};
