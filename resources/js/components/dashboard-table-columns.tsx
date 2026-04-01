// resources/js/components/dashboard-table-columns.tsx
import { StatusBadge } from '@/components/status-badge'
import type { Activity } from '@/types'
import type { ColumnDef } from '@tanstack/react-table'

export const columns: ColumnDef<Activity>[] = [
	{
		accessorKey: 'title',
		header: 'Activity',
		cell: ({ row }) => (
			<div className="flex flex-col gap-0.5">
				<span className="font-medium text-sm">{row.original.title}</span>
				{row.original.description && (
					<span className="text-muted-foreground text-xs truncate max-w-56">
						{row.original.description}
					</span>
				)}
			</div>
		),
	},
	{
		accessorKey: 'category',
		header: 'Category',
		cell: ({ row }) => (
			<span className="text-xs capitalize text-muted-foreground">
				{row.original.category}
			</span>
		),
	},
	{
		accessorKey: 'status',
		header: 'Status',
		cell: ({ row }) => <StatusBadge status={row.original.status} />,
	},
	{
		id: 'last_update',
		header: 'Last Update',
		cell: ({ row }) => {
			const log = row.original.latest_log
			if (!log) return <span className="text-muted-foreground text-xs">—</span>

			return (
				<div className="flex flex-col gap-0.5">
					<p className="text-xs font-medium">
						{log.user.name}
						{log.user.department && (
							<span className="text-muted-foreground font-normal">
								{' '}
								· {log.user.department}
							</span>
						)}
					</p>
					{log.remark && (
						<p className="text-xs text-muted-foreground italic truncate max-w-48">
							"{log.remark}"
						</p>
					)}
					<time className="font-mono text-[11px] text-muted-foreground">
						{new Date(log.logged_at).toLocaleTimeString([], {
							hour: '2-digit',
							minute: '2-digit',
						})}
					</time>
				</div>
			)
		},
	},
]
