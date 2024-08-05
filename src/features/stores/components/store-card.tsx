import { Card, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'

type Props = {
	title: string
	regionId: string
	storeId: string
}

const StoreCard = ({ title, regionId, storeId }: Props) => {
	return (
		<Link href={`/overall/regions/${regionId}/stores/${storeId}`}>
			<Card className='h-80 w-56'>
				<CardHeader>
					<CardTitle className='text-center text-3xl'>
						{title}
					</CardTitle>
				</CardHeader>
			</Card>
		</Link>
	)
}

export default StoreCard
