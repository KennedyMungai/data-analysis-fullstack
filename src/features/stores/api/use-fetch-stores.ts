import { client } from '@/lib/hono'
import { useQuery } from '@tanstack/react-query'

export const useFetchStores = (regionId?: string) =>
	useQuery({
		enabled: !!regionId,
		queryKey: ['stores'],
		queryFn: async () => {
			const response = await client.api.stores[':regionId'].$get({
				param: { regionId }
			})

			if (!response.ok) throw new Error('Failed to fetch the stores')

			const { data } = await response.json()

			return data
		}
	})
