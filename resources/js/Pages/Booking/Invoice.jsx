import React from 'react';
import { Head, Link } from '@inertiajs/react';

export default function Invoice({ booking }) {
    
    const triggerPayment = () => {
        if (booking.midtrans_snap_token && window.snap) {
            window.snap.pay(booking.midtrans_snap_token, {
                onSuccess: function (result) {
                    window.location.reload();
                },
                onPending: function (result) {
                    window.location.reload();
                },
                onError: function (result) {
                    alert("Pembayaran gagal!");
                },
                onClose: function () {
                    alert("Anda menutup jendela pembayaran.");
                }
            });
        } else {
            alert("Sistem pembayaran sedang tidak tersedia, silakan segarkan halaman.");
        }
    };

    return (
        <div className="min-h-screen bg-black text-zinc-100 font-sans selection:bg-zinc-800 flex flex-col justify-center py-24 px-6 relative overflow-hidden">
            <Head title={`Invoice #${booking.id.substring(0, 8).toUpperCase()}`} />

            {/* Background Ornaments */}
            <div className="absolute top-1/4 left-1/3 w-[500px] h-[500px] bg-white/[0.02] rounded-full blur-[160px] pointer-events-none" />

            {/* Simple Nav */}
            <nav className="fixed top-0 left-0 w-full p-8 z-50 flex justify-between items-center">
                <Link href={route('portfolios.index')} className="text-zinc-500 hover:text-zinc-100 transition-colors uppercase tracking-widest text-xs flex items-center gap-4">
                    <span className="w-8 h-px bg-current"></span>
                    Portoflip.
                </Link>
            </nav>

            <div className="max-w-md w-full mx-auto relative z-10">
                
                {/* Glowing status wrapper based on payment */}
                <div className={`rounded-3xl p-0.5 shadow-2xl transition-all duration-75 ${
                    booking.payment_status === 'paid' ? 'bg-gradient-to-b from-green-500/20 to-transparent' : 
                    booking.payment_status === 'failed' ? 'bg-gradient-to-b from-red-500/20 to-transparent' : 
                    'bg-gradient-to-b from-yellow-500/20 to-transparent'
                }`}>
                    
                    <div className="bg-zinc-950/95 backdrop-blur-2xl border border-white/5 rounded-[22px] overflow-hidden">
                        
                        {/* Header Ticket Section */}
                        <div className="p-8 text-center border-b border-white/5 relative">
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-1 bg-white/10 rounded-full" />
                            
                            <p className="text-[10px] uppercase tracking-[0.2em] text-zinc-500 mb-2">Digital Ticket & Invoice</p>
                            <h2 className="text-2xl font-light tracking-tight text-white mb-4">
                                #{booking.id.substring(0, 8).toUpperCase()}
                            </h2>

                            {/* Status glowing indicator */}
                            <span className={`inline-block px-4 py-1.5 rounded-full text-xs uppercase tracking-widest font-semibold border ${
                                booking.payment_status === 'paid' ? 'bg-green-500/10 text-green-400 border-green-500/20' : 
                                booking.payment_status === 'failed' ? 'bg-red-500/10 text-red-400 border-red-500/20' : 
                                'bg-yellow-500/10 text-yellow-400 border-yellow-500/20'
                            }`}>
                                {booking.payment_status === 'paid' ? 'Confirmed & Secured' : `Payment ${booking.payment_status}`}
                            </span>
                        </div>

                        {/* Ticket QR Code Mockup */}
                        <div className="p-8 flex justify-center bg-black/40 border-b border-white/5">
                            <div className="p-6 bg-white rounded-3xl opacity-80 hover:opacity-100 transition-opacity">
                                {/* SVG mock QR Code */}
                                <svg width="120" height="120" viewBox="0 0 100 100" fill="black">
                                    <path d="M5 5h30v30H5zM10 10v20h20V10z M5 65h30v30H5zM10 70v20h20V70z M65 5h30v30H65zM70 10v20h20V10z" />
                                    <path d="M45 5h10v10H45zM45 25h10v15H45zM5 45h10v10H5zM25 45h30v10H25zM65 45h10v10H65zM85 45h10v20H85z" />
                                    <path d="M45 65h10v20H45zM55 75h15v10H55zM75 65h20v10H75zM75 85h10v10H75zM90 90h5v5H90z" />
                                    <path d="M15 15h10v10H15z M15 75h10v10H15z M75 15h10v10H75z" />
                                </svg>
                            </div>
                        </div>

                        {/* Transaction Details */}
                        <div className="p-8 space-y-6 text-sm">
                            <div className="flex justify-between border-b border-white/5 pb-3">
                                <span className="text-zinc-500 font-light">Klien</span>
                                <span className="text-zinc-200 font-light">{booking.client_name}</span>
                            </div>
                            <div className="flex justify-between border-b border-white/5 pb-3">
                                <span className="text-zinc-500 font-light">Paket Layanan</span>
                                <span className="text-zinc-200 font-light">{booking.service_package?.name}</span>
                            </div>
                            <div className="flex justify-between border-b border-white/5 pb-3">
                                <span className="text-zinc-500 font-light">Tanggal Jadwal</span>
                                <span className="text-zinc-200 font-mono">
                                    {new Date(booking.booking_date).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                                </span>
                            </div>
                            <div className="flex justify-between items-center pt-2">
                                <span className="text-zinc-400 uppercase tracking-wider text-xs">Total Pembayaran</span>
                                <span className="text-xl font-mono text-white font-light">
                                    Rp {Number(booking.total_price).toLocaleString('id-ID')}
                                </span>
                            </div>
                        </div>

                        {/* Footer Action Buttons */}
                        <div className="p-8 pt-0 text-center">
                            {booking.payment_status === 'pending' && (
                                <button 
                                    onClick={triggerPayment}
                                    className="w-full py-4 bg-yellow-500 hover:bg-yellow-400 text-black rounded-xl uppercase tracking-widest text-xs font-semibold transition-colors mb-4"
                                >
                                    Pay DP Now
                                </button>
                            )}

                            {booking.payment_status === 'failed' && (
                                <Link 
                                    href={route('bookings.create')}
                                    className="block w-full py-4 bg-white/10 hover:bg-white/20 text-white rounded-xl uppercase tracking-widest text-xs font-semibold transition-colors mb-4"
                                >
                                    Re-book Slot
                                </Link>
                            )}

                            <Link 
                                href={route('portfolios.index')}
                                className="block w-full py-4 border border-white/10 hover:bg-white/5 text-zinc-400 hover:text-white rounded-xl uppercase tracking-widest text-xs transition-colors"
                            >
                                Back to Gallery
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
