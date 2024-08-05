'use client'

import { Card } from '@/components/ui/card'
import { PlusIcon } from 'lucide-react'
import { useNewStoreState } from '@/features/stores/hooks/use-new-store-state'

const AddStoreCard = () => {
	const { onOpen } = useNewStoreState()

	return (
		<Card
			className='h-80 flex items-center justify-center w-56'
			onClick={onOpen}
		>
			<PlusIcon className='size-16' />
		</Card>
	)
}

export default AddStoreCard
