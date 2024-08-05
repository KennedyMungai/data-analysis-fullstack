'use client'

import { Button } from '@/components/ui/button'
import {
	Form,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { regionsSchema } from '@/db/schema'
import { useCreateRegion } from '@/features/regions/api/use-create-region'
import { useNewRegionState } from '@/features/regions/hooks/use-new-region-state'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

type Props = {}

const formSchema = regionsSchema.pick({ regionName: true })
type FormValues = z.input<typeof formSchema>

const AddRegionForm = () => {
	const form = useForm<FormValues>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			regionName: ''
		}
	})

	const { onClose } = useNewRegionState()

	const { mutate, isPending } = useCreateRegion()

	const handleSubmit = async (values: FormValues) => {
		mutate(values, { onSuccess: () => onClose() })
		form.reset()
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(handleSubmit)}>
				<FormField
					name='regionName'
					control={form.control}
					render={({ field }) => (
						<FormItem>
							<FormLabel>Region Name</FormLabel>
							<FormDescription>
								The name of a region
							</FormDescription>
							<Input {...field} />
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button className='self-end mt-6' disabled={isPending}>
					Create
				</Button>
			</form>
		</Form>
	)
}

export default AddRegionForm
