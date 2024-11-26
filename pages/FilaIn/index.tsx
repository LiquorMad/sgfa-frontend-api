// pages/example.js
import AppLayout from '@/components/Layouts/AppLayout';
import React from 'react';
import { parseCookies } from 'nookies';
import api from '@/lib/axios';
import { GetServerSideProps } from 'next';
import { DataTable } from './data-table';
import { FilaIn, columns } from './columns';
import { Veiculo } from '../Veiculo';
import { Rota } from '../Rota';

type FilaInProps = {
  veiculosRegister: Veiculo[],
  veiculosTurn: Veiculo[],
  rotas: Rota[],
  current_rota_nome: string,
  filas:FilaIn[]
}

const  index = ({ veiculosRegister,veiculosTurn,rotas,current_rota_nome,filas }:FilaInProps) => {

  return (
    <AppLayout
      header={
          <b className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
            {current_rota_nome}
          </b>
      }>
        <div className="container mx-auto py-10">
        <DataTable columns={columns} data={filas} veiculosRegister={veiculosRegister} veiculosTurn={veiculosTurn} rotas={rotas}/>
    </div>
      
    </AppLayout>  
  );
};

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
    const response = await api.get('api/fila_ins',{
      headers: {
        Authorization: 'Bearer '+token
      }
    });
    console.log(response.data);
    return {
      props: {
        filas: response.data.fila,
        rotas: response.data.rotas,
        veiculosRegister: response.data.veiculosRegister,
        veiculosTurn: response.data.veiculosTurn,
        current_rota_nome: response.data.current_rota_nome,
      }
      
    };
  } catch (error) {
    // Handle error
    console.error('Error fetching data:', error);
    return {
      props: {
        rotas: [],
        current_rota_nome: '',
        fila: [],
        veiculos: [],
        error: 'Failed to fetch data',
      }
    };
  }
}

export default index;