<?php

namespace App\Http\Controllers\Acl;

use App\Http\Controllers\Controller;
use App\Http\Requests\Acl\RolePermissionAssocRequest;
use App\Models\AclPermission;
use App\Models\AclRole;
use App\Models\AclRolePermission;
use App\Utils\ApiStatusCode;

class RolePermissionAssocController extends Controller
{
    public function index()
    {
        $roles = (new AclRole())->getAll([],function ($q){
            return $q->pluck('name', 'id');
        });

        $jsonArray = [];
        foreach ($roles as $id => $name) {
            $jsonArray[] = ['id' => $id, 'name' => $name];
        }

        $status_code = ApiStatusCode::SUCCESS;
        $data['roles'] = $jsonArray;
        $message = __('Success');

        return sendResponse($status_code, $message, $data);
    }

    public function getInfoByRoleId($role_id)
    {
        $permissions = (new AclPermission())->getAll([],function ($q){
            return $q->pluck('title', 'id');
        });

        $jsonArray = [];
        foreach ($permissions as $id => $name) {
            $jsonArray[] = ['id' => $id, 'name' => $name];
        }

        $status_code = ApiStatusCode::SUCCESS;
        $data['permissions'] = $jsonArray;
        $data['selected_permission_ids'] = (new AclRolePermission())->getPermissionByRoleId($role_id);
        $message = __('Success');


        return sendResponse($status_code, $message, $data);
    }

    public function assignPermission(RolePermissionAssocRequest $request)
    {
        $status_code = ApiStatusCode::FAILED;
        $message = __('Failed');
        $inputData = $request->all();

        if(empty($inputData['permission_ids'])){
            $inputData['permission_ids'] = [];
        }

        $assigned = (new AclRolePermission())->assignPermission($inputData['role_id'], $inputData['permission_ids']);

        if($assigned){
            $status_code = ApiStatusCode::SUCCESS;
            $message = __('Success');
        }

        return sendResponse($status_code, $message, []);
    }
}
