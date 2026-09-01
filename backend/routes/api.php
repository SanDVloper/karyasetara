<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\Worker\ProfileController as WorkerProfileController;
use App\Http\Controllers\Api\Worker\JobController as WorkerJobController;
use App\Http\Controllers\Api\Worker\ReportController as WorkerReportController;
use App\Http\Controllers\Api\Employer\JobController as EmployerJobController;
use App\Http\Controllers\Api\Employer\ProfileController as EmployerProfileController;
use App\Http\Controllers\Api\Admin\ReportController as AdminReportController;
use App\Http\Controllers\Api\Admin\DashboardController as AdminDashboardController;
use App\Http\Controllers\Api\Admin\UserController as AdminUserController;
use App\Http\Controllers\Api\Admin\JobController as AdminJobController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group.
|
*/

// Public Authentication Routes
Route::prefix('auth')->group(function () {
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/login', [AuthController::class, 'login']);
});

// Also provide direct /register and /login aliases for flexibility
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// Protected Routes (Sanctum)
Route::middleware('auth:sanctum')->group(function () {
    Route::prefix('auth')->group(function () {
        Route::get('/me', [AuthController::class, 'me']);
        Route::post('/logout', [AuthController::class, 'logout']);
    });

    Route::get('/user', [AuthController::class, 'me']);
    Route::get('/me', [AuthController::class, 'me']);
    Route::post('/logout', [AuthController::class, 'logout']);

    // Worker Routes
    Route::prefix('worker')->group(function () {
        Route::get('/profile', [WorkerProfileController::class, 'show']);
        Route::put('/profile', [WorkerProfileController::class, 'update']);
        
        Route::get('/jobs/recommended', [WorkerJobController::class, 'recommended']);
        Route::get('/my-jobs', [WorkerJobController::class, 'myJobs']);
        Route::get('/jobs/{job}', [WorkerJobController::class, 'show']);
        Route::post('/jobs/{job}/accept', [WorkerJobController::class, 'accept']);
        Route::post('/jobs/{job}/reject', [WorkerJobController::class, 'reject']);
        Route::post('/jobs/{job}/complete', [WorkerJobController::class, 'complete']);

        // Worker Reports (Trust & Safety)
        Route::get('/reports', [WorkerReportController::class, 'index']);
        Route::post('/reports', [WorkerReportController::class, 'store']);
        Route::get('/reports/{report}', [WorkerReportController::class, 'show']);
    });

    // Employer Routes
    Route::prefix('employer')->group(function () {
        Route::get('/profile', [EmployerProfileController::class, 'show']);
        Route::put('/profile', [EmployerProfileController::class, 'update']);
        Route::get('/jobs', [EmployerJobController::class, 'index']);
        Route::post('/jobs', [EmployerJobController::class, 'store']);
        Route::get('/jobs/{job}', [EmployerJobController::class, 'show']);
        Route::get('/jobs/{job}/candidates', [EmployerJobController::class, 'candidates']);
        Route::post('/jobs/{job}/select-worker', [EmployerJobController::class, 'selectWorker']);
        Route::post('/jobs/{job}/confirm-completion', [EmployerJobController::class, 'confirmCompletion']);
    });

    // Admin Routes (Trust & Safety + Moderation)
    Route::prefix('admin')->group(function () {
        Route::get('/stats', [AdminDashboardController::class, 'stats']);
        Route::get('/reports', [AdminReportController::class, 'index']);
        Route::get('/reports/{report}', [AdminReportController::class, 'show']);
        Route::put('/reports/{report}', [AdminReportController::class, 'update']);
        Route::get('/users', [AdminUserController::class, 'index']);
        Route::get('/users/{user}', [AdminUserController::class, 'show']);
        Route::post('/users/{user}/suspend', [AdminUserController::class, 'toggleSuspend']);
        Route::get('/jobs', [AdminJobController::class, 'index']);
        Route::get('/jobs/{job}', [AdminJobController::class, 'show']);
        Route::post('/jobs/{job}/suspend', [AdminJobController::class, 'toggleSuspend']);
    });
});
