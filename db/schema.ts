import { integer, pgTable, text, timestamp } from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
  id: integer().primaryKey(),
  name: text().notNull(),
  email: text().notNull().unique(),
});

export const pitchesTable = pgTable("pitches", {
  id: integer().primaryKey(),
  title: text().notNull(),
  image: text().notNull(),
  description: text().notNull(),
  created: timestamp().notNull(),
  views: integer().notNull(),
  userid: integer()
    .notNull()
    .references(() => usersTable.id, { onDelete: "cascade" }),
});