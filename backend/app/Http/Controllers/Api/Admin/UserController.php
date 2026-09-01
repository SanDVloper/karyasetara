<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function index(Request $request)
    {
        if (!$request->user()->isAdmin()) abort(403);
        $role = $request->query('role'); // worker/employer/all
        $q = User::query();
        if (in_array($role, ['worker','employer','admin'])) $q->where('role', $role);
        $users = $q->orderBy('created_at','desc')->get();
        return UserResource::collection($users);
    }

    public function show(Request $request, User $user)
    {
        if (!$request->user()->isAdmin()) abort(403);
        return new UserResource($user);
    }

    public function toggleSuspend(Request $request, User $user)
    {
        if (!$request->user()->isAdmin()) abort(403);
        $request->validate(['is_suspended'=>'required|boolean']);
        $user->update([
            'is_suspended' => $request->is_suspended,
            'suspended_at' => $request->is_suspended ? now() : null,
        ]);
        return new UserResource($user);
    }
}
