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
import { formSchemaCreateFilaIn } from "@/lib/FormSchemaFilaIn"
import { CreateFilaIn } from "@/lib/CRUD-FilaIn"
import { Rota } from "../Rota"
import { Veiculo } from "../Veiculo"
import { revalidatePath } from "next/cache"

type FilaInProps = {
  rotas: Rota[],
  veiculosRegister: Veiculo[],
  
}
export function FilaInForm({rotas,veiculosRegister }:FilaInProps) {
  // 1. Define your form.

  const notify = () => {
    toast.info("Registando...", {
      toastId: "customId",
    });
  }

  const router = useRouter();
  
  async function onSubmit(values: z.infer<typeof formSchemaCreateFilaIn>) {
    values.idRota = selectedValueRotas.id
   values.idVeiculo = selectedValueVeiculos.id

    const response = await CreateFilaIn(values)
    console.log(response)
    if(response.status === 201) {
      router.reload();
      toast.update("customId", {
        render: 'Registado com sucesso',
        type: "success",
      });
    }else{
      toast.update("customId", {
        render: "Erro no registo",
        type: "error",
      });
    }
// Force refresh the page
    
  }
  
 
const [inputValueVeiculos,setValueVeiculos] = React.useState('');
const [selectedValueVeiculos,setSelectedValueVeiculos] = React.useState('');

const [inputValueRotas,setValueRotas] = React.useState('');
const [selectedValueRotas,setSelectedValueRotas] = React.useState('');

  const form = useForm<z.infer<typeof formSchemaCreateFilaIn>>({
    resolver: zodResolver(formSchemaCreateFilaIn),
    defaultValues: {
      idVeiculo: "",
      idRota: "",
    },
  })
//handle input change event
const hadleInputChargeVeiculos = valueVeiculo =>{
  setValueVeiculos(valueVeiculo);
}
//handle selection 
const handleChangeVeiculos = valueVeiculo => {
  setSelectedValueVeiculos(valueVeiculo);
} 
const hadleInputChargeRotas = valueRota =>{
  setValueVeiculos(valueRota);
}
//handle selection 
const handleChangeRotas = valueRota => {
  setSelectedValueRotas(valueRota);
} 

const filterVeiculos = (inputValueVeiculos: string) => {
  return veiculosRegister.filter((i) =>
    i.matricula.toLowerCase().includes(inputValueVeiculos.toLowerCase())
  );
};


const promiseVeiculos = (inputValueVeiculos: string) =>
  new Promise<Veiculo[]>((resolve) => {
    setTimeout(() => {
      resolve(filterVeiculos(inputValueVeiculos));
    }, 1000);
  });

  const filterRotas = (inputValueVeiculos: string) => {
    return rotas.filter((i) =>
      i.nome.toLowerCase().includes(inputValueRotas.toLowerCase())
    );
  };
  
  const promiseRotas = (inputValueRotas: string) =>
    new Promise<Rota[]>((resolve) => {
      setTimeout(() => {
        resolve(filterRotas(inputValueRotas));
      }, 1000);
    });
    
  
return (
  <>
  
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 p-1">
        <ToastContainer />
        <AsyncSelect 
                  cacheOptions 
                  defaultOptions
                  isClearable={true}
                  value={selectedValueVeiculos}
                  getOptionLabel={e => e.matricula}
                  getOptionValue={e => e.id.toString()} 
                  loadOptions={promiseVeiculos}
                  onChange={handleChangeVeiculos}
                />
                <AsyncSelect 
                  cacheOptions 
                  defaultOptions
                  isClearable={true}
                  value={selectedValueRotas}
                  getOptionLabel={e => e.nome}
                  getOptionValue={e => e.id.toString()} 
                  loadOptions={promiseRotas}
                  onChange={handleChangeRotas}
                />
        
        <Button onClick={notify} type="submit" variant="primary">Submit</Button>
      </form>
      </>
  )
}