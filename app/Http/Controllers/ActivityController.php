<?php

namespace App\Http\Controllers;

use App\Models\Activity;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ActivityController extends Controller
{
	public function index(): Response
	{
		$activities = Activity::with(['creator', 'latestLog.user'])
			->latest()
			->get();

		return Inertia::render('activities/index', [
			'activities' => $activities,
		]);
	}

	public function show(Activity $activity): Response
	{
		$activity->load([
			'creator',
			'logs' => function ($query) {
				$query->with('user')->latest('logged_at');
			},
		]);

		return Inertia::render('activities/show', [
			'activity' => $activity,
		]);
	}

	public function create(): Response
	{
		return Inertia::render('activities/create');
	}

	public function store(Request $request)
	{
		$validated = $request->validate([
			'title' => 'required|string|max:255',
			'description' => 'nullable|string',
			'category' => 'required|string|max:100',
			'activity_date' => 'required|date',
		]);

		Activity::create([
			...$validated,
			'created_by' => $request->user()->id,
		]);

		return redirect()->route('activities.index');
	}

	public function edit(Activity $activity): Response
	{
		return Inertia::render('activities/edit', [
			'activity' => $activity,
		]);
	}

	public function update(Request $request, Activity $activity)
	{
		$validated = $request->validate([
			'title' => 'required|string|max:255',
			'description' => 'nullable|string',
			'category' => 'required|string|max:100',
			'activity_date' => 'required|date',
		]);

		$activity->update($validated);

		return redirect()->route('activities.index');
	}

	public function destroy(Activity $activity)
	{
		$activity->delete();

		return redirect()->route('activities.index');
	}
}
