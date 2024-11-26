// src/components/MyTurnComponent.js
// src/components/VehicleInfo.tsx
import { Button } from '@/components/ui/button';
import api from '@/lib/axios';
import { parseCookies } from 'nookies';
import React, { useEffect, useState } from 'react';

interface Vehicle {
  destiny: string;
  description: string;
  averageTime: string;
  myTurn: string;
  matricula: string;
}

interface VehicleInfoProps {
  matricula: string;
  onClose: any;

}

const MyTurnComponent: React.FC<VehicleInfoProps> = ({ matricula,onClose }) => {
  const [vehicle, setVehicle] = useState<Vehicle | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Simulate an API call to fetch vehicle information based on the matricula
    const fetchMyTurnComponent = async () => {

      const baseURL = '/api/fila_ins/my_turn';
      const endpoint = (`${baseURL}/${matricula}`)
    
      try {
        const { 'sgfa.token': token } = parseCookies()
          const response = await api.get(endpoint,{
              headers: {
                Authorization: 'Bearer '+token
              }
            });
          setVehicle(response.data);
      } catch (error) {
          // Handle error
          throw error;
      }

    };

    fetchMyTurnComponent();
  }, [matricula]);

  if (!vehicle) {
    return <p>No vehicle information found</p>;
  }

  return (
    <div className=" alert-info w-80  h-min:32 bg-white absolute top-5 right-2 z-10 p-6">
      <div className='title-info-alert'>Info</div>
      <div className='matricula-info'>{vehicle.matricula}</div>
      <ul className='list-info pl-8'>
        <li>Destino: {vehicle.destiny}</li>
        <li>Description: {vehicle.description}</li>
        <li>Minha vez: {vehicle.myTurn}</li>
        <li>Tempo de espero: {vehicle.averageTime}</li>
      </ul>
      {/* Add more vehicle details as needed */}
      <Button className=' absolute top-0 right-0'  onClick={onClose}>X</Button>
    </div>
  );
};

export default MyTurnComponent;
