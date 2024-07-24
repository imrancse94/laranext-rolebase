<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AclRolePermission extends Model
{
    use HasFactory;

    protected $fillable = ['acl_role_id','acl_permission_id'];
}
