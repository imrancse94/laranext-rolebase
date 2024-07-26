<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AclUsergroupRole extends Model
{
    use HasFactory;

    protected $fillable = ['acl_usergroup_id', 'acl_role_id'];

    public function getRolesByUsergroupId($usergroup_id)
    {
        return self::where('acl_usergroup_id', $usergroup_id)->pluck('acl_role_id');
    }

    public function assignRole($usergroup_id, $role_ids)
    {
        self::where('acl_usergroup_id', $usergroup_id)->delete();

        $data = [];

        if (!empty($role_ids)) {
            foreach ($role_ids as $role_id) {
                $data[] = [
                    'acl_usergroup_id' => $usergroup_id,
                    'acl_role_id' => $role_id,
                    'created_at' => now(),
                    'updated_at' => now()
                ];
            }

            self::insert($data);

            return true;
        }

        return false;
    }
}
