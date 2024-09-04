<?php

namespace App\Models;

use App\Traits\ModelTrait;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AclRolePermission extends Model
{
    use HasFactory, ModelTrait;

    protected $fillable = ['acl_role_id', 'acl_permission_id'];

    public function getPermissionByRoleId($role_id)
    {
        return self::where('acl_role_id', $role_id)->pluck('acl_permission_id');
    }


    public function assignPermission($role_id, $permission_ids)
    {
        self::where('acl_role_id', $role_id)->delete();

        $data = [];

        if (!empty($permission_ids)) {
            foreach ($permission_ids as $permission_id) {
                $data[] = [
                    'acl_role_id' => $role_id,
                    'acl_permission_id' => $permission_id,
                    'created_at' => now(),
                    'updated_at' => now()
                ];
            }

            $this->updateUserPermissionVersionByRoleId($role_id);

            self::insert($data);
        }

        return true;
    }

    public function updateUserPermissionVersionByRoleId($role_id)
    {
        $result = null;
        $usergroup_ids = AclUsergroupRole::where('acl_role_id', $role_id)->pluck('acl_usergroup_id')->toArray();

        if (!empty($usergroup_ids)) {
            $user_ids = AclUserUsergroup::whereIn('acl_usergroup_id', $usergroup_ids)->pluck('user_id')->toArray();
            if (!empty($user_ids)) {
                $result = User::whereIn('id', $user_ids)->increment('permission_version');
            }
        }

        return $result;
    }
}
