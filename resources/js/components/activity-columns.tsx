// resources/js/components/activity-columns.tsx
import { Link } from '@inertiajs/react'
import { router } from '@inertiajs/react'
import type { ColumnDef } from '@tanstack/react-table'
import { MoreHorizontal } from 'lucide-react'
import { StatusBadge } from '@/components/status-badge'
import { Button } from '@/components/ui/button'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import type { Activity, User } from '@/types'
import { ActivityActions } from './activity-actions'

function ActionsCell({ activity }: { activity: Activity }) {
	function handleDelete() {
		if (!confirm('Delete this activity?')) return
		router.delete(`/activities/${activity.id}`, { preserveScroll: true })
	}

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
				<Button variant="ghost" size="icon">
					<span className="sr-only">Open menu</span>
					<MoreHorizontal />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end">
				<DropdownMenuGroup>
					<DropdownMenuItem asChild>
						<Link href={`/activities/${activity.id}/edit`}>Edit</Link>
					</DropdownMenuItem>
					<DropdownMenuItem className="text-destructive" onClick={handleDelete}>
						Delete
					</DropdownMenuItem>
				</DropdownMenuGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}

export function getColumns(user: User): ColumnDef<Activity>[] {
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

	if (user.role === 'admin') {
		columns.push({
			id: 'actions',
			cell: ({ row }) => <ActivityActions activity={row.original} />,
		})
	}

	return columns
}
