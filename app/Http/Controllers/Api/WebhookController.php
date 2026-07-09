<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Booking;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class WebhookController extends Controller
{
    /**
     * Handle incoming Midtrans Webhook / Callback.
     */
    public function midtransCallback(Request $request)
    {
        // Catat request webhook masuk untuk keperluan debugging
        Log::info('Midtrans Webhook received', $request->all());

        $serverKey = config('services.midtrans.server_key', 'YOUR_SERVER_KEY');
        $hashedKey = hash('sha512', $request->order_id . $request->status_code . $request->gross_amount . $serverKey);

        // Verifikasi Signature Key dari Midtrans
        // Uncomment baris ini ketika masuk fase production/staging yang sebenarnya
        /*
        if ($hashedKey !== $request->signature_key) {
            return response()->json(['message' => 'Invalid signature key'], 403);
        }
        */

        $booking = Booking::find($request->order_id);

        if (!$booking) {
            return response()->json(['message' => 'Booking not found'], 404);
        }

        $transactionStatus = $request->transaction_status;

        if ($transactionStatus == 'capture' || $transactionStatus == 'settlement') {
            $booking->update(['payment_status' => 'paid']);
        } elseif ($transactionStatus == 'cancel' || $transactionStatus == 'deny' || $transactionStatus == 'expire') {
            $booking->update(['payment_status' => 'failed']);
        } elseif ($transactionStatus == 'pending') {
            $booking->update(['payment_status' => 'pending']);
        }

        return response()->json(['message' => 'Webhook processed successfully']);
    }
}
