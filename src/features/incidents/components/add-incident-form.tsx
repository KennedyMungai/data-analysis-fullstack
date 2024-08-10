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
import { Textarea } from '@/components/ui/textarea'
import { incidentsSchema } from '@/db/schema'
import { useCreateIncident } from '@/features/incidents/api/use-create-incident'
import { useNewIncidentState } from '@/features/incidents/hooks/use-new-incident-state'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

type Props = {
	regionId: string
	storeId: string
	storeSectionId: string
	employeeName: string | undefined
}

const formSchema = incidentsSchema.omit({
	incidentId: true,
	createdAt: true,
	updatedAt: true
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

	const handleSubmit = async (values: FormValues) => {
		console.log(values)

		console.log(error)
		mutate(
			{
				productPrice: Number(values.productPrice),
				productQuantity: Number(values.productQuantity),
				...values
			},
			{ onSuccess: () => onClose() }
		)

		form.reset()
	}

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(handleSubmit)}
				className='flex flex-col gap-y-2'
			>
				<Button className='self-end mt-6' disabled={isPending}>
					Report Incident
				</Button>
			</form>
		</Form>
	)
}

export default AddIncidentForm
