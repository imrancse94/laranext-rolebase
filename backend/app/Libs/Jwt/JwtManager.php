<?php

namespace App\Libs\Jwt;

use App\Utils\ApiHttpCode;
use App\Utils\ApiStatusCode;
use Firebase\JWT\ExpiredException;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;

use Exception;

class JwtManager
{

    private static $secretKey = 'axilweb@xyz.com'; // Change this to a secure secret key
    public static $expirationTime = 3600; // Token expiration time in seconds (1 hour)
    public static $refreshExpirationTime = 86400; // Refresh token expiration time in seconds (1 day)

    /**
     * Generate a JWT token.
     *
     * @param array $payload Payload data to be encoded in the token.
     * @return string JWT token.
     */
    public static function generateAccessToken(array $payload)
    {
        $issuedAt = time();
        $expirationTime = $issuedAt + self::$expirationTime;

        $header = [
            'typ' => 'JWT',
            'alg' => 'HS256'
        ];

        $base64UrlHeader = self::base64UrlEncode(json_encode($header));
        $base64UrlPayload = self::base64UrlEncode(json_encode(array_merge(['iat' => $issuedAt, 'exp' => $expirationTime], $payload)));
        $signature = hash_hmac('sha256', $base64UrlHeader . "." . $base64UrlPayload, self::$secretKey, true);
        $base64UrlSignature = self::base64UrlEncode($signature);

        return $base64UrlHeader . "." . $base64UrlPayload . "." . $base64UrlSignature;
    }

    /**
     * Generate a refresh token.
     *
     * @param array $payload Payload data to be encoded in the token.
     * @return string Refresh token.
     */
    public static function generateRefreshToken(array $payload)
    {
        $issuedAt = time();
        $expirationTime = $issuedAt + self::$refreshExpirationTime;

        $header = [
            'typ' => 'JWT',
            'alg' => 'HS256'
        ];

        $base64UrlHeader = self::base64UrlEncode(json_encode($header));
        $base64UrlPayload = self::base64UrlEncode(json_encode(array_merge(['iat' => $issuedAt, 'exp' => $expirationTime], $payload)));
        $signature = hash_hmac('sha256', $base64UrlHeader . "." . $base64UrlPayload, self::$secretKey, true);
        $base64UrlSignature = self::base64UrlEncode($signature);

        return $base64UrlHeader . "." . $base64UrlPayload . "." . $base64UrlSignature;
    }

    /**
     * Decode a JWT token.
     *
     * @param string $token JWT token to decode.
     * @return object|null Decoded token payload.
     */
    public static function decodeToken(string $token)
    {
        $tokenParts = explode('.', $token);
        $header = base64_decode($tokenParts[0]);
        $payload = base64_decode($tokenParts[1]);
        $signatureProvided = $tokenParts[2];

        $headerAndPayload = $tokenParts[0] . '.' . $tokenParts[1];
        $base64UrlHeader = self::base64UrlEncode(json_encode(['typ' => 'JWT', 'alg' => 'HS256']));

        $signature = hash_hmac('sha256', $headerAndPayload, self::$secretKey, true);
        $base64UrlSignature = self::base64UrlEncode($signature);

        if ($base64UrlSignature === $signatureProvided) {
            return json_decode($payload,true);
        }

        return null;
    }

    private static function base64UrlEncode($text)
    {
        return rtrim(strtr(base64_encode($text), '+/', '-_'), '=');
    }

    public static function validateToken($type,$token)
    {
        $payload = self::decodeToken($token);

        if($payload->token_type != $type){
            throw new Exception('Invalid token');
        }

        if(self::isTokenExpired($payload)){
            throw new Exception('Token Expired');
        }

        return $payload->user->id;
    }
    public static function isTokenExpired($payload)
    {
        $now = time();
        return isset($payload->exp) && $payload->exp <= $now;
    }
}
