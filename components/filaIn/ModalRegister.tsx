"use client"

import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/router"

import React, { useState } from "react"
import { formSchemaCreateFilaIn } from "@/manage-data/FormSchemaFilaIn"
import { CreateFilaIn } from "@/manage-data/CRUD-FilaIn"
import Modal from "../Modal"
import { Rota } from "@/pages/Rota"
import { Veiculo } from "@/pages/Veiculo"

type FilaInProps = {
  rotas: Rota[],
  veiculos: Veiculo[],
  visible: boolean,
  onClose: () => void,
}
export function ModalRegister({ visible, onClose,rotas,veiculos }:FilaInProps) {
  if(!visible) return null;
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchemaCreateFilaIn>>({
    resolver: zodResolver(formSchemaCreateFilaIn),
    defaultValues: {
      idRota: "",
      idVeiculo: "",
    },
  })
  const router = useRouter();
  async function onSubmit(values: z.infer<typeof formSchemaCreateFilaIn>) {
    const response = await CreateFilaIn(values)
    
    if(response.status==201){
      
      router.push('/match');
      onClose()
    }
    
  }
return (
  <Modal visible={visible} onClose={onClose}>
    <ScrollArea className="h-[400px] w-[450px] rounded-md border p-4">
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 p-1">
        <FormField
          control={form.control}
          name="idRota"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Rota</FormLabel>
              <FormControl>
              <Select onValueChange={field.onChange} >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Escolhe o Player 1" />
                </SelectTrigger>
                <SelectContent>
                <ScrollArea className="h-[200px] w-[200px] rounded-md border p-4">
                  {rotas.map((rota:any) =>(
                    <SelectItem  
                      value={rota.id.toString()} 
                      key={rota.id}>{rota.nome}
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
          name="idVeiculo"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Veiculo</FormLabel>
              <FormControl>
              <Select onValueChange={field.onChange} >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Escolhe o Player 2" />
                </SelectTrigger>
                <SelectContent>
                <ScrollArea className="h-[200px] w-[200px] rounded-md border p-4">
                  {veiculos.map((veiculo:any) =>(
                    <SelectItem 
                      value={veiculo.id.toString()} 
                      key={veiculo.id}>{veiculo.matricula}
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
  )
}