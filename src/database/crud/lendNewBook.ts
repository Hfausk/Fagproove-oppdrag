"use server"
import { revalidatePath } from "next/cache";
import { db } from "../db";
import { lending } from "../schema";




export async function lendNewBook(bookId: number, studentId: number, lentAt: Date) {

    await db.insert(lending).values({
        bookId: bookId,
        studentId: studentId,
        lentAt: lentAt
    })
    revalidatePath("/")
    
}