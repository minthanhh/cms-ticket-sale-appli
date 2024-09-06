import { FilterValues, ITicket } from '@/types'
import { Button, DatePicker, Divider, Form, Input, Radio, Space, Table, Typography } from 'antd'
import type { TableColumnsType } from 'antd'
import { ClassAttributes, TdHTMLAttributes, ThHTMLAttributes, useCallback, useEffect, useState } from 'react'
import { twMerge } from 'tailwind-merge'
import { LuCalendarDays } from 'react-icons/lu'
import { useAppDispatch, useAppSelector } from '@/hooks/storeHooks'
import { RootState } from '@/store'
import { getAllTicketPackage, getTickets } from '@/store/slices/ticketSlice'
import { EmptyError, EmptyResult } from '@/components/Empties'
import { ReloadOutlined } from '@ant-design/icons'
import { ContentContainer } from '@/components'

const INIT_VALUES = {
    startDate: '',
    endDate: '',
    verifyTicket: 'ALL',
}

const CheckTickets = () => {
    const dispatch = useAppDispatch()
    const { tickets, isTicketLoading } = useAppSelector((state: RootState) => state.ticket)
    const [isError, setIsError] = useState(false)

    const columns: TableColumnsType<ITicket> = [
        {
            title: 'STT',
            width: 10,
            render: (_value, _record, index) => ++index,
        },
        {
            width: 250,
            title: 'Tên gói vé',
            dataIndex: 'ticketName',
        },
        {
            width: 110,
            title: 'Cổng check - in',
            dataIndex: 'checkingGate',
        },
        {
            width: 110,
            dataIndex: 'checkTicket',
            key: 'checkTicket',
            render(value) {
                return <span className={twMerge('italic font-montserrat leading-[22px] text-sm font-medium', value ? 'text-[#FD5959]' : 'text-[#A5A8B1]')}>{value ? 'Đã đối soát' : 'Chưa đối soát'}</span>
            },
        },
    ]

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

    useEffect(() => {
        dispatch(getAllTicketPackage())
    }, [dispatch])

    return (
        <div className="flex items-center w-full h-full gap-4">
            <ContentContainer title="Quản lý vé" className="w-3/4">
                <div className="flex items-center justify-between mb-4">
                    <Input.Search className="w-4/6" placeholder="Tìm bằng số vé" />
                    <Button htmlType="button">Xuất file (.csv)</Button>
                </div>
                <Divider />

                <Table
                    rowKey="id"
                    className="w-full"
                    columns={columns}
                    dataSource={tickets}
                    loading={isTicketLoading}
                    onHeaderRow={() => ({ className: 'bg-[#F1F4F8]' })}
                    locale={{
                        emptyText: () =>
                            isError ? (
                                <EmptyError onActionClick={loadTickets} buttonIcon={<ReloadOutlined spin={isTicketLoading} />} hasAction actionTitle="Tải lại" description="Đã xảy ra lỗi, vui lòng thử lại." />
                            ) : (
                                <EmptyResult onActionClick={() => {}} hasAction actionTitle="Thêm gói vé" description="Không tồn tại gói vé nào, bạn có thể thêm gói vé vào." />
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
                    rowClassName="text-secondary text-xs font-medium font-montserrat even:bg-ins-table-even-row-background odd:bg-ins-table-odd-row-background"
                />
            </ContentContainer>
            <ContentContainer title="Lọc vé" className="w-2/6">
                <Typography.Title level={3} className="font-bold"></Typography.Title>
                <Form
                    labelCol={{ span: 10 }}
                    wrapperCol={{ span: 12 }}
                    labelAlign="left"
                    initialValues={INIT_VALUES}
                    onFinish={(values: FilterValues) => {
                        loadTickets(values)
                    }}>
                    <Form.Item label="Tình trạng đối soát" name="verifyTicket">
                        <Radio.Group>
                            <Space direction="vertical">
                                <Radio value={'ALL'}>Tất cả</Radio>
                                <Radio value={true}>Đã đối soát</Radio>
                                <Radio value={false}>Chưa đối soát</Radio>
                            </Space>
                        </Radio.Group>
                    </Form.Item>
                    <Form.Item label="Từ ngày" name="startDate">
                        <DatePicker format={'DD/MM/YYYY'} placeholder="dd/mm/yy" suffixIcon={<LuCalendarDays />} />
                    </Form.Item>
                    <Form.Item label="Từ ngày" name="endDate">
                        <DatePicker format={'DD/MM/YYYY'} placeholder="dd/mm/yy" suffixIcon={<LuCalendarDays />} />
                    </Form.Item>
                    <Form.Item className="text-center" labelCol={{ span: 0 }} wrapperCol={{ span: 0 }}>
                        <Button className="border-primary text-primary" htmlType="submit">
                            Lọc
                        </Button>
                    </Form.Item>
                </Form>
            </ContentContainer>
        </div>
    )
}

export default CheckTickets
