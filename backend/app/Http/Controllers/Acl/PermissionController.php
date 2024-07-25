<?php

namespace App\Http\Controllers\Acl;

use App\Http\Controllers\Controller;
use App\Http\Requests\Acl\PermissionRequest;
use App\Models\AclPermission;
use App\Models\AclRole;
use App\Utils\ApiStatusCode;
use Illuminate\Http\Request;

class PermissionController extends Controller
{
    public function getList(): \Illuminate\Http\JsonResponse
    {
        $permissions = (new AclPermission())->getAll(function ($query) {
            return $query->paginate(10);
        });

        $status_code = ApiStatusCode::NOT_FOUND;
        $data = [];
        $message = __('Not found');

        if (count($permissions) > 0) {
            $status_code = ApiStatusCode::SUCCESS;
            $data = $permissions;
            $message = __('Success');
        }

        return sendResponse($status_code, $message, $data);
    }


    public function create(PermissionRequest $request): \Illuminate\Http\JsonResponse
    {
        $status_code = ApiStatusCode::FAILED;
        $data = [];
        $message = __('Failed');

        $inputData = $request->all();

        $permission = (new AclPermission)->add($inputData);

        if(!empty($permission)){
            $data = $permission;
            $status_code = ApiStatusCode::SUCCESS;
            $message = __('Success');
        }

        return sendResponse($status_code, $message, $data);
    }

    public function update(PermissionRequest $request, $id): \Illuminate\Http\JsonResponse
    {
        $status_code = ApiStatusCode::FAILED;
        $data = [];
        $message = __('Failed');

        $inputData = $request->all();

        $permission = (new AclPermission())->updatebyId($id, $inputData);

        if(!empty($permission)){
            if($permission === 'not_found'){
                $status_code = ApiStatusCode::NOT_FOUND;
                $message = __('Permission not found');
            }else {
                $data = $inputData;
                $status_code = ApiStatusCode::SUCCESS;
                $message = __('Success');
            }
        }

        return sendResponse($status_code, $message, $data);
    }

    public function delete($id): \Illuminate\Http\JsonResponse
    {
        $status_code = ApiStatusCode::FAILED;
        $data = [];
        $message = __('Failed');

        $permission = (new AclPermission())->deletebyId($id);

        if(!empty($permission)){
            if($permission === 'not_found'){
                $status_code = ApiStatusCode::NOT_FOUND;
                $message = __('Permission not found');
            }else {
                $status_code = ApiStatusCode::SUCCESS;
                $message = __('Success');
            }
        }

        return sendResponse($status_code, $message, $data);
    }

    public function show($id): \Illuminate\Http\JsonResponse
    {
        $status_code = ApiStatusCode::FAILED;
        $message = __('Failed');
        $data = [];

        $permission = (new AclPermission())->getbyId($id);

        if(!empty($permission)){
            $status_code = ApiStatusCode::SUCCESS;
            $message = __('Success');
            $data = $permission;
        }

        return sendResponse($status_code, $message, $data);
    }
}
