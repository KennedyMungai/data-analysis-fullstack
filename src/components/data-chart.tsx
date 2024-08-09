'use client'

import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle
} from '@/components/ui/card'
import {
	ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent
} from '@/components/ui/chart'
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from 'recharts'

type Props = {
	label: string
	data: {
		id: string
		price: number | null
		quantity: number | null
		name: string | null
	}[]
}

const chartConfig = {
	storeSections: {
		label: 'Store Section',
		color: 'blue'
	}
} satisfies ChartConfig

const DataChart = ({ label, data }: Props) => {
	return (
		<Card className='my-4'>
			<CardHeader>
				<CardTitle>{label}</CardTitle>
			</CardHeader>
			<CardContent>
				<ChartContainer config={chartConfig} className='min-h-[60vh]'>
					<AreaChart
						accessibilityLayer
						data={data}
						margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
					>
						<CartesianGrid strokeDasharray={'3 3'} />
						<XAxis dataKey={'className'} fill='blue' />
						<YAxis dataKey={'value'} />
						<ChartTooltip
							cursor={false}
							content={<ChartTooltipContent indicator='line' />}
						/>
						<Area
							dataKey='value'
							type='natural'
							fill='blue'
							fillOpacity={0.2}
							stroke='blue'
						/>
					</AreaChart>
				</ChartContainer>
			</CardContent>
			<CardFooter>
				<p className='text-xl font-semibold'>{label}</p>
			</CardFooter>
		</Card>
	)
}

export default DataChart
