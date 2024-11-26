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
    
  </Modal>
  )
}