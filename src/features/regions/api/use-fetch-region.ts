import { client } from '@/lib/hono'
import { useQuery } from '@tanstack/react-query'
import { DateRange } from 'react-day-picker'

export const useFetchRegion = (range: DateRange, regionId?: string) =>
	useQuery({
		enabled: !!regionId && !!range,
		queryKey: ['region', { regionId }],
		queryFn: async () => {
			const response = await client.api.regions[':regionId'][':from'][
				':to'
			].$get({
				param: {
					regionId,
					from: range.from!.toISOString(),
					to: range.to!.toISOString()
				}
			})

			if (!response.ok) throw new Error('Failed to fetch the region')

			const { data } = await response.json()

			return data
		}
	})
