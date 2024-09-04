<?php

if(!function_exists('sendResponse')){
    function sendResponse($status_code, $message, $data){

        $auth = \App\Utils\ObjectContainer::get('customAuth');

        $responseArray = [
            'status_code' => $status_code,
            'message' => $message,
            'data' => $data
        ];
        info(request()->headers);
        $client_permission_version = request()->header('permission-version');
        if(!empty($client_permission_version)) {
            if ($auth?->permission_version != $client_permission_version) {
                $responseArray['permission'] = (new \App\Models\AclPermission())->getPermissionByUserId($auth->id);
                $responseArray['permission_version'] = $auth->permission_version;
            }
        }

        return response()->json($responseArray,\App\Utils\ApiHttpCode::success);
    }
}

if(!function_exists('sendErrorResponse')){
    function sendErrorResponse($status_code, $message, $errors,$http_code){
        $result = [
            'status_code' => $status_code,
            'message' => $message
        ];

        if(!empty($errors)){
            $result['errors'] = $errors;
        }

        return response()->json($result,$http_code);
    }
}

if(!function_exists('decodeToken')){
    function decodeToken($token)
    {
        return auth()->getPayload();
    }
}
