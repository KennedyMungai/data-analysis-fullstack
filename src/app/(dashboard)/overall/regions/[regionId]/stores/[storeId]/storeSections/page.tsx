'use client'

import TopBar from '@/components/top-bar'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Skeleton } from '@/components/ui/skeleton'
import { useFetchStore } from '@/features/stores/api/use-fetch-store'
import { useFetchStoreSections } from '@/features/storeSections/api/use-fetch-store-sections'
import AddStoreSectionCard from '@/features/storeSections/components/add-store-section-card'
import AddStoreSectionSheet from '@/features/storeSections/components/add-store-section-sheet'
import StoreSectionCard from '@/features/storeSections/components/store-section-card'
import { subDays } from 'date-fns'
import { usePathname } from 'next/navigation'

const StoreSectionsPage = () => {
	const pathname = usePathname()

	const regionId = pathname.split('/')[3]
	const storeId = pathname.split('/')[5]

	const {
		data: store,
		isError: isStoreError,
		isPending: isStorePending
	} = useFetchStore({ from: subDays(new Date(), 7) }, storeId)

	const {
		data: storeSections,
		isError: isStoreSectionError,
		isPending: isStoreSectionPending
	} = useFetchStoreSections(
		{ from: subDays(new Date(), 7), to: new Date() },
		storeId
	)

	if (isStorePending || isStoreSectionPending)
		{
			return (
				<div className='h-full'>
					<TopBar title={'Store Sections'} />
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
			)
		}

	if (isStoreError || isStoreSectionError)
		{
			return (
				<div className='h-full'>
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
			)
		}

	return (
		<>
			<div className='w-full'>
				{/* TODO: Add specific region name */}
				<TopBar title={`${store?.storeName} Store Sections`} />
				<div className='h-[90vh] p-4'>
					<ScrollArea className='h-full'>
						<div className='flex flex-wrap items-center justify-center h-full gap-4'>
							{storeSections?.map((storeSection) => (
								<StoreSectionCard
									key={storeSection.storeSectionId}
									title={storeSection.storeSectionName}
									regionId={regionId}
									storeId={storeId}
									storeSectionId={storeSection.storeSectionId}
								/>
							))}
							<AddStoreSectionCard />
						</div>
					</ScrollArea>
				</div>
			</div>
			<AddStoreSectionSheet storeId={storeId} />
		</>
	)
}

export default StoreSectionsPage
