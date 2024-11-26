import AppLayout from "@/components/Layouts/AppLayout"
import { DataTable } from "./data-table"
import { columns } from "./columns"
import { GetServerSideProps } from "next"
import { parseCookies } from "nookies"
import api from "@/lib/axios"

export type TipoVeiculo = {
  id: string,
  tipo: string,
  
}

export type Veiculo = {
    id: string,
    matricula: string,
    cor: string,
    tipo: string,
  }
  
  type VeiculoProps = {
    veiculos: Veiculo[],
    tiposVeiculo: TipoVeiculo[],
  
  }

  const index = ({veiculos,tiposVeiculo}: VeiculoProps) =>{
    return (
      <AppLayout
        header={
            <b className="font-semibold text-xl 
              text-gray-800 
              dark:text-gray-200 
              leading-tight">
            </b>
        }>
          <div className="container mx-auto py-10">
          <DataTable columns={columns} data={veiculos} tiposVeiculo={tiposVeiculo} />
      </div>
        
      </AppLayout>  
    );
  }
  export const getServerSideProps: GetServerSideProps = async (ctx) => {
    try {
      // Fetch data from an API
      const { ['sgfa.token']: token } = parseCookies(ctx)
      if(!token) 
        return{
          redirect:{
            destination:'/',
            permanent: false,
          }
        }
      const response = await api.get('api/veiculos',{
        headers: {
          Authorization: 'Bearer '+token
        }
      });
      console.log(response.data.tiposVeiculo);
      return {
        props: {
          veiculos: response.data.veiculos,
          tiposVeiculo: response.data.tiposVeiculo
        }
      };
    } catch (error) {
      // Handle error
      console.error('Error fetching data:', error);
      return {
        props: {
          data: [],
          error: 'Failed to fetch data',
        }
      };
    }
  }
  
  export default index;