import { client } from '@/lib/hono'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { InferRequestType, InferResponseType } from 'hono'
import { toast } from 'sonner'

type ResponseType = InferResponseType<typeof client.api.stores.$post>
type RequestType = InferRequestType<typeof client.api.stores.$post>['json']

export const useCreateStore = () => {
	const queryClient = useQueryClient()

	const mutation = useMutation<ResponseType, Error, RequestType>({
		mutationKey: ['createStore'],
		mutationFn: async (json) => {
			const response = await client.api.stores.$post({ json })
			return await response.json()
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['stores'] })
			toast.success('Store created')
		},
		onError: () => toast.error('Failed to create store')
	})

	return mutation
}
