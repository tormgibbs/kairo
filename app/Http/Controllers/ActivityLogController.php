<?php

namespace App\Http\Controllers;

use App\Models\Activity;
use Illuminate\Http\Request;

class ActivityLogController extends Controller
{
	public function store(Request $request, Activity $activity)
	{
		$validated = $request->validate([
			'status' => 'required|in:pending,done',
			'remark' => 'nullable|string|max:1000',
		]);

		$activity
			->logs()
			->create([
				'user_id' => $request->user()->id,
				'status' => $validated['status'],
				'remark' => $validated['remark'] ?? null,
				'logged_at' => now(),
			]);

		$activity->update(['status' => $validated['status']]);

		return redirect()->back();
	}
}
