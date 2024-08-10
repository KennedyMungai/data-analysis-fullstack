'use client'

import { columns } from '@/app/(dashboard)/overall/regions/[regionId]/stores/[storeId]/storeSections/[storeSectionId]/_components/columns'
import DateFilter from '@/components/date-filter'
import SummaryCard from '@/components/summary-card'
import TopBar from '@/components/top-bar'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { useFetchIncidents } from '@/features/incidents/api/use-fetch-incidents'
import AddIncidentModal from '@/features/incidents/components/add-incident-modal'
import { useNewIncidentState } from '@/features/incidents/hooks/use-new-incident-state'
import { useFetchStore } from '@/features/stores/api/use-fetch-store'
import { useFetchStoreSection } from '@/features/storeSections/api/use-fetch-store-section'
import { SignedIn, useUser } from '@clerk/nextjs'
import { subDays } from 'date-fns'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { DateRange } from 'react-day-picker'
import { DataTable } from './_components/data-table'

type Props = {
	params: {
		storeSectionId: string
	}
}

const StoreSectionPage = ({ params: { storeSectionId } }: Props) => {
	const { user, isSignedIn } = useUser()

	const { onOpen } = useNewIncidentState()

	const pathname = usePathname()

	const regionId = pathname.split('/')[3]
	const storeId = pathname.split('/')[5]

	const initialRange: DateRange = {
		from: subDays(new Date(), 7),
		to: new Date()
	}

	const [range, setRange] = useState<DateRange | undefined>(initialRange)

	const {
		data: storeSection,
		isError: isStoreSectionError,
		isPending: isStoreSectionPending
	} = useFetchStoreSection(range as DateRange, storeSectionId)

	const {
		data: store,
		isPending: isStorePending,
		isError: isStoreError
	} = useFetchStore(range as DateRange, storeId)

	const {
		data: incidents,
		isError: isIncidentError,
		isPending: isIncidentPending
	} = useFetchIncidents(storeSectionId)

	if (isStoreSectionPending || isStorePending || isIncidentPending)
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

	if (
		isStoreSectionError ||
		isStoreError ||
		isIncidentError ||
		isSignedIn === false
	) {
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

	const totalValue = storeSection?.incidents?.reduce((total, incident) => {
		if (incident.productPrice === null || incident.productQuantity === null)
			return 0

		return (
			total +
			Number(incident.productQuantity) * Number(incident.productPrice)
		)
	}, 0) as number

	const totalIncidents = storeSection?.incidents?.length as number

	return (
		<>
			<div className='w-full'>
				<TopBar
					title={`${store?.storeName} ${storeSection?.storeSectionName}`}
				/>
				<div className='gap-y-4 flex flex-col flex-1 p-2'>
					<div className='flex justify-between px-4'>
						<DateFilter range={range} setRange={setRange} />

						<Button
							variant={'outline'}
							className='bg-transparent'
							onClick={onOpen}
						>
							Add Incident
						</Button>
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
					<DataTable columns={columns} data={incidents!} />
				</div>
			</div>
			<SignedIn>
				<AddIncidentModal
					regionId={regionId}
					storeId={storeId}
					storeSectionId={storeSectionId}
					employeeName={user!.fullName!}
				/>
			</SignedIn>
		</>
	)
}

export default StoreSectionPage
