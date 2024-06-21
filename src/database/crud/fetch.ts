"use server"

import { unstable_noStore as noStore } from 'next/cache';

import { db } from '../db'
import { lending } from '../schema';
import { eq } from 'drizzle-orm';



export async function fetchAllStudents() {
    noStore() // fix for the next cache issue

    const students = await db.query.students.findMany({
        orderBy: (student, { asc }) => [asc(student.name)]
    })

    return students
}


export async function fetchAllBooks() {
    noStore() // fix for the next cache issue

    const books = await db.query.books.findMany({
        orderBy: (book, { asc }) => [asc(book.name)]
    })

    return books
}


export async function fetchLendingsByBookId(bookId: number) {
    noStore() // fix for the next cache issue

    const lendings = await db.select().from(lending)
    .where(eq(lending.bookId, bookId))

    return lendings
}