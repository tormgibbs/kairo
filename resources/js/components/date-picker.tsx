import { useState } from 'react'
import { format } from 'date-fns'
import { CalendarDays } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover'
import { cn } from '@/lib/utils'

type Props = {
	value: Date | undefined
	onChange: (date: Date | undefined) => void
	placeholder?: string
	align?: 'start' | 'center' | 'end'
	disabled?: (date: Date) => boolean
	className?: string
	iconPosition?: 'left' | 'right'
}

export function DatePicker({
	value,
	onChange,
	placeholder = 'Pick a date',
	align = 'start',
	disabled,
	className,
	iconPosition = 'left',
}: Props) {
	const [open, setOpen] = useState(false)

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<Button
					variant="outline"
					className={cn('gap-2 text-sm font-normal', className)}
				>
					{iconPosition === 'left' && (
						<CalendarDays data-icon="inline-start" aria-hidden="true" />
					)}
					{value ? format(value, 'PPP') : placeholder}
					{iconPosition === 'right' && (
						<CalendarDays data-icon="inline-end" aria-hidden="true" />
					)}
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-auto p-0" align={align}>
				<Calendar
					mode="single"
					selected={value}
					onSelect={(date) => {
						onChange(date)
						setOpen(false)
					}}
					disabled={disabled}
				/>
			</PopoverContent>
		</Popover>
	)
}
