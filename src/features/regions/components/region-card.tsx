import { Card, CardHeader, CardTitle } from '@/components/ui/card'

type Props = {
	title: string
}

const RegionCard = ({ title }: Props) => {
	return (
		<Card className='h-80 w-56'>
			<CardHeader>
				<CardTitle>{title}</CardTitle>
			</CardHeader>
		</Card>
	)
}

export default RegionCard
