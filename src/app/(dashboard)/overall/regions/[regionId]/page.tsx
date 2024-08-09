'use client'

import DataChart from '@/components/data-chart'
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

	const totalValue = region.incidentsData.reduce(
		(total, incident) =>
			total + Number(incident.quantity) * Number(incident.price),
		0
	)

	const totalIncidents = region.incidentsData.length

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
					label={`${region.name} Incidents`}
					data={region.incidentsData}
				/>
			</div>
		</div>
	)
}

export default RegionPage
