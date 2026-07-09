<?php

namespace App\Http\Controllers;

use App\Models\Booking;
use App\Models\Portfolio;
use Inertia\Inertia;

class AdminController extends Controller
{
    /**
     * Show the admin dashboard.
     */
    public function dashboard()
    {
        // Ambil data bookings dan portfolios untuk overview admin
        $bookings = Booking::with('servicePackage')->latest()->take(10)->get();
        $portfolios = Portfolio::latest()->take(5)->get();

        return Inertia::render('Admin/Dashboard', [
            'bookings' => $bookings,
            'portfolios' => $portfolios
        ]);
    }
}
