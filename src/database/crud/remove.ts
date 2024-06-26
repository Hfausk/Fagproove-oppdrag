"use server"
import { eq } from "drizzle-orm";
import { books, students } from "../schema";
import { db } from "../db";
import { revalidatePath } from "next/cache";


export async function deleteStudentById(studentId: number) {

    await db.update(students).set({deletedAt: new Date()}).where(eq(students.id, studentId))
    revalidatePath("/")
}


export async function deleteBookById(bookId: number) {

    await db.update(books).set({deletedAt: new Date()}).where(eq(books.id, bookId))
    revalidatePath("/")
}