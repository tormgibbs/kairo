import { LogForm } from '@/components/log-form'
import { StatusBadge } from '@/components/status-badge'
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import type { Activity } from '@/types'

type Props = {
	activity: Activity
}

export function ActivityCard({ activity }: Props) {
	return (
		<Card className="flex flex-col">
			<CardHeader className="flex flex-row items-start justify-between gap-2 pb-2">
				<CardTitle className="text-sm font-medium leading-snug">
					{activity.title}
				</CardTitle>
				<StatusBadge status={activity.status} />
			</CardHeader>

			<CardContent className="flex flex-col gap-2 pb-2">
				{activity.description && (
					<p className="text-muted-foreground text-xs">
						{activity.description}
					</p>
				)}

				{activity.latest_log && (
					<>
						<Separator />
						<div className="flex flex-col gap-0.5 text-xs">
							<p className="text-muted-foreground">
								Updated by{' '}
								<span className="text-foreground font-medium">
									{activity.latest_log.user.name}
								</span>
							</p>
							{activity.latest_log.remark && (
								<p className="text-foreground italic">
									"{activity.latest_log.remark}"
								</p>
							)}
							<p className="text-muted-foreground font-mono text-[11px]">
								{new Date(activity.latest_log.logged_at).toLocaleTimeString(
									[],
									{
										hour: '2-digit',
										minute: '2-digit',
									},
								)}
							</p>
						</div>
					</>
				)}
			</CardContent>

			<CardFooter className="pt-0">
				<LogForm activity={activity} />
			</CardFooter>
		</Card>
	)
}
