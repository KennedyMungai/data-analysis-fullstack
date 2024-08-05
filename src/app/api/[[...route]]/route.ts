import { Hono } from 'hono'
import { handle } from 'hono/vercel'
import regions from './regions'
import stores from './stores'

export const runtime = 'edge'

const app = new Hono().basePath('/api').route('/regions', regions).route('/stores', stores)

export const GET = handle(app)
export const POST = handle(app)
export const PATCH = handle(app)
export const PUT = handle(app)
export const DELETE = handle(app)

export type AppType = typeof app