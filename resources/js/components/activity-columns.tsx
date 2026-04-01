import type { ColumnDef } from '@tanstack/react-table'
import { StatusBadge } from '@/components/status-badge'
import type { Activity } from '@/types'
import { ActivityActions } from './activity-actions'

export function getColumns(): ColumnDef<Activity>[] {
	const columns: ColumnDef<Activity>[] = [
		{
			accessorKey: 'title',
			header: 'Activity',
			cell: ({ row }) => (
				<div className="flex flex-col gap-0.5">
					<span className="font-medium text-sm">{row.original.title}</span>
					{row.original.description && (
						<span className="text-muted-foreground text-xs truncate max-w-64">
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
				<span className="text-sm capitalize">{row.original.category}</span>
			),
		},
		{
			accessorKey: 'status',
			header: 'Status',
			cell: ({ row }) => <StatusBadge status={row.original.status} />,
		},
		{
			accessorKey: 'activity_date',
			header: 'Date',
			cell: ({ row }) => (
				<span className="font-mono text-xs text-muted-foreground">
					{new Date(row.original.activity_date).toDateString()}
				</span>
			),
		},
		{
			accessorKey: 'creator',
			header: 'Created By',
			cell: ({ row }) => (
				<span className="text-sm">{row.original.creator.name}</span>
			),
		},
	]

	columns.push({
		id: 'actions',
		cell: ({ row }) => (
			<menu
				onClick={(e) => e.stopPropagation()}
				onKeyDown={(e) => e.stopPropagation()}
			>
				<ActivityActions activity={row.original} />
			</menu>
		),
	})

	return columns
}
