import React, { useState } from 'react';
import { Head, Link, useForm, usePage, router } from '@inertiajs/react';

export default function Dashboard({ bookings, portfolios }) {
    const { flash } = usePage().props;
    const [modalOpen, setModalOpen] = useState(false);
    const [editingPortfolio, setEditingPortfolio] = useState(null);

    // Form untuk Portfolio Add/Edit
    const { data, setData, post, processing, errors, reset, clearErrors } = useForm({
        title: '',
        description: '',
        is_published: false,
        media: null,
    });

    const openAddModal = () => {
        reset();
        clearErrors();
        setEditingPortfolio(null);
        setData({
            title: '',
            description: '',
            is_published: false,
            media: null
        });
        setModalOpen(true);
    };

    const openEditModal = (portfolio) => {
        clearErrors();
        setEditingPortfolio(portfolio);
        setData({
            title: portfolio.title || '',
            description: portfolio.description || '',
            is_published: !!portfolio.is_published,
            media: null, // Biarkan null jika tidak ingin mengganti
        });
        setModalOpen(true);
    };

    const handlePortfolioSubmit = (e) => {
        e.preventDefault();
        
        // Inertia form submission
        if (editingPortfolio) {
            // Karena upload file memerlukan POST di PHP, kita panggil POST route update
            post(route('admin.portfolios.update', editingPortfolio.id), {
                onSuccess: () => {
                    setModalOpen(false);
                    reset();
                }
            });
        } else {
            post(route('admin.portfolios.store'), {
                onSuccess: () => {
                    setModalOpen(false);
                    reset();
                }
            });
        }
    };

    const handleDeletePortfolio = (portfolioId) => {
        if (confirm('Apakah Anda yakin ingin menghapus karya ini?')) {
            router.delete(route('admin.portfolios.destroy', portfolioId));
        }
    };

    const handleUpdateBookingStatus = (bookingId, status) => {
        router.post(route('admin.bookings.updateStatus', bookingId), {
            payment_status: status
        });
    };

    const handleLogout = (e) => {
        e.preventDefault();
        router.post(route('logout'));
    };

    return (
        <div className="min-h-screen bg-black text-zinc-100 font-sans selection:bg-zinc-800">
            <Head title="Admin Dashboard" />

            {/* Admin Navbar */}
            <nav className="border-b border-white/5 bg-black/50 backdrop-blur-xl sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-8 h-20 flex items-center justify-between">
                    <div className="text-lg font-light tracking-[0.2em] uppercase">
                        Portoflip<span className="text-zinc-500"> Admin</span>
                    </div>
                    <div className="flex items-center gap-6">
                        <Link href={route('portfolios.index')} className="text-xs text-zinc-400 hover:text-white uppercase tracking-widest transition-colors">
                            View Site
                        </Link>
                        <form onSubmit={handleLogout}>
                            <button type="submit" className="text-xs text-red-400 hover:text-red-300 uppercase tracking-widest transition-colors">
                                Logout
                            </button>
                        </form>
                    </div>
                </div>
            </nav>

            <main className="max-w-7xl mx-auto px-8 py-12">
                
                {/* Alert Notification */}
                {flash?.message && (
                    <div className="mb-8 p-6 rounded-2xl bg-white/5 border border-white/10 text-zinc-200 backdrop-blur-md flex justify-between items-center">
                        <p className="font-light text-sm">{flash.message}</p>
                        <button onClick={() => router.reload()} className="text-xs text-zinc-400 hover:text-white uppercase tracking-widest">Dismiss</button>
                    </div>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    
                    {/* Bookings Section */}
                    <section className="lg:col-span-2">
                        <h2 className="text-xs uppercase tracking-widest text-zinc-500 mb-8 font-semibold">Recent Bookings</h2>
                        <div className="space-y-6">
                            {bookings.map(booking => (
                                <div key={booking.id} className="bg-white/[0.02] border border-white/5 p-8 rounded-3xl flex flex-col md:flex-row md:justify-between md:items-center gap-6 hover:border-white/10 transition-colors">
                                    <div>
                                        <div className="flex items-center gap-3">
                                            <h3 className="font-light text-xl text-white">{booking.client_name}</h3>
                                            <Link href={`/bookings/${booking.id}/invoice`} className="text-[10px] text-zinc-500 hover:text-zinc-300 uppercase tracking-widest border border-white/10 px-2 py-0.5 rounded">
                                                Invoice
                                            </Link>
                                        </div>
                                        <p className="text-sm text-zinc-400 mt-1">{booking.service_package?.name}</p>
                                        <div className="flex gap-4 mt-3 text-xs text-zinc-500 font-mono">
                                            <span>Tanggal: {new Date(booking.booking_date).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                                            <span>•</span>
                                            <span>Total: Rp {Number(booking.total_price).toLocaleString('id-ID')}</span>
                                        </div>
                                    </div>
                                    <div className="flex flex-col items-end gap-3">
                                        <span className={`inline-block px-3 py-1 rounded-full text-xs uppercase tracking-wider ${
                                            booking.payment_status === 'paid' ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 
                                            booking.payment_status === 'failed' ? 'bg-red-500/10 text-red-400 border border-red-500/20' : 
                                            'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20'
                                        }`}>
                                            {booking.payment_status}
                                        </span>
                                        
                                        {/* Status Update Quick Toggles */}
                                        <div className="flex items-center gap-1.5 bg-white/5 p-1 rounded-lg border border-white/5">
                                            <button 
                                                onClick={() => handleUpdateBookingStatus(booking.id, 'paid')}
                                                className={`px-2 py-1 rounded text-[10px] uppercase tracking-wider transition-all ${booking.payment_status === 'paid' ? 'bg-green-500 text-black font-semibold' : 'text-zinc-400 hover:text-white'}`}
                                            >
                                                Paid
                                            </button>
                                            <button 
                                                onClick={() => handleUpdateBookingStatus(booking.id, 'pending')}
                                                className={`px-2 py-1 rounded text-[10px] uppercase tracking-wider transition-all ${booking.payment_status === 'pending' ? 'bg-yellow-500 text-black font-semibold' : 'text-zinc-400 hover:text-white'}`}
                                            >
                                                Pending
                                            </button>
                                            <button 
                                                onClick={() => handleUpdateBookingStatus(booking.id, 'failed')}
                                                className={`px-2 py-1 rounded text-[10px] uppercase tracking-wider transition-all ${booking.payment_status === 'failed' ? 'bg-red-500 text-black font-semibold' : 'text-zinc-400 hover:text-white'}`}
                                            >
                                                Failed
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            {bookings.length === 0 && (
                                <p className="text-zinc-600 font-light italic">Belum ada data pemesanan.</p>
                            )}
                        </div>
                    </section>

                    {/* Portfolios Section */}
                    <section>
                        <div className="flex justify-between items-center mb-8">
                            <h2 className="text-xs uppercase tracking-widest text-zinc-500 font-semibold">Manage Portfolio</h2>
                            <button 
                                onClick={openAddModal}
                                className="text-xs text-white hover:text-zinc-300 uppercase tracking-widest font-light"
                            >
                                + Add Work
                            </button>
                        </div>
                        
                        <div className="bg-white/[0.01] border border-white/5 rounded-3xl p-6 space-y-4">
                            {portfolios.map(portfolio => (
                                <div key={portfolio.id} className="flex gap-4 items-center justify-between border-b border-white/5 pb-4 last:border-0 last:pb-0 group">
                                    <div className="flex gap-4 items-center min-w-0">
                                        <div className="w-16 h-16 rounded-xl bg-zinc-900 overflow-hidden flex-shrink-0 border border-white/5">
                                            <img src={portfolio.media_url} className="w-full h-full object-cover opacity-60" alt="" />
                                        </div>
                                        <div className="min-w-0">
                                            <h4 className="font-light text-sm text-white truncate">{portfolio.title}</h4>
                                            <span className={`text-[10px] uppercase tracking-wider ${portfolio.is_published ? 'text-green-400' : 'text-zinc-500'}`}>
                                                {portfolio.is_published ? 'Published' : 'Draft'}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button 
                                            onClick={() => openEditModal(portfolio)}
                                            className="text-xs text-zinc-400 hover:text-white uppercase tracking-widest"
                                        >
                                            Edit
                                        </button>
                                        <button 
                                            onClick={() => handleDeletePortfolio(portfolio.id)}
                                            className="text-xs text-red-500 hover:text-red-400 uppercase tracking-widest"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            ))}
                            {portfolios.length === 0 && (
                                <p className="text-zinc-600 font-light text-sm italic py-4">Belum ada karya portfolio.</p>
                            )}
                        </div>
                    </section>

                </div>
            </main>

            {/* Modal Add/Edit Portfolio */}
            {modalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/80 backdrop-blur-md">
                    <div className="bg-zinc-950 border border-white/10 rounded-3xl max-w-lg w-full p-8 md:p-10 shadow-2xl relative">
                        <button 
                            onClick={() => setModalOpen(false)}
                            className="absolute top-6 right-6 text-zinc-500 hover:text-white transition-colors"
                        >
                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>

                        <h2 className="text-2xl font-light text-white mb-8">
                            {editingPortfolio ? 'Edit Portfolio Work' : 'Add New Portfolio Work'}
                        </h2>

                        <form onSubmit={handlePortfolioSubmit} className="space-y-6">
                            {/* Title */}
                            <div>
                                <label className="block text-xs uppercase tracking-widest text-zinc-500 mb-2">Judul Karya</label>
                                <input
                                    type="text"
                                    required
                                    value={data.title}
                                    onChange={e => setData('title', e.target.value)}
                                    className="w-full bg-black/40 border border-white/10 rounded-xl px-5 py-3 text-zinc-100 focus:outline-none focus:border-white/30 focus:bg-white/5 transition-all font-light"
                                    placeholder="Contoh: Eternal Harmony Showreel"
                                />
                                {errors.title && <p className="mt-2 text-red-400 text-xs font-light">{errors.title}</p>}
                            </div>

                            {/* Description */}
                            <div>
                                <label className="block text-xs uppercase tracking-widest text-zinc-500 mb-2">Deskripsi Singkat</label>
                                <textarea
                                    value={data.description}
                                    onChange={e => setData('description', e.target.value)}
                                    className="w-full bg-black/40 border border-white/10 rounded-xl px-5 py-3 text-zinc-100 focus:outline-none focus:border-white/30 focus:bg-white/5 transition-all font-light min-h-[100px]"
                                    placeholder="Tuliskan latar belakang karya visual..."
                                />
                                {errors.description && <p className="mt-2 text-red-400 text-xs font-light">{errors.description}</p>}
                            </div>

                            {/* File Upload */}
                            <div>
                                <label className="block text-xs uppercase tracking-widest text-zinc-500 mb-2">Media File (Gambar)</label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    required={!editingPortfolio}
                                    onChange={e => setData('media', e.target.files[0])}
                                    className="w-full text-sm text-zinc-400 file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-light file:bg-white/10 file:text-white hover:file:bg-white/20 file:cursor-pointer"
                                />
                                <p className="text-[10px] text-zinc-600 mt-2">Format: JPG, PNG, WEBP (Maksimal 10MB)</p>
                                {errors.media && <p className="mt-2 text-red-400 text-xs font-light">{errors.media}</p>}
                            </div>

                            {/* Status Published */}
                            <div className="flex items-center gap-3">
                                <input
                                    type="checkbox"
                                    id="is_published"
                                    checked={data.is_published}
                                    onChange={e => setData('is_published', e.target.checked)}
                                    className="w-4 h-4 rounded bg-black/40 border border-white/10 text-white focus:ring-0 focus:ring-offset-0 cursor-pointer"
                                />
                                <label htmlFor="is_published" className="text-xs uppercase tracking-widest text-zinc-400 cursor-pointer select-none">Publish langsung ke Galeri Publik</label>
                            </div>

                            {/* Actions */}
                            <div className="flex gap-4 pt-4">
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="flex-1 py-4 bg-zinc-100 hover:bg-white text-black font-semibold rounded-xl uppercase tracking-widest text-xs transition-colors disabled:opacity-50"
                                >
                                    {processing ? 'Saving...' : 'Save Work'}
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setModalOpen(false)}
                                    className="px-6 py-4 bg-white/5 border border-white/10 hover:bg-white/10 text-white rounded-xl uppercase tracking-widest text-xs transition-colors"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
