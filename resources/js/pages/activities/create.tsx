import { Head } from '@inertiajs/react'
import { ActivityForm } from '@/components/activity-form'

export default function CreateActivity() {
	return (
		<>
			<Head title="New Activity" />

			<main className="flex justify-center p-6">
				<div className="w-full max-w-md flex flex-col gap-6">
					<header>
						<h1 className="text-xl font-semibold">New Activity</h1>
						<p className="text-muted-foreground text-sm">
							Add a new activity for the team to track
						</p>
					</header>

					<ActivityForm />
				</div>
			</main>
		</>
	)
}

CreateActivity.layout = {
	breadcrumbs: [
		{ title: 'Dashboard', href: '/' },
		{ title: 'Activities', href: '/activities' },
		{ title: 'New Activity', href: '/activities/create' },
	],
}
