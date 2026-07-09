<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Admin default account
        User::factory()->create([
            'name' => 'Admin Kak Han',
            'email' => 'admin@portoflip.com',
            'password' => Hash::make('password'),
        ]);

        $this->call([
            ServicePackageSeeder::class,
        ]);
    }
}
