<?php

use App\Http\Controllers\ActivityController;
use App\Http\Controllers\ActivityLogController;
use App\Http\Controllers\DailyViewController;
use App\Http\Controllers\ReportController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'verified'])->group(function () {
	Route::get('/', [DailyViewController::class, 'index'])->name('dashboard');

	Route::get('/activities', [ActivityController::class, 'index'])->name('activities.index');

	Route::get('/activities/create', [ActivityController::class, 'create'])->name('activities.create');
		Route::post('/activities', [ActivityController::class, 'store'])->name('activities.store');
		Route::get('/activities/{activity}', [ActivityController::class, 'show'])->name('activities.show');
		Route::get('/activities/{activity}/edit', [ActivityController::class, 'edit'])->name('activities.edit');
		Route::put('/activities/{activity}', [ActivityController::class, 'update'])->name('activities.update');
		Route::delete('/activities/{activity}', [ActivityController::class, 'destroy'])->name('activities.destroy');

	Route::post('/activities/{activity}/logs', [ActivityLogController::class, 'store'])->name('activity-logs.store');

	Route::get('/reports', [ReportController::class, 'index'])->name('reports.index');
});

// require __DIR__.'/auth.php';
require __DIR__.'/settings.php';
