<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'role',
        'capability_bitmask',
        'latitude',
        'longitude',
        'address',
        'accessibility_preference',
        'is_suspended',
        'suspended_at',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
        'capability_bitmask' => 'integer',
        'latitude' => 'decimal:8',
        'longitude' => 'decimal:8',
        'accessibility_preference' => 'array',
        'is_suspended' => 'boolean',
        'suspended_at' => 'datetime',
    ];

    /**
     * Check if user is worker.
     */
    public function isWorker(): bool
    {
        return $this->role === 'worker';
    }

    /**
     * Check if user is employer.
     */
    public function isEmployer(): bool
    {
        return $this->role === 'employer';
    }

    /**
     * Check if user is admin.
     */
    public function isAdmin(): bool
    {
        return $this->role === 'admin';
    }

    public function employerJobs()
    {
        return $this->hasMany(Job::class, 'employer_id');
    }

    public function workerJobs()
    {
        return $this->hasMany(Job::class, 'worker_id');
    }

    public function reports() { return $this->hasMany(Report::class, 'reporter_id'); }

    public function scopeSelectDistanceTo($query, $latitude, $longitude)
    {
        $query->addSelect('users.*');
        if (is_null($latitude) || is_null($longitude)) {
            return $query->addSelect(\DB::raw('null as distance'));
        }

        $lat = floatval($latitude);
        $lng = floatval($longitude);
        $haversine = "(6371 * acos(cos(radians({$lat})) 
                     * cos(radians(latitude)) 
                     * cos(radians(longitude) - radians({$lng})) 
                     + sin(radians({$lat})) 
                     * sin(radians(latitude))))";

        return $query->addSelect(\DB::raw("{$haversine} AS distance"));
    }
}
