import { Heading } from '@/components';
import { useEffect, useMemo } from 'react';
import Button from '@/components/Button/Button';
import TableSearch from '@/components/Table/SearchTable';
import Table, { ColumnsType } from 'antd/es/table';
import { ITicketPackage } from '@/types';

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

const ListOfTicketPackages = () => {
   const [, setSearchParams] = useSearchParams();
   const dispatch = useAppDispatch();
   const { listTicketPackage } = useAppSelector(
      (state: RootState) => state.ticket
   );

   useEffect(() => {
      dispatch(getAllTicketPackage());
   }, [dispatch]);

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

   return (
      <div className="w-full h-[calc(100%_-_32px)] bg-white rounded-3xl shadow-md overflow-hidden mb-[32px] p-6">
         <Heading title="Danh sách gói vé" />

         <div className="flex items-center justify-between mb-6">
            <TableSearch />

            <div className="flex items-center gap-6">
               <Button title="Xuất file (.csv)" outline onClick={() => {}} />
               <Button
                  title="Thêm gói vé"
                  onClick={() => dispatch(onOpenModalAddTickets())}
               />
            </div>
         </div>

         <Table
            dataSource={listTicketPackage}
            columns={columns}
            rowClassName="font-medium text-sm leadin-[17.07px] text-secondary"
         />
      </div>
   );
};

export default ListOfTicketPackages;
