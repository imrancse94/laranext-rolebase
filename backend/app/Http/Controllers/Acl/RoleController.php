<?php

namespace App\Http\Controllers\Acl;

use App\Http\Controllers\Controller;
use App\Http\Requests\Acl\RoleRequest;
use App\Models\AclRole;
use App\Utils\ApiStatusCode;


class RoleController extends Controller
{
    public function getList(): \Illuminate\Http\JsonResponse
    {
        $filter = request()->query();

        $roles = (new AclRole())->getAll($filter,function ($query) {
            return $query->orderBy('id','desc')->paginate(10);
        });

        $status_code = ApiStatusCode::NOT_FOUND;
        $data = [];
        $message = __('Not found');

        if (count($roles) > 0) {
            $status_code = ApiStatusCode::SUCCESS;
            $data = $roles;
            $message = __('Success');
        }

        return sendResponse($status_code, $message, $data);
    }

    public function getAllList(): \Illuminate\Http\JsonResponse
    {
        $filter = request()->query();

        $roles = (new AclRole())->getAll($filter,function ($query) {
            return $query->pluck('name','id');
        });

        $status_code = ApiStatusCode::NOT_FOUND;
        $data = [];
        $message = __('Not found');

        if (count($roles) > 0) {
            $status_code = ApiStatusCode::SUCCESS;
            $jsonArray = [];
            foreach ($roles as $id => $name) {
                $jsonArray[] = ['id' => $id, 'name' => $name];
            }
            $data = $jsonArray;
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
