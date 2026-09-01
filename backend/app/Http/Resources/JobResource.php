<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class JobResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'description' => $this->description,
            'required_capability_bitmask' => $this->required_capability_bitmask,
            'latitude' => $this->latitude,
            'longitude' => $this->longitude,
            'location_address' => $this->location_address,
            'wage' => $this->wage,
            'status' => $this->status,
            'payment_status' => $this->payment_status,
            'is_suspended' => (bool) ($this->is_suspended ?? false),
            'distance' => $this->when(isset($this->distance), $this->distance),
            'match_score' => $this->when(isset($this->match_score), $this->match_score),
            'employer' => new UserResource($this->whenLoaded('employer')),
            'worker' => new UserResource($this->whenLoaded('worker')),
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
