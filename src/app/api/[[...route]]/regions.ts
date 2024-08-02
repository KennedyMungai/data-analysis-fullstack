import { db } from '@/db/drizzle'
import { regions } from '@/db/schema'
import { clerkMiddleware, getAuth } from '@hono/clerk-auth'
import { Hono } from 'hono'

const app = new Hono().get('/', clerkMiddleware(), async (c) => {
	const auth = getAuth(c)

	if (!auth?.userId) return c.json({ error: 'Unauthorized' }, 401)

	const data = await db
		.select({ id: regions.regionId, name: regions.regionName })
		.from(regions)

	return c.json({ data })
})

export default app
