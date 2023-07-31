import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CheckTickets, Dashboard, ManageTicket } from './pages';
import { DashboardLayout } from './layouts';
import ListOfTicketPackages from './pages/Settings/ListOfTicketPackages';
import ModalAddTickets from './components/Modal/ModalAddTickets';
import ModalUpdateTicketPakage from './components/Modal/ModalUpdateTicketPakage';

const App = () => {
   return (
      <>
         <Router>
            <ModalAddTickets />
            <ModalUpdateTicketPakage />
            <Routes>
               <Route Component={DashboardLayout}>
                  <Route path="/" Component={Dashboard} />
                  <Route path="/checking-tickets" Component={CheckTickets} />
                  <Route path="/manage-tickets" Component={ManageTicket} />
                  <Route
                     path="/settings/list-of-ticket-packages"
                     Component={ListOfTicketPackages}
                  />
               </Route>
            </Routes>
         </Router>
      </>
   );
};

export default App;
