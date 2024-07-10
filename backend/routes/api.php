<?php

use App\Http\Controllers\V1\LoginController;
use Illuminate\Support\Facades\Route;

//Route::get('/user', function (Request $request) {
//    return $request->user();
//})->middleware('auth:sanctum');

Route::prefix('v1')->group(function () {

    Route::post('login', [LoginController::class, 'login'])->name('api.login');
    Route::post('refresh-token', [LoginController::class, 'refreshToken'])->name('api.refresh.token');
    Route::post('register', [LoginController::class, 'register'])->name('api.register');
    Route::middleware('auth')->group(function () {
        Route::get('auth/user', [LoginController::class, 'getAuthenticatedUser'])->name('api.auth.user');
    });
});
