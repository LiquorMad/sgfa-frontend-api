import NavLink from '@/components/NavLink'
import { useRouter } from 'next/router'
import { Menu } from './Menu'

const Navigation = ({visible}:any) => {
   const router = useRouter()
    
    return (
         <>
            <div className= {` nav-hover min-h-full h-screen bg-primary_color ${visible ? "sideOpen":"w-14 "}`}>
               <div className="h-full px-3 overflow-y-auto bg-primary_color">
                  <ul  className=" fixed space-y-2 font-medium ">
                  <li className=' space-bordered'></li>
                     {Array.isArray(Menu) ? (
                     Menu.map((item: any) => (
                     <div>
                        <li key={item.id} >
                           <div className={` flex items-center   text-white rounded-sm
                              ${router.pathname === `${item.href}`  ?'active ': ''}`}>
                                    {visible ? (
                                       <>
                                          {item.icon}
                                          <NavLink
                                             href={item.href}
                                             active={router.pathname === `${item.href}`}>
                                             {item.title}
                                          </NavLink>
                                       </>
                                ) : (
                                    <>
                                       <NavLink
                                          href={item.href}
                                          active={router.pathname === `${item.href}`}>
                                          {item.icon}
                                       </NavLink>
                                    </>
                                )}
                           </div>
                        </li>
                     </div>
                     ))
                     ) : (
                        <li>No main</li>
                     )}
                  </ul>
               </div>
            </div>
         </>
   )
}
export default Navigation