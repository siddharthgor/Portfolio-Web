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
use App\Http\Controllers\AcademicPerformanceController;
use App\Http\Controllers\Workshops_Conference_Controller;

Route::get('admin', [CustomAuthController::class, 'showLoginForm'])->name('admin.login');
Route::post('admin/login', [CustomAuthController::class, 'login']);

// Routes that require authentication
Route::middleware('admin')->group(function () {
    Route::get('admin/home', function () {
        return view('admin.home');
    })->name('admin.home');
    //academic_performance routes

    Route::get('admin/academic_performance', [AcademicPerformanceController::class, 'index'])->name('admin.academic_performance.index');
    Route::get('admin/academic_performance/list', [AcademicPerformanceController::class, 'list'])->name('admin.academic_performance.list');
    Route::get('admin/academic_performance/create', [AcademicPerformanceController::class, 'create'])->name('academic_performance.create');
    Route::post('admin/academic_performance/store', [AcademicPerformanceController::class, 'store'])->name('academic_performance.store');

    //workshops_conference routes

    Route::get('admin/workshops_conference', [Workshops_Conference_Controller::class, 'index'])->name('workshops_conference.index');
    Route::get('admin/workshops_conference/list', [Workshops_Conference_Controller::class, 'list'])->name('admin.workshops_conference.list');
    Route::get('admin/workshops_conference/create', [Workshops_Conference_Controller::class, 'create'])->name('workshops_conference.create');
    Route::post('admin/workshops_conference/store', [Workshops_Conference_Controller::class, 'store'])->name('workshops_conference.store');
});
