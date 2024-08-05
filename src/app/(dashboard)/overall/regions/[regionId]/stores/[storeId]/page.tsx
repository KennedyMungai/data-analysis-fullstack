'use client'

import SummaryCard from '@/components/summary-card'
import TopBar from '@/components/top-bar'
import { Button } from '@/components/ui/button'
import { useFetchStore } from '@/features/stores/api/use-fetch-store'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

type Props = {
	params: {
		storeId: string
	}
}

const StorePage = ({ params: { storeId } }: Props) => {
	const pathname = usePathname()

	const regionId = pathname.split('/')[3]

	const { data: store, isError, isPending } = useFetchStore(storeId)

	if (isPending) <div>Loading...</div>

	if (isError) <div>Something went wrong</div>

	return (
		<div className='w-full'>
			<TopBar title={store?.name} />
			<div className='gap-y-4 flex flex-col flex-1 p-2'>
				<div className='flex justify-between px-4'>
					<Button className='bg-transparent' variant={'outline'}>
						Date Picker
					</Button>
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
				{/* TODO: Add Charts for the data */}
			</div>
		</div>
	)
}

export default StorePage
