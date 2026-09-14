import { pgEnum, pgTable, text, uuid } from 'drizzle-orm/pg-core'

export const roleEnum = pgEnum("role_enum", ["admin", "organizer", "attendee"])

export const userTable = pgTable("users", {
    id: uuid("id").primaryKey().defaultRandom(),
    firstName: text("first_name").notNull(),
    lastName: text("last_name").notNull(),
    role: roleEnum("role").notNull(),
    email: text("email").unique().notNull(),
    password: text("password").notNull()
})