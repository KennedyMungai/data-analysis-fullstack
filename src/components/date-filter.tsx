'use client'

import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
	Popover,
	PopoverContent,
	PopoverTrigger
} from '@/components/ui/popover'
import { Dispatch, SetStateAction } from 'react'
import { DateRange } from 'react-day-picker'

type Props = {
	range: DateRange | undefined
	setRange: Dispatch<SetStateAction<DateRange | undefined>>
}

const DateFilter = ({ range, setRange }: Props) => {
	return (
		<Popover>
			<PopoverTrigger>
				<Button variant={'outline'}>Date Filter</Button>
			</PopoverTrigger>
			<PopoverContent className='w-fit'>
				<Calendar
					mode='range'
					selected={range}
					onSelect={setRange}
					className='rounded-md border'
				/>
			</PopoverContent>
		</Popover>
	)
}

export default DateFilter
