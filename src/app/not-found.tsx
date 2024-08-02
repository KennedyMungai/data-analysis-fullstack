import { Button } from '@/components/ui/button'
import Link from 'next/link'

const NotFoundPage = () => {
	return (
		<div className='h-full flex items-center justify-center bg-black text-white flex-col gap-y-6'>
			<p className='text-4xl'>404 | Page Not Found</p>
			<Link href={'/overall'}>
				<Button className='bg-transparent' variant={'outline'}>
					Go Back
				</Button>
			</Link>
		</div>
	)
}

export default NotFoundPage
