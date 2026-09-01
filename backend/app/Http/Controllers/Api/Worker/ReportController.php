<?php

namespace App\Http\Controllers\Api\Worker;

use App\Http\Controllers\Controller;
use App\Http\Requests\Worker\StoreReportRequest;
use App\Http\Resources\ReportResource;
use App\Models\Report;
use Illuminate\Http\Request;

class ReportController extends Controller
{
    public function index(Request $request)
    {
        if (!$request->user()->isWorker()) abort(403, 'Hanya worker');
        $reports = Report::where('reporter_id', $request->user()->id)
            ->with(['job','employer'])
            ->orderBy('created_at','desc')
            ->get();
        return ReportResource::collection($reports);
    }

    public function store(StoreReportRequest $request)
    {
        $data = $request->validated();
        $evidencePath = null;
        if ($request->hasFile('evidence')) {
            $evidencePath = $request->file('evidence')->store('evidences', 'public');
        }
        // auto-resolve employer_id from job if not given
        if (!empty($data['job_id']) && empty($data['employer_id'])) {
            $job = \App\Models\Job::find($data['job_id']);
            if ($job) $data['employer_id'] = $job->employer_id;
        }

        $report = Report::create([
            'reporter_id' => $request->user()->id,
            'job_id' => $data['job_id'] ?? null,
            'employer_id' => $data['employer_id'] ?? null,
            'reason' => $data['reason'],
            'description' => $data['description'],
            'evidence_path' => $evidencePath,
            'priority' => $data['priority'] ?? 'sedang',
            'status' => 'pending',
        ]);

        $report->load(['job','employer','reporter']);
        return (new ReportResource($report))->response()->setStatusCode(201);
    }

    public function show(Request $request, Report $report)
    {
        if (!$request->user()->isWorker() || $report->reporter_id !== $request->user()->id) abort(403);
        $report->load(['job','employer','reporter']);
        return new ReportResource($report);
    }
}
