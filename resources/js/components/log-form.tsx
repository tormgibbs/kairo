// resources/js/components/log-form.tsx
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { router } from '@inertiajs/react'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Field, FieldError, FieldGroup } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import type { Activity } from '@/types'

const schema = z.object({
	status: z.enum(['pending', 'done']),
	remark: z.string().max(1000).optional(),
})

type FormValues = z.infer<typeof schema>

type Props = {
	activity: Activity
}

export function LogForm({ activity }: Props) {
	const form = useForm<FormValues>({
		resolver: zodResolver(schema),
		defaultValues: {
			status: activity.status,
			remark: '',
		},
	})

	function onSubmit(values: FormValues) {
		router.post(`/activities/${activity.id}/logs`, values, {
			preserveScroll: true,
			onSuccess: () => form.reset({ status: values.status, remark: '' }),
		})
	}

	return (
		<form
			onSubmit={form.handleSubmit(onSubmit)}
			className="flex flex-col gap-4"
		>
			<FieldGroup>
				<Controller
					name="status"
					control={form.control}
					render={({ field, fieldState }) => (
						<Field data-invalid={fieldState.invalid}>
							<Label>Status</Label>
							<ToggleGroup
								type="single"
								value={field.value}
								onValueChange={(val) =>
									val && field.onChange(val as FormValues['status'])
								}
								className="grid grid-cols-2 rounded-md border border-input p-1"
							>
								<ToggleGroupItem
									value="pending"
									className="text-xs data-[state=on]:bg-warning-subtle data-[state=on]:text-warning-foreground"
								>
									Pending
								</ToggleGroupItem>
								<ToggleGroupItem
									value="done"
									className="text-xs data-[state=on]:bg-success-subtle data-[state=on]:text-success"
								>
									Done
								</ToggleGroupItem>
							</ToggleGroup>
							{fieldState.invalid && <FieldError errors={[fieldState.error]} />}
						</Field>
					)}
				/>

				<Controller
					name="remark"
					control={form.control}
					render={({ field, fieldState }) => (
						<Field data-invalid={fieldState.invalid}>
							<Label htmlFor={`remark-${activity.id}`}>Remark</Label>
							<Input
								{...field}
								id={`remark-${activity.id}`}
								placeholder="Optional note..."
								className="text-sm"
								aria-invalid={fieldState.invalid}
							/>
							{fieldState.invalid && <FieldError errors={[fieldState.error]} />}
						</Field>
					)}
				/>
			</FieldGroup>

			<Button
				type="submit"
				size="sm"
				disabled={form.formState.isSubmitting}
				className="w-full"
			>
				Save update
			</Button>
		</form>
	)
}
