import { db } from '@/db/drizzle'
import { incidents, incidentsSchema } from '@/db/schema'
import { clerkMiddleware, getAuth } from '@hono/clerk-auth'
import { zValidator } from '@hono/zod-validator'
import { eq } from 'drizzle-orm'
import { Hono } from 'hono'
import { z } from 'zod'

const app = new Hono()
	.get(
		'/:storeSectionId',
		clerkMiddleware(),
		zValidator('param', z.object({ storeSectionId: z.string() })),
		async (c) => {
			const auth = getAuth(c)
			const { storeSectionId } = c.req.valid('param')

			if (!auth?.userId) return c.json({ error: 'Unauthorized' }, 401)

			const data = await db
				.select({
					id: incidents.incidentId,
					description: incidents.incidentDescription,
					employee: incidents.employeeName
				})
				.from(incidents)
				.where(eq(incidents.storeSectionId, storeSectionId))

			return c.json({ data })
		}
	)
	.post(
		'/',
		clerkMiddleware(),
		zValidator(
			'json',
			incidentsSchema.omit({
				incidentId: true,
				createdAt: true,
				updatedAt: true
			})
		),
		async (c) => {
			const auth = getAuth(c)
			const values = c.req.valid('json')

			if (!auth?.userId) return c.json({ error: 'Unauthorized' }, 401)

			const [data] = await db
				.insert(incidents)
				.values({
					...values
				})
				.returning({
					id: incidents.incidentId
				})

			return c.json({ data })
		}
	)
	.patch(
		'/:incidentId',
		clerkMiddleware(),
		zValidator('param', z.object({ incidentId: z.string() })),
		zValidator(
			'json',
			incidentsSchema.pick({
				incidentDescription: true,
				productCode: true,
				productName: true,
				productPrice: true,
				productQuantity: true
			})
		),
		async (c) => {
			const auth = getAuth(c)
			const { incidentId } = c.req.valid('param')
			const values = c.req.valid('json')

			if (!auth?.userId) return c.json({ error: 'Unauthorized' }, 401)

			const [data] = await db
				.update(incidents)
				.set(values)
				.where(eq(incidents.incidentId, incidentId))
				.returning({ id: incidents.incidentId })

			return c.json({ data })
		}
	)
	.delete(
		'/:incidentId',
		clerkMiddleware(),
		zValidator('param', z.object({ incidentId: z.string() })),
		async (c) => {
			const auth = getAuth(c)
			const { incidentId } = c.req.valid('param')

			if (!auth?.userId) return c.json({ error: 'Unauthorized' }, 401)

			const [data] = await db
				.delete(incidents)
				.where(eq(incidents.incidentId, incidentId))
				.returning({ id: incidents.incidentId })

			return c.json({ data })
		}
	)

export default app
