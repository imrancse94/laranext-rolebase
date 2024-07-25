<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AclUsergroupRole extends Model
{
    use HasFactory;

    protected $fillable = ['acl_usergroup_id','acl_role_id'];

    public function getRolesByUsergroupId($usergroup_id)
    {
        return self::where('acl_usergroup_id',$usergroup_id)->pluck('acl_role_id');
    }
}
