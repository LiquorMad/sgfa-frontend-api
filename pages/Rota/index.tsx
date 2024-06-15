import { Zona } from "../Zona"

export type Rota = {
    id: number,
    zona: string,
    cor: string,
    tipo: string,
  }
  
  type RotaProps = {
    rota: Rota[],
    text:string
  }