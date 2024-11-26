import * as z from "zod"
import { formSchemaRegisterFilaIn, formSchemaUpdateFilaIn } from "./FormSchemaFilaIn";

const baseUrlFilaIn = 'http://127.0.0.1:3333/api/players';

export async function CreateFilaIn(players: z.infer<typeof formSchemaRegisterFilaIn>){
    const JSONdata = JSON.stringify(players)
    const endpoint = baseUrlFilaIn;
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSONdata,
    }
    const response = await fetch(endpoint, options)
    return response;
}

export async function DeleteFilaIn(id:number){
    const endpoint = (`${baseUrlFilaIn}/${id}`)
    const options = {
      method: 'DELETE',
    }
    await fetch(endpoint, options)
  }

  export async function UpdateFilaIn(player: z.infer<typeof formSchemaUpdateFilaIn>){
    const JSONdata = JSON.stringify(player)
    const endpoint = `${baseUrlFilaIn}/${player.id}`
    const options = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSONdata,
    }
    const response = await fetch(endpoint, options)
    return response;
  }
