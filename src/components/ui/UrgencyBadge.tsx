import { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';

export const UrgencyBadge = () => {
    const [timeLeft, setTimeLeft] = useState<{ hours: number; minutes: number } | null>(null);

    useEffect(() => {
        const calculateTimeLeft = () => {
            const now = new Date();
            const target = new Date();

            // Set target to 16:00 (4:00 PM) today
            target.setHours(16, 0, 0, 0);

            // Se já passou das 16h, mostra para o próximo dia útil
            if (now > target) {
                return null;
            }

            const diff = target.getTime() - now.getTime();
            const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

            return { hours, minutes };
        };

        // Atualizar imediatamente e depois a cada minuto
        setTimeLeft(calculateTimeLeft());
        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 60000);

        return () => clearInterval(timer);
    }, []);

    if (!timeLeft) {
        return (
            <div className="flex items-center gap-2 bg-gray-50 text-gray-600 px-4 py-3 rounded-xl text-sm font-medium border border-gray-100">
                <Clock className="w-4 h-4" />
                <span>Entregas para hoje encerradas. Receba no próximo dia útil.</span>
            </div>
        );
    }

    return (
        <div className="flex animate-fade-in items-start sm:items-center gap-3 bg-[#ebb45e]/10 text-orange-800 px-4 py-3 rounded-xl text-sm font-medium border border-[#ebb45e]/20">
            <Clock className="w-5 h-5 text-accent mt-0.5 sm:mt-0 flex-shrink-0" />
            <div className="flex flex-col sm:flex-row sm:gap-1">
                <span>Compre nas próximas</span>
                <strong className="text-accent font-bold">
                    {timeLeft.hours}h e {timeLeft.minutes}m
                </strong>
                <span>e <strong className="underline decoration-accent decoration-2 underline-offset-2">receba hoje</strong> em Porto Velho.</span>
            </div>
        </div>
    );
};
