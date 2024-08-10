'use client'

import DataChart from '@/components/data-chart'
import DateFilter from '@/components/date-filter'
import SummaryCard from '@/components/summary-card'
import TopBar from '@/components/top-bar'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
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
	const initialRange: DateRange = {
		from: subDays(new Date(), 7),
		to: new Date()
	}

	const [range, setRange] = useState<DateRange | undefined>(initialRange)

	const {
		data: region,
		isPending,
		isError
	} = useFetchRegion(range as DateRange, regionId)

	if (isPending) {
		return (
			<div className='w-full'>
				<TopBar title='Loading...' />
				<div className='gap-y-4 flex flex-col flex-1 p-2'>
					<div className='flex justify-between px-4'>
						<Skeleton className='w-24 h-8' />
						<Skeleton className='w-24 h-8' />
						<div />
					</div>
					<div className='flex justify-between w-full'>
						<Skeleton className='w-[25rem] h-[10rem]' />
						<Skeleton className='w-[25rem] h-[10rem]' />
						<Skeleton className='w-[25rem] h-[10rem]' />
					</div>
					<Skeleton className='w-full h-[60vh] mt-4' />
				</div>
			</div>
		)
	}

	if (isError) {
		return (
			<div className='w-full'>
				<TopBar title='Failed to fetch data' />
				<div className='gap-y-4 flex flex-col flex-1 p-2'>
					<div className='flex justify-between px-4'>
						<Skeleton className='w-24 h-8' />
						<Skeleton className='w-24 h-8' />
						<div />
					</div>
					<div className='flex justify-between w-full'>
						<Skeleton className='w-[25rem] h-[10rem]' />
						<Skeleton className='w-[25rem] h-[10rem]' />
						<Skeleton className='w-[25rem] h-[10rem]' />
					</div>
					<Skeleton className='w-full h-[60vh] mt-4' />
				</div>
			</div>
		)
	}

	const totalValue = region.incidents.reduce(
		(total: number, incident) =>
			total +
			Number(incident.productQuantity) * Number(incident.productPrice),
		0
	)

	const totalIncidents = region.incidents.length

	const chartData = region.stores.map((store) => ({
		label: store.storeName,
		value: store.incidents.reduce(
			(total: number, incident) =>
				total +
				Number(incident.productQuantity) *
					Number(incident.productPrice),
			0
		)
	}))

	console.log('Chart Data', chartData)

	return (
		<div className='w-full'>
			<TopBar title={region.regionName} />
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
					<SummaryCard
						label='Total Value of Incidents'
						value={totalValue}
					/>
					<SummaryCard
						label='Total No. Of Incidents'
						value={totalIncidents}
					/>
					<SummaryCard
						label='Average Value of Incidents'
						value={Math.floor(totalValue / totalIncidents)}
					/>
				</div>
				<DataChart
					label={`${region.regionName} Incidents`}
					data={chartData!}
					range={range as DateRange}
				/>
			</div>
		</div>
	)
}

export default RegionPage
