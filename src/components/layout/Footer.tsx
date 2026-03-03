

import { Instagram } from 'lucide-react';
import { Link } from 'react-router-dom';
export const Footer = () => {
    return (
        <footer className="bg-black text-gray-500 py-12 border-t border-gray-900">
            <div className="container mx-auto px-6 text-center">
                <p className="font-sans text-sm mb-4">Rionove © 2025 | Porto Velho - RO</p>
                <div className="flex justify-center items-center gap-6 mb-8">
                    <a href="https://www.instagram.com/rionove_importados/" target="_blank" className="text-gray-400 hover:text-accent transition-colors flex items-center gap-2 uppercase text-xs tracking-wider">
                        <Instagram className="w-5 h-5" />
                        Siga no Instagram
                    </a>
                </div>
                <div className="flex justify-center gap-6 text-xs uppercase tracking-wider mb-8 flex-wrap">
                    <Link to="/termos" className="hover:text-white transition-colors">Termos de Uso</Link>
                    <Link to="/privacidade" className="hover:text-white transition-colors">Política de Privacidade</Link>
                    <Link to="/trocas" className="hover:text-white transition-colors">Trocas e Devoluções</Link>
                    <Link to="/rastreio" className="hover:text-white transition-colors">Rastrear Pedido</Link>
                    <Link to="/dicas-locais" className="hover:text-white transition-colors text-primary font-bold">Dicas Locais</Link>
                </div>
                <p className="text-[10px] opacity-50">Imagens meramente ilustrativas.</p>
            </div>
        </footer>
    );
};
