<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

use App\Http\Controllers\CustomAuthController;

Route::get('admin', [CustomAuthController::class, 'showLoginForm'])->name('admin.login');
Route::post('admin/login', [CustomAuthController::class, 'login']);

// Routes that require authentication
Route::middleware('admin')->group(function () {
    Route::get('admin/home', function () {
        return view('admin.home');
    })->name('admin.home');
});
