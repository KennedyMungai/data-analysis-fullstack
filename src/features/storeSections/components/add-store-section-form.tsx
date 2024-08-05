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
import { storeSectionsSchema } from '@/db/schema'
import { useCreateStoreSection } from '@/features/storeSections/api/use-create-store-section'
import { useNewStoreSectionState } from '@/features/storeSections/hooks/use-new-store-section-state'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

type Props = {
	storeId: string
}

const formSchema = storeSectionsSchema.pick({
	storeSectionName: true,
	storeId: true
})
type FormValues = z.input<typeof formSchema>

const AddStoreSectionForm = ({ storeId }: Props) => {
	const form = useForm<FormValues>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			storeSectionName: '',
			storeId
		}
	})

	const { onClose } = useNewStoreSectionState()

	const { mutate, isPending } = useCreateStoreSection()

	const handleSubmit = async (values: FormValues) => {
		mutate(values, { onSuccess: () => onClose() })
		form.reset()
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(handleSubmit)}>
				<FormField
					name='storeSectionName'
					control={form.control}
					render={({ field }) => (
						<FormItem>
							<FormLabel>Store Section Name</FormLabel>
							<FormDescription>
								The name of a store section
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

export default AddStoreSectionForm
