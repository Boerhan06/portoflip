import React from 'react';
import { Head, useForm } from '@inertiajs/react';

export default function Login() {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('login'));
    };

    return (
        <div className="min-h-screen bg-black text-zinc-100 flex items-center justify-center p-6">
            <Head title="Admin Login" />
            
            <div className="w-full max-w-md bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-10 shadow-2xl">
                <div className="mb-10 text-center">
                    <h1 className="text-2xl tracking-[0.2em] font-light uppercase">Portoflip Admin</h1>
                </div>

                <form onSubmit={submit} className="space-y-6">
                    <div>
                        <label className="block text-xs uppercase tracking-widest text-zinc-500 mb-2">Email</label>
                        <input
                            type="email"
                            value={data.email}
                            onChange={e => setData('email', e.target.value)}
                            className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-3 text-zinc-100 focus:outline-none focus:border-white/30 transition-all font-light"
                            required
                        />
                        {errors.email && <p className="mt-2 text-red-400 text-xs">{errors.email}</p>}
                    </div>

                    <div>
                        <label className="block text-xs uppercase tracking-widest text-zinc-500 mb-2">Password</label>
                        <input
                            type="password"
                            value={data.password}
                            onChange={e => setData('password', e.target.value)}
                            className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-3 text-zinc-100 focus:outline-none focus:border-white/30 transition-all font-light"
                            required
                        />
                    </div>

                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            checked={data.remember}
                            onChange={e => setData('remember', e.target.checked)}
                            className="rounded bg-black border-white/20 text-zinc-100 focus:ring-0 focus:ring-offset-0"
                            id="remember"
                        />
                        <label htmlFor="remember" className="ml-2 text-sm text-zinc-400 font-light">Remember me</label>
                    </div>

                    <button
                        type="submit"
                        disabled={processing}
                        className="w-full py-4 bg-zinc-100 hover:bg-white text-black rounded-xl uppercase tracking-widest text-sm transition-colors"
                    >
                        Sign In
                    </button>
                </form>
            </div>
        </div>
    );
}
