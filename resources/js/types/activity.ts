import type { User } from './auth'

export type ActivityLog = {
	id: number
	user: User
	status: 'pending' | 'done'
	remark?: string
	logged_at: string
}

export type Activity = {
	id: number
	title: string
	description?: string
	category: string
	status: 'pending' | 'done'
	activity_date: string
	creator: User
	logs: ActivityLog[]
	latest_log?: ActivityLog
}
