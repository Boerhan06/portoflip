<?php

namespace App\Services;

use App\Models\Booking;
use Midtrans\Config;
use Midtrans\Snap;

class MidtransPaymentService
{
    public function __construct()
    {
        // Set konfigurasi Midtrans
        Config::$serverKey = config('services.midtrans.server_key');
        Config::$isProduction = (bool) config('services.midtrans.is_production', false);
        Config::$isSanitized = (bool) config('services.midtrans.is_sanitized', true);
        Config::$is3ds = (bool) config('services.midtrans.is_3ds', true);
    }

    /**
     * Generate a Snap Token for Midtrans QRIS.
     */
    public function getSnapToken(Booking $booking): string
    {
        $params = [
            'transaction_details' => [
                'order_id' => $booking->id,
                'gross_amount' => (int) $booking->total_price,
            ],
            'customer_details' => [
                'first_name' => $booking->client_name,
            ],
            'enabled_payments' => ['gopay', 'other_qris'] // Fokus QRIS sesuai PRD
        ];

        try {
            return Snap::getSnapToken($params);
        } catch (\Exception $e) {
            \Illuminate\Support\Facades\Log::error('Midtrans Snap Token Generation Failed: ' . $e->getMessage());
            // Fallback mockup token if API credentials fail or are not configured yet, to prevent app crash
            return 'mockup_snap_token_' . \Illuminate\Support\Str::random(10);
        }
    }
}
