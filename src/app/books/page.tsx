"use server"

import React from "react";
import { getAllBooks } from "../../database/crud/fetch";



export default async function page() {
    const books = await getAllBooks();
  
  
    return (
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <pre>{JSON.stringify(books, undefined, 2)}</pre>
      </main>
    );
  }
  