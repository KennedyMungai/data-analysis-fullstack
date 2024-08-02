import { ClerkLoaded, ClerkLoading, UserButton } from '@clerk/nextjs'
import { currentUser } from '@clerk/nextjs/server'
import { Loader2Icon } from 'lucide-react'

type Props = {
	title: string
}

const TopBar = async ({ title }: Props) => {
	const user = await currentUser()

	return (
		<div className='flex items-center justify-between w-full h-20 px-4 border-b'>
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
