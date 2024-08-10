import { db } from '@/db/drizzle'
import { incidents, regions, regionsSchema } from '@/db/schema'
import { clerkMiddleware, getAuth } from '@hono/clerk-auth'
import { zValidator } from '@hono/zod-validator'
import { and, between, eq } from 'drizzle-orm'
import { Hono } from 'hono'
import { z } from 'zod'

const app = new Hono()
	.get(
		'/:from/:to',
		clerkMiddleware(),
		zValidator(
			'param',
			z.object({ from: z.coerce.date(), to: z.coerce.date() })
		),
		async (c) => {
			const auth = getAuth(c)
			const { from, to } = c.req.valid('param')

			if (!auth?.userId) return c.json({ error: 'Unauthorized' }, 401)

			const data = await db.query.regions.findMany({
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
		'/:regionId/:from/:to',
		zValidator(
			'param',
			z.object({
				regionId: z.string(),
				from: z.coerce.date(),
				to: z.coerce.date()
			})
		),
		clerkMiddleware(),
		async (c) => {
			const auth = getAuth(c)
			const { regionId, from, to } = c.req.valid('param')

			if (!auth?.userId) return c.json({ error: 'Unauthorized' }, 401)

			if (!regionId) return c.json({ error: 'Bad Request' }, 400)

			const data = await db.query.regions.findFirst({
				with: {
					incidents: {
						where: and(
							eq(regions.regionId, regionId),
							between(incidents.createdAt, from, to)
						)
					},
					stores: {
						with: {
							incidents: {
								where: and(
									eq(regions.regionId, regionId),
									between(incidents.createdAt, from, to)
								)
							}
						}
					}
				},
				where: and(eq(regions.regionId, regionId))
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
			regionsSchema.pick({
				regionName: true
			})
		),
		async (c) => {
			const auth = getAuth(c)
			const values = c.req.valid('json')

			if (!auth?.userId) return c.json({ error: 'Unauthorized' }, 401)

			const data = await db.insert(regions).values(values).returning()

			return c.json({ data })
		}
	)
	.patch(
		'/:regionId',
		clerkMiddleware(),
		zValidator('param', z.object({ regionId: z.string() })),
		zValidator('json', regionsSchema.pick({ regionName: true })),
		async (c) => {
			const auth = getAuth(c)
			const { regionId } = c.req.valid('param')
			const values = c.req.valid('json')

			if (!auth?.userId) return c.json({ error: 'Unauthorized' }, 401)

			if (!regionId) return c.json({ error: 'Missing Id' }, 400)

			const [data] = await db
				.update(regions)
				.set(values)
				.where(eq(regions.regionId, regionId))
				.returning({
					id: regions.regionId,
					name: regions.regionName
				})

			if (!data) return c.json({ error: 'Not Found' }, 404)

			return c.json({ data })
		}
	)
	.delete(
		'/:regionId',
		clerkMiddleware(),
		zValidator('param', z.object({ regionId: z.string() })),
		async (c) => {
			const auth = getAuth(c)
			const { regionId } = c.req.valid('param')

			if (!auth?.userId) return c.json({ error: 'Unauthorized' }, 401)

			if (!regionId) return c.json({ error: 'Missing Id' }, 400)

			const [data] = await db
				.delete(regions)
				.where(and(eq(regions.regionId, regionId)))
				.returning({
					id: regions.regionId,
					name: regions.regionName
				})

			if (!data) return c.json({ error: 'Not Found' }, 404)

			return c.json({ data })
		}
	)

export default app
