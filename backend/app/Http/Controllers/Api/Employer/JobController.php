<?php

namespace App\Http\Controllers\Api\Employer;

use App\Http\Controllers\Controller;
use App\Models\Job;
use App\Models\User;
use App\Http\Resources\JobResource;
use App\Http\Resources\CandidateResource;
use App\Http\Requests\Employer\StoreJobRequest;
use Illuminate\Http\Request;

class JobController extends Controller
{
    public function index(Request $request)
    {
        if (!$request->user()->isEmployer()) abort(403, 'Hanya employer');
        $jobs = $request->user()->employerJobs()->with('worker')->orderBy('created_at', 'desc')->get();
        return JobResource::collection($jobs);
    }

    public function store(StoreJobRequest $request)
    {
        if (!$request->user()->isEmployer()) abort(403, 'Hanya employer');
        $job = $request->user()->employerJobs()->create($request->validated());
        return new JobResource($job);
    }

    public function show(Request $request, Job $job)
    {
        if (!$request->user()->isEmployer()) abort(403, 'Hanya employer');
        if ($job->employer_id !== $request->user()->id) {
            abort(403);
        }
        $job->load('worker');
        return new JobResource($job);
    }

    public function candidates(Request $request, Job $job)
    {
        if (!$request->user()->isEmployer()) abort(403, 'Hanya employer');
        if ($job->employer_id !== $request->user()->id) {
            abort(403);
        }

        $candidates = User::where('role', 'worker')
            ->whereNotNull('latitude')
            ->whereNotNull('longitude')
            ->whereRaw('( ? & capability_bitmask) = ?', [$job->required_capability_bitmask, $job->required_capability_bitmask])
            ->selectDistanceTo($job->latitude, $job->longitude)
            ->orderBy('distance')
            ->get();

        // Calculate match score: 60 skill + distanceScore 40 max + fairness
        $candidates->transform(function ($candidate) use ($job) {
            $dist = $candidate->distance ?? 999;
            $distanceScore = max(0, 40 - ($dist * 8));
            $match = min(100, 60 + $distanceScore);
            // fairness by updated_at
            $days = now()->diffInDays($candidate->updated_at ?? $candidate->created_at);
            $match = min(100, $match + min(5, $days*0.2));
            $candidate->match_score = round($match,1);
            $candidate->match_reason = $dist <=2 ? 'Sangat dekat & kemampuan lengkap' : 'Dalam radius aman & kemampuan sesuai';
            return $candidate;
        });

        return CandidateResource::collection($candidates);
    }

    public function selectWorker(Request $request, Job $job)
    {
        if (!$request->user()->isEmployer()) abort(403, 'Hanya employer');
        if ($job->employer_id !== $request->user()->id || $job->status !== 'pending') {
            abort(403, 'Invalid job state');
        }

        $request->validate([
            'worker_id' => 'required|exists:users,id'
        ]);

        $job->update([
            'worker_id' => $request->worker_id,
            'status' => 'waiting_acceptance'
        ]);

        return new JobResource($job);
    }

    public function confirmCompletion(Request $request, Job $job)
    {
        if (!$request->user()->isEmployer()) abort(403, 'Hanya employer');
        if ($job->employer_id !== $request->user()->id || $job->status !== 'waiting_confirmation') {
            abort(403, 'Invalid job state');
        }

        $job->update([
            'status' => 'completed',
            'payment_status' => 'processing'
        ]);

        return new JobResource($job);
    }
}
