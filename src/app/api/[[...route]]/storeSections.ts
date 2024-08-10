import { db } from '@/db/drizzle'
import { incidents, storeSections, storeSectionsSchema } from '@/db/schema'
import { clerkMiddleware, getAuth } from '@hono/clerk-auth'
import { zValidator } from '@hono/zod-validator'
import { between, eq } from 'drizzle-orm'
import { Hono } from 'hono'
import { z } from 'zod'

const app = new Hono()
	.get(
		'/:storeId/:from/:to',
		clerkMiddleware(),
		zValidator(
			'param',
			z.object({
				storeId: z.string(),
				from: z.coerce.date(),
				to: z.coerce.date()
			})
		),
		async (c) => {
			const auth = getAuth(c)
			const { storeId, from, to } = c.req.valid('param')

			if (!auth?.userId) return c.json({ error: 'Unauthorized' }, 401)

			const data = await db.query.storeSections.findMany({
				where: eq(storeSections.storeId, storeId),
				with: {
					incidents: {
						where: between(incidents.createdAt, from, to)
					}
				}
			})

			return c.json({ data })
		}
	)
	.get(
		'/storeSection/:storeSectionId/:from/:to',
		clerkMiddleware(),
		zValidator(
			'param',
			z.object({
				storeSectionId: z.string(),
				from: z.coerce.date(),
				to: z.coerce.date()
			})
		),
		async (c) => {
			const auth = getAuth(c)
			const { storeSectionId, from, to } = c.req.valid('param')

			if (!auth?.userId) return c.json({ error: 'Unauthorized' }, 401)

			const data = await db.query.storeSections.findFirst({
				where: eq(storeSections.storeSectionId, storeSectionId),
				with: {
					incidents: {
						where: between(incidents.createdAt, from, to)
					}
				}
			})

			if (!data) return c.json({ error: 'Not Found' }, 404)

			return c.json({ data })
		}
	)
	.post(
		'/',
		clerkMiddleware(),
		zValidator(
			'json',
			storeSectionsSchema.pick({ storeSectionName: true, storeId: true })
		),
		async (c) => {
			const auth = getAuth(c)
			const values = c.req.valid('json')

			if (!auth?.userId) return c.json({ error: 'Unauthorized' }, 401)

			const data = await db
				.insert(storeSections)
				.values(values)
				.returning()

			return c.json({ data })
		}
	)
	.patch(
		'/:storeSectionId',
		clerkMiddleware(),
		zValidator('param', z.object({ storeSectionId: z.string() })),
		zValidator(
			'json',
			storeSectionsSchema.pick({ storeSectionName: true })
		),
		async (c) => {
			const auth = getAuth(c)
			const values = c.req.valid('json')
			const { storeSectionId } = c.req.valid('param')

			if (!auth?.userId) return c.json({ error: 'Unauthorized' }, 401)

			const [data] = await db
				.update(storeSections)
				.set(values)
				.where(eq(storeSections.storeSectionId, storeSectionId))
				.returning()

			return c.json({ data })
		}
	)
	.delete(
		'/:storeSectionId',
		clerkMiddleware(),
		zValidator('param', z.object({ storeSectionId: z.string() })),
		async (c) => {
			const auth = getAuth(c)
			const { storeSectionId } = c.req.valid('param')

			if (!auth?.userId) return c.json({ error: 'Unauthorized' }, 401)

			const [data] = await db
				.delete(storeSections)
				.where(eq(storeSections.storeSectionId, storeSectionId))
				.returning({
					id: storeSections.storeSectionId
				})

			return c.json({ data })
		}
	)

export default app
