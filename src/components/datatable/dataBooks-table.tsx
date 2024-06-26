"use client"

import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
  useReactTable,
} from "@tanstack/react-table"

import React from "react";
import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table"
import { createBook } from "@/database/crud/create";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";


interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const table = useReactTable({
    data,
    columns,
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageSize: 50,
      },
    },
    state: {
      columnFilters,
    }
  })


  const [name, setName] = useState("")
  const handleSubmit = (name: string) => {
    if (name === "") {
      return
    }
    console.log(name)
    createBook(name)
  }

  return (
    <div>
      <div className="flex justify-between">
        <Input
          placeholder="Search name.."
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm">
              Filter overdue
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent side="right" align="start">
            <DropdownMenuItem>
            <Button
              variant="ghost"
              onClick={() => {
                table.getColumn("isLate")?.setFilterValue(true)
              }}
              className="w-full"
            >Only late books</Button>
            </DropdownMenuItem>
            <DropdownMenuItem>
            <Button
              variant="ghost"
              onClick={() => {
                table.getColumn("isLate")?.setFilterValue(false)
              }}
              className="w-full"
            >Only available books</Button>

            </DropdownMenuItem>
            <DropdownMenuItem>
            <Button
              variant="ghost"
              onClick={() => {
                table.getColumn("isLate")?.setFilterValue(undefined)
              }}
              className="w-full"
            >All books</Button>

            </DropdownMenuItem>

          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className={row.getValue("isLate") === false ? "bg-green-400/40" : "bg-red-400/50"} >
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))

            ) : (
              <TableRow>
                <TableCell className="text-center" colSpan={columns.length}>No data</TableCell>
              </TableRow>
            )}
            <TableRow>
              <TableCell>New book:</TableCell>
              <TableCell>
                <input name='input_text'
                  autoFocus
                  value={name}
                  className='bg-transparent border-grey-500 border-2'
                  onChange={(event) => { setName(event.target.value) }}
                  onKeyDown={(event) => { if (event.key === 'Enter') { handleSubmit(name) } }}
                />
              </TableCell>
              <TableCell>
                <Button onClick={() => { handleSubmit(name) }}>Add book</Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">

        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>


        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>


      </div>
    </div>
  )
}