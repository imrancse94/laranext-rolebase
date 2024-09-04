<?php

namespace App\Http\Controllers\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\RegisterRequest;
use App\Libs\Jwt\JwtManager;
use App\Models\AclPermission;
use App\Models\User;
use App\Utils\ApiHttpCode;
use App\Utils\ApiStatusCode;
use Illuminate\Http\Request;


class LoginController extends Controller
{
    public function login(LoginRequest $request)
    {
        $credentials = $request->only('email', 'password');

        $user = auth()->attempt($credentials);

        if (!empty($user)) {
            $response = array_merge($user, [
                'user'=>auth()->user(),
                'permission'=> (new AclPermission)->getPermissionByUserId(auth()->id())
            ]);
            return sendResponse(ApiStatusCode::SUCCESS, __('Login success'), $response);
        }

        return sendResponse(ApiStatusCode::FAILED, __('User not found'), []);
    }

    public function refreshToken(Request $request)
    {
        try{
            info('Refresh token: '.$request->refresh_token);
            if ($user = auth()->refreshToken()) {
                $user['permission'] = (new AclPermission)->getPermissionByUserId(auth()->id());
                return sendResponse(ApiStatusCode::SUCCESS, __('Token Refresh success'), $user);
            }
        }catch (\Exception $exception){
            return sendResponse(ApiStatusCode::FAILED, __($exception->getMessage()), []);
        }

        return sendResponse(ApiStatusCode::FAILED, __('Refresh Token failed'), []);
    }

    public function getAuthenticatedUser()
    {
        //auth()->logout();
        return sendResponse(ApiStatusCode::SUCCESS, __('Fetched successfully.'), auth()->user());
    }

    
}
