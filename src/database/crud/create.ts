"use server"

import { books, students } from "../schema";
import { db } from "../db";
import { revalidatePath } from "next/cache";

export async function createStudent(name: string) {

    await db.insert(students).values({
        id: undefined,
        name: name
    })
    revalidatePath("/")
}

export async function createBook(name: string) {

    await db.insert(books).values({
        id: undefined,
        name: name
    })
    revalidatePath("/")
}