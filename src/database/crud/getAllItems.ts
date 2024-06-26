"use server"

import { unstable_noStore as noStore, revalidatePath } from 'next/cache';
import { lending, books, students } from '../schema';
import { eq, or, sql } from 'drizzle-orm';
import { db } from '../db'




export async function getAllStudents() {
    noStore() // fix for the next cache issue

    const students = await db.query.students.findMany({
        orderBy: (student, { asc }) => [asc(student.name)],
        where: (student, { isNull }) => isNull(student.deletedAt)
    })
    return students
}

export async function getAllBooks() {
    noStore() // fix for the next cache issue

    const booksData = await db.query.books.findMany({
        orderBy: (book, { asc }) => [asc(book.name)],
        where: (book, { isNull }) => isNull(book.deletedAt),
        with: {
            lending: {
                where: (lending, { isNull }) => isNull(lending.deliverdAt),
                with: {
                    student: {

                    }
                }
            }
        },
    })

    console.log(JSON.stringify(booksData, undefined, 2))

    const formatedBooks = booksData.map((book) => {
        return {
            id: book.id,
            name: book.name,
            whoHasIt: book.lending[0]?.student || { id: 0, name: 'No one' }
        }
    })
    revalidatePath("/")
    return formatedBooks
}


export async function getAllUnlentBooks() {
    noStore() // fix for the next cache issue

    const unlentBook = await db.query.books.findMany({
        columns: {
            id: true,
            name: true
        },
        with: {
            lending: {
                where: (lending, { isNull }) => isNull(lending.deliverdAt),
            }
        }

    }).then((books) => {
        return books.filter((book) => {
            return book.lending.length === 0
        })
    })


    revalidatePath("/")
    return unlentBook
}