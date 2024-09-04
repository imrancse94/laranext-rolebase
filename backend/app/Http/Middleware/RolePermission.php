<?php

namespace App\Http\Middleware;

use App\Models\User;
use App\Utils\ObjectContainer;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\App;
use Symfony\Component\HttpFoundation\Response;

class RolePermission
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        ObjectContainer::set('customAuth', auth()->user());

        return $next($request);
    }

}
