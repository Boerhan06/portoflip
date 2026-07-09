<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreBookingRequest;
use App\Models\Booking;
use App\Models\ServicePackage;
use App\Services\MidtransPaymentService;
use Illuminate\Http\JsonResponse;

class BookingController extends Controller
{
    /**
     * Store a newly created booking in storage via API.
     */
    public function store(StoreBookingRequest $request, MidtransPaymentService $paymentService): JsonResponse
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

        return response()->json([
            'success' => true,
            'message' => 'Booking berhasil dibuat.',
            'data' => $booking
        ], 201);
    }
}
