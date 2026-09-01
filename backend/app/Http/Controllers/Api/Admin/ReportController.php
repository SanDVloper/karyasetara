<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\UpdateReportRequest;
use App\Http\Resources\ReportResource;
use App\Models\Report;
use App\Models\User;
use App\Models\Job;
use Illuminate\Http\Request;

class ReportController extends Controller
{
    public function index(Request $request)
    {
        if (!$request->user()->isAdmin()) abort(403);
        $reports = Report::with(['reporter','job','employer'])->orderBy('created_at','desc')->get();
        return ReportResource::collection($reports);
    }

    public function show(Request $request, Report $report)
    {
        if (!$request->user()->isAdmin()) abort(403);
        $report->load(['reporter','job','employer']);
        return new ReportResource($report);
    }

    public function update(UpdateReportRequest $request, Report $report)
    {
        $data = $request->validated();
        $report->update([
            'status' => $data['status'],
            'admin_notes' => $data['admin_notes'] ?? $report->admin_notes,
        ]);

        // Moderation actions
        $action = $data['action'] ?? 'none';
        if ($action === 'suspend_job' && $report->job_id) {
            Job::where('id', $report->job_id)->update(['is_suspended'=>true, 'admin_notes'=>'Suspended via report #'.$report->id]);
        } elseif ($action === 'suspend_employer' && $report->employer_id) {
            User::where('id', $report->employer_id)->update(['is_suspended'=>true, 'suspended_at'=>now()]);
        } elseif ($action === 'warning') {
            // just keep status as warning
        }

        $report->load(['reporter','job','employer']);
        return new ReportResource($report);
    }
}
