<?php

namespace Database\Seeders;

use App\Models\AclPermission;
use App\Models\AclRole;
use App\Models\AclRolePermission;
use App\Models\AclUsergroup;
use App\Models\AclUsergroupRole;
use App\Models\AclUserUsergroup;
use App\Models\User;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Couchbase\Role;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */

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
    public function run(): void
    {
        // User::factory(10)->create();

        try {
            DB::beginTransaction();

            $user = User::create([
                'name' => 'Super Admin',
                'email' => 'ssadmin@admin.com',
                'password' => Hash::make('Nop@ss1234'),
            ]);

            // create role
            $role = AclRole::create(['name' => 'Super Admin']);

            // create permission
            $permissions = [
                [
                    'title' => 'Permission list',
                    'key' => 'permission-list'
                ],
                [
                    'title' => 'Create Permission',
                    'key' => 'create-permission'
                ],
                [
                    'title' => 'Edit Permission',
                    'key' => 'edit-permission'
                ],
                [
                    'title' => 'Delete Permission',
                    'key' => 'delete-permission'
                ],
                [
                    'title' => 'View Permission',
                    'key' => 'view-permission'
                ],
                [
                    'title' => 'Role list',
                    'key' => 'role-list'
                ],
                [
                    'title' => 'Create Role',
                    'key' => 'create-role'
                ],
                [
                    'title' => 'Edit Role',
                    'key' => 'edit-role'
                ],
                [
                    'title' => 'Delete Role',
                    'key' => 'delete-role'
                ],
                [
                    'title' => 'View Role',
                    'key' => 'view-role'
                ],
                [
                    'title' => 'Usergroup list',
                    'key' => 'usergroup-list'
                ],
                [
                    'title' => 'Create Usergroup',
                    'key' => 'create-usergroup'
                ],
                [
                    'title' => 'Edit Usergroup',
                    'key' => 'edit-usergroup'
                ],
                [
                    'title' => 'Delete Usergroup',
                    'key' => 'delete-usergroup'
                ],
                [
                    'title' => 'View Usergroup',
                    'key' => 'view-usergroup'
                ],
                [
                    'title' => 'Usergroup & Role Association',
                    'key' => 'usergroup-role-assoc'
                ],
            ];

            $permission_ids = [];

            foreach ($permissions as $permission) {
                $acl_permission = AclPermission::create($permission);
                $permission_ids[] = $acl_permission->id;
            }

            // role & permission assoc
            $permission_assoc = [];
            foreach ($permission_ids as $permission_id) {
                $permission_assoc[] = [
                    'acl_permission_id' => $permission_id,
                    'acl_role_id' => $role->id,
                    'created_at' => now(),
                    'updated_at' => now(),
                ];
            }

            if (!empty($permission_assoc)) {
                AclRolePermission::insert($permission_assoc);
            }

            // create usergroup
            $usergroup = AclUsergroup::create(['name' => 'Super Admin']);

            // user & usergroup assoc
            AclUserUsergroup::create([
                'user_id' => $user->id,
                'acl_usergroup_id' => $usergroup->id
            ]);

            // usergroup & role assoc
            AclUsergroupRole::create([
                'acl_usergroup_id' => $usergroup->id,
                'acl_role_id' => $role->id
            ]);

            DB::commit();
        } catch (\Exception $ex) {
            DB::rollBack();
        }
    }
}
