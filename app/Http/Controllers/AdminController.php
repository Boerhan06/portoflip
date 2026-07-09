<?php

namespace App\Http\Controllers;

use App\Models\Booking;
use App\Models\Portfolio;
use Inertia\Inertia;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class AdminController extends Controller
{
    /**
     * Show the admin dashboard.
     */
    public function dashboard()
    {
        // Ambil data bookings dan portfolios lengkap untuk pengelolaan admin
        $bookings = Booking::with('servicePackage')->latest()->get();
        $portfolios = Portfolio::latest()->get();

        return Inertia::render('Admin/Dashboard', [
            'bookings' => $bookings,
            'portfolios' => $portfolios
        ]);
    }

    /**
     * Store a newly created portfolio in storage.
     */
    public function storePortfolio(Request $request)
    {
        $validated = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'is_published' => ['required', 'boolean'],
            'media' => ['required', 'file', 'image', 'max:10240'], // Max 10MB
        ]);

        $mediaUrl = null;
        if ($request->hasFile('media')) {
            $path = $request->file('media')->store('portfolios', 'public');
            $mediaUrl = Storage::url($path);
        }

        Portfolio::create([
            'title' => $validated['title'],
            'description' => $validated['description'],
            'is_published' => $validated['is_published'],
            'media_url' => $mediaUrl,
            'published_at' => $validated['is_published'] ? now() : null,
        ]);

        return redirect()->back()->with('message', 'Karya portfolio berhasil ditambahkan.');
    }

    /**
     * Update the specified portfolio in storage.
     */
    public function updatePortfolio(Request $request, Portfolio $portfolio)
    {
        $validated = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'is_published' => ['required', 'boolean'],
            'media' => ['nullable', 'file', 'image', 'max:10240'], // Max 10MB
        ]);

        $data = [
            'title' => $validated['title'],
            'description' => $validated['description'],
            'is_published' => $validated['is_published'],
        ];

        if ($request->hasFile('media')) {
            // Hapus media lama jika ada
            if ($portfolio->media_url) {
                $oldPath = str_replace('/storage/', '', $portfolio->media_url);
                Storage::disk('public')->delete($oldPath);
            }

            $path = $request->file('media')->store('portfolios', 'public');
            $data['media_url'] = Storage::url($path);
        }

        // Atur published_at jika status diubah menjadi published
        if ($validated['is_published'] && !$portfolio->is_published) {
            $data['published_at'] = now();
        } elseif (!$validated['is_published']) {
            $data['published_at'] = null;
        }

        $portfolio->update($data);

        return redirect()->back()->with('message', 'Karya portfolio berhasil diperbarui.');
    }

    /**
     * Remove the specified portfolio from storage.
     */
    public function destroyPortfolio(Portfolio $portfolio)
    {
        if ($portfolio->media_url) {
            $oldPath = str_replace('/storage/', '', $portfolio->media_url);
            Storage::disk('public')->delete($oldPath);
        }

        $portfolio->delete();

        return redirect()->back()->with('message', 'Karya portfolio berhasil dihapus.');
    }

    /**
     * Update the payment status of a booking.
     */
    public function updateBookingStatus(Request $request, Booking $booking)
    {
        $validated = $request->validate([
            'payment_status' => ['required', 'string', 'in:pending,paid,failed'],
        ]);

        $booking->update([
            'payment_status' => $validated['payment_status']
        ]);

        return redirect()->back()->with('message', 'Status pembayaran booking berhasil diperbarui.');
    }
}
