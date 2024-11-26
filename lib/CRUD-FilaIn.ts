import * as z from "zod"
import { formSchemaUpdateFilaIn } from "./FormSchemaFilaIn";
import api, { csrf } from "./axios";
import { parseCookies } from "nookies";

const baseUrlFilaIn = 'http://127.0.0.1:3333/api/fila_ins';

type RegisterFilaInData = {
  idVeiculo: string;
  idRota: string;
}

export const CreateFilaIn = async (args: RegisterFilaInData) => {
  const {...props } = args
  try {
    await csrf()
    const response = await api.post('/api/fila_ins', props)
  
    console.log(response)
    return response;
  } catch (error) {
    return {
      message: 'Erro no registo',
      status: 400,
    };
  }

}
export async function MyTurnFilaIn(matricula: string) {

  const baseURL = '/api/fila_ins/my_turn';
  const endpoint = (`${baseURL}/${matricula}`)

  try {
    const { 'sgfa.token': token } = parseCookies()
      const response = await api.get(endpoint,{
          headers: {
            Authorization: 'Bearer '+token
          }
        });
        return {
          myTurn: response.data.myTurn,
          description: response.data.description,
          averageTime: response.data.averageTime,
          destiny: response.data.destiny
      };
  } catch (error) {
      // Handle error
      throw error;
  }
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
