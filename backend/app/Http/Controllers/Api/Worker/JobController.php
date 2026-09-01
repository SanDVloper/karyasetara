<?php

namespace App\Http\Controllers\Api\Worker;

use App\Http\Controllers\Controller;
use App\Models\Job;
use App\Http\Resources\JobResource;
use Illuminate\Http\Request;

class JobController extends Controller
{
    public function recommended(Request $request)
    {
        if (!$request->user()->isWorker()) abort(403, 'Hanya worker');
        $user = $request->user();
        
        if (is_null($user->latitude) || is_null($user->longitude)) {
            return response()->json(['message' => 'Please update your profile location first.'], 400);
        }

        $jobs = Job::where('status', 'pending')
            ->where('is_suspended', false)
            ->whereRaw('(required_capability_bitmask & ?) = required_capability_bitmask', [$user->capability_bitmask])
            ->selectDistanceTo($user->latitude, $user->longitude)
            ->orderBy('distance')
            ->get();

        // hitung match_score persis seperti MatchingService (60 skill + 40 distance)
        $jobs->each(function($job) {
            $dist = $job->distance ?? 999;
            $distanceScore = max(0, 40 - ($dist * 8));
            $match = min(100, 60 + $distanceScore);
            $job->match_score = round($match,1);
        });

        return JobResource::collection($jobs);
    }

    public function myJobs(Request $request)
    {
        if (!$request->user()->isWorker()) abort(403, 'Hanya worker');
        $jobs = $request->user()->workerJobs()->with('employer')->orderBy('updated_at', 'desc')->get();
        return JobResource::collection($jobs);
    }

    public function show(Request $request, Job $job)
    {
        if (!$request->user()->isWorker()) abort(403, 'Hanya worker');
        $job->load('employer');
        return new JobResource($job);
    }

    public function accept(Request $request, Job $job)
    {
        if (!$request->user()->isWorker()) abort(403, 'Hanya worker');
        if ($job->status !== 'waiting_acceptance' || $job->worker_id !== $request->user()->id) {
            return response()->json(['message' => 'Job cannot be accepted.'], 400);
        }

        $job->update(['status' => 'active']);
        return new JobResource($job);
    }

    public function reject(Request $request, Job $job)
    {
        if (!$request->user()->isWorker()) abort(403, 'Hanya worker');
        if ($job->status !== 'waiting_acceptance' || $job->worker_id !== $request->user()->id) {
            return response()->json(['message' => 'Job cannot be rejected.'], 400);
        }

        $job->update([
            'status' => 'pending',
            'worker_id' => null
        ]);
        return new JobResource($job);
    }

    public function complete(Request $request, Job $job)
    {
        if (!$request->user()->isWorker()) abort(403, 'Hanya worker');
        if ($job->status !== 'active' || $job->worker_id !== $request->user()->id) {
            return response()->json(['message' => 'Job cannot be completed yet.'], 400);
        }

        $job->update([
            'status' => 'waiting_confirmation',
            'payment_status' => 'waiting_confirmation'
        ]);
        return new JobResource($job);
    }
}
