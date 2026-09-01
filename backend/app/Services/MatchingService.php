<?php

namespace App\Services;

use App\Models\User;
use App\Models\Job;
use SplPriorityQueue;

class MatchingService
{
    /**
     * Find best candidate workers for a job using Capability Bitmasking and Haversine Distance
     */
    public function matchWorkersForJob(Job $job, int $limit = 10)
    {
        // Get all workers
        $workers = User::where('role', 'worker')->get();
        
        $priorityQueue = new SplPriorityQueue();
        // Set extract flags to extract both data and priority
        $priorityQueue->setExtractFlags(SplPriorityQueue::EXTR_BOTH);
        
        foreach ($workers as $worker) {
            // Capability Bitmasking check: 
            // Worker must have all required capabilities (using bitwise AND)
            if (($worker->capability_bitmask & $job->required_capability_bitmask) !== $job->required_capability_bitmask) {
                continue; // Not capable
            }
            
            // Calculate Haversine Distance
            $distance = $this->haversineDistance(
                $job->latitude, 
                $job->longitude, 
                $worker->latitude, 
                $worker->longitude
            );
            
            // Filter by safe radius (e.g., 5 km max for disabled/geriatric workers)
            if ($distance > 5.0) {
                continue; 
            }
            
            // Calculate Priority Score: skill base 60 + distance up to 40 + fairness
            $skillCoverage = $job->required_capability_bitmask === 0 ? 1 : (1); // strict pass already, give full
            $skillScore = 60;
            $distanceScore = max(0, 40 - ($distance * 8)); // 5km => 0, 0km =>40
            $daysSince = now()->diffInDays($worker->updated_at ?? $worker->created_at);
            $fairness = min(10, $daysSince * 0.5);
            $matchScorePercent = min(100, $skillScore + $distanceScore + $fairness); // 0-100
            $priorityScore = $matchScorePercent * 10 + (5 - $distance); // for heap ordering
            
            $priorityQueue->insert([
                'worker' => $worker,
                'distance' => round($distance, 2),
                'match_score' => round($matchScorePercent,1),
                'reason' => $distance <= 2 ? 'Sangat dekat & kemampuan lengkap' : ($distance <=5 ? 'Dalam radius aman & kemampuan sesuai' : 'Luar radius'),
            ], $priorityScore);
        }
        
        $results = [];
        $count = 0;
        while (!$priorityQueue->isEmpty() && $count < $limit) {
            $results[] = $priorityQueue->extract()['data'];
            $count++;
        }
        
        return collect($results);
    }
    
    /**
     * Calculate Haversine Distance in Kilometers
     */
    private function haversineDistance($lat1, $lon1, $lat2, $lon2)
    {
        if (is_null($lat1) || is_null($lon1) || is_null($lat2) || is_null($lon2)) {
            return 9999;
        }

        $earthRadius = 6371; // km
        
        $dLat = deg2rad($lat2 - $lat1);
        $dLon = deg2rad($lon2 - $lon1);
        
        $a = sin($dLat / 2) * sin($dLat / 2) +
             cos(deg2rad($lat1)) * cos(deg2rad($lat2)) *
             sin($dLon / 2) * sin($dLon / 2);
             
        $c = 2 * atan2(sqrt($a), sqrt(1 - $a));
        
        return $earthRadius * $c;
    }
}
