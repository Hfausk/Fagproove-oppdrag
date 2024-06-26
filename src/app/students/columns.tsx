"use client"

import type { Book } from "@/database/types"
import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal } from "lucide-react"
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
import { deleteStudentById } from "@/database/crud/remove"

// Define the type of the data that will be displayed in the table


// Define the columns that will be displayed in the table
export const columns: ColumnDef<Book>[] = [
    {
        accessorKey: "id",
        header: "ID"
    },
    {
        accessorKey: "name",
        header: "Name"
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const student = row.original;

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
                            onClick={() => navigator.clipboard.writeText(student.id.toString())}
                        > Copy ID
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        
                        <DropdownMenuItem>
                            <Link href={`/students/${student.id}`}>
                            View Student
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <Button
                             variant="ghost" 
                             className="w-full bg-red-500"
                             onClick={() => deleteStudentById(student.id) }
                             >Delete Student</Button>
                        </DropdownMenuItem>
                        <DropdownMenuItem></DropdownMenuItem> {/* //TODO: Add link to edit book page */}
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        }
    }

]