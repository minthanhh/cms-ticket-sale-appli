import { Heading } from '@/components'
import { useAppDispatch } from '@/hooks/storeHooks'
import { NavLink, Outlet } from 'react-router-dom'
import { useEffect } from 'react'
import { getAllTicketPackage } from '@/store/slices/ticketSlice'

const ManageTicket = () => {
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(getAllTicketPackage())
    }, [dispatch])

    return (
        <div className="w-full h-[calc(100%_-_32px)] bg-white rounded-3xl shadow-md overflow-hidden mb-[32px] p-6">
            <Heading title="Quản lý vé" />
            <div className="flex items-center gap-[48px] mb-6">
                <NavLink
                    className={({ isActive }) =>
                        isActive
                            ? 'text-[#FF993C] leading-[26px] font-bold font-montserrat text-lg default-animate p-1 border-b-[#FF993C] border-b-4'
                            : 'leading-[26px] text-lg text-[#919DBA] font-montserrat font-bold default-animate p-1 border-b-4'
                    }
                    to={'/manage-tickets/family-ticket-package'}>
                    Gói gia đình
                </NavLink>
                <NavLink
                    className={({ isActive }) =>
                        isActive
                            ? 'text-[#FF993C] leading-[26px] font-bold font-montserrat text-lg default-animate p-1 border-b-[#FF993C] border-b-4'
                            : 'leading-[26px] text-lg text-[#919DBA] font-montserrat font-bold default-animate p-1 border-b-4'
                    }
                    to={'/manage-tickets/event-ticket-package'}>
                    Gói sự kiện
                </NavLink>
            </div>

            <Outlet />
        </div>
    )
}

export default ManageTicket
