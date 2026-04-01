import { Head, router } from '@inertiajs/react'
import { RefreshCw } from 'lucide-react'
import { StatsBar } from '@/components/stats-bar'
import { dashboard } from '@/routes'
import type { Activity } from '@/types'
import { DashboardTable } from '@/components/dashboard-table'
import { useState } from 'react'
import { format, parseISO } from 'date-fns'
import { DatePicker } from '@/components/date-picker'

type Props = {
	activities: Activity[]
	selectedDate: string
}

export default function Dashboard({ activities, selectedDate }: Props) {
	const [_open, _setOpen] = useState(false)

	function changeDate(date: Date | undefined) {
		if (!date) return
		router.get(
			'/',
			{ date: format(date, 'yyyy-MM-dd') },
			{ preserveScroll: true },
		)
	}

	console.log(activities)

	return (
		<>
			<Head title="Daily Activity Dashboard" />

			<main className="flex flex-col gap-6 p-4">
				<header className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
					<div>
						<h1 className="text-xl font-semibold">Daily Activities</h1>
						<p className="text-muted-foreground text-sm">
							Handover view · {format(parseISO(selectedDate), 'PPP')}
						</p>
					</div>

					<DatePicker
						value={parseISO(selectedDate)}
						onChange={changeDate}
						align="end"
					/>
				</header>

				<section aria-label="Activity statistics">
					<StatsBar activities={activities} />
				</section>

				<section aria-label="Activity list">
					{activities.length === 0 ? (
						<div className="flex flex-col items-center justify-center rounded-xl border border-dashed py-16 text-center">
							<RefreshCw
								className="text-muted-foreground mb-3"
								aria-hidden="true"
							/>
							<p className="font-medium">No activities for this day</p>
							<p className="text-muted-foreground text-sm">
								Select a different date or ask an admin to add activities.
							</p>
						</div>
					) : (
						<DashboardTable activities={activities} />
					)}
				</section>
			</main>
		</>
	)
}

Dashboard.layout = {
	breadcrumbs: [{ title: 'Dashboard', href: dashboard() }],
}
