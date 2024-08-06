'use client'

import SummaryCard from '@/components/summary-card'
import TopBar from '@/components/top-bar'
import { Button } from '@/components/ui/button'
import { useFetchIncidents } from '@/features/incidents/api/use-fetch-incidents'
import AddIncidentModal from '@/features/incidents/components/add-incident-modal'
import { columns } from '@/features/incidents/components/columns'
import { DataTable } from '@/features/incidents/components/data-table'
import { useNewIncidentState } from '@/features/incidents/hooks/use-new-incident-state'
import { useFetchStore } from '@/features/stores/api/use-fetch-store'
import { useFetchStoreSection } from '@/features/storeSections/api/use-fetch-store-section'
import { useUser } from '@clerk/nextjs'
import { usePathname } from 'next/navigation'

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

	const {
		data: storeSection,
		isError: isStoreSectionError,
		isPending: isStoreSectionPending
	} = useFetchStoreSection(storeSectionId)

	const {
		data: store,
		isPending: isStorePending,
		isError: isStoreError
	} = useFetchStore(storeId)

	const {
		data: incidents,
		isError: isIncidentError,
		isPending: isIncidentPending
	} = useFetchIncidents(storeSectionId)

	if (isStoreSectionPending || isStorePending) <div>Loading...</div>

	if (isStoreSectionError || isStoreError || isSignedIn === false)
		<div>Something went wrong</div>

	return (
		<>
			<div className='w-full'>
				<TopBar title={`${store?.name} ${storeSection?.name}`} />
				<div className='gap-y-4 flex flex-col flex-1 p-2'>
					<div className='flex justify-between px-4'>
						<Button className='bg-transparent' variant={'outline'}>
							Date Picker
						</Button>

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
						<SummaryCard label='Overall' value={10} />
						<SummaryCard label='Overall' value={10} />
						<SummaryCard label='Overall' value={10} />
					</div>
					<DataTable columns={columns} data={incidents} />
				</div>
			</div>
			<AddIncidentModal
				regionId={regionId}
				storeId={storeId}
				storeSectionId={storeSectionId}
				employeeName={user!.fullName!}
			/>
		</>
	)
}

export default StoreSectionPage
