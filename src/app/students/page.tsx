"use server"

import React from "react";
import { getAllStudents } from "../../database/crud/getAllItems";
import { columns } from "./columns";
import { DataTable } from "@/components/datatable/data-table";
import { Button } from "@/components/ui/button";



export default async function page() {
    const students = await getAllStudents();
  
  
    return (
      <main className="flex min-h-screen flex-col items-center p-24 w-screen">
        <div className="w-[800px]">
        <DataTable columns={columns} data={students} />
        <Button> Add Student</Button>
        </div>
      </main>
    );
  }
  