<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CandidatesController;
use App\Http\Controllers\DispositionsController;

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
Route::group(['prefix' => '/v1'], function() {
    Route::get('/', function() {
        return response()->json([
            'message' => 'API version 1.0',
        ]);
    });
    Route::group(['prefix' => '/candidates'], function() {
        Route::get('/', [CandidatesController::class, 'index']);
        Route::get('/{id}', [CandidatesController::class, 'find']);
        Route::put('/', [CandidatesController::class, 'upsert']);
    });
    Route::group(['prefix' => '/dispositions'], function() {
        Route::put('/', [DispositionsController::class, 'upsert']);
        Route::get('/{id}', [DispositionsController::class, 'find']);
    });
});
