import React from 'react';
import { Head, Link, useForm, usePage } from '@inertiajs/react';

export default function Form({ servicePackages }) {
    const { flash } = usePage().props;
    
    const { data, setData, post, processing, errors, reset } = useForm({
        client_name: '',
        booking_date: '',
        service_package_id: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('bookings.store'), {
            onSuccess: () => reset(),
        });
    };

    return (
        <div className="min-h-screen bg-black text-zinc-100 font-sans selection:bg-zinc-800 flex flex-col justify-center py-24 px-6 relative overflow-hidden">
            <Head title="Book a Session" />

            {/* Background Ornaments (Subtle blur) */}
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white/5 rounded-full blur-[128px] pointer-events-none" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-white/5 rounded-full blur-[128px] pointer-events-none" />

            {/* Navbar Simple */}
            <nav className="fixed top-0 left-0 w-full p-8 z-50">
                <Link href={route('portfolios.index')} className="text-zinc-500 hover:text-zinc-100 transition-colors uppercase tracking-widest text-xs flex items-center gap-4">
                    <span className="w-8 h-px bg-current"></span>
                    Back to Gallery
                </Link>
            </nav>

            <div className="max-w-xl w-full mx-auto relative z-10">
                <div className="mb-12 text-center">
                    <h1 className="text-4xl md:text-5xl font-light tracking-tight mb-4">Start Your Project</h1>
                    <p className="text-zinc-500 font-light">Pilih layanan dan tentukan jadwal kreatif Anda.</p>
                </div>

                {/* Glassmorphic Form Card */}
                <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl">
                    
                    {flash?.message && (
                        <div className="mb-8 p-6 rounded-2xl bg-green-500/10 border border-green-500/20 text-green-200 backdrop-blur-md">
                            <p className="font-light mb-2">{flash.message}</p>
                            {flash.snap_token && (
                                <p className="text-xs font-mono break-all text-green-400/70">
                                    Mockup Snap Token: {flash.snap_token}
                                </p>
                            )}
                            <p className="mt-4 text-sm text-green-300/60 font-light">
                                *Integrasi modal QRIS Midtrans akan ditampilkan di sini pada tahap selanjutnya.
                            </p>
                        </div>
                    )}

                    <form onSubmit={submit} className="space-y-8">
                        {/* Client Name */}
                        <div>
                            <label className="block text-xs uppercase tracking-widest text-zinc-500 mb-3">Nama Lengkap / Instansi</label>
                            <input
                                type="text"
                                value={data.client_name}
                                onChange={e => setData('client_name', e.target.value)}
                                className="w-full bg-black/30 border border-white/10 rounded-xl px-6 py-4 text-zinc-100 focus:outline-none focus:border-white/30 focus:bg-white/5 transition-all font-light placeholder:text-zinc-700"
                                placeholder="Masukkan nama Anda..."
                            />
                            {errors.client_name && <p className="mt-2 text-red-400/80 text-sm font-light">{errors.client_name}</p>}
                        </div>

                        {/* Booking Date */}
                        <div>
                            <label className="block text-xs uppercase tracking-widest text-zinc-500 mb-3">Tanggal Booking</label>
                            <input
                                type="date"
                                value={data.booking_date}
                                onChange={e => setData('booking_date', e.target.value)}
                                className="w-full bg-black/30 border border-white/10 rounded-xl px-6 py-4 text-zinc-100 focus:outline-none focus:border-white/30 focus:bg-white/5 transition-all font-light color-scheme-dark"
                                style={{ colorScheme: 'dark' }}
                            />
                            {errors.booking_date && <p className="mt-2 text-red-400/80 text-sm font-light">{errors.booking_date}</p>}
                        </div>

                        {/* Service Package */}
                        <div>
                            <label className="block text-xs uppercase tracking-widest text-zinc-500 mb-3">Paket Layanan</label>
                            <div className="grid grid-cols-1 gap-4">
                                {servicePackages.map(pkg => (
                                    <label 
                                        key={pkg.id} 
                                        className={`relative flex items-center p-6 cursor-pointer rounded-xl border transition-all ${data.service_package_id === pkg.id ? 'bg-white/10 border-white/30' : 'bg-black/30 border-white/10 hover:border-white/20'}`}
                                    >
                                        <input
                                            type="radio"
                                            name="service_package_id"
                                            value={pkg.id}
                                            checked={data.service_package_id === pkg.id}
                                            onChange={e => setData('service_package_id', e.target.value)}
                                            className="sr-only"
                                        />
                                        <div className="flex-1">
                                            <h4 className="text-lg font-light text-zinc-200">{pkg.name}</h4>
                                            <p className="text-zinc-500 text-sm mt-1 font-mono">Rp {Number(pkg.price).toLocaleString('id-ID')}</p>
                                        </div>
                                        <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors ${data.service_package_id === pkg.id ? 'border-zinc-200' : 'border-zinc-600'}`}>
                                            {data.service_package_id === pkg.id && <div className="w-2.5 h-2.5 bg-zinc-200 rounded-full" />}
                                        </div>
                                    </label>
                                ))}
                            </div>
                            {errors.service_package_id && <p className="mt-2 text-red-400/80 text-sm font-light">{errors.service_package_id}</p>}
                        </div>

                        <button
                            type="submit"
                            disabled={processing}
                            className="w-full mt-4 py-5 bg-zinc-100 hover:bg-white text-black rounded-xl uppercase tracking-widest text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {processing ? 'Processing...' : 'Proceed to Payment'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
