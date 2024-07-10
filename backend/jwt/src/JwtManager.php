<?php

namespace Imrancse94\Jwt;

use Exception;

class JwtManager
{
    private string $secretKey; // Change this to a secure secret key
    public int $expirationTime; // Token expiration time in seconds (1 hour)
    public int $refreshExpirationTime; // Refresh token expiration time in seconds (1 day)


    public function __construct(string $secretKey, int $expirationTime, int $refreshExpirationTime)
    {
        if (empty($secretKey)) {
            throw new Exception('Secret Key is required');
        }

        if (empty($expirationTime)) {
            throw new Exception('Expiration time is required');
        }

        if (empty($expirationTime)) {
            throw new Exception('Expiration time is required');
        }

        $this->secretKey = $secretKey;
        $this->expirationTime = $expirationTime;
        $this->refreshExpirationTime = $refreshExpirationTime;
    }

    public function getAccessTokenExpiration(string $type = 'sec'):int
    {
        switch ($type) {
            case 'min':
                return $this->expirationTime / 60;
            default:
                return $this->expirationTime;
        }
    }

    public function getRefreshTokenExpiration(string $type = 'sec'):int
    {
        switch ($type) {
            case 'min':
                return $this->refreshExpirationTime / 60;
            default:
                return $this->refreshExpirationTime;
        }
    }

    /**
     * Generate a JWT token.
     *
     * @param array $payload Payload data to be encoded in the token.
     * @return string JWT token.
     */
    private function generateToken(string $type, int $expirationTime, array $payload): string
    {
        $issuedAt = time();
        $expirationTime = $issuedAt + $expirationTime;
        $header = [
            'typ' => 'JWT',
            'alg' => 'HS256'
        ];

        $base64UrlHeader = $this->base64UrlEncode(json_encode($header));
        $base64UrlPayload = $this->base64UrlEncode(json_encode(array_merge(['iat' => $issuedAt, 'type' => $type, 'exp' => $expirationTime], ['payload' => $payload])));
        $signature = hash_hmac('sha256', $base64UrlHeader . "." . $base64UrlPayload, $this->secretKey, true);
        $base64UrlSignature = $this->base64UrlEncode($signature);

        return $base64UrlHeader . "." . $base64UrlPayload . "." . $base64UrlSignature;
    }

    public function generateAccessToken($payload): string
    {
        $expirationTime = $this->expirationTime;
        return $this->generateToken('access_token', $expirationTime, $payload);
    }

    /**
     * Generate a refresh token.
     *
     * @param array $payload Payload data to be encoded in the token.
     * @return string Refresh token.
     */
    public function generateRefreshToken($payload): string
    {
        $expirationTime = $this->refreshExpirationTime;
        return $this->generateToken('refresh_token', $expirationTime, $payload);
    }

    /**
     * Decode a JWT token.
     *
     * @param string $token JWT token to decode.
     * @return object|null Decoded token payload.
     */
    private function decodeToken(string $token)
    {
        $tokenParts = explode('.', $token);
        $header = base64_decode($tokenParts[0]);
        $payload = base64_decode($tokenParts[1]);
        $signatureProvided = $tokenParts[2];

        $headerAndPayload = $tokenParts[0] . '.' . $tokenParts[1];
        $base64UrlHeader = $this->base64UrlEncode(json_encode(['typ' => 'JWT', 'alg' => 'HS256']));

        $signature = hash_hmac('sha256', $headerAndPayload, $this->secretKey, true);
        $base64UrlSignature = $this->base64UrlEncode($signature);

        if ($base64UrlSignature === $signatureProvided) {
            return json_decode($payload, true);
        }

        return null;
    }

    public function getPayload(string $token)
    {
        $decoded = $this->decodeToken($token);

        return $decoded['payload'] ?? null;

    }

    private static function base64UrlEncode($text)
    {
        return rtrim(strtr(base64_encode($text), '+/', '-_'), '=');
    }

    public function validateAccessToken($token): bool
    {
        try {
            if($this->validateToken('access_token', $token)){
                return true;
            }
        }catch (Exception $exception){
            dd($exception->getMessage());
        }

        return false;
    }

    public function validateToken($type, $token)
    {
        $payload = $this->decodeToken($token);

        if ($payload['type'] != $type) {
            throw new Exception('Invalid token');
        }

        if ($this->isTokenExpired($payload)) {
            throw new Exception('Token Expired');
        }

        return $payload['payload']['auth_id'];
    }

    public function isTokenExpired($payload)
    {
        $now = time();
        return isset($payload->exp) && $payload->exp <= $now;
    }
}
