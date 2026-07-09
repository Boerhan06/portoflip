<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\PortfolioController;
use App\Http\Controllers\Api\BookingController;
use App\Http\Controllers\Api\WebhookController;

Route::prefix('v1')->group(function () {
    Route::get('/portfolios', [PortfolioController::class, 'index'])->name('api.portfolios.index');
    Route::post('/bookings', [BookingController::class, 'store'])->name('api.bookings.store');
    
    // Webhook Endpoint
    Route::post('/webhook/midtrans', [WebhookController::class, 'midtransCallback'])->name('api.webhook.midtrans');
});

