<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\RegisterRequest;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Str;
use Symfony\Component\HttpFoundation\Response;

class AuthController extends Controller
{
    /**
     * Register a new user.
     *
     * @param RegisterRequest $request
     * @return JsonResponse
     */
    public function register(RegisterRequest $request): JsonResponse
    {
        $validated = $request->validated();

        $user = User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => $validated['password'], // Automatically hashed via model cast
            'role' => $validated['role'] ?? 'worker',
            'capability_bitmask' => 0,
        ]);

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'success' => true,
            'message' => 'Registrasi akun berhasil!',
            'data' => [
                'user' => new UserResource($user),
                'token' => $token,
                'token_type' => 'Bearer',
            ],
        ], Response::HTTP_CREATED);
    }

    /**
     * Authenticate user and issue token.
     *
     * @param LoginRequest $request
     * @return JsonResponse
     */
    public function login(LoginRequest $request): JsonResponse
    {
        $validated = $request->validated();

        $user = User::where('email', $validated['email'])->first();

        if (!$user || !Hash::check($validated['password'], $user->password)) {
            return response()->json([
                'success' => false,
                'message' => 'Email atau kata sandi yang Anda masukkan salah.',
            ], Response::HTTP_UNAUTHORIZED);
        }

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'success' => true,
            'message' => 'Login berhasil!',
            'data' => [
                'user' => new UserResource($user),
                'token' => $token,
                'token_type' => 'Bearer',
            ],
        ], Response::HTTP_OK);
    }

    /**
     * Revoke authenticated user token.
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function logout(Request $request): JsonResponse
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json([
            'success' => true,
            'message' => 'Berhasil keluar (logout).',
        ], Response::HTTP_OK);
    }

    /**
     * Get profile of current authenticated user.
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function me(Request $request): JsonResponse
    {
        return response()->json([
            'success' => true,
            'data' => new UserResource($request->user()),
        ], Response::HTTP_OK);
    }

    /**
     * Google OAuth — smart login/daftar dengan account chooser.
     * Frontend kirim id_token dari GIS. Backend verifikasi via Google tokeninfo.
     * Jika user belum ada, butuh role (dari popup pilih role).
     */
    public function google(Request $request): JsonResponse
    {
        $request->validate([
            'id_token' => 'required|string',
            'role' => 'sometimes|in:worker,employer',
        ]);

        $idToken = $request->input('id_token');
        $role = $request->input('role');

        // Verifikasi id_token ke Google via Http (lebih stabil daripada file_get_contents)
        try {
            $googleRes = Http::timeout(5)->get('https://oauth2.googleapis.com/tokeninfo', ['id_token' => $idToken]);
            if (!$googleRes->successful()) {
                return response()->json(['success' => false, 'message' => 'Gagal verifikasi Google token.'], Response::HTTP_UNAUTHORIZED);
            }
            $payload = $googleRes->json();
        } catch (\Exception $e) {
            return response()->json(['success' => false, 'message' => 'Gagal verifikasi Google token: ' . $e->getMessage()], Response::HTTP_UNAUTHORIZED);
        }
        if (!isset($payload['email']) || ($payload['aud'] ?? null) !== config('services.google.client_id')) {
            return response()->json(['success' => false, 'message' => 'Google token tidak valid.'], Response::HTTP_UNAUTHORIZED);
        }
        $email = $payload['email'];
        $name = $payload['name'] ?? Str::before($email, '@');
        $emailVerified = ($payload['email_verified'] ?? 'false') === 'true';

        if (!$emailVerified) {
            return response()->json(['success' => false, 'message' => 'Email Google belum terverifikasi.'], Response::HTTP_UNAUTHORIZED);
        }

        $user = User::where('email', $email)->first();

        if (!$user) {
            if (!$role) {
                // kasih tau frontend butuh pilih role
                return response()->json([
                    'success' => false,
                    'need_role' => true,
                    'message' => 'Akun belum ada, silakan pilih role.',
                    'data' => ['email' => $email, 'name' => $name],
                ], 422);
            }
            $user = User::create([
                'name' => $name,
                'email' => $email,
                'password' => Str::random(32), // tidak dipakai, login via Google
                'role' => $role,
                'capability_bitmask' => 0,
                'email_verified_at' => now(),
            ]);
        }

        // Jika user ada tapi role berbeda, tetap login dengan role existing (jangan overwrite)
        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'success' => true,
            'message' => $user->wasRecentlyCreated ? 'Akun Google berhasil dibuat!' : 'Login Google berhasil!',
            'data' => [
                'user' => new UserResource($user),
                'token' => $token,
                'token_type' => 'Bearer',
            ],
        ], Response::HTTP_OK);
    }
}
