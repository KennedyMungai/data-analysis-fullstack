import Link from 'next/link'
import { ModeToggle } from './mode-toggle'
import Image from 'next/image'

type Props = {}

const Sidebar = () => {
	return (
		<nav className='fixed flex flex-col items-center justify-between w-32 h-screen py-6 border-r shadow-sm'>
			<Link href={'/overall'}>
				<Image
					src={'/logo.png'}
					alt='logo'
					width={100}
					height={100}
					className='dark:bg-white m-2 rounded-lg'
				/>
			</Link>
			<ModeToggle />
		</nav>
	)
}

export default Sidebar
