import { client } from '@/lib/hono'
import { useQuery } from '@tanstack/react-query'

export const useFetchIncidents = (storeSectionId?: string) =>
	useQuery({
		enabled: !!storeSectionId,
		queryKey: ['incidents', { storeSectionId }],
		queryFn: async () => {
			const response = await client.api.incidents[':storeSectionId'].$get(
				{
					param: { storeSectionId }
				}
			)

			if (!response.ok) throw new Error('Failed to fetch the incidents')

			const { data } = await response.json()

			return data
		}
	})
