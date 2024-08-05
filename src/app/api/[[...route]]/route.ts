import { Hono } from 'hono'
import { handle } from 'hono/vercel'
import incidents from './incidents'
import regions from './regions'
import stores from './stores'
import storeSections from './storeSections'

export const runtime = 'edge'

const app = new Hono()
	.basePath('/api')
	.route('/regions', regions)
	.route('/stores', stores)
	.route('/storeSections', storeSections)
	.route('/incidents', incidents)

export const GET = handle(app)
export const POST = handle(app)
export const PATCH = handle(app)
export const PUT = handle(app)
export const DELETE = handle(app)

export type AppType = typeof app