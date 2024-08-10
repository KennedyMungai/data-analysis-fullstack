import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle
} from '@/components/ui/dialog'
import { useNewIncidentState } from '@/features/incidents/hooks/use-new-incident-state'
import AddIncidentForm from './add-incident-form'

type Props = {
	regionId: string
	storeId: string
	storeSectionId: string
	employeeName: string | undefined
}

const AddIncidentModal = ({
	employeeName,
	regionId,
	storeId,
	storeSectionId
}: Props) => {
	const { isOpen, onClose } = useNewIncidentState()

	return (
		<Dialog open={isOpen} onOpenChange={onClose}>
			<DialogHeader>
				<DialogTitle hidden>Add a new incident</DialogTitle>
				<DialogDescription hidden>
					Fill out the form to add a new incident
				</DialogDescription>
			</DialogHeader>
			<DialogContent>
				<AddIncidentForm
					regionId={regionId}
					storeId={storeId}
					storeSectionId={storeSectionId}
					employeeName={employeeName}
				/>
			</DialogContent>
		</Dialog>
	)
}

export default AddIncidentModal
