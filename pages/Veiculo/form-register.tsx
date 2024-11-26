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
import { CreateVeiculo } from "@/lib/CRUD-Veiculo"
import { TipoVeiculo } from "../Veiculo"
import { formSchemaVeiculo } from "@/lib/FormSchemaVeiculo"
import { Input } from "@/components/Form/Input"
import { Form, FormLabel } from "@/components/ui/form"
import { ColorPicker, useColor } from "react-color-palette";
import "react-color-palette/css";
import { ScrollArea } from "@/components/ui/scroll-area"
import { Label } from "@/components/Form/Label"
import { mask } from "@/lib/maskMatricula"
import { AxiosResponse } from "axios"

interface ErrorResponse {
  message: string;
  status: number;
}

type VeiculoProps = {
  tiposVeiculo: TipoVeiculo[],
  //matricula: string,
  //cor: string,
}
export function VeiculoForm({ tiposVeiculo }:VeiculoProps) {
  // 1. Define your form.

  const notify = () => {
    toast.info("Registando...", {
      toastId: "customId",
    });
  }

  const router = useRouter();
  
  async function onSubmit(values: z.infer<typeof formSchemaVeiculo>) {
    if (!tipoVeiculo.id){
      toast.update("customId", {
        render: 'Tipo nao tem valor',
        type: "error",
      });
      return false;
    }
    values.idTipo = tipoVeiculo.id
    values.cor = color.hex
    values.matricula = matricula

    const response: AxiosResponse<any, any> | ErrorResponse = await CreateVeiculo(values);
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
  
const [matricula,setMatricula] = React.useState('');
const [tipoVeiculo,setTipoVeiculo] = React.useState<TipoVeiculo>({id:'',tipo:''});
const [color, setColor] = useColor("");

  const form = useForm<z.infer<typeof formSchemaVeiculo>>({
    resolver: zodResolver(formSchemaVeiculo),
    defaultValues: {
      idTipo: "",
      matricula: "",
      cor: "",
    },
  })
  //handle input change event

const handleChangeTipoVeiculo = (tipoVeiculo: TipoVeiculo) =>{
  setTipoVeiculo(tipoVeiculo);
  console.log(tipoVeiculo);
}

const handleChangeMatricula = (event: React.SyntheticEvent) => {
  console.log((event));
  const target = event.target as HTMLInputElement; // Diga que é um HTMLInputElement
  var currentValue = target.value
  setMatricula(mask(event));
} 
const filterTipoVeiculo = (inputValueTipoVeiculo: string) => {
  return tiposVeiculo.filter((i) =>
    i.tipo.toLowerCase().includes(inputValueTipoVeiculo.toLowerCase())
  );
};

const promiseTipoVeiculo = (inputValueTipoVeiculo: string) =>
  new Promise<TipoVeiculo[]>((resolve) => {
      resolve(filterTipoVeiculo(inputValueTipoVeiculo));
  });
  
return (
  <Form {...form}>
    <ScrollArea className="h-[100vh] w-[350px] pb-28 p-4">

    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3 p-1">
      <ToastContainer />
      <FormLabel>Tipo Veiculo</FormLabel>
        <AsyncSelect 
          cacheOptions 
          defaultOptions
          isClearable={true}
          value={tipoVeiculo}
          getOptionLabel={e => e.tipo}
          getOptionValue={e => e.id.toString()} 
          loadOptions={promiseTipoVeiculo}
          onChange={(handleChangeTipoVeiculo)}
        />
        <Label>Matricula</Label>
        <Input name="matricula" value={matricula} onChange={handleChangeMatricula} />
        <br />
        <div>User Input: {matricula}</div>
        <ColorPicker height={100} hideAlpha hideInput color={color} onChange={setColor} />
        <Button onClick={notify} type="submit" variant="primary">Submit</Button>
    </form>
    </ScrollArea>

  </Form>
  )
}