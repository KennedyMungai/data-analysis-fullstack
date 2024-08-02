import Image from 'next/image'
import { ReactNode } from 'react'

type Props = {
	children: ReactNode
}

const AuthLayout = ({ children }: Props) => {
	return (
		<div className='flex h-full'>
			<div className='bg-slate-500 flex flex-col items-center justify-center flex-1'>
				<Image src='/logo.svg' alt='logo' width={200} height={200} />
				<span className='text-3xl font-semibold'>Data Analysis</span>
			</div>
			<div className=' flex items-center justify-center flex-1 bg-white'>
				{children}
			</div>
		</div>
	)
}

export default AuthLayout
