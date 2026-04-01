import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import type { Activity } from '@/types'

type Props = {
	status: Activity['status']
	className?: string
}

const statusConfig = {
	done: {
		label: 'Done',
		className: 'border-success/30 bg-success-subtle text-success',
	},
	pending: {
		label: 'Pending',
		className: 'border-warning/30 bg-warning-subtle text-warning-foreground',
	},
}

export function StatusBadge({ status, className }: Props) {
	const { label, className: statusClassName } = statusConfig[status]

	return (
		<Badge
			variant="outline"
			className={cn('font-medium text-xs w-16', statusClassName, className)}
		>
			{label}
		</Badge>
	)
}
