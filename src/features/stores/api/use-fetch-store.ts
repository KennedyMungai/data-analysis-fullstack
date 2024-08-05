import { client } from '@/lib/hono'
import { useQuery } from '@tanstack/react-query'

export const useFetchStore = (storeId?: string) =>
	useQuery({
		enabled: !!storeId,
		queryKey: ['store', { storeId }],
		queryFn: async () => {
			const response = await client.api.stores.store[':storeId'].$get({
				param: { storeId }
			})

			if (!response.ok) throw new Error('Failed to fetch the store')

			const { data } = await response.json()

			return data
		}
	})
