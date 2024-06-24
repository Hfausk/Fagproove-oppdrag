"use server"

import React from "react";
import { getBookById } from "@/database/crud/getItemById";
import { DataTable } from "@/components/datatable/data-table";
import { columns } from "./columns";

export default async function page({params }: {params:{slug: string}}) {

    const book = await getBookById(Number(params.slug))




    return (
      <main className="flex min-h-screen flex-col items-center p-24">
        <div className="bg-red-400 w-full">Title</div>
        <div className="bg-blue-400 w-full">
          <p>edit details</p>
          <p>assign</p>
        </div>
        <div className="bg-red-400 w-full">Lend history</div>
        <pre>{JSON.stringify(book, undefined, 2)}</pre>
        <DataTable columns={columns} data={book!.lending} />
      </main>
    );
}