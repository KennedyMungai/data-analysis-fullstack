'use client'

import DataChart from '@/components/data-chart'
import DateFilter from '@/components/date-filter'
import SummaryCard from '@/components/summary-card'
import TopBar from '@/components/top-bar'
import { Button } from '@/components/ui/button'
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

	if (isPending) <div>Loading...</div>

	if (isError) <div>Something went wrong</div>

	return (
		<div className='w-full'>
			<TopBar title={store?.storeName} />
			<div className='gap-y-4 flex flex-col flex-1 p-2'>
				<div className='flex justify-between px-4'>
					<DateFilter range={range} setRange={setRange} />
					<Link
						href={`/overall/regions/${regionId}/stores/${storeId}/storeSections`}
					>
						<Button variant={'outline'} className='bg-transparent'>
							Stores Sections
						</Button>
					</Link>

					<div />
				</div>
				<div className='flex justify-between w-full'>
					<SummaryCard label='Overall' value={10} />
					<SummaryCard label='Overall' value={10} />
					<SummaryCard label='Overall' value={10} />
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
