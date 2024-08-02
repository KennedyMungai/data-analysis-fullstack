import { client } from '@/lib/hono'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { InferRequestType, InferResponseType } from 'hono'
import { toast } from 'sonner'

type ResponseType = InferResponseType<typeof client.api.regions.$post>
type RequestType = InferRequestType<typeof client.api.regions.$post>['json']

export const useCreateRegion = () => {
	const queryClient = useQueryClient()

	const mutation = useMutation<ResponseType, Error, RequestType>({
		mutationKey: ['createRegion'],
		mutationFn: async (json) => {
			const response = await client.api.regions.$post({ json })
			return await response.json()
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['regions'] })
			toast.success('Region created')
		},
		onError: () => toast.error('Failed to create region')
	})
}
