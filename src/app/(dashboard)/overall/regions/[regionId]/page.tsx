'use client'

import DateFilter from '@/components/date-filter'
import SummaryCard from '@/components/summary-card'
import TopBar from '@/components/top-bar'
import { Button } from '@/components/ui/button'
import { useFetchRegion } from '@/features/regions/api/use-fetch-region'
import { subDays } from 'date-fns'
import Link from 'next/link'
import { useState } from 'react'
import { DateRange } from 'react-day-picker'

type Props = {
	params: {
		regionId: string
	}
}

const RegionPage = ({ params: { regionId } }: Props) => {
	const { data: region, isPending, isError } = useFetchRegion(regionId)

	const initialRange: DateRange = {
		from: subDays(new Date(), 7),
		to: new Date()
	}

	const [range, setRange] = useState<DateRange | undefined>(initialRange)

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
					<DateFilter range={range} setRange={setRange} />
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
