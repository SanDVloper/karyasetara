<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use App\Models\User;

class WorkerProfileTest extends TestCase
{
    use RefreshDatabase;

    public function test_worker_can_update_profile()
    {
        $worker = User::factory()->create(['role' => 'worker']);
        
        $response = $this->actingAs($worker)->putJson('/api/worker/profile', [
            'capability_bitmask' => 5,
            'latitude' => -6.2,
            'longitude' => 106.8,
            'address' => 'Jl. Kebon Kacang'
        ]);

        $response->assertStatus(200)
                 ->assertJsonPath('data.capability_bitmask', 5)
                 ->assertJsonPath('data.address', 'Jl. Kebon Kacang');

        $this->assertDatabaseHas('users', [
            'id' => $worker->id,
            'capability_bitmask' => 5,
            'latitude' => -6.2,
            'longitude' => 106.8
        ]);
    }
}
