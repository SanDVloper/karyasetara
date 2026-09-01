<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\JobResource;
use App\Models\Job;
use Illuminate\Http\Request;

class JobController extends Controller
{
    public function index(Request $request)
    {
        if (!$request->user()->isAdmin()) abort(403);
        $jobs = Job::with(['employer','worker'])->orderBy('created_at','desc')->get();
        return JobResource::collection($jobs);
    }

    public function show(Request $request, Job $job)
    {
        if (!$request->user()->isAdmin()) abort(403);
        $job->load(['employer','worker']);
        return new JobResource($job);
    }

    public function toggleSuspend(Request $request, Job $job)
    {
        if (!$request->user()->isAdmin()) abort(403);
        $request->validate(['is_suspended'=>'required|boolean']);
        $job->update(['is_suspended'=>$request->is_suspended]);
        return new JobResource($job);
    }
}
