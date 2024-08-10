import { relations } from 'drizzle-orm'
import {
	integer,
	pgTable,
	text,
	timestamp,
	uuid,
	varchar
} from 'drizzle-orm/pg-core'
import { createInsertSchema } from 'drizzle-zod'
import { z } from 'zod'

export const regions = pgTable('regions', {
	regionId: uuid('region_id').defaultRandom().primaryKey(),
	regionName: text('region_name').notNull(),
	createdAt: timestamp('created_at').defaultNow().notNull(),
	updatedAt: timestamp('updated_at').$onUpdateFn(() => new Date())
})

export const regionRelations = relations(regions, ({ many }) => ({
	stores: many(stores),
	incidents: many(incidents)
}))

export const regionsSchema = createInsertSchema(regions)
export type RegionsSchema = z.infer<typeof regionsSchema>

export const stores = pgTable('stores', {
	storeId: uuid('store_id').defaultRandom().primaryKey(),
	storeName: varchar('store_name', { length: 256 }).notNull(),
	// TODO: Find a way to store location data in the database
	// storeLocation: point('store_location'),
	createdAt: timestamp('created_at').defaultNow().notNull(),
	updatedAt: timestamp('updated_at').$onUpdateFn(() => new Date()),

	regionId: uuid('region_id')
		.references(() => regions.regionId)
		.notNull()
})

export const storeRelations = relations(stores, ({ many, one }) => ({
	incidents: many(incidents),
	storeSections: many(storeSections),
	region: one(regions, {
		fields: [stores.regionId],
		references: [regions.regionId]
	})
}))

export const storesSchema = createInsertSchema(stores)
export type StoresSchema = z.infer<typeof storesSchema>

export const storeSections = pgTable('store_sections', {
	storeSectionId: uuid('store_section_id').defaultRandom().primaryKey(),
	storeSectionName: varchar('store_section_name', { length: 256 }).notNull(),
	createdAt: timestamp('created_at').defaultNow().notNull(),
	updatedAt: timestamp('updated_at').$onUpdateFn(() => new Date()),

	storeId: uuid('store_id')
		.references(() => stores.storeId)
		.notNull()
})

export const storeSectionRelations = relations(
	storeSections,
	({ many, one }) => ({
		incidents: many(incidents),
		store: one(stores, {
			fields: [storeSections.storeId],
			references: [stores.storeId]
		})
	})
)

export const storeSectionsSchema = createInsertSchema(storeSections)
export type StoreSectionsSchema = z.infer<typeof storeSectionsSchema>

export const incidents = pgTable('incidents', {
	incidentId: uuid('incident_id').defaultRandom().primaryKey(),
	incidentDescription: text('incident_description').notNull(),
	employeeName: varchar('employee_name', { length: 256 }).notNull(),
	productName: varchar('product_name', { length: 256 }),
	productCode: varchar('product_code', { length: 256 }),
	productQuantity: integer('product_quantity'),
	productPrice: integer('product_price'),
	createdAt: timestamp('created_at').defaultNow().notNull(),
	updatedAt: timestamp('updated_at').$onUpdateFn(() => new Date()),

	storeSectionId: uuid('store_section_id')
		.references(() => storeSections.storeSectionId)
		.notNull(),
	storeId: uuid('store_id')
		.references(() => stores.storeId)
		.notNull(),
	regionId: uuid('region_id')
		.references(() => regions.regionId)
		.notNull()
})

export const incidentRelations = relations(incidents, ({ many, one }) => ({
	storeSection: one(storeSections, {
		fields: [incidents.storeSectionId],
		references: [storeSections.storeSectionId]
	}),
	store: one(stores, {
		fields: [incidents.storeId],
		references: [stores.storeId]
	}),
	region: one(regions, {
		fields: [incidents.regionId],
		references: [regions.regionId]
	})
}))

export const incidentsSchema = createInsertSchema(incidents)
export type IncidentsSchema = z.infer<typeof incidentsSchema>
