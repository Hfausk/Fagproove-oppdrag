"use server"

import { unstable_noStore as noStore } from 'next/cache';
import { lending, students } from '../schema';
import { eq } from 'drizzle-orm';
import { db } from '../db'




export async function getAllStudents() {
    noStore() // fix for the next cache issue

    const students = await db.query.students.findMany({
        orderBy: (student, { asc }) => [asc(student.name)],
    })
    return students
}

export async function getAllBooks() {
    noStore() // fix for the next cache issue

    const books = await db.query.books.findMany({
        orderBy: (book, { asc }) => [asc(book.name)],
        with: {
            lending: {
                    where: (lending, { isNull }) => isNull(lending.deliverdAt),
                with: {
                    student: {
                        
                    }
                }
            }
        }
    })

    console.log("Books",JSON.stringify(books, undefined , 2))

    const formatedBooks = books.map((book) => {
        return {
            id: book.id,
            name: book.name,
            whoHasIt: book.lending[0]?.student || { id: 0, name: 'No one'}
        }
    })

    return formatedBooks
}