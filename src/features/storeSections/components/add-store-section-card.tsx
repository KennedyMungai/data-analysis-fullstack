'use client'

import { Card } from '@/components/ui/card'
import { PlusIcon } from 'lucide-react'
import { useNewStoreSectionState } from '@/features/storeSections/hooks/use-new-store-section-state'

const AddStoreSectionCard = () => {
	const { onOpen } = useNewStoreSectionState()

	return (
		<Card
			className='h-80 flex items-center justify-center w-56'
			onClick={onOpen}
		>
			<PlusIcon className='size-16' />
		</Card>
	)
}

export default AddStoreSectionCard
