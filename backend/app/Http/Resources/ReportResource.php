<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ReportResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'reporter' => new UserResource($this->whenLoaded('reporter')),
            'reporter_id' => $this->reporter_id,
            'job' => new JobResource($this->whenLoaded('job')),
            'job_id' => $this->job_id,
            'employer' => new UserResource($this->whenLoaded('employer')),
            'employer_id' => $this->employer_id,
            'reason' => $this->reason,
            'description' => $this->description,
            'evidence_path' => $this->evidence_path,
            'evidence_url' => $this->evidence_path ? asset('storage/'.$this->evidence_path) : null,
            'status' => $this->status,
            'priority' => $this->priority,
            'admin_notes' => $this->admin_notes,
            'created_at' => $this->created_at?->toISOString(),
            'updated_at' => $this->updated_at?->toISOString(),
        ];
    }
}
