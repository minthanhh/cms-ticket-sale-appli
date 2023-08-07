import { Header, Sidebar } from '@/components';

import { Outlet } from 'react-router-dom';

const Dashboard = () => {
   return (
      <div className="flex items-start w-full h-full flex-1">
         <Sidebar />

         <div className="w-[83.28125%] h-full flex flex-shrink-0 flex-grow flex-col mr-[32px]">
            <Header />
            <main className="w-full h-full">
               <Outlet />
            </main>
         </div>
      </div>
   );
};

export default Dashboard;
