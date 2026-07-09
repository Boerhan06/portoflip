<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreBookingRequest;
use App\Models\Booking;
use App\Models\ServicePackage;
use App\Services\MidtransPaymentService;
use Inertia\Inertia;
use Illuminate\Http\RedirectResponse;

class BookingController extends Controller
{
    /**
     * Show the form for creating a new booking.
     */
    public function create()
    {
        $servicePackages = ServicePackage::all();
        
        $bookedDates = Booking::whereIn('payment_status', ['pending', 'paid'])
            ->where('booking_date', '>=', now()->startOfDay())
            ->get()
            ->map(fn($booking) => $booking->booking_date->toDateString())
            ->unique()
            ->values()
            ->toArray();

        return Inertia::render('Booking/Form', [
            'servicePackages' => $servicePackages,
            'bookedDates' => $bookedDates
        ]);
    }

    /**
     * Store a newly created booking in storage.
     */
    public function store(StoreBookingRequest $request, MidtransPaymentService $paymentService): RedirectResponse
    {
        $validated = $request->validated();
        
        $servicePackage = ServicePackage::findOrFail($validated['service_package_id']);
        
        $booking = Booking::create([
            'client_name' => $validated['client_name'],
            'booking_date' => $validated['booking_date'],
            'service_package_id' => $servicePackage->id,
            'total_price' => $servicePackage->price,
            'payment_status' => 'pending',
        ]);

        // Panggil service Midtrans untuk mendapatkan Snap Token (Mockup)
        $snapToken = $paymentService->getSnapToken($booking);
        
        $booking->update([
            'midtrans_snap_token' => $snapToken
        ]);

        // Mengembalikan redirect (karena menggunakan Inertia) dengan flash session
        return redirect()->back()->with([
            'message' => 'Booking berhasil dibuat',
            'snap_token' => $snapToken,
            'booking_id' => $booking->id
        ]);
    }

    /**
     * Show the digital invoice or ticket for a booking.
     */
    public function showInvoice(Booking $booking)
    {
        $booking->load('servicePackage');
        
        return Inertia::render('Booking/Invoice', [
            'booking' => $booking
        ]);
    }
}
