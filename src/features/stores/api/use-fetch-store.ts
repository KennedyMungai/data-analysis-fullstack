import { client } from '@/lib/hono'
import { useQuery } from '@tanstack/react-query'
import { DateRange } from 'react-day-picker'

export const useFetchStore = (range: DateRange, storeId?: string) =>
	useQuery({
		enabled: !!storeId && !!range,
		queryKey: ['store', { storeId }],
		queryFn: async () => {
			const response = await client.api.stores.store[':storeId'][':from'][
				':to'
			].$get({
				param: {
					storeId,
					from: range.from!.toISOString(),
					to: range.to!.toISOString()
				}
			})

			if (!response.ok) throw new Error('Failed to fetch the store')

			const { data } = await response.json()

			return data
		}
	})
