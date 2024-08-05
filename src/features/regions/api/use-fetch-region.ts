import { client } from '@/lib/hono'
import { useQuery } from '@tanstack/react-query'

export const useFetchRegion = (regionId?: string) =>
	useQuery({
		enabled: !!regionId,
		queryKey: ['region', { regionId }],
		queryFn: async () => {
			const response = await client.api.regions[':regionId'].$get({
				param: { regionId }
			})

			if (!response.ok) throw new Error('Failed to fetch the region')

			const { data } = await response.json()

			return data
		}
	})
