import { Heading } from '@/components';
import { useCallback, useEffect, useMemo, useState } from 'react';
import Button from '@/components/Button/Button';
import TableSearch from '@/components/Table/SearchTable';
import Table, { ColumnsType } from 'antd/es/table';
import { ITicketPackage } from '@/types';
import { utils, writeFile } from 'xlsx';

import { FiEdit } from 'react-icons/fi';
import Status from '@/components/Status/Status';
import {
   onOpenModalAddTickets,
   onOpenModalUpdateTicketPackage,
} from '@/store/slices/modalAddTickets';
import { useAppDispatch, useAppSelector } from '@/hooks/storeHooks';
import { RootState } from '@/store';
import { getAllTicketPackage } from '@/store/slices/ticketSlice';
import { useSearchParams } from 'react-router-dom';
import { BiSolidLeftArrow, BiSolidRightArrow } from 'react-icons/bi';

const ListOfTicketPackages = () => {
   const [, setSearchParams] = useSearchParams();
   const [searchText, setSearchText] = useState<string>('');
   const [filteredData, setFilterdData] = useState<ITicketPackage[]>([]);
   const [dataTable, setDataTable] = useState<ITicketPackage[]>([]);

   const dispatch = useAppDispatch();
   const { listTicketPackage } = useAppSelector(
      (state: RootState) => state.ticket
   );

   useEffect(() => {
      dispatch(getAllTicketPackage())
         .then(() => {})
         .catch((err: any) => console.log(err));
   }, [dispatch]);

   useEffect(() => {
      setDataTable(listTicketPackage);
   }, [listTicketPackage]);

   const columns = useMemo<ColumnsType<ITicketPackage>>(
      () => [
         {
            title: 'STT',
            dataIndex: 'stt',
            key: 'stt',
         },
         {
            title: 'Mã gói',
            dataIndex: 'bookingCode',
            key: 'bookingCode',
         },
         {
            title: 'Tên gói vé',
            dataIndex: 'ticketPackageName',
            key: 'ticketPackageName',
         },
         {
            title: 'Ngày áp dụng',
            dataIndex: 'effectiveDate',
            key: 'effectiveDate',
            render(value, _, index) {
               return (
                  <div
                     key={value + index + 1}
                     className="flex flex-col items-end"
                  >
                     <span className="inline-block">{value.date}</span>
                     <span className="inline-block">{value.time}</span>
                  </div>
               );
            },
         },
         {
            title: 'Ngày hết hạn',
            dataIndex: 'expirationDate',
            key: 'expirationDate',
            render(value, _, index) {
               return (
                  <div
                     key={value + index + 1}
                     className="flex flex-col items-end"
                  >
                     <span className="inline-block">{value.date}</span>
                     <span className="inline-block">{value.time}</span>
                  </div>
               );
            },
         },
         {
            title: 'Giá vé (VNĐ/Vé)',
            dataIndex: 'singleTicket',
            key: 'singleTicket',
            render(value) {
               return `${(Number(value) * 1000).toLocaleString('vi-VN')} VNĐ`;
            },
         },
         {
            title: 'Giá Combo (VNĐ/Combo)',
            dataIndex: 'comboTicket',
            key: 'comboTicket',
            render(value, record) {
               return value === ''
                  ? ''
                  : `${(Number(value) * 1000).toLocaleString('vi-VN')} VNĐ/${
                       record.quantity
                    } vé`;
            },
         },
         {
            title: 'Tình trạng',
            dataIndex: 'status',
            key: 'status',
            render: Status,
         },
         {
            dataIndex: 'actions',
            key: 'actions',
            render: (value, record, index) => {
               return (
                  <button
                     key={index}
                     className="text-borderButton flex items-center gap-1"
                     onClick={() => {
                        setSearchParams(`id=${record.id}`);
                        dispatch(onOpenModalUpdateTicketPackage());
                     }}
                  >
                     <FiEdit className="w-6 h-6" />
                     <span className="text-sm leading-[22px] font-medium font-montserrat">
                        Cập nhật
                     </span>
                  </button>
               );
            },
         },
      ],
      [dispatch, setSearchParams]
   );
   const globalSearch = () => {
      const filteredData = dataTable.filter((value) =>
         value.bookingCode?.toLowerCase().includes(searchText.toLowerCase())
      );

      setFilterdData(filteredData);
   };
   const exportToCSV = useCallback(() => {
      const processedData = dataTable.map((i) => ({
         STT: i.stt,
         'Mã gói': i.bookingCode,
         'Tên gói vé': i.ticketPackageName,
         'Số vé': i.ticketNumber?.toString(),
         'Ngày áp dụng': i.effectiveDate ? i.effectiveDate.date : '',
         'Ngày hết hạn': i.expirationDate ? i.expirationDate.date : '',
         'Giá vé (VNĐ/Vé)':
            (Number(i.comboTicket) / Number(i.quantity)).toString() +
            ` VNĐ/${i.quantity} vé`,
         'Giá Combo (VNĐ/Combo)': i.comboTicket ? `${i.comboTicket} VNĐ` : '',
         'Tình trạng': i.status === 'apply' ? 'Đang áp dụng' : 'Tắt',
         'Đối soát vé': i.checkTicket ? 'Đã đối soát' : 'chưa đối soát',
         'Tên loại vé': i.ticketTypeName || '',
         'Cổng check - in': i.checkInGate,
      }));

      const ws = utils.json_to_sheet(processedData, {
         header: [
            'STT',
            'Mã gói',
            'Tên gói vé',
            'Số vé',
            'Ngày áp dụng',
            'Ngày hết hạn',
            'Giá vé (VNĐ/Vé)',
            'Giá Combo (VNĐ/Combo)',
            'Tình trạng',
            'Đối soát vé',
            'Tên loại vé',
            'Cổng check - in',
         ],
      });

      const wb = utils.book_new();
      utils.book_append_sheet(wb, ws, 'Sheet1');

      writeFile(wb, 'list-of-package-data.xlsx');
   }, [dataTable]);

   return (
      <div className="w-full h-[calc(100%_-_32px)] bg-white rounded-3xl shadow-md overflow-hidden mb-[32px] p-6">
         <Heading title="Danh sách gói vé" />

         <div className="flex items-center justify-between mb-6">
            <TableSearch
               onChange={(e) => {
                  setSearchText(e.target.value);
                  globalSearch();
               }}
               value={searchText}
            />

            <div className="flex items-center gap-6">
               <Button title="Xuất file (.csv)" outline onClick={exportToCSV} />
               <Button
                  title="Thêm gói vé"
                  onClick={() => dispatch(onOpenModalAddTickets())}
               />
            </div>
         </div>
         <Table
            dataSource={
               filteredData && filteredData.length > 0
                  ? filteredData
                  : dataTable
            }
            columns={columns}
            rowClassName="text-secondary leading-[22px] text-sm font-medium text-center font-montserrat"
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

export default ListOfTicketPackages;
