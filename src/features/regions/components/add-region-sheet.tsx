'use client'

import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle
} from '@/components/ui/sheet'
import { useNewRegionState } from '@/features/regions/hooks/use-new-region-state'
import AddRegionForm from './add-region-form'

const AddRegionSheet = () => {
	const { isOpen, onClose, onOpen } = useNewRegionState()

	return (
		<Sheet open={isOpen} onOpenChange={onClose}>
			<SheetHeader>
				<SheetTitle>Create a new region</SheetTitle>
			</SheetHeader>
			<SheetContent aria-describedby='Create a new region'>
				<AddRegionForm />
			</SheetContent>
		</Sheet>
	)
}

export default AddRegionSheet
