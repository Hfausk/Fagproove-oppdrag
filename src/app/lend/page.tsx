

import { getAllStudents, getAllUnlentBooks } from "@/database/crud/fetch";
import { columns } from "./bookColumns";
import { FilterDataTable } from "@/components/datatable/filterData-table";
import AssignBookToStudent from "@/components/assignBookToStudent";


export default async function page() {
    const books = await getAllUnlentBooks();
    const students = await getAllStudents();


    return (
        <main className="flex min-h-screen justify-between w-full p-24">
                <div className="w-[300px]">
                    <h1 className="text-4xl">Available Books</h1>
                    <FilterDataTable searchableColumn="name" columns={columns} data={books} />
                </div>
                <AssignBookToStudent />
                <div className="w-[300px]">
                    <h1 className="text-4xl">Students</h1>
                    <FilterDataTable searchableColumn="name" columns={columns} data={students} />
                </div>

        </main>
    )
}