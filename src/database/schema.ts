import { relations, sql } from 'drizzle-orm';
import { integer, pgTable, serial, text, timestamp, primaryKey } from 'drizzle-orm/pg-core';

export const students = pgTable('students', {
    id: serial('id').primaryKey(),
    name: text('name').notNull(),
    deletedAt: timestamp('deleted_at'),
});

export const studentsRelation = relations(students, ({ many }) => ({
    lending: many(lending),
}));

export const books = pgTable('books', {
    id: serial('id').primaryKey(),
    name: text('name').notNull(),
    deletedAt: timestamp('deleted_at'),
});

export const booksRelation = relations(books, ({ many }) => ({
    lending: many(lending),

}));

export const lending = pgTable('lending', {
    bookId: integer('book_id').references(() => books.id),
    studentId: integer('student_id').references(() => students.id),
    lentAt: timestamp('lent_at').notNull().defaultNow(),
    deliverdAt: timestamp('delivered_at'),
}, (table) => {
    return {
        pk: primaryKey({ columns: [table.bookId, table.studentId, table.lentAt] })
    }
});

export const lendingRelation = relations(lending, ({ one }) => ({
    book: one(books, {
        fields: [lending.bookId],
        references: [books.id]
    }),
    student: one(students, {
        fields: [lending.studentId],
        references: [students.id]
    }),
}));

export type InsertStudents = typeof students.$inferInsert;
export type SelectStudents = typeof students.$inferSelect;

export type InsertBooks = typeof books.$inferInsert;
export type SelectBooks = typeof books.$inferSelect;

export type InsertLending = typeof lending.$inferInsert;
export type SelectLending = typeof lending.$inferSelect;