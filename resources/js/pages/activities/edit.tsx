import { Head } from '@inertiajs/react'
import { ActivityForm } from '@/components/activity-form'
import type { Activity } from '@/types'

type Props = {
	activity: Activity
}

export default function EditActivity({ activity }: Props) {
	return (
		<>
			<Head title="Edit Activity" />

			<main className="flex justify-center p-6">
				<div className="w-full max-w-md flex flex-col gap-6">
					<header>
						<h1 className="text-xl font-semibold">Edit Activity</h1>
						<p className="text-muted-foreground text-sm">
							Update the details of this activity
						</p>
					</header>

					<ActivityForm
						activity={activity}
						isEditing
						defaultValues={{
							title: activity.title,
							description: activity.description,
							category: activity.category,
							activity_date: activity.activity_date,
						}}
					/>
				</div>
			</main>
		</>
	)
}

EditActivity.layout = {
	breadcrumbs: [
		{ title: 'Dashboard', href: '/' },
		{ title: 'Activities', href: '/activities' },
		{ title: 'Edit Activity', href: '#' },
	],
}
