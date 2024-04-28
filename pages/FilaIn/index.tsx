// pages/example.js
import AppLayout from '@/components/Layouts/AppLayout';
import React from 'react';
import { parseCookies } from 'nookies';
import api from '@/lib/axios';
import { GetServerSideProps } from 'next';

const index = ({ veiculos,rotas,current_rota_nome,fila }:any) => {
  return (
    <AppLayout
      header={
          <b className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
              Fila de Entrada
          </b>
      }>
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
              <li key={item.id}>{item}</li>
            ))
          ) : (
            <b>Rota is not an array</b>
          )}
        </ul>
        <ul>
        <b>Fila</b>
          {Array.isArray(fila) ? (
            fila.map((item: any) => (
              <>
                  <li key={item.id}>Matricula: {item.matricula}</li>
                  <li key={item.id}>Data: {item.created_at}</li>
              </>

            ))
          ) : (
            <li>Fila de entrada is not an array</li>
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
    console.log(response.data)

    return {
      props: {
        fila: response.data.fila,
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