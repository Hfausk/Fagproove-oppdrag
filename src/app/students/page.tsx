"use server"

import React from "react";
import { getAllStudents } from "../../database/crud/fetch";



export default async function page() {
    const students = await getAllStudents();
  
  
    return (
      <main className="flex min-h-screen flex-col items-center p-24">
        <pre>{JSON.stringify(students, undefined, 2)}</pre>
      </main>
    );
  }
  