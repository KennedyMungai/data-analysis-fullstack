'use client'

import { Card, CardContent, CardTitle } from '@/components/ui/card'
import CountUp from 'react-countup'

type Props = {
	label: string
	value: number
}

const SummaryCard = ({ label, value }: Props) => {
	return (
		<Card className='w-[25rem] flex flex-col items-center justify-center gap-y-2 p-4'>
			<CardTitle className='text-basic text-2xl'>{label}</CardTitle>
			<CardContent>
				<CountUp end={value} />
			</CardContent>
		</Card>
	)
}

export default SummaryCard
