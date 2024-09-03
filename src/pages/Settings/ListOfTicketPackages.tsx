import { ClassAttributes, memo, TdHTMLAttributes, ThHTMLAttributes, useCallback, useEffect, useState } from 'react'
import Table, { ColumnsType } from 'antd/es/table'
import { ITicket } from '@/types'
import { FiEdit } from 'react-icons/fi'
import { useAppDispatch, useAppSelector } from '@/hooks/storeHooks'
import { RootState } from '@/store'
import { getTickets } from '@/store/slices/ticketSlice'
import { AmountUtil } from '@/utilities/amount.util'
import { JSX } from 'react/jsx-runtime'
import { Button, Divider, Input, Tag, Typography } from 'antd'
import { EmptyError, EmptyResult } from '@/components/Empties'
import { ReloadOutlined } from '@ant-design/icons'
import { ModalTicket } from '@/components/Modal/ModalTicket'

type ModalType = 'create' | 'edit'

interface IModalValues {
    type: ModalType
    id?: string | undefined
    open: boolean
}

const INIT_MODAL_VALUES: IModalValues = {
    type: 'create',
    open: false,
    id: undefined,
}

const ListOfTicketPackages = () => {
    const dispatch = useAppDispatch()
    const { tickets, isTicketLoading } = useAppSelector((state: RootState) => state.ticket)
    const [isError, setIsError] = useState(false)
    const [modal, setModal] = useState<IModalValues>(INIT_MODAL_VALUES)

    const onOpen = (type: ModalType, id?: string) => setModal({ open: true, type, id })
    const onClose = useCallback(() => setModal(INIT_MODAL_VALUES), [])

    const loadTickets = useCallback(() => {
        dispatch(getTickets()).catch((error) => {
            console.error(error)
            setIsError(true)
        })
    }, [dispatch])

    useEffect(() => loadTickets(), [loadTickets])

    const columns: ColumnsType<ITicket> = [
        {
            title: 'STT',
            width: 10,
            render: (_value, _record, index) => ++index,
        },
        {
            width: 100,
            title: 'Mã gói',
            dataIndex: 'bookingCode',
            key: 'bookingCode',
        },
        {
            width: 250,
            title: 'Tên gói vé',
            dataIndex: 'ticketName',
            key: 'ticketName',
        },
        {
            width: 110,
            title: 'Ngày áp dụng',
            dataIndex: 'startDateApply',
            key: 'startDateApply',
            sorter: true,
        },
        {
            width: 110,
            title: 'Ngày hết hạn',
            dataIndex: 'endDateExpiresIn',
            key: 'endDateExpiresIn',
            sorter: true,
        },
        {
            width: 150,
            title: 'Giá vé (VNĐ/Vé)',
            dataIndex: 'singlePrice',
            key: 'singlePrice',
            render: (singlePrice) => AmountUtil.formatCurrencyToVND(singlePrice, true),
        },
        {
            width: 150,
            title: 'Giá Combo (VNĐ/Combo)',
            dataIndex: 'comboPrice',
            key: 'comboPrice',
            render: (comboPrice) => AmountUtil.formatCurrencyToVND(comboPrice, true),
        },
        {
            width: 100,
            title: 'Tình trạng',
            dataIndex: 'status',
            key: 'status',
            render: (value: string) => <Tag color={value === 'apply' ? 'blue' : 'red'}>{value.toUpperCase()}</Tag>,
        },
        {
            width: 100,
            dataIndex: 'actions',
            key: 'actions',
            render: (_, record) => (
                <Button icon={<FiEdit />} onClick={() => onOpen('edit', record.id)}>
                    Cập nhật
                </Button>
            ),
        },
    ]

    return (
        <>
            <div className="w-full h-[calc(100%_-_32px)] bg-white rounded-3xl shadow-md overflow-hidden mb-[32px] p-4">
                <Typography.Title level={2}>Danh sách gói vé</Typography.Title>
                <div className="flex items-center justify-between mb-4">
                    <Input.Search className="w-1/4" />
                    <div className="flex items-center gap-2">
                        <Button htmlType="button">Xuất file (.csv)</Button>
                        <Button onClick={() => onOpen('create')} htmlType="button" type="primary" className="bg-primary">
                            Thêm gói vé
                        </Button>
                    </div>
                </div>
                <Divider />

                <div className="max-w-xs md:max-w-full overflow-x-scroll md:overflow-hidden">
                    <Table
                        rowKey={'id'}
                        dataSource={tickets}
                        columns={columns}
                        loading={isTicketLoading}
                        locale={{
                            emptyText: () =>
                                isError ? (
                                    <EmptyError onActionClick={loadTickets} buttonIcon={<ReloadOutlined spin={isTicketLoading} />} hasAction actionTitle="Tải lại" description="Đã xảy ra lỗi, vui lòng thử lại." />
                                ) : (
                                    <EmptyResult onActionClick={() => onOpen('create')} hasAction actionTitle="Thêm gói vé" description="Không tồn tại gói vé nào, bạn có thể thêm gói vé vào." />
                                ),
                        }}
                        components={{
                            header: {
                                cell: (props: JSX.IntrinsicAttributes & ClassAttributes<HTMLTableHeaderCellElement> & ThHTMLAttributes<HTMLTableHeaderCellElement>) => {
                                    return <th {...props} className="p-2 font-semibold whitespace-nowrap select-none" />
                                },
                            },
                            body: {
                                cell: (props: JSX.IntrinsicAttributes & ClassAttributes<HTMLTableDataCellElement> & TdHTMLAttributes<HTMLTableDataCellElement>) => {
                                    return <td {...props} className="p-2" />
                                },
                            },
                        }}
                        rowClassName="text-secondary text-xs font-medium font-montserrat"
                    />
                </div>
            </div>
            <ModalTicket isOpen={modal.open} id={modal.id} onClose={onClose} type={modal.type} />
        </>
    )
}

export default ListOfTicketPackages
