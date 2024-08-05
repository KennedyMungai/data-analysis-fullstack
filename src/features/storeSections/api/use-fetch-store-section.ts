import { client } from '@/lib/hono'
import { useQuery } from '@tanstack/react-query'

export const useFetchStoreSection = (storeSectionId?: string) =>
	useQuery({
		enabled: !!storeSectionId,
		queryKey: ['storeSection', { storeSectionId }],
		queryFn: async () => {
			const response = await client.api.storeSections.storeSection[
				':storeSectionId'
			].$get({
				param: { storeSectionId }
			})

			if (!response.ok)
				throw new Error('Failed to fetch the store section')

			const { data } = await response.json()

			return data
		}
	})
