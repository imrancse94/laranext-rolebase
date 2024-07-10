<?php

namespace Imrancse94\Jwt;

use Illuminate\Routing\Router;
use Illuminate\Support\ServiceProvider;
use Imrancse94\Jwt\Console\Commands\GenerateSecret;
use Imrancse94\Jwt\Middleware\AuthMiddleware;


class JwtServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
        $this->app['auth']->extend('jwt', function ($app, $name, array $config) {
            return new JwtGuard(
                $app['request'],
                $app['auth']->createUserProvider($config['provider'])
            );
        });
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        $this->app['router']->aliasMiddleware('auth',AuthMiddleware::class);
        // Publish config
        $this->publishes([
            __DIR__ . '/config/jwt.php' => config_path('jwt.php'),
        ],'laravel-assets');

        if ($this->app->runningInConsole()) {
            $this->commands([
                GenerateSecret::class,
            ]);
        }
    }
}
