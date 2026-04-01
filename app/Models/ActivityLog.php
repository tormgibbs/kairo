<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ActivityLog extends Model
{
	protected $fillable = [
		'activity_id',
		'user_id',
		'status',
		'remark',
		'logged_at',
	];

	protected $casts = [
		'logged_at' => 'datetime',
	];

	public function activity(): BelongsTo
	{
		return $this->belongsTo(Activity::class);
	}

	public function user(): BelongsTo
	{
		return $this->belongsTo(User::class);
	}
}
