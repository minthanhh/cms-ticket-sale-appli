import { ClassAttributes, TdHTMLAttributes, ThHTMLAttributes } from 'react'
import { Button, Table, TableColumnsType, Tag, Tooltip } from 'antd'

import { ITicket, UsageStatus } from '@/types'
import { ConvertUtil } from '@/utilities/convert.util'
import { MoreOutlined, ReloadOutlined } from '@ant-design/icons'
import { EmptyError, EmptyResult } from '@/components/Empties'

interface Props {
    eventPackages: ITicket[]
    isTicketLoading: boolean
    loadTickets: () => void
    isError: boolean
}

const EventPackages = ({ eventPackages, isTicketLoading, loadTickets, isError }: Props) => {
    const columns: TableColumnsType<ITicket> = [
        {
            title: 'STT',
            width: 10,
            render: (_value, _record, index) => ++index,
        },
        {
            width: 100,
            title: 'Mã gói',
            dataIndex: 'bookingCode',
        },
        {
            width: 250,
            title: 'Tên gói vé',
            dataIndex: 'ticketName',
        },
        {
            width: 100,
            title: 'Tình trạng',
            dataIndex: 'usageStatus',
            render: (v: UsageStatus) => <Tag color={ConvertUtil.usageStatusColor(v)}>{ConvertUtil.usageStatus(v)}</Tag>,
        },
        {
            width: 110,
            title: 'Ngày áp dụng',
            dataIndex: 'startDateApply',
            sorter: true,
        },
        {
            width: 110,
            title: 'Ngày hết hạn',
            dataIndex: 'endDateExpiresIn',
            sorter: true,
        },
        {
            width: 110,
            title: 'Cổng check - in',
            dataIndex: 'checkingGate',
        },
        {
            width: 20,
            render() {
                return (
                    <Tooltip
                        placement="left"
                        arrow={false}
                        overlayInnerStyle={{ padding: 0 }}
                        trigger={['hover', 'click']}
                        title={
                            <div className="flex flex-col items-start w-max bg-white rounded">
                                <Button className="text-left border-none shadow-none" block>
                                    Sử dụng vé
                                </Button>
                                <Button className="text-left border-none shadow-none" block>
                                    Đổi ngày sử dụng
                                </Button>
                            </div>
                        }>
                        <MoreOutlined size={32} />
                    </Tooltip>
                )
            },
        },
    ]

    return (
        <Table
            rowKey="id"
            className="w-full"
            columns={columns}
            dataSource={eventPackages}
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
    )
}

export default EventPackages
