<?php

namespace Imrancse94\Jwt;


use Illuminate\Contracts\Auth\Authenticatable;
use Illuminate\Contracts\Auth\Guard;
use Illuminate\Contracts\Auth\UserProvider;
use Illuminate\Http\Request;
use function PHPUnit\Framework\throwException;

class JwtGuard implements Guard
{

    private Request $request;
    private UserProvider $provider;

    private JwtManager $jwtManager;

    private $user;
    public function __construct(Request $request, UserProvider $provider)
    {
        $this->request = $request;
        $this->provider = $provider;
        $this->jwtManager = new JwtManager(
            config('jwt.JWT_SECRET'),
            config('jwt.JWT_ACCESS_TOKEN_EXPIRY'),
            config('jwt.JWT_REFRESH_TOKEN_EXPIRY'),
        );
    }

    public function attempt(array $inputData): array
    {
        if($this->validate($inputData)){
           $user = $this->provider->retrieveByCredentials($inputData);
           if($user && $this->provider->validateCredentials($user, $inputData)) {
               $this->setUser($user);
               return $this->getToken();
           }
        }

        return [];
    }

    private function getToken($payload = []): array
    {
        $user = $this->user;

        if(empty($user)) throw new \Error('User instance is missing');

        $payload = array_merge(['auth_id'=>$user->id],$payload);

        return [
            'access_token' => $this->jwtManager->generateAccessToken($payload),
            'expire_in' => $this->jwtManager->getAccessTokenExpiration(),
            'refresh_token' => $this->jwtManager->generateRefreshToken($payload),
        ];
    }

    public function check()
    {
        return $this->jwtManager->validateAccessToken($this->request->bearerToken());
    }

    public function guest()
    {
        // TODO: Implement guest() method.
    }

    public function user(): ?Authenticatable
    {
        if(!empty($this->user)){
            return $this->user;
        }

        $auth_id = $this->id();

        if(empty($auth_id)) {
            // User instance is missing
            throw new \Error('User instance is missing');
        }

        return $this->provider->retrieveById($auth_id)  ?? null;
    }

    public function id()
    {
        if(!empty($this->user)){
            return $this->user->id;
        }

        $payload = $this->jwtManager->getPayload($this->request->bearerToken());

        return $payload['auth_id'] ?? null;
    }

    public function validate(array $credentials = []): bool
    {
        return array_key_exists('email', $credentials) && !empty($credentials['email'])
            && array_key_exists('password', $credentials) && !empty($credentials['password']);
    }

    public function hasUser()
    {
        // TODO: Implement hasUser() method.
    }

    public function setUser(Authenticatable $user)
    {
        $this->user = $user;
    }
}
