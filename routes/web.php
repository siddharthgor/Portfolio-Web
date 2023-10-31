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
use App\Http\Controllers\BookChapterController;
use App\Http\Controllers\ConferencePaperController;
use App\Http\Controllers\ExperienceController;
use App\Http\Controllers\JournalPapersController;
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

    //experience routes
    Route::get('admin/experience', [ExperienceController::class, 'index'])->name('experience.index');
    Route::get('admin/experience/create', [ExperienceController::class, 'create'])->name('experience.create');
    Route::post('admin/experience/store', [ExperienceController::class, 'store'])->name('experience.store');

    // papers
    //journal papers

    Route::get('admin/papers/journal_papers', [JournalPapersController::class, 'index'])->name('journal_papers.index');
    Route::get('admin/papers/journal_papers/list', [JournalPapersController::class, 'list'])->name('journal_papers.list');
    Route::get('admin/papers/journal_papers/create', [JournalPapersController::class, 'create'])->name('journal_papers.create');
    Route::post('admin/papers/journal_papers/store', [JournalPapersController::class, 'store'])->name('journal_papers.store');

    //conference papers

    Route::get('admin/papers/conference_papers', [ConferencePaperController::class, 'index'])->name('conference_papers.index');
    Route::get('admin/papers/conference_papers/list', [ConferencePaperController::class, 'list'])->name('conference_papers.list');
    Route::get('admin/papers/conference_papers/create', [ConferencePaperController::class, 'create'])->name('conference_papers.create');
    Route::post('admin/papers/conference_papers/store', [ConferencePaperController::class, 'store'])->name('conference_papers.store');

    //book_chapters

    Route::get('admin/papers/books_chapters', [BookChapterController::class, 'index'])->name('books_chapters.index');
    Route::get('admin/papers/books_chapters/list', [BookChapterController::class, 'list'])->name('books_chapters.list');
    Route::get('admin/papers/books_chapters/create', [BookChapterController::class, 'create'])->name('books_chapters.create');
    Route::post('admin/papers/books_chapters/store', [BookChapterController::class, 'store'])->name('books_chapters.store');
});
