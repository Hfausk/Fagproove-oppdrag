"use server"

import React from "react";
import { getAllStudents } from "../../database/crud/getAllItems";
import { columns } from "./columns";
import { DataTable } from "@/components/datatable/dataStudents-table";




export default async function page() {
    const students = await getAllStudents();
  
  
    return (
      <main className="flex min-h-screen flex-col items-center p-24 w-screen">
        <div className="w-[800px]">
          <h1 className="text-4xl">All students</h1>
        <DataTable columns={columns} data={students} />
        </div>
      </main>
    );
  }
  