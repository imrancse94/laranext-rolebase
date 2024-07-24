<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AclUsergroupRole extends Model
{
    use HasFactory;

    protected $fillable = ['acl_usergroup_id','acl_role_id'];
}
