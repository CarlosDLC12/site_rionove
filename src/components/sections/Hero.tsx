import { Link } from 'react-router-dom';


export const Hero = () => {
    return (
        <header className="relative min-h-[85vh] flex items-center justify-center bg-bg-light overflow-hidden">
            {/* Minimalist Background Elements */}
            <div className="absolute top-0 right-0 w-1/2 h-full bg-white hidden lg:block rounded-l-[100px] shadow-sm transform translate-x-10"></div>

            <div className="relative z-10 container mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">

                {/* Text Content */}
                <div className="flex flex-col items-start text-left animate-fade-in-up">
                    <div className="mb-6 tracking-[0.4em] text-xs md:text-sm uppercase text-muted font-bold">
                        Rionove Tecnologia
                    </div>

                    <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold leading-tight text-secondary">
                        Design e <br /> Tecnologia <span className="text-primary italic">Premium</span>.
                    </h1>

                    <p className="font-sans text-lg md:text-xl text-dark/70 mt-6 max-w-lg font-light leading-relaxed">
                        Smartwatches e fones de ouvido importados selecionados a dedo. <strong className="text-secondary font-medium">Entrega imediata</strong> em Porto Velho.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-6 mt-10 w-full sm:w-auto">
                        <a href="#collection"
                            className="bg-primary text-white font-bold py-4 px-10 rounded-full shadow-[0_10px_30px_rgba(235,180,94,0.3)] uppercase tracking-wider text-sm hover:bg-dark transition-all duration-300 transform hover:-translate-y-1 text-center">
                            Nossos Produtos
                        </a>
                        <Link to="/about"
                            className="bg-transparent border border-muted text-muted font-bold py-4 px-10 rounded-full uppercase tracking-wider text-sm hover:border-secondary hover:text-secondary transition-colors text-center">
                            Saiba Mais
                        </Link>
                    </div>

                    <div className="mt-12 flex items-center gap-3 text-sm text-muted font-medium bg-white px-5 py-3 rounded-full shadow-sm">
                        <span className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse"></span>
                        Estoque Local: Entrega garantida até 18h
                    </div>
                </div>

                {/* Floating Image Area */}
                <div className="hidden lg:flex justify-center items-center relative h-[600px] animate-fade-in">
                    <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-transparent rounded-full blur-3xl transform -translate-x-10"></div>
                    <img
                        src="https://images.unsplash.com/photo-1579586337278-3befd40fd17a?q=80&w=2072&auto=format&fit=crop"
                        alt="Apple Watch Smartwatch Minimalista Rionove"
                        className="w-[80%] h-auto object-cover rounded-[3rem] shadow-2xl z-10 transform rotate-[-2deg] hover:rotate-0 transition-transform duration-700"
                    />
                </div>
            </div>
        </header>
    );
};
