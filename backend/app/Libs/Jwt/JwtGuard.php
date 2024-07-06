<?php

namespace App\Libs\Jwt;

use Illuminate\Contracts\Auth\Authenticatable;
use Illuminate\Contracts\Auth\Guard;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class JwtGuard implements Guard
{
    private $request;
    protected $user;
    protected $access_token = "";
    protected $refresh_token = "";

    /**
     * Create a new class instance.
     */
    public function __construct(Request $request)
    {
        $this->request = $request;
    }

    public function attempt(array $credentials = [], $remember = false)
    {
        return $this->validate($credentials);
    }

    public function check()
    {
        return !is_null($this->user());
    }

    public function guest()
    {
        // TODO: Implement guest() method.
    }

    public function user()
    {
        if (!empty($this->user)) {
            return $this->user;
        }

        return JwtManager::decodeToken($this->getTokenForRequest())['user'] ?? null;
    }

    public function id()
    {
        $user = $this->user();
        if (!empty($user['id'])) {
            return $user['id'];
        }

        return null;
    }

    public function validate(array $credentials = []): bool|array|null
    {
        if (empty($credentials['email']) || empty($credentials['password'])) {
            return false;
        }

        $user = \App\Models\User::where('email', $credentials['email'])->first();

        if ($user && Hash::check($credentials['password'], $user->password)) {
            return $this->regenerateAuth($user);
        }

        return false;
    }

    public function regenerateAuth($user): ?array
    {
        if (!empty($user)) {
            $this->setUser($user);
            return [
                'access_token' => $this->access_token,
                'expires_in' => JwtManager::$expirationTime, // in seconds
                'refresh_token' => $this->refresh_token,
                'user' => $this->user,
            ];
        }

        return null;
    }


    public function hasUser()
    {
        // TODO: Implement hasUser() method.
    }

    public function setUser($user): JwtGuard|static
    {
        if (!empty($user)) {
            $user = $user->toArray();
        }

        $this->user = $user;

        $this->access_token = JwtManager::generateAccessToken(['user' => $user, 'token_type' => 'access_token']);
        $this->refresh_token = JwtManager::generateRefreshToken(['user' => $user, 'token_type' => 'refresh_token']);
        return $this;
    }

    protected function getTokenForRequest()
    {
        return $this->request->bearerToken();
    }

    public function logout()
    {
        session()->invalidate();
    }
}
