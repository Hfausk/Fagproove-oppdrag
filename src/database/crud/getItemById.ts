
import { unstable_noStore as noStore } from 'next/cache';
import { db } from '../db'
import { books, lending, students } from '../schema';
import { eq } from 'drizzle-orm';


export async function getBookById( bookId: number) {
    noStore()

    const Book = await db.query.books.findFirst({
        where: eq(books.id, bookId),
        with: {
            lending: {
                with: {
                    student: {}
                }
            }
        }
    })
    return Book
}




export async function getStudentById( studentId: number) {
    noStore()

    const student = await db.select().from(students).where(eq(students.id, studentId))
    

    return student[0]
}