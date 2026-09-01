<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use App\Models\User;
use App\Models\Job;

class EmployerJobTest extends TestCase
{
    use RefreshDatabase;

    public function test_employer_can_create_job()
    {
        $employer = User::factory()->create(['role' => 'employer']);
        
        $response = $this->actingAs($employer)->postJson('/api/employer/jobs', [
            'title' => 'Transkripsi',
            'description' => 'Test',
            'required_capability_bitmask' => 2,
            'latitude' => -6.2,
            'longitude' => 106.8,
            'location_address' => 'Jakarta',
            'wage' => 50000
        ]);

        $response->assertStatus(201)
                 ->assertJsonPath('data.title', 'Transkripsi');
                 
        $this->assertDatabaseHas('jobs', ['title' => 'Transkripsi', 'employer_id' => $employer->id]);
    }
}
