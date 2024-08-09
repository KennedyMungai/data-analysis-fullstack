'use client'

import DataChart from '@/components/data-chart'
import DateFilter from '@/components/date-filter'
import SummaryCard from '@/components/summary-card'
import TopBar from '@/components/top-bar'
import { Button } from '@/components/ui/button'
import { useFetchRegions } from '@/features/regions/api/use-fetch-regions'
import { subDays } from 'date-fns'
import Link from 'next/link'
import { useState } from 'react'
import { DateRange } from 'react-day-picker'

const OverallPage = () => {
	const initialRange: DateRange = {
		from: subDays(new Date(), 7),
		to: new Date()
	}

	const [range, setRange] = useState<DateRange | undefined>(initialRange)

	const {
		data: regions,
		isPending,
		isError
	} = useFetchRegions(range as DateRange)

	if (isPending) <div>Loading...</div>

	if (isError) <div>Error...</div>

	const totalValue = regions?.reduce(
		(total: number, region) =>
			total +
			region.incidents.reduce(
				(total: number, incident) =>
					total +
					Number(incident.productQuantity) *
						Number(incident.productPrice),
				0
			),
		0
	) as number

	const totalIncidents = regions?.reduce(
		(total: number, region) => total + region.incidents.length,
		0
	) as number

	return (
		<div className='w-full'>
			<TopBar title='Overall' />
			<div className='gap-y-4 flex flex-col flex-1 p-2'>
				<div className='flex justify-between px-4'>
					<DateFilter range={range} setRange={setRange} />
					<Link href={'/overall/regions'}>
						<Button variant={'outline'} className='bg-transparent'>
							Regions
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
					label={'Overall Data'}
					data={[]}
					range={range as DateRange}
				/>
			</div>
		</div>
	)
}

export default OverallPage
