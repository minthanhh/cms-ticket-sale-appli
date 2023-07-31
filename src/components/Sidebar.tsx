import { NavLink } from 'react-router-dom';
import Logo from './Logo';

const Sidebar = () => {
   const routes = [
      {
         label: 'Trang chủ',
         pathname: '/',
      },
      {
         label: 'Quản lý vé',
         pathname: '/manage-tickets',
      },
      {
         label: 'Đối soát vé',
         pathname: '/checking-tickets',
      },
      {
         label: 'Cài đặt',
         pathname: '/settings/list-of-ticket-packages',
      },
   ];

   return (
      <div className="w-[16.71875%] flex flex-col mx-auto justify-start pt-[17px] pl-[33px] pr-[36px] h-full">
         <Logo />

         <nav className="w-full flex">
            <ul className="flex flex-col gap-2 w-full">
               {routes.map((route, idx) => (
                  <li key={route.label + idx} className="block">
                     <NavLink
                        className={({ isActive }) =>
                           isActive
                              ? 'bg-primary text-white default-animate py-[15px] block pl-6 rounded-lg font-montserrat text-lg font-bold leading-[26px]'
                              : 'text-navigation bg-transparent default-animate py-[15px] pl-6 block rounded-lg font-montserrat text-lg font-bold leading-[26px]'
                        }
                        to={route.pathname}
                     >
                        {route.label}
                     </NavLink>
                  </li>
               ))}
            </ul>
         </nav>
      </div>
   );
};

export default Sidebar;
