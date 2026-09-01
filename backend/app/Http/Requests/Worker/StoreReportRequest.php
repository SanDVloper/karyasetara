<?php

namespace App\Http\Requests\Worker;

use Illuminate\Foundation\Http\FormRequest;

class StoreReportRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user() && $this->user()->isWorker();
    }

    public function rules(): array
    {
        return [
            'job_id' => 'nullable|exists:jobs,id',
            'employer_id' => 'nullable|exists:users,id',
            'reason' => 'required|string|in:pelecehan,penipuan,kata_kasar,tidak_merespons,diskriminasi,lain',
            'description' => 'required|string|min:10|max:2000',
            'evidence' => 'nullable|file|mimes:jpg,jpeg,png,webp,pdf|max:5120',
            'priority' => 'nullable|in:rendah,sedang,tinggi',
        ];
    }

    public function messages(): array
    {
        return [
            'reason.required' => 'Alasan laporan wajib dipilih.',
            'description.required' => 'Deskripsi laporan wajib diisi.',
            'description.min' => 'Deskripsi minimal 10 karakter.',
        ];
    }
}
