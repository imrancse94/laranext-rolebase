<?php

use App\Http\Controllers\Acl\RoleController;
use App\Http\Controllers\Acl\UsergroupController;
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

    // ACL

    Route::prefix('acl')->group(function () {

        // Role
        Route::controller(RoleController::class)
            ->prefix('roles')
            ->name('roles.')
            ->group(function () {
                Route::get('', 'getList')->name('list');
                Route::post('create', 'create')->name('create');
                Route::put('{id}', 'update')->name('update');
                Route::delete('{id}', 'delete')->name('delete');
                Route::get('{id}', 'getById')->name('single');
            });

        // Usergroup
        Route::controller(UsergroupController::class)
            ->prefix('usergroups')
            ->name('usergroups.')
            ->group(function () {
                Route::get('', 'getList')->name('list');
                Route::post('create', 'create')->name('create');
                Route::put('{id}', 'update')->name('update');
                Route::delete('{id}', 'delete')->name('delete');
                Route::get('{id}', 'getById')->name('single');
            });


    });
    // ACL
});
