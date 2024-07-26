<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AclRolePermission extends Model
{
    use HasFactory;

    protected $fillable = ['acl_role_id','acl_permission_id'];

    public function getPermissionByRoleId($role_id){
        return self::where('acl_role_id',$role_id)->pluck('acl_permission_id');
    }
}
