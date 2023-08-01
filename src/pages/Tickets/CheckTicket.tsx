import { Button, Heading } from '@/components';
import TableSearch from '@/components/Table/SearchTable';
import { ITicket } from '@/types';
import { DatePicker, Radio, Table } from 'antd';
import type { TableColumnsType } from 'antd';
import { useEffect, useMemo, useState } from 'react';
import { BiSolidLeftArrow, BiSolidRightArrow } from 'react-icons/bi';
import { twMerge } from 'tailwind-merge';
import { LuCalendarDays } from 'react-icons/lu';
import dayjs from 'dayjs';

const CheckTicket = () => {
   const [dataTable, setDataTable] = useState<ITicket[]>([]);
   const [filterdData, setFilteredData] = useState<ITicket[]>([]);
   const [checkTicket, setCheckTicket] = useState<boolean>();
   const [startDate, setStartDate] = useState('');
   const [endDate, setEndDate] = useState('');

   const columns: TableColumnsType<ITicket> = [
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
         dataIndex: 'date',
         key: 'date',
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
            return (
               <span
                  className={twMerge(
                     'italic font-montserrat leading-[22px] text-sm font-medium',
                     value ? 'text-[#FD5959]' : 'text-[#A5A8B1]'
                  )}
               >
                  {value ? 'Đã đối soát' : 'Chưa đối soát'}
               </span>
            );
         },
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
            checkTicket: true,
            tiketIssueDate: '11/08/2023',
            checkInGate: 'Cổng 1',
            ticketTypeName: 'Vé cổng',
         },
         {
            stt: 2,
            bookingCode: 'ALTFGHJU',
            ticketNumber: 123456789034,
            status: 'expired',
            date: '12/08/2023',
            tiketIssueDate: '11/08/2023',
            checkTicket: true,
            ticketTypeName: 'Vé cổng',
            checkInGate: 'Cổng 1',
         },
         {
            stt: 3,
            bookingCode: 'ALTFGHJU',
            ticketNumber: 123456789034,
            checkTicket: false,
            status: 'used',
            date: '11/08/2023',
            tiketIssueDate: '11/08/2023',
            ticketTypeName: 'Vé cổng',
            checkInGate: 'Cổng 1',
         },
         {
            stt: 4,
            checkTicket: false,
            bookingCode: 'ALTFGHJU',
            ticketNumber: 123456789034,
            status: 'notUsedYet',
            date: '16/08/2023',
            tiketIssueDate: '11/08/2023',
            ticketTypeName: 'Vé cổng',
            checkInGate: 'Cổng 1',
         },
         {
            stt: 5,
            bookingCode: 'ALTFGHJU',
            checkTicket: true,
            ticketNumber: 123456789034,
            status: 'used',
            date: '19/08/2023',
            ticketTypeName: 'Vé cổng',
            tiketIssueDate: '11/08/2023',
            checkInGate: 'Cổng 1',
         },
         {
            stt: 5,
            bookingCode: 'ALTFGHJU',
            ticketNumber: 123456789034,
            status: 'used',
            date: '22/08/2023',
            checkTicket: true,
            ticketTypeName: 'Vé cổng',
            tiketIssueDate: '11/08/2023',
            checkInGate: 'Cổng 1',
         },
         {
            stt: 6,
            ticketTypeName: 'Vé cổng',
            bookingCode: 'ALTFGHJU',
            ticketNumber: 123456789034,
            status: 'used',
            date: '23/08/2023',
            checkTicket: false,
            tiketIssueDate: '11/08/2023',
            checkInGate: 'Cổng 1',
         },
         {
            stt: 7,
            ticketTypeName: 'Vé cổng',
            bookingCode: 'ALTFGHJU',
            ticketNumber: 123456789034,
            checkTicket: false,
            status: 'used',
            date: '25/08/2023',
            tiketIssueDate: '11/08/2023',
            checkInGate: 'Cổng 1',
         },
         {
            stt: 8,
            bookingCode: 'ALTFGHJU',
            ticketTypeName: 'Vé cổng',
            checkTicket: false,
            ticketNumber: 123456789034,
            status: 'used',
            date: '28/08/2023',
            tiketIssueDate: '11/08/2023',
            checkInGate: 'Cổng 1',
         },
         {
            stt: 9,
            bookingCode: 'ALTFGHJU',
            ticketTypeName: 'Vé cổng',
            ticketNumber: 123456789034,
            status: 'used',
            checkTicket: false,
            date: '30/08/2023',
            tiketIssueDate: '11/08/2023',
            checkInGate: 'Cổng 1',
         },
         {
            stt: 10,
            bookingCode: 'ALTFGHJU',
            ticketNumber: 123456789034,
            ticketTypeName: 'Vé cổng',
            status: 'used',
            date: '23/08/2023',
            checkTicket: false,
            tiketIssueDate: '11/08/2023',
            checkInGate: 'Cổng 1',
         },
         {
            stt: 11,
            bookingCode: 'ALTFGHJU',
            ticketNumber: 123456789034,
            ticketTypeName: 'Vé cổng',
            status: 'used',
            date: '15/08/2023',
            checkTicket: false,
            tiketIssueDate: '11/08/2023',
            checkInGate: 'Cổng 1',
         },
         {
            stt: 12,
            bookingCode: 'ALTFGHJU',
            ticketNumber: 123456789034,
            status: 'used',
            ticketTypeName: 'Vé cổng',
            date: '21/08/2023',
            tiketIssueDate: '11/08/2023',
            checkTicket: false,
            checkInGate: 'Cổng 1',
         },
      ],
      []
   );

   useEffect(() => {
      setDataTable(data);
   }, [data]);

   const handleFilterTable = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      if (startDate && endDate) {
         const format = 'DD/MM/YYYY';
         const start = dayjs(startDate, format).date();
         const end = dayjs(endDate, format).date();

         const filter = dataTable.filter((item) => {
            const day = dayjs(item.date, format).date();

            if (checkTicket === true) {
               return (
                  item.checkTicket === checkTicket && day >= start && day <= end
               );
            }

            if (checkTicket === false) {
               return (
                  item.checkTicket === checkTicket && day >= start && day <= end
               );
            }

            return day >= start && day <= end;
         });
         setFilteredData(filter);
      } else {
         const filter = dataTable.filter((item) => {
            if (checkTicket === true) {
               return item.checkTicket === checkTicket;
            }

            if (checkTicket === false) {
               return item.checkTicket === checkTicket;
            }

            return item;
         });
         setFilteredData(filter);
      }
   };

   return (
      <div className="w-full h-[calc(100%_-_32px)] flex items-start gap-6">
         <div className="bg-white rounded-3xl shadow-md p-6 w-8/12 h-full">
            <Heading title="Đối soát vé" />

            <div className="flex items-center justify-between mb-6">
               <TableSearch />
               <Button title="Chốt đối soát" />
            </div>

            <Table
               columns={columns}
               dataSource={
                  filterdData && filterdData.length > 0
                     ? filterdData
                     : dataTable
               }
               rowClassName={
                  'text-secondary leading-[22px] text-sm font-medium text-center font-montserrat'
               }
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
                           <span className="mr-[26px] text-base leading-[26px] font-semibold font-montserrat">
                              Tình trạng đối soát
                           </span>
                        </td>
                        <td>
                           <Radio.Group
                              className="flex flex-col select-none mb-6"
                              onChange={(e) => setCheckTicket(e.target.value)}
                              value={checkTicket}
                           >
                              <label
                                 htmlFor="ticketFilterAll"
                                 className="leading-[19.5px] cursor-pointer font-montserrat text-base font-medium flex gap-2 items-center"
                              >
                                 <Radio name="checkTicket" />
                                 Tất cả
                              </label>
                              <label
                                 htmlFor="ticketFilterCheck"
                                 className="leading-[19.5px] cursor-pointer font-montserrat text-base font-medium flex gap-2 items-center"
                              >
                                 <Radio name="checkTicket" value={true} />
                                 Đã đối soát
                              </label>
                              <label
                                 htmlFor="ticketFilterNotCheck"
                                 className="leading-[19.5px] cursor-pointer font-montserrat text-base font-medium flex gap-2 items-center"
                              >
                                 <Radio name="checkTicket" value={false} />
                                 Chưa đối soát
                              </label>
                           </Radio.Group>
                        </td>
                     </tr>
                     <tr className="text-left">
                        <td className="align-text-top">
                           <span className="mr-[26px] text-base leading-[26px] font-semibold font-montserrat">
                              Loại vé
                           </span>
                        </td>
                        <td>
                           <span className="text-base font-montserrat font-medium leading-[19.5px] mb-6 block">
                              Vé cổng
                           </span>
                        </td>
                     </tr>
                     <tr className="text-left">
                        <td className="align-text-top">
                           <span className="mr-[26px] text-base leading-[26px] font-semibold font-montserrat">
                              Từ ngày
                           </span>
                        </td>
                        <td>
                           <DatePicker
                              className="mb-6"
                              onChange={(_, dateString) =>
                                 setStartDate(dateString)
                              }
                              format={'DD/MM/YYYY'}
                              placeholder="dd/mm/yy"
                              suffixIcon={<LuCalendarDays />}
                           />
                        </td>
                     </tr>
                     <tr className="text-left">
                        <td className="align-text-top">
                           <span className="mr-[26px] text-base leading-[26px] font-semibold font-montserrat">
                              Đến ngày
                           </span>
                        </td>
                        <td>
                           <DatePicker
                              placeholder="dd/mm/yy"
                              onChange={(_, dateString) =>
                                 setEndDate(dateString)
                              }
                              className="mb-6"
                              format={'DD/MM/YYYY'}
                              suffixIcon={<LuCalendarDays />}
                           />
                        </td>
                     </tr>
                  </tbody>
                  <tfoot>
                     <tr>
                        <td colSpan={2}>
                           <Button
                              title="Lọc"
                              outline
                              className="w-[160px] mx-auto"
                              type="submit"
                           />
                        </td>
                     </tr>
                  </tfoot>
               </table>
            </form>
         </div>
      </div>
   );
};

export default CheckTicket;
