'use client'

import TopBar from '@/components/top-bar'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Skeleton } from '@/components/ui/skeleton'
import { useFetchRegion } from '@/features/regions/api/use-fetch-region'
import { useFetchStores } from '@/features/stores/api/use-fetch-stores'
import AddStoreCard from '@/features/stores/components/add-store-card'
import AddStoreSheet from '@/features/stores/components/add-store-sheet'
import StoreCard from '@/features/stores/components/store-card'
import { subDays } from 'date-fns'
import { usePathname } from 'next/navigation'
import { DateRange } from 'react-day-picker'

type Props = {}

const StoresPage = () => {
	const pathname = usePathname()

	const regionId = pathname.split('/')[3]

	const { data: region } = useFetchRegion(
		{ from: subDays(new Date(), 7), to: new Date() },
		regionId
	)

	const {
		data: stores,
		isPending,
		isError
	} = useFetchStores(
		{ from: subDays(new Date(), 7), to: new Date() },
		regionId
	)

	if (isPending)
		<div className='h-full'>
			<TopBar title={'Stores'} />
			<div className='flex flex-wrap items-center justify-center h-full p-4 gap-4'>
				<Skeleton className='shadow-md w-64 min-h-72 p-2' />
				<Skeleton className='shadow-md w-64 min-h-72 p-2' />
				<Skeleton className='shadow-md w-64 min-h-72 p-2' />
				<Skeleton className='shadow-md w-64 min-h-72 p-2' />
				<Skeleton className='shadow-md w-64 min-h-72 p-2' />
				<Skeleton className='shadow-md w-64 min-h-72 p-2' />
				<Skeleton className='shadow-md w-64 min-h-72 p-2' />
				<Skeleton className='shadow-md w-64 min-h-72 p-2' />
				<Skeleton className='shadow-md w-64 min-h-72 p-2' />
				<Skeleton className='shadow-md w-64 min-h-72 p-2' />
			</div>
		</div>

	if (isError)
		;<div className='h-full'>
			<TopBar title={'Loading...'} />
			<div className='flex flex-wrap items-center justify-center h-full p-4 gap-4'>
				<Skeleton className='shadow-md w-64 min-h-72 p-2' />
				<Skeleton className='shadow-md w-64 min-h-72 p-2' />
				<Skeleton className='shadow-md w-64 min-h-72 p-2' />
				<Skeleton className='shadow-md w-64 min-h-72 p-2' />
				<Skeleton className='shadow-md w-64 min-h-72 p-2' />
				<Skeleton className='shadow-md w-64 min-h-72 p-2' />
				<Skeleton className='shadow-md w-64 min-h-72 p-2' />
				<Skeleton className='shadow-md w-64 min-h-72 p-2' />
				<Skeleton className='shadow-md w-64 min-h-72 p-2' />
				<Skeleton className='shadow-md w-64 min-h-72 p-2' />
			</div>
		</div>

	return (
		<>
			<div className='w-full'>
				{/* TODO: Add specific region name */}
				<TopBar title={`${region?.regionName} Stores`} />
				<div className='h-[90vh] p-4'>
					<ScrollArea className='h-full'>
						<div className='flex flex-wrap items-center justify-center h-full gap-4'>
							{stores?.map((store) => (
								<StoreCard
									key={store.storeId}
									title={store.storeName}
									regionId={regionId}
									storeId={store.storeId}
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
