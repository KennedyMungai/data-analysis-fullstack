'use client'

import TopBar from '@/components/top-bar'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Skeleton } from '@/components/ui/skeleton'
import { useFetchRegions } from '@/features/regions/api/use-fetch-regions'
import NewRegionCard from '@/features/regions/components/add-region-card'
import AddRegionSheet from '@/features/regions/components/add-region-sheet'
import RegionCard from '@/features/regions/components/region-card'
import { subDays } from 'date-fns'

const Regions = () => {
	const {
		data: regions,
		isError,
		isPending
	} = useFetchRegions({
		from: subDays(new Date(), 7)
	})

	if (isError) {
		return (
			<div className='h-full'>
				<TopBar title={'Something Went Wrong'} />
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

	if (isPending) {
		return (
			<div className='h-full'>
				<TopBar title={'Regions'} />
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
