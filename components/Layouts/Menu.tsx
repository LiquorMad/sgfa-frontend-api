import { FaClipboardList } from "react-icons/fa";
import { MdSpaceDashboard } from "react-icons/md";
import { IoMdBus } from "react-icons/io";
import { GoChecklist } from "react-icons/go";
import { AiOutlineStop } from "react-icons/ai";
import { FaUsers } from "react-icons/fa";
import { FaCity } from "react-icons/fa";
import { FaRoute } from "react-icons/fa";
export const Menu  = [
    {id:1,title:'Dashboard',href:'/dashboard',icon: <MdSpaceDashboard />},
    {id:2,title:'Veiculo',href:'/Veiculo',icon: <IoMdBus />},
    {id:3,title:'Fila de Entrada',href:'/FilaIn',icon: <FaClipboardList />},
    {id:4,title:'Fila de Saida',href:'/FilaOut',icon: <GoChecklist />},
    {id:5,title:'Punição',href:'/FilaOut',icon: <AiOutlineStop />},
    {id:6,title:'Funcionario',href:'/Funcionario',icon: <FaUsers />},
    {id:7,title:'Rota',href:'/Rota',icon: <FaRoute />},
    {id:8,title:'Zona',href:'/Zona',icon: <FaCity />},
];

