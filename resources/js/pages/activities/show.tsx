import { LogForm } from '@/components/log-form'
import { StatusBadge } from '@/components/status-badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import type { Activity } from '@/types'
import { Head } from '@inertiajs/react'
import { CalendarDays, Tag, User } from 'lucide-react'

type Props = {
	activity: Activity
}

export default function ActivityShow({ activity }: Props) {
	return (
		<>
			<Head title={activity.title} />

			<main className="w-full max-w-7xl mx-auto px-6 py-4 flex flex-col gap-6">
				{/* Header */}
				<header className="flex flex-col gap-2">
					<div className="flex items-center justify-between">
						<h1 className="text-lg font-semibold">{activity.title}</h1>
						<StatusBadge status={activity.status} />
					</div>

					{activity.description && (
						<p className="text-sm text-muted-foreground max-w-2xl">
							{activity.description}
						</p>
					)}
				</header>

				<div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_340px]">
					{/* LEFT */}
					<div className="flex flex-col gap-6 min-w-0">
						{/* Details */}
						<Card className="border border-border shadow-none">
							<CardHeader>
								<CardTitle className="text-xs uppercase tracking-wide text-muted-foreground">
									Details
								</CardTitle>
							</CardHeader>

							<CardContent className="flex flex-col gap-3 text-sm">
								<div className="flex items-center gap-2 text-muted-foreground">
									<Tag className="size-4" />
									<span className="capitalize">{activity.category}</span>
								</div>

								<div className="flex items-center gap-2 text-muted-foreground">
									<CalendarDays className="size-4" />
									<time>{new Date(activity.activity_date).toDateString()}</time>
								</div>

								<div className="flex items-center gap-2 text-muted-foreground">
									<User className="size-4" />
									<span>
										Created by{' '}
										<span className="text-foreground font-medium">
											{activity.creator.name}
										</span>
									</span>
								</div>
							</CardContent>
						</Card>

						{/* Logs */}
						<Card className="border border-border shadow-none">
							<CardHeader>
								<CardTitle className="text-xs uppercase tracking-wide text-muted-foreground">
									Update History
								</CardTitle>
							</CardHeader>

							<CardContent>
								{activity.logs.length === 0 ? (
									<p className="text-sm text-muted-foreground">
										No updates yet.
									</p>
								) : (
									<ol className="flex flex-col">
										{activity.logs.map((log, i) => (
											<li key={log.id} className="flex gap-3">
												{/* timeline */}
												<div className="flex flex-col items-center">
													<div className="mt-1 size-2 rounded-full bg-border" />
													{i < activity.logs.length - 1 && (
														<div className="flex-1 w-px bg-border my-1" />
													)}
												</div>

												{/* content */}
												<div className="flex flex-col gap-1 pb-4 min-w-0">
													<div className="flex items-center gap-2 flex-wrap">
														<span className="text-sm font-medium">
															{log.user.name}
														</span>
														<StatusBadge status={log.status} />
													</div>

													{log.remark && (
														<p className="text-sm text-muted-foreground italic break-words whitespace-pre-wrap">
															"{log.remark}"
														</p>
													)}

													<time className="text-[11px] font-mono text-muted-foreground">
														{new Date(log.logged_at).toLocaleString([], {
															month: 'short',
															day: 'numeric',
															hour: '2-digit',
															minute: '2-digit',
														})}
													</time>
												</div>
											</li>
										))}
									</ol>
								)}
							</CardContent>
						</Card>
					</div>

					{/* RIGHT */}
					<Card className="h-fit w-85 shrink-0 border border-border shadow-none">
						<CardHeader>
							<CardTitle className="text-xs uppercase tracking-wide text-muted-foreground">
								Log Update
							</CardTitle>
						</CardHeader>

						<CardContent>
							<LogForm activity={activity} />
						</CardContent>
					</Card>
				</div>
			</main>
		</>
	)
}

ActivityShow.layout = {
	breadcrumbs: [
		{ title: 'Dashboard', href: '/' },
		{ title: 'Activities', href: '/activities' },
		{ title: 'View Activity', href: '#' },
	],
}
