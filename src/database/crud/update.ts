"use server"

import { eq } from 'drizzle-orm';
import { db } from '../db';
import { books } from '../schema';
import { revalidatePath } from 'next/cache'


export async function updateBookText(targetId: number, newText: string) {

    await db.update(books)
    .set({name: newText})
    .where(eq(books.id, targetId))

    revalidatePath("/")
}
