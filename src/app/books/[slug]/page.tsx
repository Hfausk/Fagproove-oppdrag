
import React from "react";
import { getBookById } from "@/database/crud/getItemById";


export default async function page({params }: {params:{slug: string}}) {

    const book = await getBookById(Number(params.slug))



    return (
      <main className="flex min-h-screen flex-col items-center p-24">
        <h1>{book.id}</h1>
        
      </main>
    );
}