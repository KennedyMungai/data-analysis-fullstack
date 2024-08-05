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
import { storesSchema } from '@/db/schema'
import { useCreateStore } from '@/features/stores/api/use-create-store'
import { useNewStoreState } from '@/features/stores/hooks/use-new-store-state'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

type Props = {
	regionId: string
}

const formSchema = storesSchema.pick({ storeName: true, regionId: true })
type FormValues = z.input<typeof formSchema>

const AddStoreForm = ({ regionId }: Props) => {
	const form = useForm<FormValues>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			storeName: '',
			regionId
		}
	})

	const { onClose } = useNewStoreState()

	const { mutate, isPending } = useCreateStore()

	const handleSubmit = async (values: FormValues) => {
		mutate(values, { onSuccess: () => onClose() })
		form.reset()
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(handleSubmit)}>
				<FormField
					name='storeName'
					control={form.control}
					render={({ field }) => (
						<FormItem>
							<FormLabel>Store Name</FormLabel>
							<FormDescription>
								The name of a store
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

export default AddStoreForm
