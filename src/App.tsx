import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { CheckTickets, Dashboard, EventPackage, FamilyPackage, ManageTicket } from './pages'
import { DashboardLayout } from './layouts'
import ModalAddTickets from './components/Modal/ModalAddTickets'
import ModalUpdateTicketPakage from './components/Modal/ModalUpdateTicketPakage'
import ModalFilter from './components/Modal/ModalFilter'
import ListOfTicketPackages from './pages/Settings/ListOfTicketPackages'
import ModalChangeTicketDay from './components/Modal/ModalChangeDateTicketUse'
import { Toast } from './components'

const App = () => {
    return (
        <>
            <Router>
                <ModalChangeTicketDay />
                <ModalUpdateTicketPakage />
                <ModalFilter />
                <Toast />
                <Routes>
                    <Route Component={DashboardLayout}>
                        <Route path="/" Component={Dashboard} />
                        <Route path="/checking-tickets" Component={CheckTickets} />
                        <Route path="/manage-tickets" Component={ManageTicket}>
                            <Route path="/manage-tickets/family-ticket-package" Component={FamilyPackage} />
                            <Route path="/manage-tickets/event-ticket-package" Component={EventPackage} />
                        </Route>
                        <Route path="/settings/list-of-ticket-packages" Component={ListOfTicketPackages} />
                    </Route>
                </Routes>
            </Router>
        </>
    )
}

export default App
