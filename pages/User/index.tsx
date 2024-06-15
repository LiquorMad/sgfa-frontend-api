import { Zona } from "../Zona"

export type User = {
    id: number,
    name: string,
    apelido: string,
    email: string,
    tipo: string,
    morada: Zona,
    estado: string,
  }
  
  type UserProps = {
    user: User[],
    text:string
  }