"use client"

import * as React from "react"
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"

import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { ZonaForm } from "./form-register"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"


import { Trash2 } from 'lucide-react';
import { Concelho } from "../Concelho"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[],
  concelho: Concelho[],
}


export function DataTable<TData, TValue>({
  columns,
  data,
  concelho,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
 
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
    },
  })
 
  return (
    <div>
      <div className="flex items-center py-4 w-3/4 m-0 m-auto relative ">
        <div className="left-side-buttons absolute right-0 pb-4">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="primary">Novo Registo</Button>
            </SheetTrigger>
            <SheetContent className="bg-white">
              <SheetHeader>
                <SheetTitle>Registar novo Veiculo</SheetTitle>
                <SheetDescription>
                  Regista novo veiculo.
                </SheetDescription>
              </SheetHeader>
                  <ZonaForm concelhos={concelho} />
            </SheetContent>
          </Sheet>
          
        </div>
      </div>
      <div className="rounded-md border w-3/4 m-auto">
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
                <TableHead>Remover</TableHead>
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
                    <TableCell key={cell.id}>
                    {cell.column.id === "cor" ? (
                        cell.getValue() ? (
                            // Renderiza o retângulo colorido se houver valor para a cor
                            <div
                                style={{
                                    backgroundColor: cell.getValue(), // Define a cor de fundo
                                    width: "30px",                    // Largura do retângulo
                                    height: "20px",                   // Altura do retângulo
                                    borderRadius: "4px",              // Borda arredondada opcional
                                    display: "inline-block"           // Alinha o retângulo com o texto
                                }}
                            ></div>
                        ) : (
                            // Exibe "Sem cor" se o valor da cor estiver indefinido ou vazio
                            <span>Sem cor</span>
                        )
                    ) : (
                        flexRender(cell.column.columnDef.cell, cell.getContext())
                    )}
                </TableCell>
                
                  ))}
                  <TableCell>
                    <div className='flex'>
                      <Trash2  color="#e40707" className='cursor-pointer'/>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4 w-3/4 m-0 m-auto">
        <div className="flex items-center justify-end space-x-2 py-4">
          <div className="flex-1 text-sm text-muted-foreground">
            <select
              value={table.getState().pagination.pageSize}
              onChange={e => {
                table.setPageSize(Number(e.target.value))
              }}
            >
              {[5, 10].map(pageSize => (
                <option key={pageSize} value={pageSize}>
                  Mostrar {pageSize}
                </option>
              ))}
            </select>
          </div>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Anterior
        </Button>
        <strong>
          {table.getState().pagination.pageIndex + 1} of{' '}
          {table.getPageCount().toLocaleString()}
        </strong>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Proximo
        </Button>
      </div>
    </div>
  )
}
