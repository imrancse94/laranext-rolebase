<?php

namespace App\Http\Controllers\Acl;

use App\Http\Controllers\Controller;
use App\Http\Requests\Acl\RoleRequest;
use App\Models\AclRole;
use App\Utils\ApiStatusCode;
use Couchbase\Role;
use Illuminate\Http\Request;

class RoleController extends Controller
{
    public function getList(): \Illuminate\Http\JsonResponse
    {
        $roles = (new AclRole())->getAll(function ($query) {
            return $query->paginate(10);
        });

        $status_code = ApiStatusCode::NOT_FOUND;
        $data = [];
        $message = __('Not found');

        if (!empty($roles)) {
            $status_code = ApiStatusCode::SUCCESS;
            $data = $roles;
            $message = __('Success');
        }

        return sendResponse($status_code, $message, $data);
    }


    public function create(RoleRequest $request): \Illuminate\Http\JsonResponse
    {
        $status_code = ApiStatusCode::FAILED;
        $data = [];
        $message = __('Failed');

        $inputData = $request->all();

        $role = (new AclRole)->add($inputData);

        if(!empty($role)){
            $data = $role;
            $status_code = ApiStatusCode::SUCCESS;
            $message = __('Success');
        }

        return sendResponse($status_code, $message, $data);
    }

    public function update(RoleRequest $request, $id): \Illuminate\Http\JsonResponse
    {
        $status_code = ApiStatusCode::FAILED;
        $data = [];
        $message = __('Failed');

        $inputData = $request->all();

        $role = (new AclRole())->updatebyId($id, $inputData);

        if(!empty($role)){
            $data = $inputData;
            $status_code = ApiStatusCode::SUCCESS;
            $message = __('Success');
        }

        return sendResponse($status_code, $message, $data);
    }

    public function delete($id): \Illuminate\Http\JsonResponse
    {
        $status_code = ApiStatusCode::FAILED;
        $data = [];
        $message = __('Failed');

        $role = (new AclRole())->deletebyId($id);

        if(!empty($role)){
            $status_code = ApiStatusCode::SUCCESS;
            $message = __('Success');
        }

        return sendResponse($status_code, $message, $data);
    }

    public function show($id): \Illuminate\Http\JsonResponse
    {
        $status_code = ApiStatusCode::FAILED;
        $message = __('Failed');
        $data = [];

        $role = (new AclRole())->getbyId($id);

        if(!empty($role)){
            $status_code = ApiStatusCode::SUCCESS;
            $message = __('Success');
            $data = $role;
        }

        return sendResponse($status_code, $message, $data);
    }
}
