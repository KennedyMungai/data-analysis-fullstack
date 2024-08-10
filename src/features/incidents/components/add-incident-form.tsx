import { Button } from '@/components/ui/button'
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useCreateIncident } from '@/features/incidents/api/use-create-incident'
import { useNewIncidentState } from '@/features/incidents/hooks/use-new-incident-state'
import { zodResolver } from '@hookform/resolvers/zod'
import { useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

type Props = {
	regionId: string
	storeId: string
	storeSectionId: string
	employeeName: string | undefined
}

const formSchema = z.object({
	incidentDescription: z.string().min(1, 'Incident Description is required'),
	productCode: z.string(),
	productName: z.string(),
	productPrice: z.coerce.number(),
	productQuantity: z.coerce.number(),
	employeeName: z.string().min(1, 'Employee Name is required'),
	regionId: z.string().min(1, 'Region is required'),
	storeId: z.string().min(1, 'Store is required'),
	storeSectionId: z.string().min(1, 'Store Section is required')
})

type FormValues = z.input<typeof formSchema>

const AddIncidentForm = ({
	regionId,
	storeId,
	storeSectionId,
	employeeName
}: Props) => {
	const form = useForm<FormValues>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			incidentDescription: '',
			productCode: '',
			productName: '',
			productPrice: 0,
			productQuantity: 0,
			employeeName,
			regionId,
			storeId,
			storeSectionId
		}
	})

	const { onClose } = useNewIncidentState()

	const { mutate, isPending, error } = useCreateIncident(storeSectionId)

	const queryClient = useQueryClient()

	const handleSubmit = async (values: FormValues) => {
		console.log(values)

		console.log(error)
		mutate(values, { onSuccess: () => onClose() })

		form.reset()

		queryClient.invalidateQueries({
			queryKey: ['storeSection', { storeSectionId }]
		})
		queryClient.invalidateQueries({
			queryKey: ['incidents', { storeId }]
		})
	}

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(handleSubmit)}
				className='flex flex-col gap-y-2'
			>
				<FormField
					control={form.control}
					name='incidentDescription'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Incident Description</FormLabel>
							<FormControl>
								<Textarea
									placeholder='Incident Description'
									{...field}
								/>
							</FormControl>
							<FormDescription>
								A detailed description of the incident
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='productCode'
					render={({ field }) => (
						<FormItem>
							<FormDescription>Product Code</FormDescription>
							<FormControl>
								<Input placeholder='Product Code' {...field} />
							</FormControl>
							<FormDescription>
								The code of the product
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='productName'
					render={({ field }) => (
						<FormItem>
							<FormDescription>Product Name</FormDescription>
							<FormControl>
								<Input placeholder='Product Name' {...field} />
							</FormControl>
							<FormDescription>
								The name of the product
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='productPrice'
					render={({ field }) => (
						<FormItem>
							<FormDescription>Product Price</FormDescription>
							<FormControl>
								<Input
									placeholder='Product Price'
									type='number'
									{...field}
								/>
							</FormControl>
							<FormDescription>
								The price of the product
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='productQuantity'
					render={({ field }) => (
						<FormItem>
							<FormDescription>Product Quantity</FormDescription>
							<FormControl>
								<Input
									placeholder='Product Quantity'
									type='number'
									{...field}
								/>
							</FormControl>
							<FormDescription>
								The quantity of the product
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button className='self-end mt-6' disabled={isPending}>
					Report Incident
				</Button>
			</form>
		</Form>
	)
}

export default AddIncidentForm
