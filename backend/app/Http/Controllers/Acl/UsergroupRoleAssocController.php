<?php

namespace App\Http\Controllers\Acl;

use App\Http\Controllers\Controller;
use App\Http\Requests\Acl\AssignUsergroupRoleRequest;
use App\Models\AclRole;
use App\Models\AclUsergroup;
use App\Models\AclUsergroupRole;
use App\Utils\ApiStatusCode;
use Illuminate\Http\Request;

class UsergroupRoleAssocController extends Controller
{

    public function index()
    {
        $usergroups = (new AclUsergroup())->getAll([],function ($q){
            return $q->pluck('name', 'id');
        });

        $jsonArray = [];
        foreach ($usergroups as $id => $name) {
            $jsonArray[] = ['id' => $id, 'name' => $name];
        }

        $status_code = ApiStatusCode::SUCCESS;
        $data['usergroups'] = $jsonArray;
        $message = __('Success');

        return sendResponse($status_code, $message, $data);
    }
    public function getInfoByUserGroupId($usergroup_id)
    {
        $usergroup = (new AclUsergroup())->getById($usergroup_id);

        if(empty($usergroup)){
            $status_code = ApiStatusCode::NOT_FOUND;
            $message = __('User group not found');
            return sendResponse($status_code, $message, []);
        }
        $roles = (new AclRole())->getAll([],function ($q){
            return $q->pluck('name', 'id');
        });

        $jsonArray = [];
        foreach ($roles as $id => $name) {
            $jsonArray[] = ['id' => $id, 'name' => $name];
        }

        $status_code = ApiStatusCode::SUCCESS;
        $data['roles'] = $jsonArray;
        $data['selected_role_ids'] = (new AclUsergroupRole())->getRolesByUsergroupId($usergroup_id);
        $message = __('Success');

        return sendResponse($status_code, $message, $data);
    }

    public function assignRole(AssignUsergroupRoleRequest $request)
    {
        $status_code = ApiStatusCode::FAILED;
        $message = __('Failed');
        $inputData = $request->all();

        $assigned = (new AclUsergroupRole())->assignRole($inputData['usergroup_id'], $inputData['role_ids']);

        if($assigned){
            $status_code = ApiStatusCode::SUCCESS;
            $message = __('Success');
        }

        return sendResponse($status_code, $message, []);
    }
}
