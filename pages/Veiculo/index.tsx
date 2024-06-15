export type Veiculo = {
    id: number,
    matricula: string,
    cor: string,
    tipo: string,

  }
  
  type VeiculoProps = {
    veiculo: Veiculo[],
    text:string
  }