'use client'

import TopBar from '@/components/top-bar'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useFetchStores } from '@/features/stores/api/use-fetch-stores'
import AddStoreCard from '@/features/stores/components/add-store-card'
import AddStoreSheet from '@/features/stores/components/add-store-sheet'
import StoreCard from '@/features/stores/components/store-card'
import { usePathname } from 'next/navigation'

type Props = {}

const StoresPage = () => {
	const pathname = usePathname()

	const regionId = pathname.split('/')[3]

	const { data: stores, isPending, isError } = useFetchStores(regionId)

	if (isPending) <div>Loading...</div>

	if (isError) <div>Something went wrong</div>

	return (
		<>
			<div className='w-full'>
				{/* TODO: Add specific region name */}
				<TopBar title={'Stores'} />
				<div className='h-[90vh] p-4'>
					<ScrollArea className='h-full'>
						<div className='flex flex-wrap items-center justify-center h-full gap-4'>
							{stores?.map((store) => (
								<StoreCard
									key={store.id}
									title={store.name}
									regionId={regionId}
									storeId={store.id}
								/>
							))}
							<AddStoreCard />
						</div>
					</ScrollArea>
				</div>
			</div>
			<AddStoreSheet regionId={regionId} />
		</>
	)
}

export default StoresPage
