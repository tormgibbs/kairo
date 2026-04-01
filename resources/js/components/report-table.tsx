import {
	type ColumnDef,
	flexRender,
	getCoreRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	useReactTable,
} from '@tanstack/react-table'
import { ChevronDown, ChevronRight } from 'lucide-react'
import { StatusBadge } from '@/components/status-badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table'
import type { Activity } from '@/types'

function LogsExpanded({ activity }: { activity: Activity }) {
	if (!activity.logs.length) {
		return (
			<p className="text-muted-foreground text-xs py-2">No updates logged.</p>
		)
	}

	return (
		<ol className="flex flex-col gap-2 py-2">
			{activity.logs.map((log) => (
				<li key={log.id} className="flex flex-col gap-0.5 text-xs">
					<div className="flex items-center gap-2">
						<StatusBadge status={log.status} />
						<span className="font-medium">{log.user.name}</span>
						{log.user.department && (
							<span className="text-muted-foreground">
								· {log.user.department}
							</span>
						)}
						<span className="text-muted-foreground font-mono ml-auto">
							{new Date(log.logged_at).toLocaleTimeString([], {
								hour: '2-digit',
								minute: '2-digit',
							})}
						</span>
					</div>
					{log.remark && (
						<p className="text-muted-foreground italic pl-1">"{log.remark}"</p>
					)}
					<Separator className="mt-1" />
				</li>
			))}
		</ol>
	)
}

const columns: ColumnDef<Activity>[] = [
	{
		id: 'expander',
		header: '',
		cell: ({ row }) => (
			<Button
				variant="ghost"
				size="icon"
				onClick={() => row.toggleExpanded()}
				aria-label="Toggle logs"
			>
				{row.getIsExpanded() ? <ChevronDown /> : <ChevronRight />}
			</Button>
		),
	},
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
		accessorKey: 'logs',
		header: 'Updates',
		cell: ({ row }) => (
			<span className="text-muted-foreground text-sm">
				{row.original.logs.length}
			</span>
		),
	},
]

type Props = {
	activities: Activity[]
}

export function ReportTable({ activities }: Props) {
	const table = useReactTable({
		data: activities,
		columns,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		getRowCanExpand: () => true,
	})

	return (
		<div className="flex flex-col gap-4">
			<div className="overflow-hidden rounded-md border">
				<Table>
					<TableHeader>
						{table.getHeaderGroups().map((headerGroup) => (
							<TableRow key={headerGroup.id}>
								{headerGroup.headers.map((header) => (
									<TableHead key={header.id}>
										{header.isPlaceholder
											? null
											: flexRender(
													header.column.columnDef.header,
													header.getContext(),
												)}
									</TableHead>
								))}
							</TableRow>
						))}
					</TableHeader>
					<TableBody>
						{table.getRowModel().rows.length ? (
							table.getRowModel().rows.map((row) => (
								<>
									<TableRow key={row.id}>
										{row.getVisibleCells().map((cell) => (
											<TableCell key={cell.id}>
												{flexRender(
													cell.column.columnDef.cell,
													cell.getContext(),
												)}
											</TableCell>
										))}
									</TableRow>
									{row.getIsExpanded() && (
										<TableRow key={`${row.id}-expanded`}>
											<TableCell
												colSpan={columns.length}
												className="bg-muted/40 px-6"
											>
												<LogsExpanded activity={row.original} />
											</TableCell>
										</TableRow>
									)}
								</>
							))
						) : (
							<TableRow>
								<TableCell
									colSpan={columns.length}
									className="h-24 text-center text-muted-foreground"
								>
									No activities found for this period.
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</div>

			<div className="flex items-center justify-end gap-2">
				<span className="text-muted-foreground text-sm">
					Page {table.getState().pagination.pageIndex + 1} of{' '}
					{table.getPageCount()}
				</span>
				<Button
					variant="outline"
					size="sm"
					onClick={() => table.previousPage()}
					disabled={!table.getCanPreviousPage()}
				>
					Previous
				</Button>
				<Button
					variant="outline"
					size="sm"
					onClick={() => table.nextPage()}
					disabled={!table.getCanNextPage()}
				>
					Next
				</Button>
			</div>
		</div>
	)
}
