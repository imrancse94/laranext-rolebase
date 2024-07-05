<?php

namespace App\Http\Middleware;

use App\Libs\Jwt\JwtManager;
use App\Utils\ApiHttpCode;
use App\Utils\ApiStatusCode;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class ApiAuthMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $response = JwtManager::verifyToken($request->bearerToken(),auth()->check());

        if($response['status_code'] == ApiStatusCode::SUCCESS) {
            return $next($request);
        }

        return sendErrorResponse($response['status_code'], $response['message'],[],$response['http_code']);

    }
}
