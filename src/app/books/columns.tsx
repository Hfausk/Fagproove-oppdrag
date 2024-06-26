"use client"

import type { Book, ReturnBooks } from "@/database/types"
import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal, Table } from "lucide-react"
import React from "react"

import { Button } from "../../components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu"
import Link from "next/link"
import { deleteBookById } from "@/database/crud/remove"
import {
    TableCell,
  } from "@/components/ui/table"

// Define the type of the data that will be displayed in the table


// Define the columns that will be displayed in the table
export const columns: ColumnDef<ReturnBooks>[] = [
    {
        accessorKey: "id",
        header: "ID"
    },
    {
        accessorKey: "name",
        header: "Name"
    },
    {
        accessorKey: "whoHasIt.name",
        header: "Student"
    },
    {
        accessorKey: "whenWasLent",
        header: "Lent At"
    },
    {
        accessorKey: "whenSouldBeReturned",
        header: "Should be returned"
    },
    {
        accessorKey: "isLate",
        header: "Is overdue",
        cell: ({row}) => {
            const isLate = row.original.isLate;
            return isLate ? "Yes" : "No";
        }
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const book = row.original;

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open Menu</span>
                            <MoreHorizontal />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        {/* //TODO: Add copy book name and person renting book functionality/formating if time allows */}
                        <DropdownMenuItem
                            onClick={() => navigator.clipboard.writeText(book.id.toString())}
                        > Copy ID
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        {book.whoHasIt?.id !== 0 ?(
                            <DropdownMenuItem>
                                <Link href={`/students/${book.whoHasIt?.id}`}>
                                View Student
                                </Link>
                            </DropdownMenuItem>
                        ) : null}
                        <DropdownMenuItem>
                            <Link href={`/books/${book.id}`}>
                            View Book
                            </Link>
                        </DropdownMenuItem> 
                        <DropdownMenuItem>
                            <Button
                             variant="ghost" 
                             className="w-full bg-red-500"
                             onClick={() => deleteBookById(book.id) }
                             >Delete Book</Button>
                        </DropdownMenuItem>

                        <DropdownMenuItem></DropdownMenuItem> {/* //TODO: Add link to edit book page */}
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        }
    }

]