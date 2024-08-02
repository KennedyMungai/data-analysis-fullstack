'use client'

import { regionsSchema } from '@/db/schema'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import {
	Form,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'

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

	const handleSubmit = async (values: FormValues) => {}

	return (
		<Form {...form}>
			<form>
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
			</form>
		</Form>
	)
}

export default AddRegionForm
