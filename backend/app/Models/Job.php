<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Job extends Model
{
    use HasFactory;

    protected $fillable = [
        'employer_id',
        'worker_id',
        'title',
        'description',
        'required_capability_bitmask',
        'latitude',
        'longitude',
        'location_address',
        'wage',
        'status',
        'payment_status',
        'is_suspended',
        'admin_notes',
    ];

    protected $casts = [
        'required_capability_bitmask' => 'integer',
        'latitude' => 'decimal:8',
        'longitude' => 'decimal:8',
        'wage' => 'decimal:2',
        'is_suspended' => 'boolean',
    ];

    protected $attributes = [
        'status' => 'pending',
        'payment_status' => 'locked',
    ];

    public function employer()
    {
        return $this->belongsTo(User::class, 'employer_id');
    }

    public function worker()
    {
        return $this->belongsTo(User::class, 'worker_id');
    }

    public function reports() { return $this->hasMany(Report::class, 'job_id'); }

    public function scopeSelectDistanceTo($query, $latitude, $longitude)
    {
        // Ensure base columns are selected (jobs.*) then add distance
        $query->addSelect('jobs.*');
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
