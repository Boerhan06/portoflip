<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\ServicePackage;

class ServicePackageSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $packages = [
            [
                'name' => 'Video Starter',
                'price' => 1500000.00,
                'features_json' => [
                    'Durasi maksimal 1 menit',
                    'Resolusi 1080p',
                    '1 kali revisi minor'
                ],
            ],
            [
                'name' => 'Cinematic Pro',
                'price' => 4500000.00,
                'features_json' => [
                    'Durasi maksimal 3 menit',
                    'Resolusi 4K',
                    'Color grading sinematik',
                    '3 kali revisi'
                ],
            ],
            [
                'name' => 'Full Campaign',
                'price' => 8000000.00,
                'features_json' => [
                    'Durasi maksimal 5 menit',
                    'Resolusi 4K',
                    'Motion graphics standar',
                    'Revisi tak terbatas selama 1 minggu'
                ],
            ]
        ];

        foreach ($packages as $pkg) {
            ServicePackage::create($pkg);
        }
    }
}
