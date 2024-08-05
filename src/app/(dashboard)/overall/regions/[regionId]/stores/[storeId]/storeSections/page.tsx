'use client'

import TopBar from '@/components/top-bar'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useFetchStore } from '@/features/stores/api/use-fetch-store'
import { useFetchStoreSections } from '@/features/storeSections/api/use-fetch-store-sections'
import AddStoreSectionCard from '@/features/storeSections/components/add-store-section-card'
import AddStoreSectionSheet from '@/features/storeSections/components/add-store-section-sheet'
import StoreSectionCard from '@/features/storeSections/components/store-section-card'
import { usePathname } from 'next/navigation'

const StoreSectionsPage = () => {
	const pathname = usePathname()

	const regionId = pathname.split('/')[3]
	const storeId = pathname.split('/')[5]

	const {
		data: store,
		isError: isStoreError,
		isPending: isStorePending
	} = useFetchStore(storeId)

	const {
		data: storeSections,
		isError: isStoreSectionError,
		isPending: isStoreSectionPending
	} = useFetchStoreSections(storeId)

	if (isStorePending || isStoreSectionPending) <div>Loading...</div>

	if (isStoreError || isStoreSectionError) <div>Something went wrong</div>

	return (
		<>
			<div className='w-full'>
				{/* TODO: Add specific region name */}
				<TopBar title={`${store?.name} Store Sections`} />
				<div className='h-[90vh] p-4'>
					<ScrollArea className='h-full'>
						<div className='flex flex-wrap items-center justify-center h-full gap-4'>
							{storeSections?.map((storeSection) => (
								<StoreSectionCard
									key={storeSection.id}
									title={storeSection.name}
									regionId={regionId}
									storeId={storeId}
									storeSectionId={storeSection.id}
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
