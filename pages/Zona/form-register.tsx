"use client"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import AsyncSelect from 'react-select/async';
import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router"
import { formSchemaCreateZona } from "@/lib/FormSchemaZona"
import { CreateZona } from "@/lib/CRUD-Zona"
import { Concelho } from "../Concelho"
import { Label } from "@/components/Form/Label"
import { Input } from "@/components/Form/Input"
import { Form, FormLabel } from "@/components/ui/form"
import { ScrollArea } from "@/components/ui/scroll-area"
import { AxiosResponse } from "axios"

interface ErrorResponse {
  message: string;
  status: number;
}

type ZonaProps = {
  //nome: string,
  concelhos: Concelho[],
  
}
export function ZonaForm({concelhos }:ZonaProps) {
  // 1. Define your form.

  const notify = () => {
    toast.info("Registando...", {
      toastId: "customId",
    });
  }

  const router = useRouter();
  
  async function onSubmit(values: z.infer<typeof formSchemaCreateZona>) {
    if (!concelho.id){
      toast.update("customId", {
        render: 'Concelho nao tem valor',
        type: "error",
      });
      return false;
    }
    values.nome = nome
    
    values.idConcelho = concelho.id

    const response: AxiosResponse<any, any> | ErrorResponse = await CreateZona(values);
    console.log(response);
    if(response.status === 201) {
      router.reload();
      toast.update("customId", {
        render: 'Registado com sucesso',
        type: "success",
      });
    }else{
      toast.update("customId", {
        render: response.message,
        type: "error",
      });
    }
  }
// Force refresh the page
const [nome,setNome] = React.useState('');
const [concelho,setConcelho] = React.useState<Concelho>({id:'',nome:'', descricao:'', ilha: ''});
 
  const form = useForm<z.infer<typeof formSchemaCreateZona>>({
    resolver: zodResolver(formSchemaCreateZona),
    defaultValues: {
      idConcelho: "",
      nome: "",
    },
  })
//handle input change event
const handleChangeConcelho = (concelho: Concelho) =>{
  setConcelho(concelho);
}
const handleChangeNome = (event: React.SyntheticEvent) => {

  const target = event.target as HTMLInputElement; // Diga que é um HTMLInputElement
    var currentValue = target.value
    setNome(currentValue)
} 

const filterConcelho = (inputValueConcelho: string) => {
  return concelhos.filter((i) =>
    i.nome.toLowerCase().includes(inputValueConcelho.toLowerCase())
  );
};

const promiseConcelho = (inputValueConcelho: string) =>
  new Promise<Concelho[]>((resolve) => {
      resolve(filterConcelho(inputValueConcelho));
  });

  return (
    <Form {...form}>
      <ScrollArea className="h-[100vh] w-[350px] pb-28 p-4">
  
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3 p-1">
        <ToastContainer />
        <FormLabel>Concelho</FormLabel>
          <AsyncSelect 
            cacheOptions 
            defaultOptions
            isClearable={true}
            value={concelho}
            getOptionLabel={e => e.nome}
            getOptionValue={e => e.id.toString()} 
            loadOptions={promiseConcelho}
            onChange={(handleChangeConcelho)}
          />
          
          <Label>Nome</Label>
          <Input name="nome" value={nome} onChange={handleChangeNome} />
          <div>User Input: {nome}</div>
          <Button onClick={notify} type="submit" variant="primary">Submit</Button>
      </form>
      </ScrollArea>
  
    </Form>
    )
  }