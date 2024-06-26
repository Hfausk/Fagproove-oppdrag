"use server"

import { unstable_noStore as noStore, revalidatePath } from 'next/cache';
import { lending, books, students } from '../schema';
import { eq, is, or, sql } from 'drizzle-orm';
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
    const lendingDuration = 365

    const booksData = await db.query.books.findMany({
        orderBy: (book, { asc }) => [asc(book.name)],
        where: (book, { isNull }) => isNull(book.deletedAt),
        with: {
            lending: {
                where: (lending, { isNull }) => isNull(lending.deliverdAt),
                with: {
                    student: {
                        columns: {
                            id: true,
                            name: true
                        } 
                    }
                }
            }
        },
    })

    const formatetDate = (date: Date) => {
      const year = date.getFullYear()
      const month = date.getMonth() + 1
      const day = date.getDate()
    
        return `${day}-${month}-${year}`
    }


    
    const formatedBooks = booksData.map((book) => {
        return {
            id: book.id,
            name: book.name,
            whoHasIt: book.lending[0]?.student || { id: 0, name: 'No one',},
            whenWasLent: book.lending[0] ? formatetDate(book.lending[0].lentAt) : "Not lent out",
            whenSouldBeReturned:book.lending[0] ? formatetDate(new Date(new Date(book.lending[0]?.lentAt).setDate(book.lending[0]?.lentAt.getDate() + lendingDuration))) : "Not lent out",
            isLate: book.lending[0] ? new Date() > new Date(new Date(book.lending[0]?.lentAt).setDate(book.lending[0]?.lentAt.getDate() + lendingDuration)) : false
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