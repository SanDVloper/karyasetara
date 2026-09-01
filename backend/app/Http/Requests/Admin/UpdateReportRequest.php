<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;

class UpdateReportRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user() && $this->user()->isAdmin();
    }

    public function rules(): array
    {
        return [
            'status' => 'required|in:pending,investigating,resolved,warning,suspended',
            'admin_notes' => 'nullable|string|max:2000',
            'action' => 'nullable|in:none,warning,suspend_job,suspend_employer',
        ];
    }
}
