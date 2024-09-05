import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { CheckTickets, Dashboard, EventPackage, FamilyPackage, ManageTicket } from './pages'
import { RootLayout, SidebarLayout } from './layouts'
import ModalUpdateTicketPakage from './components/Modal/ModalUpdateTicketPakage'
import ModalFilter from './components/Modal/ModalFilter'
import ListOfTicketPackages from './pages/Settings/ListOfTicketPackages'
import ModalChangeTicketDay from './components/Modal/ModalChangeDateTicketUse'
import { Toast } from './components'
import { AuthGuard } from './guards'

const App = () => {
    return (
        <>
            <Router>
                <ModalChangeTicketDay />
                <ModalUpdateTicketPakage />
                <ModalFilter />
                <Toast />
                <Routes>
                    <Route Component={RootLayout}>
                        <Route Component={AuthGuard}>
                            <Route Component={SidebarLayout}>
                                <Route path="/" Component={Dashboard} />
                                <Route path="checking-tickets" Component={CheckTickets} />
                                <Route path="manage-tickets" Component={ManageTicket}>
                                    <Route index path="family-ticket-packages" Component={FamilyPackage} />
                                    <Route path="event-ticket-packages" Component={EventPackage} />
                                </Route>
                                <Route path="settings">
                                    <Route index element={<Navigate to="ticket-packages" replace />} />
                                    <Route path="ticket-packages" Component={ListOfTicketPackages} />
                                </Route>
                            </Route>
                        </Route>
                        {/* <Route path="login" Component={Authenticate} /> */}
                    </Route>
                </Routes>
            </Router>
        </>
    )
}

export default App
