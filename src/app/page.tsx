"use server"



import { getAllStudents } from "../database/crud/fetch";

export default async function Home() {
  const students = await getAllStudents();


  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      StartPage
    </main>
  );
}
