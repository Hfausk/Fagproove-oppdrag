"use server"

import { unstable_noStore as noStore, revalidatePath } from 'next/cache';
import { lending, books, students } from '../schema';
import { eq, or, sql } from 'drizzle-orm';
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

    const formatedBooks = books.map((book) => {
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