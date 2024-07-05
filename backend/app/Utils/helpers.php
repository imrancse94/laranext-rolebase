<?php

if(!function_exists('sendResponse')){
    function sendResponse($status_code, $message, $data){
        return response()->json([
            'status_code' => $status_code,
            'message' => $message,
            'data' => $data
        ],\App\Utils\ApiHttpCode::success);
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
