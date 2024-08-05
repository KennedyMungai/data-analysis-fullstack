import { client } from '@/lib/hono'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { InferRequestType, InferResponseType } from 'hono'
import { toast } from 'sonner'

type ResponseType = InferResponseType<typeof client.api.incidents.$post>
type RequestType = InferRequestType<typeof client.api.incidents.$post>['json']

export const useCreateIncident = (storeSectionId?: string) => {
	const queryClient = useQueryClient()

	const mutation = useMutation<ResponseType, Error, RequestType>({
		mutationKey: ['createIncident', { storeSectionId }],
		mutationFn: async (json) => {
			const response = await client.api.incidents.$post({
				json
			})

			return await response.json()
		},
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ['incidents', { storeSectionId }]
			})
			toast.success('Incident created successfully')
		},
		onError: () => toast.error('Failed to create Incident')
	})

	return mutation
}
