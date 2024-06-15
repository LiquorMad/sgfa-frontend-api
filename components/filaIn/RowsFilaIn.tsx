import React, { useState } from 'react'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Eye, FileEdit, Trash2 } from 'lucide-react';
import Modal from '../Modal';
import Columns from '../table/Columns';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { ScrollArea } from '../ui/scroll-area';
import { useRouter } from 'next/router';
import { DeleteFilaIn, UpdateFilaIn } from '@/manage-data/CRUD-FilaIn';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { formSchemaUpdateFilaIn } from '@/manage-data/FormSchemaFilaIn';
import { Button } from '../ui/button';
import { Rota } from '@/pages/Rota';
import { Veiculo } from '@/pages/Veiculo';

type FilaInProps = {
    entry: any,
    columns: any,
    rotas: Rota[],
    veiculos: Veiculo[]
} 

function FilaInRows({entry,columns,rotas,veiculos}:FilaInProps) {
    const router = useRouter();
    const [modalOpenDelete, setModalOpenDelete] = useState<boolean>(false);
    const [modalOpenEdite, setModalOpenEdite] = useState<boolean>(false);
    const textDelete = "Are you sure, you want to delete this Team!";
    const textEdit = "Edit FilaIn";

  async function handleDelete(id: number){
    const response =await DeleteFilaIn(id)
    setModalOpenDelete(false);
    router.push('/match');
  }
  function handleCloseModalDelete(){
      setModalOpenDelete(false);
  }
  const form = useForm<z.infer<typeof formSchemaUpdateFilaIn>>({
    resolver: zodResolver(formSchemaUpdateFilaIn),
    defaultValues: {
        id: entry.id,
        rota: entry.rota,
        veiculo: entry.veiculo,
    },
  })
  async function onSubmit(values: z.infer<typeof formSchemaUpdateFilaIn>) {
    const response = await UpdateFilaIn(values);
    if(response.status===200){   
      handleCloseModalEdite()
      router.push('/match');
    }
  }
function handleCloseModalEdite(){
    setModalOpenEdite(false);
}
  return (
    <tr key={entry.id}>
        {columns.map((column:any) => (
            <Columns key={column} entry={entry} column={column}/>
        ))}
        <td className='cursor-pointer flex gap-4'><Eye/> 
            <FileEdit onClick={()=>setModalOpenEdite(true)} />
            <Modal visible={modalOpenEdite} onClose={handleCloseModalEdite} text={textEdit}>
                <ScrollArea className="h-[400px] w-[450px] rounded-md border p-4">
                    <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 p-1">
                        <FormField
                        control={form.control}
                        name="rota"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>P1</FormLabel>
                            <FormControl>
                            <Select onValueChange={field.onChange} >
                                <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder={field.value} />
                                </SelectTrigger>
                                <SelectContent>
                                <ScrollArea className="h-[200px] w-[200px] rounded-md border p-4">
                                    {rotas.map((rota:Rota) =>(
                                        <SelectItem  
                                            value={rota.zona} 
                                            key={rota.id}>
                                                {rota.zona}
                                        </SelectItem>
                                    ))}
                                </ScrollArea>
                                </SelectContent>
                            </Select>
                            </FormControl>
                            <FormDescription>
                                This is your public display apelido.
                            </FormDescription>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                        <FormField
                        control={form.control}
                        name="veiculo"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>P2</FormLabel>
                            <FormControl>
                            <Select onValueChange={field.onChange} >
                                <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder={field.value} />
                                </SelectTrigger>
                                <SelectContent>
                                <ScrollArea className="h-[200px] w-[200px] rounded-md border p-4">
                                {veiculos.map((veiculo:Veiculo) =>(
                                    <SelectItem 
                                        value={veiculo.matricula} 
                                        key={veiculo.id}>
                                            {veiculo.matricula}
                                    </SelectItem>
                                ))}
                                </ScrollArea>
                                </SelectContent>
                            </Select>
                            </FormControl>
                            <FormDescription>
                                This is your public display apelido.
                            </FormDescription>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                        <Button type="submit" variant="outline">Submit</Button>
                    </form>
                    </Form>
                </ScrollArea>
            </Modal>
            <Trash2 onClick={()=>setModalOpenDelete(true)} color="#e40707" className='cursor-pointer'/>
            <Modal visible={modalOpenDelete} onClose={handleCloseModalDelete} text={textDelete}>
                <Button variant="outline"onClick={()=>handleDelete(entry.id)}>Yes</Button>
            </Modal>
        </td>
    </tr>
  )
}

export default FilaInRows