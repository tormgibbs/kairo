<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
	public function run(): void
	{
		User::create([
			'name' => 'Emmanuel Selase',
			'email' => 'emmasela@kairo.com',
			'password' => Hash::make('emma2004?'),
		]);
	}
}
