<?php

use App\Http\Controllers\CaracteristicaController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('equipos', [CaracteristicaController::class, 'store']);

Route::get('equipos', [CaracteristicaController::class, 'index']);

Route::get('equipos/{gce_id}', [CaracteristicaController::class, 'show']);

Route::patch('equipos/{gce_id}', [CaracteristicaController::class, 'update']);

Route::delete('equipos/{gce_id}', [CaracteristicaController::class, 'destroy']);