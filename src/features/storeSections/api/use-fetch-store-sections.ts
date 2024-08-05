import { client } from '@/lib/hono'
import { useQuery } from '@tanstack/react-query'

export const useFetchStoreSections = (storeId?: string) =>
	useQuery({
		enabled: !!storeId,
		queryKey: ['storeSections'],
		queryFn: async () => {
			const response = await client.api.storeSections[':storeId'].$get({
				param: { storeId }
			})

			if (!response.ok)
				throw new Error('Failed to fetch the store sections')

			const { data } = await response.json()

			return data
		}
	})
