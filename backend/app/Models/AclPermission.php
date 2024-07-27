<?php

namespace App\Models;

use App\Traits\ModelTrait;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AclPermission extends Model
{
    use HasFactory,ModelTrait;


    protected $fillable = ['title','key'];

    /*
        SELECT p.* FROM `users` u
        INNER JOIN acl_user_usergroups uug ON uug.user_id = u.id
        INNER JOIN acl_usergroups uu ON uu.id = uug.acl_usergroup_id
        INNER JOIN acl_usergroup_roles uugr ON uug.acl_usergroup_id = uugr.acl_usergroup_id
        INNER JOIN acl_roles r ON uugr.acl_role_id = r.id
        INNER JOIN acl_role_permissions rp ON r.id = rp.acl_role_id
        INNER JOIN acl_permissions p ON rp.acl_permission_id = p.id
        WHERE u.id = 1;
     */

    public function add($inputData)
    {
        return self::create([
            'title' => $inputData['title'],
            'key' => $inputData['key'],
        ]);
    }

    public function updatebyId($id, $inputData)
    {
        $permission = self::where('id', $id)->first();
        if(empty($permission)){
            return "not_found";
        }
        return $permission->update([
            'title' => $inputData['title'],
            'key' => $inputData['key']
        ]);
    }

    public function deleteById($id)
    {
        $permission = self::where('id', $id)->first();
        if(empty($permission)){
            return "not_found";
        }

        return $permission->delete();
    }

    public function getById($id)
    {
        return self::findOrFail($id);
    }

    public function getAll($callback)
    {
        return $callback(self::query());
    }

    public function getPermissionByUserId($user_id)
    {
//        return cache()->rememberForever('user_id:' . $user_id, function () use ($user_id) {
//
//        });
        return self::join('acl_role_permissions','acl_role_permissions.acl_permission_id','=','acl_permissions.id')
            ->join('acl_roles','acl_roles.id','=','acl_role_permissions.acl_role_id')
            ->join('acl_usergroup_roles','acl_usergroup_roles.acl_role_id','=','acl_roles.id')
            ->join('acl_usergroups','acl_usergroups.id','=','acl_usergroup_roles.acl_usergroup_id')
            ->join('acl_user_usergroups','acl_user_usergroups.acl_usergroup_id','=','acl_usergroups.id')
            ->join('users','users.id','=','acl_user_usergroups.user_id')
            ->select(['acl_permissions.title','acl_permissions.key'])
            ->where('users.id',$user_id)
            ->get();
    }


}
