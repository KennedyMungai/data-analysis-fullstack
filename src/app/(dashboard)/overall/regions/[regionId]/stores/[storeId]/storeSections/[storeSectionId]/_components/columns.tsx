'use client'

import { ColumnDef } from '@tanstack/react-table'

export type IncidentColumns = {
	description: string
	employee: string
}

export const columns: ColumnDef<IncidentColumns>[] = [
	{
		accessorKey: 'description',
		header: 'Description'
	},
	{
		accessorKey: 'employee',
		header: 'Employee'
	}
]
