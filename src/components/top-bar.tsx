'use client'

import { ClerkLoaded, ClerkLoading, UserButton, useUser } from '@clerk/nextjs'
import { Loader2Icon } from 'lucide-react'

type Props = {
	title: string | undefined
}

const TopBar = ({ title }: Props) => {
	const { user } = useUser()

	return (
		<div className='flex items-center justify-between w-full h-20 px-4 border-b sticky top-0 z-10 bg-white dark:bg-black'>
			<p className='text-3xl font-semibold'>{title}</p>
			<div className='gap-x-4 flex items-center'>
				<ClerkLoading>
					<Loader2Icon className='size-8 animate-spin' />
				</ClerkLoading>
				<ClerkLoaded>
					<p className='text-xl'>{user?.fullName}</p>
					<UserButton />
				</ClerkLoaded>
			</div>
		</div>
	)
}

export default TopBar
