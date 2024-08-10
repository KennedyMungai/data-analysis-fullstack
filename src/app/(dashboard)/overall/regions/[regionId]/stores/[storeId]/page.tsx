'use client'

import DataChart from '@/components/data-chart'
import DateFilter from '@/components/date-filter'
import SummaryCard from '@/components/summary-card'
import TopBar from '@/components/top-bar'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { useFetchStore } from '@/features/stores/api/use-fetch-store'
import { subDays } from 'date-fns'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { DateRange } from 'react-day-picker'

type Props = {
	params: {
		storeId: string
	}
}

const StorePage = ({ params: { storeId } }: Props) => {
	const pathname = usePathname()

	const regionId = pathname.split('/')[3]

	const initialRange: DateRange = {
		from: subDays(new Date(), 7),
		to: new Date()
	}

	const [range, setRange] = useState<DateRange | undefined>(initialRange)

	const {
		data: store,
		isError,
		isPending
	} = useFetchStore(range as DateRange, storeId)

	if (isPending)
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

	if (isError)
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

		const totalValue = store?.incidents.reduce((total, incident) => {
			if (
				incident.productPrice === null ||
				incident.productQuantity === null
			)
				return 0

			return (
				total +
				Number(incident.productQuantity) * Number(incident.productPrice)
			)
		}, 0) as number

		const numOfIncidents = () => {
			if (
				store?.incidents.length === 0 ||
				store?.incidents === undefined ||
				store?.incidents === null
			)
				return 0

			return store?.incidents.length
		}

		const totalIncidents: number = numOfIncidents()

		return (
			<div className='w-full'>
				<TopBar title={store?.storeName} />
				<div className='gap-y-4 flex flex-col flex-1 p-2'>
					<div className='flex justify-between px-4'>
						<DateFilter range={range} setRange={setRange} />
						<Link
							href={`/overall/regions/${regionId}/stores/${storeId}/storeSections`}
						>
							<Button
								variant={'outline'}
								className='bg-transparent'
							>
								Stores Sections
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
						label={`${store?.storeName} Incidents`}
						data={[]}
						range={range as DateRange}
					/>
				</div>
			</div>
		)
}

export default StorePage
