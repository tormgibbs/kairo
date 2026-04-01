import { useState } from 'react'
import { Link } from '@inertiajs/react'
import { router } from '@inertiajs/react'
import { MoreHorizontal } from 'lucide-react'
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import type { Activity } from '@/types'

type Props = {
	activity: Activity
}

export function ActivityActions({ activity }: Props) {
	const [confirmOpen, setConfirmOpen] = useState(false)

	function handleDelete() {
		router.delete(`/activities/${activity.id}`, { preserveScroll: true })
	}

	return (
		<>
			<DropdownMenu>
				<DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
					<Button variant="ghost" size="icon">
						<span className="sr-only">Open menu</span>
						<MoreHorizontal />
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent align="end" onClick={(e) => e.stopPropagation()}>
					<DropdownMenuGroup>
						<DropdownMenuItem asChild>
							<Link href={`/activities/${activity.id}/edit`}>Edit</Link>
						</DropdownMenuItem>
						<DropdownMenuItem
							className="text-destructive"
							onClick={(e) => {
								e.stopPropagation()
								setConfirmOpen(true)
							}}
						>
							Delete
						</DropdownMenuItem>
					</DropdownMenuGroup>
				</DropdownMenuContent>
			</DropdownMenu>

			<AlertDialog open={confirmOpen} onOpenChange={setConfirmOpen}>
				<AlertDialogContent
					className="overflow-hidden rounded-xl bg-popover p-0 \
				text-popover-foreground ring-1 ring-foreground/10"
				>
					<div className="p-4 space-y-4">
						<AlertDialogHeader className="text-center sm:text-left">
							<AlertDialogTitle className="text-base font-medium">
								Delete activity?
							</AlertDialogTitle>

							<AlertDialogDescription>
								<span className="font-medium text-foreground wrap-break-word">
									{activity.title}
								</span>{' '}
								will be permanently deleted along with all its logs. This cannot
								be undone.
							</AlertDialogDescription>
						</AlertDialogHeader>
					</div>

					<AlertDialogFooter
						className="border-t bg-muted/50 \
						p-4 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end"
					>
						<AlertDialogCancel className="h-8 px-3">Cancel</AlertDialogCancel>

						<AlertDialogAction
							onClick={handleDelete}
							className="h-8 px-3 bg-destructive text-destructive-foreground hover:bg-destructive/90"
						>
							Delete
						</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		</>
	)
}
