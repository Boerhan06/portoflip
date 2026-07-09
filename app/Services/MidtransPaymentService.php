<?php

namespace App\Services;

use App\Models\Booking;
use Illuminate\Support\Str;

class MidtransPaymentService
{
    /**
     * Generate a Snap Token for MVP purposes.
     * In the future, this will be replaced with actual Midtrans API call.
     */
    public function getSnapToken(Booking $booking): string
    {
        // TODO: Implement actual Midtrans API call here when ready.
        
        // Kerangka logika untuk Midtrans QRIS
        // 1. Set konfigurasi Midtrans (Server Key, Environment)
        // \Midtrans\Config::$serverKey = config('services.midtrans.server_key');
        // \Midtrans\Config::$isProduction = config('services.midtrans.is_production');
        // \Midtrans\Config::$isSanitized = true;
        // \Midtrans\Config::$is3ds = true;
        // 
        // 2. Siapkan parameter transaksi
        // $params = [
        //     'transaction_details' => [
        //         'order_id' => $booking->id,
        //         'gross_amount' => $booking->total_price,
        //     ],
        //     'customer_details' => [
        //         'first_name' => $booking->client_name,
        //     ],
        //     'enabled_payments' => ['gopay', 'other_qris'] // Fokus QRIS sesuai PRD
        // ];
        // 
        // 3. Dapatkan Snap Token dari Midtrans
        // return \Midtrans\Snap::getSnapToken($params);

        // Untuk saat ini, kembalikan mockup token
        return 'mockup_snap_token_' . Str::random(10);
    }
}
