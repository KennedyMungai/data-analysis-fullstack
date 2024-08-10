'use client'

import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle
} from '@/components/ui/sheet'
import AddStoreForm from './add-store-form'
import { useNewStoreState } from '@/features/stores/hooks/use-new-store-state'

type Props = {
	regionId: string
}

const AddStoreSheet = ({ regionId }: Props) => {
	const { isOpen, onClose, onOpen } = useNewStoreState()

	return (
		<Sheet open={isOpen} onOpenChange={onClose}>
			<SheetHeader>
				<SheetTitle hidden>Create a new store</SheetTitle>
			</SheetHeader>
			<SheetContent aria-describedby='Create a new store'>
				<AddStoreForm regionId={regionId} />
			</SheetContent>
		</Sheet>
	)
}

export default AddStoreSheet
