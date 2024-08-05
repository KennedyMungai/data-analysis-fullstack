'use client'

import SummaryCard from '@/components/summary-card'
import TopBar from '@/components/top-bar'
import { Button } from '@/components/ui/button'
import { useFetchRegion } from '@/features/regions/api/use-fetch-region'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

type Props = {}

const RegionPage = () => {
	const pathname = usePathname()

	const regionId = pathname.split('/').pop()

	const { data: region, isPending, isError } = useFetchRegion(regionId)

	if (isPending) {
		return <div>Loading...</div>
	}

	if (isError) {
		return <div>Something went wrong</div>
	}

	return (
		<div className='w-full'>
			<TopBar title={region.name} />
			<div className='gap-y-4 flex flex-col flex-1 p-2'>
				<div className='flex justify-between px-4'>
					<Button className='bg-transparent' variant={'outline'}>
						Date Picker
					</Button>
					<Link href={`/overall/regions/${regionId}/stores`}>
						<Button variant={'outline'} className='bg-transparent'>
							Stores
						</Button>
					</Link>

					<div />
				</div>
				<div className='flex justify-between w-full'>
					<SummaryCard label='Overall' value={10} />
					<SummaryCard label='Overall' value={10} />
					<SummaryCard label='Overall' value={10} />
				</div>
				{/* TODO: Add Charts for the data */}
			</div>
		</div>
	)
}

export default RegionPage
