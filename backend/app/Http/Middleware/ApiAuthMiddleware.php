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

        $message = "";
        try{
            $token = $request->bearerToken();

            if(empty($token)){
                throw new \Exception('Missing token');
            }

            JwtManager::validateToken('access_token', $token);
            return $next($request);
        }catch (\Exception $ex){
            $message = $ex->getMessage();
        }


        return sendErrorResponse(101, $message,[],401);

    }
}
