<?php

namespace App\Providers;

use App\Libs\Jwt\JwtGuard;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\ServiceProvider;
use Illuminate\Contracts\Foundation\Application;

class AppServiceProvider extends ServiceProvider
{

    private function interpolateQuery($query, $bindings)
    {
        $pdo = DB::getPdo();
        foreach ($bindings as $binding) {
            // $pdo->quote() escapes the value and wraps it in single quotes
            $query = preg_replace('/\?/', $pdo->quote($binding), $query, 1);
        }
        return $query;
    }
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        DB::listen(function ($query) {
            $rawSql = $this->interpolateQuery($query->sql, $query->bindings);
            info($rawSql);
        });
//        Auth::extend('jwt', function (Application $app, string $name, array $config) {
//            return new JwtGuard($app['request']);
//        });
    }
}
