<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PortfolioController;
use App\Http\Controllers\BookingController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\AdminController;

Route::get('/', function () {
    return redirect()->route('portfolios.index');
});

// Publik
Route::get('/portfolios', [PortfolioController::class, 'index'])->name('portfolios.index');
Route::get('/bookings/create', [BookingController::class, 'create'])->name('bookings.create');
Route::post('/bookings', [BookingController::class, 'store'])->name('bookings.store');
Route::get('/bookings/{booking}/invoice', [BookingController::class, 'showInvoice'])->name('bookings.invoice');

// Autentikasi Admin
Route::get('/login', [AuthController::class, 'showLogin'])->name('login');
Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout'])->name('logout');

// Area Admin (Protected)
Route::middleware('auth')->prefix('admin')->group(function () {
    Route::get('/dashboard', [AdminController::class, 'dashboard'])->name('admin.dashboard');
    
    // CRUD Portfolio
    Route::post('/portfolios', [AdminController::class, 'storePortfolio'])->name('admin.portfolios.store');
    Route::post('/portfolios/{portfolio}', [AdminController::class, 'updatePortfolio'])->name('admin.portfolios.update');
    Route::delete('/portfolios/{portfolio}', [AdminController::class, 'destroyPortfolio'])->name('admin.portfolios.destroy');
    
    // Update Booking Status
    Route::post('/bookings/{booking}/status', [AdminController::class, 'updateBookingStatus'])->name('admin.bookings.updateStatus');
});

