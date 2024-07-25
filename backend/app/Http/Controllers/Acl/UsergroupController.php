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
        $usergroups = (new AclUsergroup())->getAll(function ($query) {
            return $query->paginate(10);
        });

        $status_code = ApiStatusCode::NOT_FOUND;
        $data = [];
        $message = __('Not found');

        if (count($usergroups) > 0) {
            $status_code = ApiStatusCode::SUCCESS;
            $data = $usergroups;
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

        $usergroup = (new AclUsergroup)->add($inputData);

        if(!empty($usergroup)){
            $data = $usergroup;
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

        $usergroup = (new AclUsergroup())->updatebyId($id, $inputData);

        if(!empty($usergroup)){
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

        $usergroup = (new AclUsergroup())->deletebyId($id);

        if(!empty($usergroup)){
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

        $usergroup = (new AclUsergroup())->getbyId($id);

        if(!empty($usergroup)){
            $status_code = ApiStatusCode::SUCCESS;
            $message = __('Success');
            $data = $usergroup;
        }

        return sendResponse($status_code, $message, $data);
    }
}
