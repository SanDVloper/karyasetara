<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Job;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // Clean existing demo data (optional)
        // Job::truncate(); User::whereIn('email',['worker@demo.test','employer@demo.test'])->delete();

        // Demo Admin
        $admin = User::firstOrCreate(
            ['email' => 'admin@demo.test'],
            [
                'name' => 'Admin KaryaSetara',
                'password' => Hash::make('password123'),
                'role' => 'admin',
                'capability_bitmask' => 0,
                'latitude' => -6.200000,
                'longitude' => 106.816666,
                'address' => 'Kantor Pusat KaryaSetara',
            ]
        );

        // Demo Worker - Made
        $worker = User::firstOrCreate(
            ['email' => 'worker@demo.test'],
            [
                'name' => 'Made Worker',
                'password' => Hash::make('password123'),
                'role' => 'worker',
                'capability_bitmask' => 15, // Visual+Audio+Motorik+Komunikasi
                'latitude' => -6.200000,
                'longitude' => 106.816666,
                'address' => 'Jakarta Pusat, DKI Jakarta',
                'accessibility_preference' => json_encode(['font_size'=>'large','high_contrast'=>false,'voice_enabled'=>true]),
            ]
        );

        // Demo Employer
        $employer = User::firstOrCreate(
            ['email' => 'employer@demo.test'],
            [
                'name' => 'PT Karya Inklusif',
                'password' => Hash::make('password123'),
                'role' => 'employer',
                'capability_bitmask' => 0,
                'latitude' => -6.200000,
                'longitude' => 106.816666,
                'address' => 'Jakarta Selatan',
            ]
        );

        // Demo Jobs (only if employer has no jobs)
        if ($employer->employerJobs()->count() === 0) {
            $employer->employerJobs()->createMany([
                [
                    'title' => 'Transkripsi Audio ke Teks',
                    'description' => 'Mentranskripsi audio 30 menit menjadi teks. Butuh kemampuan mengetik dan komunikasi tekstual.',
                    'required_capability_bitmask' => 8, // Komunikasi
                    'latitude' => -6.210000,
                    'longitude' => 106.820000,
                    'location_address' => 'Jl. Sudirman No 1, Jakarta',
                    'wage' => 50000,
                    'status' => 'pending',
                    'payment_status' => 'locked',
                ],
                [
                    'title' => 'Review Website Aksesibilitas',
                    'description' => 'Menguji website untuk aksesibilitas screen reader.',
                    'required_capability_bitmask' => 1, // Visual optimal (counter-intuitive but demo)
                    'latitude' => -6.195000,
                    'longitude' => 106.815000,
                    'location_address' => 'Jl. Thamrin No 10, Jakarta',
                    'wage' => 150000,
                    'status' => 'pending',
                    'payment_status' => 'locked',
                ],
                [
                    'title' => 'Input Data Excel',
                    'description' => 'Input data penjualan harian ke spreadsheet.',
                    'required_capability_bitmask' => 0, // Umum, semua bisa
                    'latitude' => -6.205000,
                    'longitude' => 106.810000,
                    'location_address' => 'Jl. Kuningan No 5, Jakarta',
                    'wage' => 75000,
                    'status' => 'pending',
                    'payment_status' => 'locked',
                ],
            ]);
        }
    }
}
