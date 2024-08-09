import { client } from '@/lib/hono'
import { useQuery } from '@tanstack/react-query'
import { DateRange } from 'react-day-picker'

export const useFetchRegions = (range: DateRange) =>
	useQuery({
		queryKey: ['regions'],
		queryFn: async () => {
			const response = await client.api.regions[':from'][':to'].$get({
				param: {
					from: range.from!.toISOString(),
					to: range.to!.toISOString()
				}
			})

			if (!response.ok) throw new Error('Failed to fetch regions')

			const { data } = await response.json()

			return data
		}
	})
