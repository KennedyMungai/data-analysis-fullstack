'use client'

import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle
} from '@/components/ui/sheet'
import { useNewStoreSectionState } from '@/features/storeSections/hooks/use-new-store-section-state'
import AddStoreSectionForm from './add-store-section-form'

type Props = {
	storeId: string
}

const AddStoreSectionSheet = ({ storeId }: Props) => {
	const { isOpen, onClose, onOpen } = useNewStoreSectionState()

	return (
		<Sheet open={isOpen} onOpenChange={onClose}>
			<SheetHeader>
				<SheetTitle>Create a new store</SheetTitle>
			</SheetHeader>
			<SheetContent aria-describedby='Create a new store'>
				<AddStoreSectionForm storeId={storeId} />
			</SheetContent>
		</Sheet>
	)
}

export default AddStoreSectionSheet
