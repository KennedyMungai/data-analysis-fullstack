import { db } from '@/db/drizzle'
import { stores, storesSchema } from '@/db/schema'
import { clerkMiddleware, getAuth } from '@hono/clerk-auth'
import { zValidator } from '@hono/zod-validator'
import { eq } from 'drizzle-orm'
import { Hono } from 'hono'
import { z } from 'zod'

const app = new Hono()
	.get(
		'/:regionId',
		clerkMiddleware(),
		zValidator('param', z.object({ regionId: z.string() })),
		async (c) => {
			const auth = getAuth(c)
			const { regionId } = c.req.valid('param')

			if (!auth?.userId) return c.json({ error: 'Unauthorized' }, 401)

			const data = await db
				.select({ id: stores.storeId, name: stores.storeName })
				.from(stores)
				.where(eq(stores.regionId, regionId))

			return c.json({ data })
		}
	)
	.get(
		'/:storeId',
		clerkMiddleware(),
		zValidator('param', z.object({ storeId: z.string() })),
		async (c) => {
			const auth = getAuth(c)
			const { storeId } = c.req.valid('param')

			if (!auth?.userId) return c.json({ error: 'Unauthorized' }, 401)

			const [data] = await db
				.select({ id: stores.storeId, name: stores.storeName })
				.from(stores)
				.where(eq(stores.storeId, storeId))

			if (!data) return c.json({ error: 'Not Found' }, 404)

			return c.json({ data })
		}
	)
	.post(
		'/',
		clerkMiddleware(),
		zValidator(
			'json',
			storesSchema.pick({ storeName: true, regionId: true })
		),
		async (c) => {
			const auth = getAuth(c)
			const values = c.req.valid('json')

			if (!auth?.userId) return c.json({ error: 'Unauthorized' }, 401)

			const data = await db.insert(stores).values(values).returning()

			return c.json({ data })
		}
	)
	.patch(
		'/:storeId',
		clerkMiddleware(),
		zValidator('param', z.object({ storeId: z.string() })),
		zValidator('json', storesSchema.pick({ storeName: true })),
		async (c) => {
			const auth = getAuth(c)
			const values = c.req.valid('json')
			const { storeId } = c.req.valid('param')

			if (!auth?.userId) return c.json({ error: 'Unauthorized' }, 401)

			const [data] = await db
				.update(stores)
				.set(values)
				.where(eq(stores.storeId, storeId))
				.returning()

			if (!data) return c.json({ error: 'Not Found' }, 404)

			return c.json({ data })
		}
	)
	.delete(
		'/:storeId',
		clerkMiddleware(),
		zValidator('param', z.object({ storeId: z.string() })),
		async (c) => {
			const auth = getAuth(c)
			const { storeId } = c.req.valid('param')

			if (!auth?.userId) return c.json({ error: 'Unauthorized' }, 401)

			const [data] = await db
				.delete(stores)
				.where(eq(stores.storeId, storeId))
				.returning({
					id: stores.storeId
				})

			if (!data) return c.json({ error: 'Not Found' }, 404)

			return c.json({ data })
		}
	)

export default app
