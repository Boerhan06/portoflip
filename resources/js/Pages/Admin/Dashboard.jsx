import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Dashboard({ bookings, portfolios }) {
    const { post } = useForm();

    const handleLogout = (e) => {
        e.preventDefault();
        post(route('logout'));
    };

    return (
        <div className="min-h-screen bg-black text-zinc-100 font-sans">
            <Head title="Admin Dashboard" />

            {/* Admin Navbar */}
            <nav className="border-b border-white/10 bg-white/5 backdrop-blur-md sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                    <div className="text-sm font-light tracking-[0.2em] uppercase">Portoflip Admin</div>
                    <form onSubmit={handleLogout}>
                        <button type="submit" className="text-xs text-zinc-400 hover:text-white uppercase tracking-widest">Logout</button>
                    </form>
                </div>
            </nav>

            <main className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                {/* Bookings Section */}
                <section className="lg:col-span-2">
                    <h2 className="text-xs uppercase tracking-widest text-zinc-500 mb-6">Recent Bookings</h2>
                    <div className="space-y-4">
                        {bookings.map(booking => (
                            <div key={booking.id} className="bg-white/5 border border-white/10 p-6 rounded-2xl flex justify-between items-center">
                                <div>
                                    <h3 className="font-light text-lg">{booking.client_name}</h3>
                                    <p className="text-sm text-zinc-400 mt-1">{booking.service_package?.name}</p>
                                    <p className="text-xs text-zinc-500 mt-2 font-mono">{new Date(booking.booking_date).toLocaleDateString()}</p>
                                </div>
                                <div className="text-right">
                                    <span className={`inline-block px-3 py-1 rounded-full text-xs uppercase tracking-wider ${booking.payment_status === 'paid' ? 'bg-green-500/20 text-green-300' : 'bg-yellow-500/20 text-yellow-300'}`}>
                                        {booking.payment_status}
                                    </span>
                                    <p className="text-sm mt-2 font-mono">Rp {Number(booking.total_price).toLocaleString('id-ID')}</p>
                                </div>
                            </div>
                        ))}
                        {bookings.length === 0 && <p className="text-zinc-500 font-light">No bookings yet.</p>}
                    </div>
                </section>

                {/* Portfolios Section */}
                <section>
                    <h2 className="text-xs uppercase tracking-widest text-zinc-500 mb-6">Manage Portfolio</h2>
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                        <div className="space-y-4">
                            {portfolios.map(portfolio => (
                                <div key={portfolio.id} className="flex gap-4 items-center border-b border-white/5 pb-4 last:border-0 last:pb-0">
                                    <div className="w-16 h-16 rounded bg-zinc-800 overflow-hidden flex-shrink-0">
                                        <img src={portfolio.media_url} className="w-full h-full object-cover opacity-60" alt="" />
                                    </div>
                                    <div>
                                        <h4 className="font-light text-sm line-clamp-1">{portfolio.title}</h4>
                                        <span className={`text-[10px] uppercase tracking-wider ${portfolio.is_published ? 'text-green-400' : 'text-zinc-500'}`}>
                                            {portfolio.is_published ? 'Published' : 'Draft'}
                                        </span>
                                    </div>
                                </div>
                            ))}
                            {portfolios.length === 0 && <p className="text-zinc-500 font-light text-sm">No portfolio items.</p>}
                        </div>
                        <button className="w-full mt-6 py-3 border border-white/10 rounded-xl text-xs uppercase tracking-widest text-zinc-300 hover:bg-white/5 transition-colors">
                            + Add New Work
                        </button>
                    </div>
                </section>

            </main>
        </div>
    );
}
