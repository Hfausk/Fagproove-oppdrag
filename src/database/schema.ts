import { integer, pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';

export const students = pgTable('students', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
});
export const books = pgTable('books', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
});

export const lending = pgTable('lending', {
  id: serial('id').primaryKey(),
  bookId: serial('id').notNull().references(() => books.id),
  studentId: serial('id').notNull().references(() => students.id),
  lentAt: timestamp('created_at').notNull().defaultNow(),
  deliverdAt: timestamp('updated_at'),
});

export type InsertStudents = typeof students.$inferInsert;
export type SelectStudents = typeof students.$inferSelect;

export type InsertBooks = typeof books.$inferInsert;
export type SelectBooks = typeof books.$inferSelect;

export type InsertLending = typeof lending.$inferInsert;
export type SelectLending = typeof lending.$inferSelect;