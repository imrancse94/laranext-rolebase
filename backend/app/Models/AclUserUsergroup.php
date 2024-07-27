<?php

namespace App\Models;

use App\Traits\ModelTrait;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AclUserUsergroup extends Model
{
    use HasFactory,ModelTrait;

    protected $fillable = ['user_id','acl_usergroup_id'];
}
