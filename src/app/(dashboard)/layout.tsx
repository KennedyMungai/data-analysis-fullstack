import Sidebar from '@/components/sidebar'
import { ReactNode } from 'react'

type Props = {
	children: ReactNode
}

const DashboardLayout = ({ children }: Props) => {
	return (
		<div className='flex h-full'>
			<div className='mr-32'>
				<Sidebar />
			</div>
			<div className='w-full'>{children}</div>
		</div>
	)
}

export default DashboardLayout
