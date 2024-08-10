import { client } from '@/lib/hono'
import { useQuery } from '@tanstack/react-query'
import { DateRange } from 'react-day-picker'

export const useFetchStores = (range: DateRange, regionId?: string) =>
	useQuery({
		enabled: !!regionId && !!range,
		queryKey: ['stores'],
		queryFn: async () => {
			const response = await client.api.stores[':regionId'][':from'][
				':to'
			].$get({
				param: {
					regionId,
					from: range.from!.toISOString(),
					to: range.to!.toISOString()
				}
			})

			if (!response.ok) throw new Error('Failed to fetch the stores')

			const { data } = await response.json()

			return data
		}
	})
