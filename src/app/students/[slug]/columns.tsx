"use client"

import { ColumnDef } from "@tanstack/react-table"
import type { Lending } from "../../../database/types"
// This type is used to define the shape of our data.



export const columns: ColumnDef<Lending>[] = [
  {
    accessorKey: "book.id",
    header: "Book ID",
  },
  {
    accessorKey: "book.name",
    header: "Book Name",
  },
  {
    accessorKey: "lentAt",
    header: "Lent At",
  },
  {
    accessorKey: "deliverdAt",
    header: "Delivered At",
  },
]
