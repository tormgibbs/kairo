import { useState } from 'react'
import { parseISO, format } from 'date-fns'
import { Head, router } from '@inertiajs/react'
import { DatePicker } from '@/components/date-picker'
import { ReportTable } from '@/components/report-table'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import type { Activity } from '@/types'

type Props = {
	activities: Activity[]
	filters: { from: string; to: string }
}

export default function Reports({ activities, filters }: Props) {
	const [from, setFrom] = useState<Date | undefined>(
		filters.from ? parseISO(filters.from) : undefined,
	)
	const [to, setTo] = useState<Date | undefined>(
		filters.to ? parseISO(filters.to) : undefined,
	)

	function handleFilter() {
		if (!from || !to) return
		router.get(
			'/reports',
			{ from: format(from, 'yyyy-MM-dd'), to: format(to, 'yyyy-MM-dd') },
			{ preserveScroll: true },
		)
	}

	return (
		<>
			<Head title="Reports" />

			<main className="flex flex-col gap-6 p-4">
				<header>
					<h1 className="text-xl font-semibold">Reports</h1>
					<p className="text-muted-foreground text-sm">
						Query activity history by date range
					</p>
				</header>

				<div className="flex items-end gap-4">
					<div className="flex flex-col gap-1.5">
						<Label>From</Label>
						<DatePicker value={from} onChange={setFrom} />
					</div>
					<div className="flex flex-col gap-1.5">
						<Label>To</Label>
						<DatePicker
							value={to}
							onChange={setTo}
							disabled={(date) => (from ? date < from : false)}
						/>
					</div>
					<Button onClick={handleFilter} disabled={!from || !to}>
						Apply
					</Button>
				</div>

				<section aria-label="Report results">
					<ReportTable activities={activities} />
				</section>
			</main>
		</>
	)
}

Reports.layout = {
	breadcrumbs: [
		{ title: 'Dashboard', href: '/' },
		{ title: 'Reports', href: '/reports' },
	],
}