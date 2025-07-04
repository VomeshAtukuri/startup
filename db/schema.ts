import { integer, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { boolean, primaryKey, unique } from "drizzle-orm/pg-core";
import type { AdapterAccountType } from "next-auth/adapters";

export const users = pgTable("user", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text("name"),
  email: text("email").unique(),
  emailVerified: timestamp("emailVerified", { mode: "date" }),
  image: text("image"),
});

export const accounts = pgTable(
  "account",
  {
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    type: text("type").$type<AdapterAccountType>().notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("providerAccountId").notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: text("token_type"),
    scope: text("scope"),
    id_token: text("id_token"),
    session_state: text("session_state"),
  },
  (account) => [
    {
      compoundKey: primaryKey({
        columns: [account.provider, account.providerAccountId],
      }),
    },
  ]
);

export const sessions = pgTable("session", {
  sessionToken: text("sessionToken").primaryKey(),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expires: timestamp("expires", { mode: "date" }).notNull(),
});

export const verificationTokens = pgTable(
  "verificationToken",
  {
    identifier: text("identifier").notNull(),
    token: text("token").notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (verificationToken) => [
    {
      compositePk: primaryKey({
        columns: [verificationToken.identifier, verificationToken.token],
      }),
    },
  ]
);

export const authenticators = pgTable(
  "authenticator",
  {
    credentialID: text("credentialID").notNull().unique(),
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    providerAccountId: text("providerAccountId").notNull(),
    credentialPublicKey: text("credentialPublicKey").notNull(),
    counter: integer("counter").notNull(),
    credentialDeviceType: text("credentialDeviceType").notNull(),
    credentialBackedUp: boolean("credentialBackedUp").notNull(),
    transports: text("transports"),
  },
  (authenticator) => [
    {
      compositePK: primaryKey({
        columns: [authenticator.userId, authenticator.credentialID],
      }),
    },
  ]
);

//title,description,category,link,pitch,userid,created,views,id
export const pitchesTable = pgTable("pitches", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  title: text().notNull(),
  description: text().notNull(),
  category: text().notNull(),
  imagesrc: text().notNull(),
  pitch: text().notNull(),
  created: timestamp().notNull(),
  views: integer().notNull(),
  userid: text()
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
});

export const pitchInteractions = pgTable(
  'pitch_interactions',
  {
    id: text().primaryKey().$defaultFn(() => crypto.randomUUID()),
    userId: text().notNull().references(() => users.id, { onDelete: 'cascade' }),
    pitchId: text().notNull().references(() => pitchesTable.id, { onDelete: 'cascade' }),
    liked: boolean().default(false),
    disliked: boolean().default(false),
    bookmarked: boolean().default(false),
    createdAt: timestamp().defaultNow(),
  },
  // restrict user to one interaction per pitch and one interaction per user
  (pitchInteractions) => [
    unique('user_pitch_unique').on(pitchInteractions.userId, pitchInteractions.pitchId),
  ]
);
