<?php

namespace Imrancse94\Jwt\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Str;
class GenerateSecret extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'generate:jwt-secret';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'This command generates a secret key for jwt';

    /**
     * Execute the console command.
     */
    public function handle(): void
    {
        $value = Str::random(32);

        $this->setEnvironmentValue('JWT_SECRET', $value);
        $this->setEnvironmentValue('JWT_ACCESS_TOKEN_EXPIRY', 3600);
        $this->setEnvironmentValue('JWT_REFRESH_TOKEN_EXPIRY', 84000);

        Artisan::call('config:cache');

        $this->info("JWT config updated successfully");


    }

    private function setEnvironmentValue($key, $value): void
    {
        $path = base_path('.env');

        if (file_exists($path)) {
            // Read .env file content
            $envContent = file_get_contents($path);

            // If key exists, update it, otherwise append it
            if (strpos($envContent, "$key=") !== false) {
                // Update existing key
                $envContent = preg_replace("/^$key=.*/m", "$key=$value", $envContent);
            } else {
                // Append new key-value pair
                $envContent .= PHP_EOL . "$key=$value";
            }

            // Write the updated content back to .env file
            file_put_contents($path, $envContent);
        } else {
            $this->error('The .env file does not exist.');
        }
    }
}
