import React from 'react';
import { Head, Link, useForm, usePage } from '@inertiajs/react';

export default function Form({ servicePackages, bookedDates = [] }) {
    const { flash } = usePage().props;
    
    const { data, setData, post, processing, errors, reset } = useForm({
        client_name: '',
        booking_date: '',
        service_package_id: '',
    });

    // Hitung tanggal minimum (besok)
    const getTomorrowStr = () => {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        return tomorrow.toISOString().split('T')[0];
    };

    const submit = (e) => {
        e.preventDefault();
        post(route('bookings.store'), {
            onSuccess: () => reset(),
        });
    };

    // Pemicu Midtrans Snap Modal secara otomatis saat token diterima
    React.useEffect(() => {
        if (flash?.snap_token) {
            if (window.snap) {
                window.snap.pay(flash.snap_token, {
                    onSuccess: function (result) {
                        window.location.href = `/bookings/${result.order_id}/invoice`;
                    },
                    onPending: function (result) {
                        window.location.href = `/bookings/${result.order_id}/invoice`;
                    },
                    onError: function (result) {
                        alert("Pembayaran gagal! Silakan coba lagi.");
                    },
                    onClose: function () {
                        alert("Anda menutup popup pembayaran sebelum menyelesaikan transaksi. Anda dapat membayar nanti di halaman Invoice.");
                        // Redirect ke halaman invoice agar bisa bayar nanti
                        if (flash.booking_id) {
                            window.location.href = `/bookings/${flash.booking_id}/invoice`;
                        }
                    }
                });
            } else {
                console.error("Midtrans Snap SDK not loaded.");
                alert("Sistem pembayaran sedang bersiap, silakan coba beberapa saat lagi.");
            }
        }
    }, [flash?.snap_token]);

    const handleDateChange = (e) => {
        const val = e.target.value;
        if (bookedDates.includes(val)) {
            alert("Maaf, tanggal tersebut sudah di-booking oleh klien lain. Silakan pilih tanggal lain.");
            setData('booking_date', '');
        } else {
            setData('booking_date', val);
        }
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
                    <p className="text-zinc-500 font-light">Pilih layanan dan tentukan jadwal kreatif Anda (1 slot per hari).</p>
                </div>

                {/* Glassmorphic Form Card */}
                <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl">
                    
                    {flash?.message && (
                        <div className="mb-8 p-6 rounded-2xl bg-white/5 border border-white/10 text-zinc-200 backdrop-blur-md">
                            <p className="font-light">{flash.message}</p>
                            <p className="mt-2 text-xs text-zinc-500 font-light">
                                Menampilkan jendela pembayaran Midtrans QRIS...
                            </p>
                        </div>
                    )}

                    <form onSubmit={submit} className="space-y-8">
                        {/* Client Name */}
                        <div>
                            <label className="block text-xs uppercase tracking-widest text-zinc-500 mb-3">Nama Lengkap / Instansi</label>
                            <input
                                type="text"
                                required
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
                                required
                                min={getTomorrowStr()}
                                value={data.booking_date}
                                onChange={handleDateChange}
                                className="w-full bg-black/30 border border-white/10 rounded-xl px-6 py-4 text-zinc-100 focus:outline-none focus:border-white/30 focus:bg-white/5 transition-all font-light color-scheme-dark"
                                style={{ colorScheme: 'dark' }}
                            />
                            <p className="mt-2 text-[10px] text-zinc-500 font-light uppercase tracking-wider">
                                *Hanya 1 proyek per hari untuk menjaga kualitas eksklusif karya kami.
                            </p>
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
                                            required
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
