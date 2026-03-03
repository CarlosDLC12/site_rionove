import React, { useState } from 'react';
import { MapPin } from 'lucide-react';

export const DeliveryCalculator = () => {
    const [price, setPrice] = useState<number | null>(null);

    const handleZoneChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = Number(e.target.value);
        setPrice(value > 0 ? value : null);
    };

    return (
        <section className="bg-white py-16 border-t border-gray-100">
            <div className="container mx-auto px-6 max-w-4xl">
                <div className="bg-gray-50 rounded-2xl p-8 md:p-12 shadow-sm border border-gray-100 flex flex-col md:flex-row items-center gap-10">
                    <div className="md:w-1/2">
                        <span className="text-accent font-bold tracking-widest uppercase text-xs">Entrega Rápida</span>
                        <h2 className="font-serif text-3xl font-bold text-dark mt-2 mb-4">Simule seu Frete</h2>
                        <p className="text-gray-600 text-sm leading-relaxed">
                            Utilizamos o <strong>99 Moto</strong> para garantir a entrega mais rápida e barata de Porto Velho. Selecione sua região para ver a estimativa.
                        </p>
                    </div>
                    <div className="md:w-1/2 w-full bg-white p-6 rounded-xl shadow-md">
                        <label className="block text-xs font-bold text-gray-500 uppercase mb-2 flex items-center gap-2">
                            <MapPin className="w-4 h-4" /> Selecione seu Bairro/Região
                        </label>
                        <select
                            onChange={handleZoneChange}
                            className="w-full p-3 border border-gray-200 rounded-lg bg-gray-50 text-dark focus:outline-none focus:border-accent transition-colors"
                        >
                            <option value="0">Escolha uma opção...</option>
                            <option value="5">Zona Sul (Caladinho, Jatuarana, Cohab) - Perto da Loja</option>
                            <option value="8">Centro / Olaria / Caiari</option>
                            <option value="12">Zona Leste (Tancredo, JK)</option>
                            <option value="15">Zona Norte (Industrial, Nacional)</option>
                            <option value="25">Candeias / Aeroporto</option>
                        </select>

                        {price !== null && (
                            <div className="mt-6 animate-fade-in-up">
                                <div className="flex justify-between items-center border-b border-gray-100 pb-2 mb-2">
                                    <span className="text-gray-500 text-sm">Estimativa 99 Moto:</span>
                                    <span className="font-bold text-xl text-primary">
                                        {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(price)}
                                    </span>
                                </div>
                                <p className="text-[10px] text-gray-400 text-center">Valor aproximado. Pode variar conforme horário.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};
