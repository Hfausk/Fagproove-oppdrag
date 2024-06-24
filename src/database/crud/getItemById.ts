
import { unstable_noStore as noStore } from 'next/cache';
import { db } from '../db'
import { books, students } from '../schema';
import { eq } from 'drizzle-orm';


export async function getBookById( bookId: number) {
    noStore()

    const book = await db.select().from(books).where(eq(books.id, bookId))

    return book[0]
}

export async function getStudentById( studentId: number) {
    noStore()

    const student = await db.select().from(students).where(eq(students.id, studentId))

    return student[0]
}