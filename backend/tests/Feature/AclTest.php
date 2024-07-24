<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class AclTest extends TestCase
{
    /**
     * A basic feature test example.
     */
    public function test_role_list(): void
    {
        $response = $this->get('/api/v1/acl/roles');

        dd($response->getContent());
    }
}
