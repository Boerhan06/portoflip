<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('bookings', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('client_name');
            $table->timestampTz('booking_date');
            $table->foreignUuid('service_package_id')
                ->constrained('service_packages')
                ->cascadeOnUpdate()
                ->restrictOnDelete();
            $table->decimal('total_price', 12, 2);
            $table->string('payment_status')->default('pending');
            $table->text('midtrans_snap_token')->nullable();
            $table->timestampsTz();

            $table->index('booking_date');
            $table->index('payment_status');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('bookings');
    }
};
