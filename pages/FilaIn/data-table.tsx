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
import { FilaInForm } from "./form-register"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
 
import { Trash2 } from 'lucide-react';
import { Veiculo } from "../Veiculo"
import { Rota } from "../Rota"
import { ScrollArea } from "@/components/ui/scroll-area"
import MyTurnComponent from "./MyTurnComponent"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[],
  veiculosRegister: Veiculo[],
  veiculosTurn: Veiculo[],
  rotas: Rota[]
}

export function DataTable<TData, TValue>({
  columns,
  data,
  veiculosRegister,
  veiculosTurn,
  rotas,
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
  const [selectedMatricula, setSelectedMatricula] = React.useState<string>('');
  const [showMyTurnInfo, setShowMyTurnInfo] = React.useState<boolean>(false);

  const handleRowClick = (matricula: string) => {
    setSelectedMatricula(matricula);
    setShowMyTurnInfo(true);
    //setTimeout(handleOnclose, 4000);
  };

  const handleOnclose = () => {
    setShowMyTurnInfo(false)
  }
  return (
    <div>
        {showMyTurnInfo && 
        <MyTurnComponent matricula={selectedMatricula} onClose={handleOnclose}/>}
      <div className="flex items-center py-4 w-3/4 m-0 m-auto relative ">
        <div className="left-side-buttons absolute right-0 pb-4">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="primary">Novo Registo</Button>
            </SheetTrigger>
            <SheetContent className="bg-white">
              <SheetHeader>
                <SheetTitle>Registar Veiculo na Fila</SheetTitle>
                <SheetDescription>
                  Regista novo veiculo na Fila.
                </SheetDescription>
              </SheetHeader>
                  <FilaInForm veiculosRegister={veiculosRegister} rotas={rotas} />
            </SheetContent>
          </Sheet>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="primary" > Minha Vez </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-white">
              <DropdownMenuLabel> Veiculos </DropdownMenuLabel>
              <ScrollArea className=" max-h-[250px] rounded-md border p-4">
                <Command className="max-h-[200px] rounded-lg border shadow-md">
                  <CommandInput placeholder="Procura ..." />
                  <CommandList>
                    <CommandEmpty>No results found.</CommandEmpty>
                    <CommandGroup >
                      {Array.isArray(veiculosTurn) ? (
                      veiculosTurn.map((item: any) => (
                        <CommandItem>
                          <Button onClick={() => handleRowClick(item.matricula)}>
                            {item.matricula}
                          </Button>
                        </CommandItem>
                      ))
                      ):(
                        <CommandItem>Veiculos is not an array</CommandItem>
                      )}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </ScrollArea>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="primary"> Mudar Rota </Button>
          </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-white">
              <DropdownMenuLabel> Rotas </DropdownMenuLabel>
              <ScrollArea className="max-h-[300px]  rounded-md border p-4">
                <Command className="rounded-lg border shadow-md">
                  <CommandInput placeholder="Procura ..." />
                  <CommandList>
                    <CommandEmpty>No results found.</CommandEmpty>
                    <CommandGroup>
                      {Array.isArray(rotas) ? (
                      rotas.map((item: any) => (
                        <CommandItem>
                          <Button>
                            {item.nome}
                          </Button>
                          </CommandItem>
                      ))
                      ):(
                        <CommandItem>Rotas is not an array</CommandItem>
                      )}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </ScrollArea>
            </DropdownMenuContent>
          </DropdownMenu>
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
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
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
