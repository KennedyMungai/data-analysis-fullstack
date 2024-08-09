'use client'

import TopBar from '@/components/top-bar'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useFetchRegions } from '@/features/regions/api/use-fetch-regions'
import NewRegionCard from '@/features/regions/components/add-region-card'
import AddRegionSheet from '@/features/regions/components/add-region-sheet'
import RegionCard from '@/features/regions/components/region-card'
import { subDays } from 'date-fns'

const Regions = () => {
	const {
		data: regions,
		isLoading,
		isPending
	} = useFetchRegions({
		from: subDays(new Date(), 7)
	})

	if (isLoading) {
		return <div>Loading...</div>
	}

	if (isPending) {
		return <div>Pending...</div>
	}

	return (
		<>
			<div className='w-full'>
				{/* TODO: Add specific region name */}
				<TopBar title={'Regions'} />
				<div className='h-[90vh] p-4'>
					<ScrollArea className='h-full'>
						<div className='flex flex-wrap items-center justify-center h-full gap-4'>
							{regions?.map((region) => (
								<RegionCard
									title={region.regionName}
									regionId={region.regionId}
									key={region.regionId}
								/>
							))}
							<NewRegionCard />
						</div>
					</ScrollArea>
				</div>
			</div>
			<AddRegionSheet />
		</>
	)
}

export default Regions
