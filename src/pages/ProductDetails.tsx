import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Layout } from '../components/layout/Layout';
import { useCartStore } from '../lib/store';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import type { Product } from '../types';
import { ArrowLeft, ShoppingBag, ShieldCheck, Truck, CreditCard, Star } from 'lucide-react';
import { toast } from 'sonner';
import { Helmet } from 'react-helmet-async';
import { CrossSell } from '../components/ui/CrossSell';
import { UrgencyBadge } from '../components/ui/UrgencyBadge';
import { FloatingActionBar } from '../components/ui/FloatingActionBar';
import { RelatedProducts } from '../components/sections/RelatedProducts';
import { MOCK_PRODUCTS } from '../data/mockProducts';

export const ProductDetails = () => {
    const { slugOrId } = useParams();
    const navigate = useNavigate();
    const { addItem } = useCartStore();
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const [selectedImage, setSelectedImage] = useState('');
    const [selectedColor, setSelectedColor] = useState<string>('');
    const currentVariant = product?.variants?.find(v => v.color === selectedColor);
    const displayStock = currentVariant && currentVariant.stock !== undefined ? currentVariant.stock : (product?.stock || 0);

    useEffect(() => {
        window.scrollTo(0, 0);
        const fetchProduct = async () => {
            if (!slugOrId) return;

            try {
                // First, try to find by slug in mock data
                let foundProduct = MOCK_PRODUCTS.find(p => p.slug === slugOrId);

                // If not found by slug, try by ID (backwards compatibility)
                if (!foundProduct) {
                    foundProduct = MOCK_PRODUCTS.find(p => p.id === slugOrId);
                }

                if (foundProduct) {
                    // Buscar estoque real do sistema de gestão no Firebase
                    const productRef = doc(db, 'products', foundProduct.id);
                    const productSnap = await getDoc(productRef);
                    let currentStock = 0;
                    if (productSnap.exists()) {
                        currentStock = productSnap.data().stock || 0;
                    }

                    const productWithStock = {
                        ...foundProduct,
                        stock: currentStock
                    };

                    setProduct(productWithStock);
                    setSelectedImage(foundProduct.image_url);
                    if (foundProduct.variants && foundProduct.variants.length > 0) {
                        setSelectedColor(foundProduct.variants[0].color);
                    }
                } else {
                    // Try Firebase as fallback
                    const productRef = doc(db, 'products', slugOrId);
                    const productSnap = await getDoc(productRef);

                    if (productSnap.exists()) {
                        const data = productSnap.data();

                        const productWithStock: Product = {
                            id: productSnap.id,
                            title: data.name || data.title,
                            price: data.price,
                            old_price: data.oldPrice || undefined,
                            image_url: data.images && data.images.length > 0 ? data.images[0] : (data.image_url || ''),
                            images: data.images || [],
                            description: data.description || '',
                            category: data.category || '',
                            stock: data.stock || 0,
                            featured: data.featured || false,
                            slug: slugOrId,
                            variants: data.variants || [],
                            specs: data.specs || [],
                            technicalSpecs: data.technicalSpecs || {}
                        };

                        setProduct(productWithStock);
                        setSelectedImage(productWithStock.image_url);
                        if (productWithStock.variants && productWithStock.variants.length > 0) {
                            setSelectedColor(productWithStock.variants[0].color);
                        }
                    }
                }
            } catch (error) {
                // Silently fail - product not found
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [slugOrId]);

    // Update images when color changes
    useEffect(() => {
        if (product && product.variants && selectedColor) {
            const selectedVariant = product.variants.find(v => v.color === selectedColor);
            if (selectedVariant && selectedVariant.images && selectedVariant.images.length > 0) {
                setSelectedImage(selectedVariant.images[0]);
            }
        }
    }, [selectedColor, product]);

    const handleAddToCart = () => {
        if (product && displayStock > 0) {
            const itemToAdd = { ...product };
            addItem(itemToAdd);
            const colorText = selectedColor ? ` (${selectedColor})` : '';
            toast.success(`${product.title}${colorText} adicionado ao carrinho!`, {
                description: "Continue comprando ou finalize seu pedido.",
                action: {
                    label: "Ver Carrinho",
                    onClick: () => navigate('/cart')
                }
            });
        } else if (displayStock === 0) {
            toast.error(`A cor ${selectedColor || 'selecionada'} está esgotada no momento.`);
        }
    };

    if (loading) {
        return (
            <Layout>
                <div className="min-h-screen flex items-center justify-center bg-light">
                    <div className="w-12 h-12 border-4 border-accent border-t-transparent rounded-full animate-spin"></div>
                </div>
            </Layout>
        );
    }

    if (!product) {
        return (
            <Layout>
                <div className="min-h-screen flex flex-col items-center justify-center bg-light text-center p-6">
                    <h2 className="text-2xl font-bold text-dark mb-4">Produto não encontrado</h2>
                    <button onClick={() => navigate('/')} className="text-accent hover:underline">
                        Voltar para a loja
                    </button>
                </div>
            </Layout>
        );
    }

    return (
        <Layout>
            <Helmet>
                <title>Comprar {product.title} em Porto Velho | Rionove</title>
                <meta name="description" content={`Compre ${product.title} original com entrega no mesmo dia em Porto Velho. ${product.description.slice(0, 100)}... Aproveite R$ ${product.price.toFixed(2).replace('.', ',')}`} />
                <script type="application/ld+json">
                    {`
                    {
                        "@context": "https://schema.org/",
                        "@type": "Product",
                        "name": "${product.title}",
                        "image": "${product.images ? product.images[0] : product.image_url}",
                        "description": "${product.description}",
                        "brand": {
                            "@type": "Brand",
                            "name": "Rionove"
                        },
                        "offers": {
                            "@type": "Offer",
                            "url": "https://rionove.com/product/${product.slug || product.id}",
                            "priceCurrency": "BRL",
                            "price": "${product.price}",
                            "priceValidUntil": "2026-12-31",
                            "itemCondition": "https://schema.org/NewCondition",
                            "availability": "${displayStock > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock"}",
                            "seller": {
                                "@type": "Organization",
                                "name": "Rionove Importados - Porto Velho"
                            }
                        }
                    }
                    `}
                </script>
            </Helmet>
            <div className="bg-bg-light min-h-screen pt-24 pb-12">
                <div className="container mx-auto px-6 max-w-6xl">
                    <button
                        onClick={() => navigate(-1)}
                        className="flex items-center text-gray-500 hover:text-accent mb-8 transition-colors"
                    >
                        <ArrowLeft className="w-5 h-5 mr-2" />
                        Voltar
                    </button>

                    <div className="bg-transparent rounded-3xl overflow-hidden">
                        <div className="grid md:grid-cols-2 gap-12">
                            {/* Image Section */}
                            <div className="p-8 md:p-12 bg-white rounded-[2.5rem] flex flex-col items-center justify-center relative">
                                <div className="w-full aspect-square relative mb-8">
                                    <img
                                        src={selectedImage}
                                        alt={product.title}
                                        loading="eager"
                                        decoding="async"
                                        className="w-full h-full object-contain mix-blend-multiply animate-fade-in"
                                    />
                                </div>
                                {/* Thumbnails */}
                                <div className="flex gap-4">
                                    {(() => {
                                        if (product.variants && selectedColor) {
                                            const selectedVariant = product.variants.find(v => v.color === selectedColor);
                                            const imagesToShow = selectedVariant?.images || product.images || [product.image_url];
                                            return imagesToShow.map((img, idx) => (
                                                <button
                                                    key={idx}
                                                    onClick={() => setSelectedImage(img)}
                                                    className={`w-20 h-20 rounded-xl p-2 bg-bg-light ${selectedImage === img ? 'ring-2 ring-primary ring-offset-2' : ''}`}
                                                >
                                                    <img src={img} loading="lazy" decoding="async" className="w-full h-full object-contain mix-blend-multiply" alt={`Thumbnail ${idx + 1}`} />
                                                </button>
                                            ));
                                        }
                                        return (product.images || [product.image_url]).map((img, idx) => (
                                            <button
                                                key={idx}
                                                onClick={() => setSelectedImage(img)}
                                                className={`w-20 h-20 rounded-xl p-2 bg-bg-light ${selectedImage === img ? 'ring-2 ring-primary ring-offset-2' : ''}`}
                                            >
                                                <img src={img} loading="lazy" decoding="async" className="w-full h-full object-contain mix-blend-multiply" alt={`Thumbnail ${idx + 1}`} />
                                            </button>
                                        ));
                                    })()}
                                </div>
                            </div>

                            {/* Info Section */}
                            <div className="py-8 md:py-12 flex flex-col">
                                <span className="text-primary font-bold tracking-widest uppercase text-xs mb-2">{product.category || 'Tecnologia'}</span>
                                <h1 className="font-serif text-4xl md:text-5xl font-bold text-secondary mb-3 leading-tight">{product.title}</h1>

                                {/* Star Rating */}
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="flex">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <Star key={star} className="w-5 h-5 fill-primary text-primary" />
                                        ))}
                                    </div>
                                    <span className="text-sm text-gray-600 font-medium">Produto Recomendado</span>
                                </div>

                                {/* Urgency Delivery Badge */}
                                <div className="mb-6">
                                    <UrgencyBadge />
                                </div>

                                <div className="flex items-end gap-4 mb-8">
                                    <span className="text-3xl font-bold text-primary">
                                        {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(product.price)}
                                    </span>
                                    {product.old_price && (
                                        <span className="text-xl text-gray-400 line-through mb-1">
                                            {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(product.old_price)}
                                        </span>
                                    )}
                                </div>

                                <p className="text-gray-600 leading-relaxed mb-8">
                                    {product.description}
                                </p>

                                {/* Color Selector */}
                                {product.variants && product.variants.length > 0 && (
                                    <div className="mb-8">
                                        <h3 className="font-bold text-muted text-xs uppercase tracking-wider mb-4">
                                            Cor: <span className="text-secondary">{selectedColor}</span>
                                        </h3>
                                        <div className="flex flex-wrap gap-3">
                                            {product.variants.map((variant) => {
                                                const isVariantOutOfStock = variant.stock === 0;
                                                return (
                                                    <button
                                                        key={variant.color}
                                                        onClick={() => setSelectedColor(variant.color)}
                                                        className={`group relative flex items-center gap-2 px-4 py-2 rounded-xl transition-all ${selectedColor === variant.color
                                                            ? 'bg-white ring-2 ring-primary shadow-sm'
                                                            : 'bg-white/50 hover:bg-white'
                                                            } ${isVariantOutOfStock ? 'opacity-50' : ''}`}
                                                    >
                                                        <div
                                                            className="w-6 h-6 rounded-full border-2 border-gray-300"
                                                            style={{ backgroundColor: variant.colorHex }}
                                                        />
                                                        <span className={`text-sm font-medium ${selectedColor === variant.color ? 'text-dark' : 'text-gray-600'
                                                            }`}>
                                                            {variant.color} {isVariantOutOfStock ? '(Esgotado)' : ''}
                                                        </span>
                                                    </button>
                                                )
                                            })}
                                        </div>
                                    </div>
                                )}

                                {/* Specs */}
                                {product.specs && product.specs.length > 0 && (
                                    <div className="mb-8">
                                        <h3 className="font-bold text-muted text-xs uppercase tracking-wider mb-4">Destaques</h3>
                                        <ul className="grid grid-cols-2 gap-3">
                                            {product.specs.map((spec, idx) => (
                                                <li key={idx} className="flex items-center text-sm text-secondary bg-white px-4 py-3 rounded-xl shadow-sm border border-black/5">
                                                    <div className="w-1.5 h-1.5 bg-primary rounded-full mr-3"></div>
                                                    {spec}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}

                                {/* Technical Specifications */}
                                {product.technicalSpecs && Object.keys(product.technicalSpecs).length > 0 && (
                                    <details className="mb-8 bg-white border border-black/5 rounded-2xl overflow-hidden shadow-sm">
                                        <summary className="cursor-pointer p-5 font-bold text-secondary hover:bg-bg-light transition-colors flex justify-between items-center">
                                            <span className="text-xs uppercase tracking-wider">Especificações Técnicas</span>
                                            <span className="text-primary text-xl">+</span>
                                        </summary>
                                        <div className="p-6 pt-2 space-y-3">
                                            {Object.entries(product.technicalSpecs).map(([key, value]) => (
                                                <div key={key} className="flex justify-between items-start py-2 border-b border-black/5 last:border-0">
                                                    <span className="text-sm font-medium text-muted capitalize w-1/3">
                                                        {key.replace(/([A-Z])/g, ' $1').trim()}:
                                                    </span>
                                                    <span className="text-sm text-secondary font-medium w-2/3 text-right">{value}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </details>
                                )}

                                <div className="mt-auto">
                                    <button
                                        onClick={handleAddToCart}
                                        disabled={displayStock === 0}
                                        className={`w-full font-bold py-4 rounded-xl shadow-[0_10px_20px_rgba(63,85,74,0.15)] flex items-center justify-center gap-3 text-lg mb-4 transition-all ${displayStock === 0
                                            ? 'bg-gray-300 text-gray-500 cursor-not-allowed opacity-50'
                                            : 'bg-dark text-white hover:bg-black transform hover:-translate-y-1'
                                            }`}
                                    >
                                        <ShoppingBag className="w-6 h-6" />
                                        {displayStock === 0 ? 'Sem Estoque' : 'Adicionar ao Carrinho'}
                                    </button>

                                    {displayStock > 0 && (
                                        <button
                                            onClick={() => {
                                                if (product && displayStock > 0) {
                                                    const itemToAdd = { ...product, selectedColor: selectedColor || undefined };
                                                    addItem(itemToAdd);
                                                    navigate('/checkout');
                                                }
                                            }}
                                            className="w-full bg-primary text-white font-bold py-4 rounded-xl shadow-[0_10px_30px_rgba(235,180,94,0.3)] hover:bg-primary/90 transition-all transform hover:-translate-y-1 flex items-center justify-center gap-3 text-lg"
                                        >
                                            <CreditCard className="w-6 h-6" />
                                            Comprar Agora
                                        </button>
                                    )}

                                    <div className="grid grid-cols-3 gap-4 mt-8 pt-8 border-t border-gray-100">
                                        <div className="text-center">
                                            <Truck className="w-6 h-6 text-gray-400 mx-auto mb-2" />
                                            <span className="text-[10px] text-gray-500 uppercase font-bold block">Entrega Rápida</span>
                                        </div>
                                        <div className="text-center">
                                            <ShieldCheck className="w-6 h-6 text-gray-400 mx-auto mb-2" />
                                            <span className="text-[10px] text-gray-500 uppercase font-bold block">Garantia 30 Dias</span>
                                        </div>
                                        <div className="text-center">
                                            <CreditCard className="w-6 h-6 text-gray-400 mx-auto mb-2" />
                                            <span className="text-[10px] text-gray-500 uppercase font-bold block">100% Seguro</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-6 max-w-6xl">
                <CrossSell
                    mainProduct={product}
                    accessoryId="4" /* ID da pulseira 22mm */
                    allProducts={MOCK_PRODUCTS}
                    onComboAdded={() => {
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                />
            </div>

            <RelatedProducts currentProduct={product} allProducts={MOCK_PRODUCTS} />

            <FloatingActionBar
                product={product}
                selectedColor={selectedColor}
                onAddToCart={handleAddToCart}
                stockInfo={{ hasStock: displayStock > 0, quantity: displayStock }}
            />
        </Layout>
    );
};
