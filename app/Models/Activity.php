<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Activity extends Model
{
	protected $fillable = [
		'title',
		'description',
		'category',
		'status',
		'activity_date',
		'created_by',
	];

	protected $casts = [
		'activity_date' => 'date',
	];

	public function creator(): BelongsTo
	{
		return $this->belongsTo(User::class, 'created_by');
	}

	public function logs(): HasMany
	{
		return $this->hasMany(ActivityLog::class)->latest('logged_at');
	}

	public function latestLog(): HasOne
	{
		return $this->hasOne(ActivityLog::class)->latestOfMany('logged_at');
	}
}
