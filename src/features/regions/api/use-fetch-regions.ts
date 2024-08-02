import { client } from '@/lib/hono'
import { useQuery } from '@tanstack/react-query'

export const useFetchRegions = () =>
	useQuery({
		queryKey: ['regions'],
		queryFn: async () => {
			const response = await client.api.regions.$get()

			if (!response.ok) throw new Error('Failed to fetch regions')

			const { data } = await response.json()

			return data
		}
	})
