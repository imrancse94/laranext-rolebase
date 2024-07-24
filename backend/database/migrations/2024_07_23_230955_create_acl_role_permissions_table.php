<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('acl_role_permissions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('acl_role_id')->constrained('acl_roles');
            $table->foreignId('acl_permission_id')->constrained('acl_permissions');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('acl_role_permissions');
    }
};
