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

    const formatedBooks = books.map((book) => {
        return {
            id: book.id,
            name: book.name,
            whoHasIt: book.lending[0]?.student || { id: 0, name: 'No one'}
        }
    })

    return formatedBooks
}

// get all books that are not lent Note that this is a bit of a hack as the book needs to already be in the lending table to be able to be lent
// For now just make sure that all new books are added to the lending table with a null deliverdAt
export async function getAllUnlentBooks() {
    noStore() // fix for the next cache issue

    const filterBooks = await db.query.lending.findMany({
        where: (lending, { isNull }) => isNull(lending.deliverdAt),
        with: {
            book: {
                
            }
        }

    })

    const formatedBooks = filterBooks.map((book) => {
        return {
            id: book.book.id,
            name: book.book.name,
        }
    })

    return formatedBooks
}