<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Report extends Model
{
    use HasFactory;

    protected $fillable = [
        'reporter_id','job_id','employer_id','reason','description','evidence_path','status','priority','admin_notes'
    ];

    protected $casts = [
        'reporter_id' => 'integer',
        'job_id' => 'integer',
        'employer_id' => 'integer',
    ];

    public function reporter() { return $this->belongsTo(User::class, 'reporter_id'); }
    public function job() { return $this->belongsTo(Job::class, 'job_id'); }
    public function employer() { return $this->belongsTo(User::class, 'employer_id'); }
}
