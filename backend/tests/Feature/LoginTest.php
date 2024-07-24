<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class LoginTest extends TestCase
{
    /**
     * A basic feature test example.
     */
    public function test_example(): void
    {
        $url = self::BASE_URL.'/login';

        $data = [
            'email'=>'rakib34@gmail.com',
            'password'=>'Nop@ss12341'
        ];

        $response = $this->postJson($url,$data);
        $response->assertOk();
        //$response->assertStatus(200);
    }
}
