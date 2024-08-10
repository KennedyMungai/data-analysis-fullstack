import { client } from '@/lib/hono'
import { useQuery } from '@tanstack/react-query'
import { DateRange } from 'react-day-picker'

export const useFetchStoreSections = (range: DateRange, storeId?: string) =>
	useQuery({
		enabled: !!storeId && !!range,
		queryKey: ['storeSections'],
		queryFn: async () => {
			const response = await client.api.storeSections[':storeId'][
				':from'
			][':to'].$get({
				param: {
					storeId,
					from: range.from!.toISOString(),
					to: range.to!.toISOString()
				}
			})

			if (!response.ok)
				throw new Error('Failed to fetch the store sections')

			const { data } = await response.json()

			return data
		}
	})
