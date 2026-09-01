<?php

namespace App\Http\Requests\Worker;

use Illuminate\Foundation\Http\FormRequest;

class UpdateProfileRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return $this->user() && $this->user()->isWorker();
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'capability_bitmask' => 'required|integer|min:0',
            'latitude' => 'required|numeric|between:-90,90',
            'longitude' => 'required|numeric|between:-180,180',
            'address' => 'required|string',
            'accessibility_preference' => 'nullable|array',
            'accessibility_preference.font_size' => 'nullable|in:normal,large,xlarge',
            'accessibility_preference.high_contrast' => 'nullable|boolean',
            'accessibility_preference.voice_enabled' => 'nullable|boolean',
        ];
    }
}
