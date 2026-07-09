import React from 'react';
import { Head, Link } from '@inertiajs/react';

export default function Index({ portfolios }) {
    // Pola grid asimetris (Masonry-like illusion menggunakan CSS Grid Tailwind)
    const getGridSpan = (index) => {
        const pattern = [
            'md:col-span-2 md:row-span-2', // Besar (Highlight)
            'md:col-span-1 md:row-span-1', // Kecil
            'md:col-span-1 md:row-span-1', // Kecil
            'md:col-span-1 md:row-span-2', // Tinggi
            'md:col-span-2 md:row-span-1', // Lebar
            'md:col-span-1 md:row-span-1', // Kecil
        ];
        return pattern[index % pattern.length];
    };

    return (
        <div className="min-h-screen bg-black text-zinc-100 font-sans selection:bg-zinc-800">
            <Head title="Showreel & Portfolio" />

            {/* Header / Navbar Minimalis */}
            <nav className="fixed top-0 w-full z-50 bg-black/50 backdrop-blur-xl border-b border-white/5">
                <div className="max-w-7xl mx-auto px-8 h-24 flex items-center justify-between">
                    <div className="text-2xl font-light tracking-[0.2em] uppercase">
                        Portoflip<span className="text-zinc-600">.</span>
                    </div>
                    <Link 
                        href={route('bookings.create')}
                        className="px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 backdrop-blur-md transition-all text-sm tracking-widest uppercase"
                    >
                        Book Now
                    </Link>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="pt-48 pb-24 px-8 max-w-7xl mx-auto">
                <h1 className="text-5xl md:text-7xl font-light tracking-tight leading-tight max-w-3xl">
                    Visual narratives <br/>
                    <span className="text-zinc-500 italic">crafted for impact.</span>
                </h1>
                <p className="mt-8 text-zinc-400 max-w-xl text-lg font-light leading-relaxed">
                    Menjelajahi arsip karya terpilih. Sebuah simfoni visual yang memadukan estetika sinematik dan fungsionalitas modern.
                </p>
            </section>

            {/* Asymmetrical Gallery Grid */}
            <section className="px-8 pb-32 max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 auto-rows-[300px]">
                    {portfolios.map((portfolio, index) => (
                        <div 
                            key={portfolio.id} 
                            className={`group relative overflow-hidden rounded-3xl bg-white/5 border border-white/10 transition-all duration-700 hover:border-white/20 ${getGridSpan(index)}`}
                        >
                            {/* Image Background */}
                            <img 
                                src={portfolio.media_url} 
                                alt={portfolio.title}
                                className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-1000 ease-out"
                            />
                            
                            {/* Glassmorphic Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-700" />

                            {/* Content */}
                            <div className="absolute bottom-0 left-0 p-8 w-full transform translate-y-4 group-hover:translate-y-0 transition-transform duration-700">
                                <p className="text-xs tracking-[0.2em] text-zinc-400 uppercase mb-2">
                                    {new Date(portfolio.published_at).getFullYear()}
                                </p>
                                <h3 className="text-2xl font-light text-white mb-2">
                                    {portfolio.title}
                                </h3>
                                <p className="text-zinc-300 font-light text-sm line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-100">
                                    {portfolio.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                {portfolios.length === 0 && (
                    <div className="text-center py-32 border border-white/5 rounded-3xl bg-white/[0.02] backdrop-blur-sm">
                        <p className="text-zinc-500 font-light tracking-widest uppercase">Belum ada karya yang dipublikasikan.</p>
                    </div>
                )}
            </section>
        </div>
    );
}
