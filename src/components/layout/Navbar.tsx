import React from 'react';
import { ShoppingCart, Menu, X, Package } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCartStore } from '../../lib/store';

export const Navbar = () => {
    const [isOpen, setIsOpen] = React.useState(false);
    const cartItems = useCartStore((state) => state.items);
    const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

    return (
        <nav className="fixed w-full z-50 bg-black/90 backdrop-blur-md border-b border-white/10 text-white">
            <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                {/* Logo */}
                <Link to="/" className="text-2xl font-serif font-bold tracking-wider">
                    RIO<span className="text-accent">NOVE</span>
                </Link>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center space-x-8 text-sm uppercase tracking-widest">
                    <Link to="/" onClick={() => window.scrollTo(0, 0)} className="hover:text-accent transition-colors">Início</Link>
                    <a href="/#collection" className="hover:text-accent transition-colors">Coleção</a>
                    <Link to="/about" className="hover:text-accent transition-colors">Quem Somos</Link>
                    <Link to="/rastreio" className="text-primary hover:text-accent transition-colors border border-primary/30 px-4 py-1.5 rounded-full flex items-center gap-2">
                        <Package className="w-4 h-4" /> Rastrear
                    </Link>
                </div>

                {/* Icons */}
                <div className="flex items-center space-x-2 md:space-x-6">
                    <Link to="/cart" className="relative p-2 hover:text-accent transition-colors">
                        <ShoppingCart className="w-6 h-6 md:w-7 md:h-7" />
                        {cartCount > 0 && (
                            <span
                                key={cartCount}
                                className="absolute top-0 right-0 bg-accent text-primary text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center animate-bounce shadow-sm"
                            >
                                {cartCount}
                            </span>
                        )}
                    </Link>

                    {/* Mobile Menu Button */}
                    <button className="md:hidden p-2" onClick={() => setIsOpen(!isOpen)}>
                        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden bg-black border-t border-white/10 absolute w-full">
                    <div className="flex flex-col p-6 space-y-4 text-center">
                        <Link to="/" onClick={() => setIsOpen(false)} className="hover:text-accent">Início</Link>
                        <Link to="/#collection" onClick={() => setIsOpen(false)} className="hover:text-accent">Coleção</Link>
                        <Link to="/about" onClick={() => setIsOpen(false)} className="hover:text-accent">Quem Somos</Link>
                        <Link to="/rastreio" onClick={() => setIsOpen(false)} className="text-primary font-bold bg-dark border border-primary/30 rounded-full py-2 flex items-center justify-center gap-2">
                            <Package className="w-4 h-4" /> Rastrear Pedido
                        </Link>
                    </div>
                </div>
            )}
        </nav>
    );
};
