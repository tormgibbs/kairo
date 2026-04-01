import { Head, Link, usePage } from '@inertiajs/react'
import { Plus } from 'lucide-react'
import { ActivityTable } from '@/components/activity-table'
import { Button } from '@/components/ui/button'
import type { Activity, User } from '@/types'

type Props = {
	activities: Activity[]
}

export default function ActivitiesIndex({ activities }: Props) {
	const { auth } = usePage().props
	const user = auth.user as User

	return (
		<>
			<Head title="Activities" />

			<main className="flex flex-col gap-6 p-4">
				<header className="flex items-center justify-between">
					<div>
						<h1 className="text-xl font-semibold">Activities</h1>
						<p className="text-muted-foreground text-sm">
							All activities across all dates
						</p>
					</div>

					<Button asChild>
						<Link href="/activities/create">
							<Plus data-icon="inline-start" />
							New Activity
						</Link>
					</Button>
				</header>

				<section aria-label="Activities table">
					<ActivityTable activities={activities} user={user} />
				</section>
			</main>
		</>
	)
}

ActivitiesIndex.layout = {
	breadcrumbs: [
		{ title: 'Dashboard', href: '/' },
		{ title: 'Activities', href: '/activities' },
	],
}
