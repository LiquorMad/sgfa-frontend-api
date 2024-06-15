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
import { Eye, FileEdit, Trash2 } from 'lucide-react';



type FilaInProps = {
  veiculos: Veiculo[],
  rotas: Rota[],
  current_rota_nome: string,
  filas:FilaIn[]
}


const index = ({ veiculos,rotas,current_rota_nome,filas }:FilaInProps) => {
  return (
    <AppLayout
      header={
          <b className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
              Fila de Entrada
          </b>
      }>
        <div className="container mx-auto py-10">
        <DataTable columns={columns} data={filas} />
    </div>
      <div>
        <ul>
        <b>Rota atual</b>
          <li>{current_rota_nome}</li>
        </ul>
        <ul>
          <b>Veiculos</b>
          {Array.isArray(veiculos) ? (
            veiculos.map((item: any) => (
              <li key={item.id}>Veiculos: {item.matricula}</li>
            ))
          ) : (
            <li>Veiculo is not an array</li>
          )}
        </ul>
        <ul>
        <b>Rotas:</b>
          {Array.isArray(rotas) ? (
            rotas.map((item: any) => (
              <li key={item.id}>{item.nome}</li>
            ))
          ) : (
            <b>Rota is not an array</b>
          )}
        </ul>
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
    const { data } = response.data;
    console.log(response.data.fila)

    return {
      props: {
        filas: response.data.fila,
        rotas: response.data.rotas,
        veiculos: response.data.veiculos,
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