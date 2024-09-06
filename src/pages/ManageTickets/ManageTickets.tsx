import { useAppDispatch, useAppSelector } from '@/hooks/storeHooks'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { getTickets } from '@/store/slices/ticketSlice'
import { Tabs, Divider, Input, Button } from 'antd'
import EventPackages from './Packages/EventPackages'
import FamilyPackages from './Packages/FamilyPackages'
import { RootState } from '@/store'
import { FilterValues, ITicket, TicketPackageType } from '@/types'
import { ModalFilterTicket } from '@/components/Modal/ModalFilterTicket'
import { FiFilter } from 'react-icons/fi'
import { ContentContainer } from '@/components'

const ManageTickets = () => {
    const dispatch = useAppDispatch()
    const [isError, setIsError] = useState(false)
    const { tickets, isTicketLoading } = useAppSelector((state: RootState) => state.ticket)
    const [isOpen, setIsOpen] = useState(false)

    const onOpenModal = useCallback(() => setIsOpen((v) => !v), [])

    const loadTickets = useCallback(
        (filterValues?: FilterValues) => {
            dispatch(getTickets(filterValues)).catch((error) => {
                console.error(error)
                setIsError(true)
            })
        },
        [dispatch],
    )

    useEffect(() => loadTickets(), [loadTickets])

    const [familyPackages, eventPackages] = useMemo(() => {
        const family: ITicket[] = []
        const event: ITicket[] = []
        const ticketLength: number = tickets.length
        for (let i = 0; i < ticketLength; i++) {
            switch (tickets[i].packageType) {
                case TicketPackageType.EVENT_PACKAGE:
                    event.push(tickets[i])
                    break
                default:
                    family.push(tickets[i])
            }
        }
        return [family, event]
    }, [tickets])

    return (
        <ContentContainer title="Quản lý vé">
            <div className="flex items-center justify-between mb-4">
                <Input.Search className="w-1/4" placeholder="Tìm bằng số vé" />
                <div className="flex items-center gap-2">
                    <Button icon={<FiFilter />} htmlType="button" onClick={onOpenModal}>
                        Lọc vé
                    </Button>
                    <Button htmlType="button">Xuất file (.csv)</Button>
                </div>
            </div>
            <Divider />
            <Tabs
                defaultActiveKey={TicketPackageType.FAMILY_PACKAGE}
                items={[
                    {
                        key: TicketPackageType.FAMILY_PACKAGE,
                        label: 'Gói gia đình',
                        children: <FamilyPackages isTicketLoading={isTicketLoading} loadTickets={loadTickets} isError={isError} familyPackages={familyPackages} />,
                    },
                    {
                        key: TicketPackageType.EVENT_PACKAGE,
                        label: 'Gói sự kiện',
                        children: <EventPackages isTicketLoading={isTicketLoading} loadTickets={loadTickets} isError={isError} eventPackages={eventPackages} />,
                    },
                ]}
            />
            <ModalFilterTicket open={isOpen} onCancel={() => setIsOpen(false)} loadTickets={loadTickets} />
        </ContentContainer>
    )
}

export default ManageTickets
