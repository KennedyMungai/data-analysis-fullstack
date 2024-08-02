'use client'

import { Card } from '@/components/ui/card'
import { useNewRegionState } from '@/features/regions/hooks/use-new-region-state'
import { PlusIcon } from 'lucide-react'

const AddRegionCard = () => {
	const { onOpen } = useNewRegionState()

	return (
		<Card
			className='h-80 flex items-center justify-center w-56'
			onClick={onOpen}
		>
			<PlusIcon className='size-16' />
		</Card>
	)
}

export default AddRegionCard
