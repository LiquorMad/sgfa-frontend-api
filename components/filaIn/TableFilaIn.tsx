import React, { useState } from 'react'
import Header from '../table/Header'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { Plus } from "lucide-react"

import { Rota } from '@/pages/Rota'
import { Veiculo } from '@/pages/Veiculo'
import { FilaIn } from '@/pages/FilaIn'
import Rows from './RowsFilaIn'


const Content = ({entries,columns,sorting,rota,veiculo}:any) => {
    if(sorting.order === 'desc'){
        const sorted = [...entries].sort((a,b) =>
        a[sorting.column] > b[sorting.column] ? 1 : -1)
        entries = sorted
    }if(sorting.order === 'asc'){
        const sorted = [...entries].sort((a,b) =>
        a[sorting.column] > b[sorting.column] ? -1 : 1)
        entries = sorted
    }
    
    return (
        <tbody>
            {entries.map((entry:any) =>(
                <Rows key={entry.id} rotas={rota} veiculos={veiculo} entry={entry} columns={columns}/>
            ))}
        </tbody>
    )
}

interface DataTableProps {
    data: FilaIn[]
    onAdd: () => void
    rota: Rota[]
    veiculo: Veiculo[]
  }
  
  export function Table({
    data,
    onAdd,
    rota,
    veiculo
}: DataTableProps) {
    const columns = ['id','vez','matricula','cor']

    const sortTable = (newSorting:any) => {
        setSorting(newSorting)
    }
    const [sorting, setSorting] = useState({column: "id", order: "desc"})
    
    return (
        <div>
           <div className="flex items-center py-4">
        <Input
          placeholder="Filter names..."
          className="max-w-sm"
        />
        <Button onClick={onAdd} variant="outline" className="mx-1" >
        <Plus className="mr-2 h-4 w-4" /> New
        </Button>
        </div>
            <table>
                <Header 
                    columns={columns} 
                    sorting={sorting} 
                    sortTable={sortTable}
                />
                <Content
                    entries={data} 
                    columns={columns} 
                    sorting={sorting}
                    rota={rota}
                    veiculo={veiculo}
                />
            </table>
        </div>
    )
}

export default Table