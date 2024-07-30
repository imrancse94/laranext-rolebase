<?php

namespace App\Http\Controllers\Acl;

use App\Http\Controllers\Controller;
use App\Http\Requests\Acl\UsergroupRequest;
use App\Models\AclUsergroup;
use App\Utils\ApiStatusCode;
use Exception;
use Illuminate\Http\Request;

class UsergroupController extends Controller
{
    public function getList(): \Illuminate\Http\JsonResponse
    {
        $paginate = request()->query('page') ?? false ;
	    $filter = request()->query();

        $usergroups = (new AclUsergroup())->getAll($filter, function ($query) use ($paginate) {
            return $query->orderBy('id','desc')->paginate(10);
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

    public function getAllList(): \Illuminate\Http\JsonResponse
    {

	    $filter = request()->query();

        $usergroups = (new AclUsergroup())->getAll($filter, function ($query) {
            return $query->pluck('name','id');
        });

        $status_code = ApiStatusCode::NOT_FOUND;
        $data = [];
        $message = __('Not found');

        if (count($usergroups) > 0) {
            $jsonArray = [];
            foreach ($usergroups as $id => $name) {
                $jsonArray[] = ['id' => $id, 'name' => $name];
            }
            $status_code = ApiStatusCode::SUCCESS;
            $data = $jsonArray;
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
	    try{
            $usergroup = (new AclUsergroup())->deletebyId($id);

            if(!empty($usergroup)){
                $status_code = ApiStatusCode::SUCCESS;
                $message = __('Success');
            }
	    }catch(Exception $ex){
            $message = __('The usergroup is another use');
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
