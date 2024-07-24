<?php

namespace App\Http\Controllers\Acl;

use App\Http\Controllers\Controller;
use App\Http\Requests\Acl\UsergroupRequest;
use App\Models\AclUsergroup;
use App\Utils\ApiStatusCode;
use Illuminate\Http\Request;

class UsergroupController extends Controller
{
    public function getList(): \Illuminate\Http\JsonResponse
    {
        $roles = (new AclUsergroup())->getAll(function ($query) {
            return $query->paginate(10);
        });

        $status_code = ApiStatusCode::NOT_FOUND;
        $data = [];
        $message = __('Not found');

        if (!empty($roles->data)) {
            $status_code = ApiStatusCode::SUCCESS;
            $data = $roles;
            $message = __('Success');
        }

        return sendResponse($status_code, $message, $data);
    }


    public function create(UsergroupRequest $request): \Illuminate\Http\JsonResponse
    {
        $status_code = ApiStatusCode::FAILED;
        $data = [];
        $message = __('Failed');

        $inputData = $request->all();

        $role = (new AclUsergroup)->add($inputData);

        if(!empty($role)){
            $data = $role;
            $status_code = ApiStatusCode::SUCCESS;
            $message = __('Success');
        }

        return sendResponse($status_code, $message, $data);
    }

    public function update(UsergroupRequest $request, $id): \Illuminate\Http\JsonResponse
    {
        $status_code = ApiStatusCode::FAILED;
        $data = [];
        $message = __('Failed');

        $inputData = $request->all();

        $role = (new AclUsergroup())->updatebyId($id, $inputData);

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

        $role = (new AclUsergroup())->deletebyId($id);

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

        $role = (new AclUsergroup())->getbyId($id);

        if(!empty($role)){
            $status_code = ApiStatusCode::SUCCESS;
            $message = __('Success');
            $data = $role;
        }

        return sendResponse($status_code, $message, $data);
    }
}
