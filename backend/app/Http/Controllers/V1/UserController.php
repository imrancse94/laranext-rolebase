<?php

namespace App\Http\Controllers\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\RegisterRequest;
use App\Models\User;
use App\Utils\ApiStatusCode;
use Illuminate\Http\Request;

class UserController extends Controller
{

    public function create(RegisterRequest $request)
    {
        $inputData = $request->all();

        $user = (new User())->createUser($inputData);

        if (!empty($user)) {
            return sendResponse(ApiStatusCode::SUCCESS, __('User created successfully.'), $user);
        }

        return sendResponse(ApiStatusCode::FAILED, __('User creation failed'), []);

    }

    public function getAllUsers()
    {
        $filter = request()->query();

        $users = (new User())->getAll($filter,function ($query){
            return $query->paginate(10);
        });

        if (!empty($users)) {
            return sendResponse(ApiStatusCode::SUCCESS, __('User fetched successfully.'), $users);
        }

        return sendResponse(ApiStatusCode::FAILED, __('User fetched failed'), []);
    }

    public function update(RegisterRequest $request,$id)
    {
        $inputData = $request->all();

        $user = (new User())->updatebyId($id,$inputData);

        if (!empty($user)) {
            return sendResponse(ApiStatusCode::SUCCESS, __('User updated successfully.'), []);
        }

        return sendResponse(ApiStatusCode::FAILED, __('User update failed'), []);
    }

    public function getUserById($id)
    {
        $users = (new User())->getById($id);

        if (!empty($users)) {
            return sendResponse(ApiStatusCode::SUCCESS, __('User fetched successfully.'), $users);
        }

        return sendResponse(ApiStatusCode::FAILED, __('User fetched failed'), []);
    }
}
