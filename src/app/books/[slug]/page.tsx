"use server"

import React from "react";
import { getBookById } from "@/database/crud/getItemById";
import { DataTable } from "@/components/datatable/dataBooks-table";
import { columns } from "./columns";
import { InputField } from "@/components/InputField/bookInput";
import Link from "next/link";

export default async function page({ params }: { params: { slug: string } }) {

  const book = await getBookById(Number(params.slug))



  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <div className="flex w-full">
        <h1 className=" p-3  text-4xl">ID: {book?.id}</h1>
        <h1 className=" p-3  text-4xl"> Name: {book?.name}</h1>
        </div>
      <div className=" flex gap-5 justify-between w-full px-14">
        <div>
          <label htmlFor="bookName">Set book name: </label>
          <InputField inputId="bookName" itemId={book!.id} itemText={book!.name} />
        </div>
        <div>
          <Link href={`/lend`}>Assign Book</Link>
        </div>
      </div>
      <div className="w-full">
        <DataTable columns={columns} data={book!.lending} />
      </div>
      {/* <pre>{JSON.stringify(book, undefined, 2)}</pre> */}
    </main>
  );
}