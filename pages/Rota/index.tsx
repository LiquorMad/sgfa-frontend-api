import { Zona } from "../Zona"

export type Rota = {
    id: string,
    nome: string,
    cor: string,
    tipo: string,
  }
  
  type RotaProps = {
    rota: Rota[],
    text:string
  }