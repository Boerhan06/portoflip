<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreBookingRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        // MVP: Untuk sementara dibebaskan untuk client
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'client_name' => ['required', 'string', 'max:255'],
            'booking_date' => [
                'required',
                'date',
                'after:today',
                function ($attribute, $value, $fail) {
                    $date = \Carbon\Carbon::parse($value)->toDateString();
                    $exists = \App\Models\Booking::whereDate('booking_date', $date)
                        ->whereIn('payment_status', ['pending', 'paid'])
                        ->exists();
                    if ($exists) {
                        $fail('Tanggal yang dipilih sudah di-booking oleh klien lain. Silakan pilih tanggal lain.');
                    }
                }
            ],
            'service_package_id' => ['required', 'uuid', 'exists:service_packages,id'],
        ];
    }
}
