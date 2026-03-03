import React from 'react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { Toaster } from 'sonner';
import { FloatingWhatsApp } from '../ui/FloatingWhatsApp';

interface LayoutProps {
    children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
    return (
        <div className="min-h-screen flex flex-col bg-light font-sans text-dark">
            <Toaster position="top-center" richColors />
            <Navbar />
            <main className="flex-grow pt-[72px]"> {/* pt-72px to account for fixed navbar */}
                {children}
            </main>
            <Footer />
            <FloatingWhatsApp />
        </div>
    );
};
