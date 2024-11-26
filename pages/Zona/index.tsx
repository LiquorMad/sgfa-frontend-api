import AppLayout from '@/components/Layouts/AppLayout';
import { DataTable } from './data-table';
import { GetServerSideProps } from 'next';
import { parseCookies } from 'nookies';
import api from '@/lib/axios';
import { Concelho } from '../Concelho';
import { columns } from './columns';

export type Zona = {
    id: number,
    nome: string,
  }
  
  type ZonaProps = {
    zonas: Zona[],
    text:string,
    concelhos: Concelho[],
  }
  
  const index = ({zonas,concelhos}: ZonaProps) =>{
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
          <DataTable columns={columns} data={zonas} concelho={concelhos} />
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
      const response = await api.get('api/zonas',{
        headers: {
          Authorization: 'Bearer '+token
        }
      });
      console.log(response.data.concelhos);
      return {
        props: {
          zonas: response.data.zonas,
          concelhos: response.data.concelhos
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
