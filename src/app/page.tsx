import { Button } from '@/components/ui/button'
import BackgroundVideo from 'next-video/background-video'
import Image from 'next/image'
import Link from 'next/link'

const HomePage = () => {
	return (
		<BackgroundVideo src='/bg-video.mp4' className='h-screen'>
			<div className='gap-y-4 flex flex-col items-center justify-center'>
				<div className='gap-x-4 flex items-center'>
					<Image
						src='/logo.png'
						alt='logo'
						width={120}
						height={120}
						className='bg-white/20 rounded-lg'
					/>
					<p className='text-4xl font-bold dark:text-white hover:dark:text-black text-white'>
						Data Analysis
					</p>
				</div>
				<Link href='/overall'>
					<Button
						variant={'outline'}
						className='dark:border-white dark:hover:bg-white dark:text-white w-40 hover:text-black dark:hover:text-black text-white bg-transparent'
					>
						Get Started
					</Button>
				</Link>
			</div>
		</BackgroundVideo>
	)
}

export default HomePage
