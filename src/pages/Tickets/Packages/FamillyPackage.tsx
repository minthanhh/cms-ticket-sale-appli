import { useMemo, useEffect, useState } from 'react';
import { Table, TableColumnsType } from 'antd';
import { FiFilter } from 'react-icons/fi';

import { Button, Status, TableSearch } from '@/components';
import { ITicket } from '@/types';
import { useAppDispatch } from '@/hooks/storeHooks';
import { onOpenModalFillter } from '@/store/slices/modalAddTickets';
import { BiSolidLeftArrow, BiSolidRightArrow } from 'react-icons/bi';

const FamillyPackage = () => {
   const dispatch = useAppDispatch();
   const [dataTable, setDataTable] = useState<ITicket[]>([]);

   const columns: TableColumnsType<ITicket> = [
      {
         title: 'STT',
         dataIndex: 'stt',
         key: 'stt',
      },
      {
         title: 'Booking code',
         dataIndex: 'bookingCode',
         key: 'bookingCode',
      },
      {
         title: 'Số vé',
         dataIndex: 'ticketNumber',
         key: 'ticketNumber',
      },
      {
         title: 'Tình trạng sử dụng',
         dataIndex: 'status',
         key: 'status',
         render: Status,
      },
      {
         title: 'Ngày sử dụng',
         dataIndex: 'date',
         key: 'date',
      },
      {
         title: 'Ngày xuất vé',
         dataIndex: 'tiketIssueDate',
         key: 'tiketIssueDate',
      },
      {
         title: 'Cổng check - in',
         dataIndex: 'checkInGate',
         key: 'checkInGate',
      },
   ];
   const data: ITicket[] = useMemo(
      () => [
         {
            stt: 1,
            bookingCode: 'ALTFGHJU',
            ticketNumber: 123456789034,
            status: 'used',
            date: '24/08/2023',
            tiketIssueDate: '11/08/2023',
            checkInGate: 'Cổng 1',
            checkTicket: false,
         },
         {
            stt: 2,
            bookingCode: 'ALTFGHJU',
            ticketNumber: 123456789034,
            status: 'expired',
            date: '12/08/2023',
            tiketIssueDate: '11/08/2023',
            checkTicket: false,
            checkInGate: 'Cổng 1',
         },
         {
            stt: 3,
            bookingCode: 'ALTFGHJU',
            ticketNumber: 123456789034,
            status: 'used',
            date: '11/08/2023',
            tiketIssueDate: '11/08/2023',
            checkTicket: false,
            checkInGate: 'Cổng 1',
         },
         {
            stt: 4,
            bookingCode: 'ALTFGHJU',
            ticketNumber: 123456789034,
            status: 'notUsedYet',
            checkTicket: false,
            date: '16/08/2023',
            tiketIssueDate: '11/08/2023',
            checkInGate: 'Cổng 1',
         },
         {
            stt: 5,
            bookingCode: 'ALTFGHJU',
            ticketNumber: 123456789034,
            status: 'used',
            checkTicket: false,
            date: '19/08/2023',
            tiketIssueDate: '11/08/2023',
            checkInGate: 'Cổng 1',
         },
         {
            stt: 5,
            bookingCode: 'ALTFGHJU',
            ticketNumber: 123456789034,
            checkTicket: false,
            status: 'used',
            date: '22/08/2023',
            tiketIssueDate: '11/08/2023',
            checkInGate: 'Cổng 1',
         },
         {
            stt: 6,
            bookingCode: 'ALTFGHJU',
            ticketNumber: 123456789034,
            status: 'used',
            checkTicket: false,
            date: '23/08/2023',
            tiketIssueDate: '11/08/2023',
            checkInGate: 'Cổng 1',
         },
         {
            stt: 7,
            bookingCode: 'ALTFGHJU',
            ticketNumber: 123456789034,
            status: 'used',
            date: '25/08/2023',
            checkTicket: false,
            tiketIssueDate: '11/08/2023',
            checkInGate: 'Cổng 1',
         },
         {
            stt: 8,
            bookingCode: 'ALTFGHJU',
            ticketNumber: 123456789034,
            status: 'used',
            checkTicket: false,
            date: '28/08/2023',
            tiketIssueDate: '11/08/2023',
            checkInGate: 'Cổng 1',
         },
         {
            stt: 9,
            bookingCode: 'ALTFGHJU',
            ticketNumber: 123456789034,
            status: 'used',
            date: '30/08/2023',
            checkTicket: false,
            tiketIssueDate: '11/08/2023',
            checkInGate: 'Cổng 1',
         },
         {
            stt: 10,
            bookingCode: 'ALTFGHJU',
            ticketNumber: 123456789034,
            status: 'used',
            date: '23/08/2023',
            tiketIssueDate: '11/08/2023',
            checkTicket: false,
            checkInGate: 'Cổng 1',
         },
         {
            stt: 11,
            checkTicket: false,
            bookingCode: 'ALTFGHJU',
            ticketNumber: 123456789034,
            status: 'used',
            date: '15/08/2023',
            tiketIssueDate: '11/08/2023',
            checkInGate: 'Cổng 1',
         },
         {
            stt: 12,
            bookingCode: 'ALTFGHJU',
            checkTicket: false,
            ticketNumber: 123456789034,
            status: 'used',
            date: '21/08/2023',
            tiketIssueDate: '11/08/2023',
            checkInGate: 'Cổng 1',
         },
      ],
      []
   );

   useEffect(() => {
      setDataTable(data);
   }, [data]);

   return (
      <>
         <div className="flex items-center justify-between mb-[31px]">
            <TableSearch />

            <div className="flex flex-row items-center gap-[10px]">
               <Button
                  title="Lọc vé"
                  outline
                  icon={FiFilter}
                  onClick={() => dispatch(onOpenModalFillter())}
               />
               <Button title="Xuất file (.csv)" outline onClick={() => {}} />
            </div>
         </div>

         <Table
            rowClassName="text-secondary leading-[22px] text-sm font-medium text-center font-montserrat"
            className="w-full"
            columns={columns}
            dataSource={dataTable}
            pagination={{
               position: ['bottomCenter'],
               className: 'mt-[50px]',
               prevIcon: <BiSolidLeftArrow />,
               nextIcon: <BiSolidRightArrow />,
            }}
         />
      </>
   );
};

export default FamillyPackage;
