import { Button, Heading } from '@/components'
import TableSearch from '@/components/Table/SearchTable'
import { ITicketPackage } from '@/types'
import { DatePicker, Radio, Table } from 'antd'
import type { TableColumnsType } from 'antd'
import { useEffect, useState } from 'react'
import { BiSolidLeftArrow, BiSolidRightArrow } from 'react-icons/bi'
import { twMerge } from 'tailwind-merge'
import { LuCalendarDays } from 'react-icons/lu'
import dayjs from 'dayjs'
import { useAppDispatch, useAppSelector } from '@/hooks/storeHooks'
import { RootState } from '@/store'
import { getAllTicketPackage } from '@/store/slices/ticketSlice'
import { checkTickets } from '@/store/slices/ticketSlice'
import { exportToCSV } from '@/helpers'

const CheckTickets = () => {
    const { listTicketPackage, isLoading } = useAppSelector((state: RootState) => state.ticket)

    const dispatch = useAppDispatch()
    const [dataTable, setDataTable] = useState<ITicketPackage[]>([])
    const [filterdData, setFilteredData] = useState<ITicketPackage[]>([])
    const [searchText, setSearchText] = useState<string>('')
    const [checkTicket, setCheckTicket] = useState<boolean>()
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')
    const [checkedTicket, setCheckedTicket] = useState(false)

    const columns: TableColumnsType<ITicketPackage> = [
        {
            title: 'STT',
            dataIndex: 'stt',
            key: 'stt',
        },
        {
            title: 'Số vé',
            dataIndex: 'ticketNumber',
            key: 'ticketNumber',
        },
        {
            title: 'Ngày sử dụng',
            dataIndex: 'effectiveDate',
            key: 'effectiveDate',
            render(value, _) {
                return `${value.date}`
            },
        },
        {
            title: 'Tên loại vé',
            dataIndex: 'ticketTypeName',
            key: 'ticketTypeName',
        },
        {
            title: 'Cổng check - in',
            dataIndex: 'checkInGate',
            key: 'checkInGate',
        },
        {
            dataIndex: 'checkTicket',
            key: 'checkTicket',
            render(value) {
                return <span className={twMerge('italic font-montserrat leading-[22px] text-sm font-medium', value ? 'text-[#FD5959]' : 'text-[#A5A8B1]')}>{value ? 'Đã đối soát' : 'Chưa đối soát'}</span>
            },
        },
    ]

    useEffect(() => {
        dispatch(getAllTicketPackage())
    }, [dispatch])

    useEffect(() => {
        setDataTable(listTicketPackage)
    }, [listTicketPackage])

    useEffect(() => {
        const check = dataTable.every((i) => i.checkTicket === true)
        setCheckedTicket(check)
    }, [dataTable])

    const handleFilterTable = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (startDate && endDate) {
            const format = 'DD/MM/YYYY'
            const start = dayjs(startDate, format).date()
            const end = dayjs(endDate, format).date()

            const filter = dataTable.filter((item) => {
                const day = dayjs(item.effectiveDate.date, format).date()

                if (checkTicket === true) {
                    return item.checkTicket === checkTicket && day >= start && day <= end
                }

                if (checkTicket === false) {
                    return item.checkTicket === checkTicket && day >= start && day <= end
                }

                return day >= start && day <= end
            })
            setFilteredData(filter)
        } else {
            const filter = dataTable.filter((item) => {
                if (checkTicket === true) {
                    return item.checkTicket === checkTicket
                }

                if (checkTicket === false) {
                    return item.checkTicket === checkTicket
                }

                return item
            })
            setFilteredData(filter)
        }
    }

    const globalSearch = () => {
        const filteredData = dataTable.filter((i) => i.ticketNumber?.toString().toLowerCase().includes(searchText))

        setFilteredData(filteredData)
    }

    return (
        <div className="w-full h-[calc(100%_-_32px)] flex items-start gap-6">
            <div className="bg-white rounded-3xl shadow-md p-6 w-8/12 h-full">
                <Heading title="Đối soát vé" />

                <div className="flex items-center justify-between mb-6">
                    <TableSearch
                        onChange={(e) => {
                            setSearchText(e.target.value)
                            globalSearch()
                        }}
                        value={searchText}
                    />
                    {checkedTicket ? <Button title="Xuất file (.csv)" outline onClick={() => exportToCSV(dataTable)} /> : <Button title="Chốt đối soát" onClick={() => dispatch(checkTickets())} disabled={isLoading} />}
                </div>

                <Table
                    columns={columns}
                    dataSource={filterdData && filterdData.length > 0 ? filterdData : dataTable}
                    rowClassName={'text-secondary leading-[22px] text-sm font-medium text-center font-montserrat'}
                    pagination={{
                        position: ['bottomCenter'],
                        className: 'mt-[50px]',
                        prevIcon: <BiSolidLeftArrow />,
                        nextIcon: <BiSolidRightArrow />,
                    }}
                />
            </div>

            <div className="bg-white rounded-3xl shadow-md w-4/12 h-full p-6">
                <Heading title="Lọc vé" />

                <form onSubmit={handleFilterTable}>
                    <table className="table">
                        <tbody>
                            <tr className="text-left">
                                <td className="align-text-top">
                                    <span className="mr-[26px] text-base leading-[26px] font-semibold font-montserrat">Tình trạng đối soát</span>
                                </td>
                                <td>
                                    <Radio.Group className="flex flex-col select-none mb-6" onChange={(e) => setCheckTicket(e.target.value)} value={checkTicket}>
                                        <label htmlFor="ticketFilterAll" className="leading-[19.5px] cursor-pointer font-montserrat text-base font-medium flex gap-2 items-center">
                                            <Radio name="checkTicket" />
                                            Tất cả
                                        </label>
                                        <label htmlFor="ticketFilterCheck" className="leading-[19.5px] cursor-pointer font-montserrat text-base font-medium flex gap-2 items-center">
                                            <Radio name="checkTicket" value={true} />
                                            Đã đối soát
                                        </label>
                                        <label htmlFor="ticketFilterNotCheck" className="leading-[19.5px] cursor-pointer font-montserrat text-base font-medium flex gap-2 items-center">
                                            <Radio name="checkTicket" value={false} />
                                            Chưa đối soát
                                        </label>
                                    </Radio.Group>
                                </td>
                            </tr>
                            <tr className="text-left">
                                <td className="align-text-top">
                                    <span className="mr-[26px] text-base leading-[26px] font-semibold font-montserrat">Loại vé</span>
                                </td>
                                <td>
                                    <span className="text-base font-montserrat font-medium leading-[19.5px] mb-6 block">Vé cổng</span>
                                </td>
                            </tr>
                            <tr className="text-left">
                                <td className="align-text-top">
                                    <span className="mr-[26px] text-base leading-[26px] font-semibold font-montserrat">Từ ngày</span>
                                </td>
                                <td>
                                    <DatePicker className="mb-6" onChange={(_, dateString) => setStartDate(dateString)} format={'DD/MM/YYYY'} placeholder="dd/mm/yy" suffixIcon={<LuCalendarDays />} />
                                </td>
                            </tr>
                            <tr className="text-left">
                                <td className="align-text-top">
                                    <span className="mr-[26px] text-base leading-[26px] font-semibold font-montserrat">Đến ngày</span>
                                </td>
                                <td>
                                    <DatePicker placeholder="dd/mm/yy" onChange={(_, dateString) => setEndDate(dateString)} className="mb-6" format={'DD/MM/YYYY'} suffixIcon={<LuCalendarDays />} />
                                </td>
                            </tr>
                        </tbody>
                        <tfoot>
                            <tr>
                                <td colSpan={2}>
                                    <Button title="Lọc" outline className="w-[160px] mx-auto" type="submit" />
                                </td>
                            </tr>
                        </tfoot>
                    </table>
                </form>
            </div>
        </div>
    )
}

export default CheckTickets
