import { Heading } from '@/components';
import Button from '@/components/Button/Button';
import TableSearch from '@/components/Table/SearchTable';
import { ITicket } from '@/types';

import { FiFilter } from 'react-icons/fi';
import { Table, TableColumnsType } from 'antd';
import { BiSolidLeftArrow, BiSolidRightArrow } from 'react-icons/bi';
import Status from '@/components/Status/Status';

const ManageTicket = () => {
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
         render: (value) => (value as Date).toISOString(),
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
   const data: ITicket[] = [
      {
         stt: 1,
         bookingCode: 'ALTFGHJU',
         ticketNumber: 123456789034,
         status: 'used',
         date: new Date(),
         tiketIssueDate: new Date(),
         checkInGate: 'Cổng 1',
      },
      {
         stt: 2,
         bookingCode: 'ALTFGHJU',
         ticketNumber: 123456789034,
         status: 'expired',
         date: new Date(),
         tiketIssueDate: new Date(),
         checkInGate: 'Cổng 1',
      },
      {
         stt: 3,
         bookingCode: 'ALTFGHJU',
         ticketNumber: 123456789034,
         status: 'used',
         date: new Date(),
         tiketIssueDate: new Date(),
         checkInGate: 'Cổng 1',
      },
      {
         stt: 4,
         bookingCode: 'ALTFGHJU',
         ticketNumber: 123456789034,
         status: 'notUsedYet',
         date: new Date(),
         tiketIssueDate: new Date(),
         checkInGate: 'Cổng 1',
      },
      {
         stt: 5,
         bookingCode: 'ALTFGHJU',
         ticketNumber: 123456789034,
         status: 'used',
         date: new Date(),
         tiketIssueDate: new Date(),
         checkInGate: 'Cổng 1',
      },
      {
         stt: 5,
         bookingCode: 'ALTFGHJU',
         ticketNumber: 123456789034,
         status: 'used',
         date: new Date(),
         tiketIssueDate: new Date(),
         checkInGate: 'Cổng 1',
      },
      {
         stt: 6,
         bookingCode: 'ALTFGHJU',
         ticketNumber: 123456789034,
         status: 'used',
         date: new Date(),
         tiketIssueDate: new Date(),
         checkInGate: 'Cổng 1',
      },
      {
         stt: 7,
         bookingCode: 'ALTFGHJU',
         ticketNumber: 123456789034,
         status: 'used',
         date: new Date(),
         tiketIssueDate: new Date(),
         checkInGate: 'Cổng 1',
      },
      {
         stt: 8,
         bookingCode: 'ALTFGHJU',
         ticketNumber: 123456789034,
         status: 'used',
         date: new Date(),
         tiketIssueDate: new Date(),
         checkInGate: 'Cổng 1',
      },
      {
         stt: 9,
         bookingCode: 'ALTFGHJU',
         ticketNumber: 123456789034,
         status: 'used',
         date: new Date(),
         tiketIssueDate: new Date(),
         checkInGate: 'Cổng 1',
      },
      {
         stt: 10,
         bookingCode: 'ALTFGHJU',
         ticketNumber: 123456789034,
         status: 'used',
         date: new Date(),
         tiketIssueDate: new Date(),
         checkInGate: 'Cổng 1',
      },
      {
         stt: 11,
         bookingCode: 'ALTFGHJU',
         ticketNumber: 123456789034,
         status: 'used',
         date: new Date(),
         tiketIssueDate: new Date(),
         checkInGate: 'Cổng 1',
      },
      {
         stt: 12,
         bookingCode: 'ALTFGHJU',
         ticketNumber: 123456789034,
         status: 'used',
         date: new Date(),
         tiketIssueDate: new Date(),
         checkInGate: 'Cổng 1',
      },
   ];

   return (
      <div className="w-full h-[calc(100%_-_32px)] bg-white rounded-3xl shadow-md overflow-hidden mb-[32px] p-6">
         <Heading title="Danh sách vé" />
         <div className="flex items-center justify-between mb-[31px]">
            <TableSearch />

            <div className="flex flex-row items-center gap-[10px]">
               <Button
                  title="Lọc vé"
                  outline
                  icon={FiFilter}
                  onClick={() => {}}
               />
               <Button title="Xuất file (.csv)" outline onClick={() => {}} />
            </div>
         </div>

         <Table
            rowClassName="text-secondary leading-[22px] text-sm font-medium text-center font-montserrat"
            className="w-full"
            columns={columns}
            dataSource={data}
            pagination={{
               position: ['bottomCenter'],
               className: 'mt-[50px]',
               prevIcon: <BiSolidLeftArrow />,
               nextIcon: <BiSolidRightArrow />,
            }}
         />
      </div>
   );
};

export default ManageTicket;
