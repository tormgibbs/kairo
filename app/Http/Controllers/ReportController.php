<?php

namespace App\Http\Controllers;

use App\Models\Activity;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ReportController extends Controller
{
	public function index(Request $request): Response
	{
		$from = $request->input('from', today()->startOfMonth()->toDateString());
		$to = $request->input('to', today()->toDateString());

		$activities = Activity::with(['creator', 'logs.user'])
			->whereBetween('activity_date', [$from, $to])
			->latest('activity_date')
			->get();

		return Inertia::render('reports/index', [
			'activities' => $activities,
			'filters' => ['from' => $from, 'to' => $to],
		]);
	}
}
