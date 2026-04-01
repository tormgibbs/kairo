// resources/js/components/stats-bar.tsx
import { Card, CardContent } from '@/components/ui/card'
import type { Activity } from '@/types'

type Props = {
	activities: Activity[]
}

export function StatsBar({ activities }: Props) {
	const total = activities.length
	const done = activities.filter((a) => a.status === 'done').length
	const pending = activities.filter((a) => a.status === 'pending').length

	const stats = [
		{
			label: 'Total',
			value: total,
			subtext: 'All activities',
		},
		{
			label: 'Completed',
			value: done,
			subtext: `${total ? Math.round((done / total) * 100) : 0}% done`,
		},
		{
			label: 'In Progress',
			value: pending,
			subtext: `${total ? Math.round((pending / total) * 100) : 0}% pending`,
		},
	]

	return (
		<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
			{stats.map((stat) => (
				<Card
					key={stat.label}
					className="border border-border shadow-none py-2 bg-card/50"
				>
					<CardContent className="p-4 flex flex-col gap-3">
						{/* Label */}
						<span className="text-xs uppercase tracking-wide text-muted-foreground">
							{stat.label}
						</span>

						{/* Value */}
						<p className="text-2xl font-semibold tabular-nums">{stat.value}</p>

						{/* Subtext */}
						<p className="text-xs text-muted-foreground">{stat.subtext}</p>
					</CardContent>
				</Card>
			))}
		</div>
	)
}
