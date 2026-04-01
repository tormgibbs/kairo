<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class AdminUserSeeder extends Seeder
{
	public function run(): void
	{
		User::create([
			'name' => 'Admin User',
			'email' => 'admin@kairo.com',
			'password' => Hash::make('admin123'),
			'role' => 'admin',
			'phone' => '1234567890',
			'department' => 'IT',
		]);
	}
}
