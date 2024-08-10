import { client } from '@/lib/hono'
import { useQuery } from '@tanstack/react-query'
import { DateRange } from 'react-day-picker'

export const useFetchStoreSection = (
	range: DateRange,
	storeSectionId?: string
) =>
	useQuery({
		enabled: !!storeSectionId && !!range,
		queryKey: ['storeSection', { storeSectionId }],
		queryFn: async () => {
			const response = await client.api.storeSections.storeSection[
				':storeSectionId'
			][':from'][':to'].$get({
				param: {
					storeSectionId,
					from: range.from!.toISOString(),
					to: range.to!.toISOString()
				}
			})

			if (!response.ok)
				throw new Error('Failed to fetch the store section')

			const { data } = await response.json()

			return data
		}
	})
