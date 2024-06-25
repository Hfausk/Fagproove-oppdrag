"use server"

import React from "react";
import { getStudentById } from "@/database/crud/getItemById";
import { DataTable } from "@/components/datatable/data-table";
import { columns } from "./columns";
import { InputField } from "@/components/InputField/bookInput";
import Link from "next/link";

export default async function page({ params }: { params: { slug: string } }) {

  const student = await getStudentById(Number(params.slug))



  return (
    <main className="flex min-h-screen gap-10 flex-col items-center p-24">
      <div className="flex w-full gap-9">
        
        <h1 className=" p-3  text-4xl">ID: {student?.id}</h1>
        <h1 className=" p-3  text-4xl"> Name: {student?.name}</h1>
        </div>
      <div className=" flex gap-5 justify-between w-full px-14">
        <div>
          <label htmlFor="studentName">student Name: </label>
          <InputField inputId="studentName" itemId={student!.id} itemText={student!.name} />
        </div>
        <div>
          <Link href={`/lend`}>Assign student</Link>
        </div>
      </div>
      <div className="w-full">
        <h1 className="text-2xl">Lending History</h1>
        <DataTable columns={columns} data={student!.lending} />
      </div>
    </main>
  );
}