import { client } from '@/lib/hono'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { InferRequestType, InferResponseType } from 'hono'
import { toast } from 'sonner'

type ResponseType = InferResponseType<typeof client.api.storeSections.$post>
type RequestType = InferRequestType<
	typeof client.api.storeSections.$post
>['json']

export const useCreateStoreSection = () => {
	const queryClient = useQueryClient()

	const mutation = useMutation<ResponseType, Error, RequestType>({
		mutationKey: ['createStoreSection'],
		mutationFn: async (json) => {
			const response = await client.api.storeSections.$post({
				json
			})

			return await response.json()
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['storeSections'] })
			toast.success('Store Section created successfully')
		},
		onError: () => toast.error('Failed to create Store Section')
	})

	return mutation
}
