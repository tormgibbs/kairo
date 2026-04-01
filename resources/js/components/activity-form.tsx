import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { router } from '@inertiajs/react'
import { parseISO, format } from 'date-fns'
import { z } from 'zod'
import { DatePicker } from '@/components/date-picker'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Field, FieldError, FieldGroup } from '@/components/ui/field'
import type { Activity } from '@/types'

const schema = z.object({
	title: z.string().min(1, 'Title is required').max(255),
	description: z.string().max(1000).optional(),
	category: z.string().min(1, 'Category is required').max(100),
	activity_date: z.string().min(1, 'Date is required'),
})

export type ActivityFormValues = z.infer<typeof schema>

type Props = {
	defaultValues?: Partial<ActivityFormValues>
	activity?: Activity
	isEditing?: boolean
}

export function ActivityForm({ defaultValues, activity, isEditing = false }: Props) {
	const form = useForm<ActivityFormValues>({
		resolver: zodResolver(schema),
		defaultValues: {
			title: defaultValues?.title ?? '',
			description: defaultValues?.description ?? '',
			category: defaultValues?.category ?? '',
			activity_date:
				defaultValues?.activity_date ?? format(new Date(), 'yyyy-MM-dd'),
		},
	})

	function onSubmit(values: ActivityFormValues) {
		if (isEditing && activity) {
			router.put(`/activities/${activity.id}`, values)
		} else {
			router.post('/activities', values)
		}
	}

	return (
		<form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-6">
			<FieldGroup>
				<Controller
					name="title"
					control={form.control}
					render={({ field, fieldState }) => (
						<Field data-invalid={fieldState.invalid}>
							<Label htmlFor={field.name}>Title</Label>
							<Input
								{...field}
								id={field.name}
								placeholder="e.g. Daily SMS count vs log count"
								aria-invalid={fieldState.invalid}
							/>
							{fieldState.invalid && (
								<FieldError errors={[fieldState.error]} />
							)}
						</Field>
					)}
				/>

				<Controller
					name="description"
					control={form.control}
					render={({ field, fieldState }) => (
						<Field data-invalid={fieldState.invalid}>
							<Label htmlFor={field.name}>Description</Label>
							<Textarea
								{...field}
								id={field.name}
								placeholder="Optional details about this activity"
								aria-invalid={fieldState.invalid}
								rows={3}
							/>
							{fieldState.invalid && (
								<FieldError errors={[fieldState.error]} />
							)}
						</Field>
					)}
				/>

				<Controller
					name="category"
					control={form.control}
					render={({ field, fieldState }) => (
						<Field data-invalid={fieldState.invalid}>
							<Label htmlFor={field.name}>Category</Label>
							<Input
								{...field}
								id={field.name}
								placeholder="e.g. sms_count, server_check"
								aria-invalid={fieldState.invalid}
							/>
							{fieldState.invalid && (
								<FieldError errors={[fieldState.error]} />
							)}
						</Field>
					)}
				/>

				<Controller
					name="activity_date"
					control={form.control}
					render={({ field, fieldState }) => (
						<Field data-invalid={fieldState.invalid}>
							<Label>Date</Label>
							<DatePicker
								iconPosition='right'
								className="w-full justify-between"
								value={field.value ? parseISO(field.value) : undefined}
								onChange={(date) =>
									field.onChange(date ? format(date, 'yyyy-MM-dd') : '')
								}
							/>
							{fieldState.invalid && (
								<FieldError errors={[fieldState.error]} />
							)}
						</Field>
					)}
				/>
			</FieldGroup>

			<div className="flex items-center justify-end gap-3">
				<Button
					type="button"
					variant="outline"
					onClick={() => router.get('/activities')}
				>
					Cancel
				</Button>
				<Button type="submit" disabled={form.formState.isSubmitting}>
					{isEditing ? 'Save Changes' : 'Create Activity'}
				</Button>
			</div>
		</form>
	)
}