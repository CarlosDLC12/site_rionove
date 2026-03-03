import { useState, useRef, useEffect } from 'react';
import { ChevronDown, Search, Check } from 'lucide-react';

interface SearchableSelectProps {
    options: string[];
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    name?: string;
}

export const SearchableSelect = ({ options, value, onChange, placeholder = "Selecione...", name }: SearchableSelectProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const wrapperRef = useRef<HTMLDivElement>(null);

    const filteredOptions = options.filter(option =>
        option.toLowerCase().includes(searchTerm.toLowerCase())
    );

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div ref={wrapperRef} className="relative w-full">
            {/* Hidden input to maintain native form validation behavior */}
            {name && (
                <input
                    type="hidden"
                    name={name}
                    value={value}
                    required
                />
            )}

            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20 transition-all font-medium text-left flex justify-between items-center"
            >
                <span className={value ? "text-gray-900" : "text-gray-400"}>
                    {value || placeholder}
                </span>
                <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </button>

            {isOpen && (
                <div className="absolute z-50 w-full mt-2 bg-white border border-gray-100 rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.08)] overflow-hidden">
                    <div className="p-3 border-b border-gray-100 flex items-center gap-2">
                        <Search className="w-4 h-4 text-gray-400" />
                        <input
                            type="text"
                            className="w-full text-sm outline-none placeholder:text-gray-400 font-medium"
                            placeholder="Buscar bairro..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            onClick={(e) => e.stopPropagation()}
                            autoFocus
                        />
                    </div>

                    <ul className="max-h-60 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-200 p-2">
                        {filteredOptions.length === 0 ? (
                            <li className="p-3 text-sm text-gray-500 text-center font-medium">Nenhum bairro encontrado</li>
                        ) : (
                            filteredOptions.map((option) => (
                                <li
                                    key={option}
                                    onClick={() => {
                                        onChange(option);
                                        setIsOpen(false);
                                        setSearchTerm('');
                                    }}
                                    className={`p-3 rounded-lg cursor-pointer text-sm font-medium transition-colors flex justify-between items-center ${value === option
                                            ? 'bg-accent/10 text-accent'
                                            : 'hover:bg-gray-50 text-gray-700'
                                        }`}
                                >
                                    {option}
                                    {value === option && <Check className="w-4 h-4" />}
                                </li>
                            ))
                        )}
                    </ul>
                </div>
            )}
        </div>
    );
};
