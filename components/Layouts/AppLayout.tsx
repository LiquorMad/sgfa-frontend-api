import { PropsWithChildren, ReactNode, useContext, useState } from 'react'
import { FaBars } from "react-icons/fa6";
import { TbLogout2 } from "react-icons/tb";
import { FaUser } from "react-icons/fa";
import { IoLogOut } from "react-icons/io5";
import { parseCookies } from 'nookies'
import { recoverUserInformation, signOutRequest } from '@/lib/auth'
import { AuthContext } from '@/context/AuthContext'
import DropdownLink, { DropdownButton } from '../DropdownLink'
import Dropdown from '../Dropdown'
import Navigation from './Navigation';
interface Props {
    header: ReactNode
}
async function logout(){
    const { 'sgfa.token': token } = parseCookies()
    signOutRequest(token);
}

const AppLayout = ({ header, children }: PropsWithChildren<Props>) => {
    
    const  {user}  = useContext(AuthContext);
    const d = new Date();
    let year = d.getFullYear();
    const [openMenu, setOpenMenu] = useState(true)

        return (
            <div className="flex">
                <div onMouseEnter={() => setOpenMenu(true)} className='hover:cursor-pointer'>
                    <Navigation visible={openMenu} />
                </div>
                <div className="w-full">
                    {/* Page Heading */}
                    <header className=" w-full bg-white border-bborder-gray-200 shadow md:flex 
                        md:items-center h-16 dark:bg-gray-800 dark:border-gray-600">
                    <div className='flex p-2'>
                        <FaBars 
                            className='cursor-pointer'
                            size={23}
                            color='#000000a7'
                            onClick={() => setOpenMenu(!openMenu)} />
                        <h1>SISTEMA DE GESTÃO DE FILA DE AUTOMOVÉIS</h1>
                    </div>
                        {/* Settings Dropdown */}
                        <div className="shadow-2xl absolute right-0">
                            <div className="">
                                <Dropdown
                                    align="right"
                                    width="48"
                                    trigger={
                                        <span className="inline-flex rounded-md">
                                            <button className="inline-flex items-center px-3 
                                                py-2 border border-transparent text-sm leading-4 
                                                font-medium rounded-md text-gray-500 
                                                dark:text-gray-400 bg-white dark:bg-gray-800 
                                                hover:text-gray-700 dark:hover:text-gray-300 
                                                focus:outline-none transition ease-in-out 
                                                duration-150">
                                                {user?.name}
                                                <svg className="ml-2 -mr-0.5 h-4 w-4"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 20 20">
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M5.293 7.293a1 1 0 011.414 0L10 
                                                        10.586l3.293-3.293a1 1 0 111.414 1.414l-4 
                                                        4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                            </button>
                                        </span>
                                    }>
                                    {/* Authentication */}
                                    {/* TODO: add active state */}
                                    <DropdownLink href="/profile"> <FaUser size={18} color='' className=''/> Profile </DropdownLink>
                                    <DropdownButton onClick={logout}> <IoLogOut color='' size={22} /> Logout </DropdownButton>
                                </Dropdown>
                            </div>
                        </div>
                    </header>
                    <div> {header} </div>
                    {/* Page Content */}
                    <div>{children}</div>
                    <footer className="footer fixed bottom-0 w-full bg-white border-t
                        hadow md:flex md:items-center md:justify-between md:p-6 
                        ">Copyright &copy; {year} Leonildo Moniz  </footer>    
                </div>
            </div>        
    )
}
export default AppLayout