<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\Report;
use App\Models\User;
use App\Models\Job;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function stats(Request $request)
    {
        if (!$request->user()->isAdmin()) abort(403);
        return response()->json([
            'success' => true,
            'data' => [
                'reports_pending' => Report::where('status','pending')->count(),
                'reports_total' => Report::count(),
                'workers_active' => User::where('role','worker')->where('is_suspended',false)->count(),
                'employers_active' => User::where('role','employer')->where('is_suspended',false)->count(),
                'jobs_active' => Job::where('status','active')->count(),
                'jobs_pending' => Job::where('status','pending')->count(),
                'jobs_completed' => Job::where('status','completed')->count(),
                'anomalies' => \DB::table('security_anomalies')->count(),
            ]
        ]);
    }

    public function recentReports(Request $request)
    {
        if (!$request->user()->isAdmin()) abort(403);
        $reports = \App\Models\Report::with(['reporter','employer'])->orderBy('created_at','desc')->limit(5)->get();
        return \App\Http\Resources\ReportResource::collection($reports);
    }
}
