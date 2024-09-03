import { Link, NavLink, useLocation } from 'react-router-dom'
import Logo from './Logo'
import { Home, HomeActive, Invoice, InvoiceActive, Setting, SettingActive, Ticket, TicketActive } from '@/assets'

const Sidebar = () => {
    const location = useLocation()

    const routes = [
        {
            label: 'Trang chủ',
            pathname: '/',
            icon: Home,
            activeIcon: HomeActive,
            active: location.pathname === '/',
        },
        {
            activeIcon: TicketActive,
            label: 'Quản lý vé',
            pathname: '/manage-tickets/family-ticket-package',
            active: location.pathname === '/manage-tickets/family-ticket-package',
            icon: Ticket,
        },
        {
            label: 'Đối soát vé',
            pathname: '/checking-tickets',
            activeIcon: InvoiceActive,
            active: location.pathname === '/checking-tickets',
            icon: Invoice,
        },
        {
            label: 'Cài đặt',
            pathname: '/settings/list-of-ticket-packages',
            activeIcon: SettingActive,
            active: location.pathname === '/settings/list-of-ticket-packages',
            icon: Setting,
        },
    ]

    return (
        <div className="w-1/5 flex flex-col mx-auto justify-start pt-[17px] pl-[33px] pr-[36px] h-full">
            <Logo />

            <nav className="w-full flex">
                <ul className="flex flex-col gap-2 w-full">
                    {routes.map((route, idx) => (
                        <li key={route.label + idx} className="block">
                            <NavLink
                                className={({ isActive }) =>
                                    isActive
                                        ? 'bg-primary text-white default-animate py-[15px] block pl-6 rounded-lg font-montserrat text-base font-bold leading-[26px]'
                                        : 'text-navigation bg-transparent default-animate py-[15px] pl-6 block rounded-lg font-montserrat text-base font-bold leading-[26px]'
                                }
                                to={route.pathname}>
                                <span className="flex items-center gap-3">
                                    {route.active ? <img src={route.activeIcon} alt="" /> : <img src={route.icon} alt="" />}
                                    {route.label}
                                </span>
                            </NavLink>
                            {route.pathname.includes('/settings') ? (
                                <Link to={route.pathname} className="flex items-center justify-center leading-[26px] text-lg font-medium font-montserrat tracking-[1.5%] text-secondary mt-2">
                                    Gói dịch vụ
                                </Link>
                            ) : null}
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    )
}

export default Sidebar
