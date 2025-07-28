<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\AuthController;
use App\Http\Controllers\LinkController;
use App\Http\Controllers\PetController;
use App\Http\Controllers\TypeController;
use App\Http\Controllers\ScheduleController;
use App\Http\Controllers\SubserviceController;
use App\Http\Controllers\ProductController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::post('/login', [AuthController::class, 'login']);



Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});


Route::middleware('auth:sanctum')->group(function () {

Route::post('/logout', [AuthController::class, 'logout']);

Route::get('/menu',[linkController::class,'consultLinks']);

Route::apiResource('pet', PetController::class);

Route::get('/petAppointment', [PetController::class, 'getPetHistory']);

Route::get('/type',[TypeController::class,'index']);

Route::apiResource('schedule',ScheduleController::class);

Route::get('/subservice',[SubserviceController::class,'index']);

Route::apiResource('product',ProductController::class);

});


