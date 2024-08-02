import TopBar from '@/components/top-bar'
import { ScrollArea } from '@/components/ui/scroll-area'

type Props = {
	params: {
		regionId: string
	}
}

const Regions = ({ params: { regionId } }: Props) => {
	return (
		<div className='w-full'>
			{/* TODO: Add specific region name */}
			<TopBar title={'Regions'} />
			<div className='h-[90vh] p-4'>
				<ScrollArea className='bg-rose-500 h-full'></ScrollArea>
			</div>
		</div>
	)
}

export default Regions
