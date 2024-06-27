"use server"

import { and, eq, isNull } from 'drizzle-orm';
import { db } from '../db';
import { books, students, lending} from '../schema';
import { revalidatePath } from 'next/cache'


export async function updateBookText(targetId: number, newText: string) {

    await db.update(books)
    .set({name: newText})
    .where(eq(books.id, targetId))

    revalidatePath("/")
}

export async function updateStudentText(targetId: number, newText: string) {
    
        await db.update(students)
        .set({name: newText})
        .where(eq(students.id, targetId))
    
        revalidatePath("/")
}

export async function deliverNewBook(bookId: number,  deliverDate: Date) {

    await db.update(lending)
    .set({deliverdAt: deliverDate})
    .where(and(eq(lending.bookId, bookId), isNull(lending.deliverdAt)));

    revalidatePath("/")
}