import * as z from "zod"
import api, { csrf } from "./axios";
import { parseCookies } from "nookies";
import { AxiosResponse } from "axios";

interface ErrorResponse {
  message: string;
  status: number;
}

const baseUrlVeiculo = 'http://127.0.0.1:3333/api/veiculos';

type RegisterVeiculoData = {
  idTipo: string;
  matricula: string;
  cor: string;
}

export const CreateVeiculo = async (args: RegisterVeiculoData): Promise<AxiosResponse<any> | ErrorResponse> => {
  const { ...props } = args;
  try {
    await csrf(); // Presumivelmente, isto faz alguma verificação de segurança
    const response: AxiosResponse = await api.post('/api/veiculos/', props);
    console.log(response);
    return response; // Retorna a resposta bem-sucedida do Axios
  } catch (error: any) {
    // Retorna um erro customizado se algo der errado
    return {
      message: error.response?.data?.error || 'Erro desconhecido',
      status: error.response?.status || 500,
    };
  }
};
export async function MyTurnVeiculo(matricula: string) {

  const baseURL = '/api/veiculos/my_turn';
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

export async function DeleteVeiculo(id:number){
    const endpoint = (`${baseUrlVeiculo}/${id}`)
    const options = {
      method: 'DELETE',
    }
    await fetch(endpoint, options)
  }

  export async function UpdateVeiculo(player: z.infer<typeof formSchemaUpdateVeiculo>){
    const JSONdata = JSON.stringify(player)
    const endpoint = `${baseUrlVeiculo}/${player.id}`
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
