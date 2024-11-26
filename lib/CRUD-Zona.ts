import * as z from "zod"
import { formSchemaCreateZona, formSchemaUpdateZona } from "./FormSchemaZona";
import { Zona } from "@/pages/Zona/columns";
import api, { csrf } from "./axios";
import { parseCookies } from "nookies";
import axios, { AxiosResponse } from "axios";

const baseUrlZona = 'http://127.0.0.1:3333/api/fila_ins';
interface ErrorResponse {
  message: string;
  status: number;
}
type RegisterZonaData = {
  nome: string;
  idConcelho: string;
}
export const CreateZona = async (args: RegisterZonaData): Promise<AxiosResponse<any> | ErrorResponse> => {
  const { ...props } = args;
  try {
    await csrf(); // Presumivelmente, isto faz alguma verificação de segurança
    const response: AxiosResponse = await api.post('/api/zonas/', props);
    return response; // Retorna a resposta bem-sucedida do Axios
  } catch (error: any) {
    // Retorna um erro customizado se algo der errado
    console.log(error.response.data.error); //
    return {
      message: error.response.data.error || 'Erro descomnhecido',
      status: error.response?.status || 500,
    };
  }
};
export const CreateZona_old = async (args: RegisterZonaData) => {
  const {...props } = args
  try {
    await csrf()
    const response = await api.post('/api/zonas', props)
    console.log(response)
    return response;
  } catch (error) {
    return {
      message: 'Erro no registo',
      status: 400,
    };
  }

}

export async function DeleteZona(id:number){
    const endpoint = (`${baseUrlZona}/${id}`)
    const options = {
      method: 'DELETE',
    }
    await fetch(endpoint, options)
  }

  export async function UpdateZona(player: z.infer<typeof formSchemaUpdateZona>){
    const JSONdata = JSON.stringify(player)
    const endpoint = `${baseUrlZona}/${player.id}`
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