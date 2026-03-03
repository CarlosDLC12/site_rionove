import { MessageCircle } from 'lucide-react';

export const FloatingWhatsApp = () => {
    return (
        <a
            href="https://wa.me/5569993947389?text=Olá!%20Vim%20pelo%20site%20e%20tenho%20uma%20dúvida."
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-6 right-6 z-50 bg-green-500 text-white p-4 rounded-full shadow-2xl hover:bg-green-600 transition-all hover:scale-110 flex items-center justify-center group"
            aria-label="Fale conosco no WhatsApp"
        >
            <MessageCircle className="w-8 h-8" />
            <span className="absolute right-full mr-4 bg-white text-dark px-3 py-1 rounded-lg text-xs font-bold shadow-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                Fale Conosco
            </span>
        </a>
    );
};
