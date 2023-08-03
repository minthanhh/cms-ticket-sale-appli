import { useEffect, useState } from 'react';
import { Table, TableColumnsType } from 'antd';
import { FiFilter } from 'react-icons/fi';
import { BsThreeDotsVertical } from 'react-icons/bs';

import { Button, Status, TableSearch } from '@/components';
import { ITicketPackage } from '@/types';
import { useAppDispatch, useAppSelector } from '@/hooks/storeHooks';
import { onOpenModalFillter } from '@/store/slices/modalAddTickets';
import { BiSolidLeftArrow, BiSolidRightArrow } from 'react-icons/bi';
import { RootState } from '@/store';
import { exportToCSV } from '@/helpers';

const FamillyPackage = () => {
   const dispatch = useAppDispatch();
   const { listTicketPackage } = useAppSelector(
      (state: RootState) => state.ticket
   );

   const [dataTable, setDataTable] = useState<ITicketPackage[]>([]);
   const [searchText, setSearchText] = useState<string>('');
   const [filteredData, setFilterdData] = useState<ITicketPackage[]>([]);

   const columns: TableColumnsType<ITicketPackage> = [
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
         dataIndex: 'usageStatus',
         key: 'usageStatus',
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
      {
         dataIndex: 'tooltip',
         key: 'tooltip',
         render(value, record, index) {
            return record.usageStatus === 'notUsedYet' ? (
               <BsThreeDotsVertical />
            ) : (
               ''
            );
         },
      },
   ];

   useEffect(() => {
      const familyPackage = listTicketPackage.filter(
         (i) => i.ticketPackageName === 'Gói gia đình'
      );
      setDataTable(familyPackage);
   }, [listTicketPackage]);

   const globalSearch = () => {
      const filteredData = dataTable.filter((value) =>
         value.bookingCode?.toLowerCase().includes(searchText.toLowerCase())
      );

      setFilterdData(filteredData);
   };

   return (
      <>
         <div className="flex items-center justify-between mb-[31px]">
            <TableSearch
               onChange={(e) => {
                  setSearchText(e.target.value);
                  globalSearch();
               }}
               value={searchText}
            />

            <div className="flex flex-row items-center gap-[10px]">
               <Button
                  title="Lọc vé"
                  outline
                  icon={FiFilter}
                  onClick={() => dispatch(onOpenModalFillter())}
               />
               <Button
                  title="Xuất file (.csv)"
                  outline
                  onClick={() => exportToCSV(dataTable)}
               />
            </div>
         </div>

         <Table
            rowClassName="text-secondary leading-[22px] text-sm font-medium text-center font-montserrat"
            className="w-full"
            columns={columns}
            dataSource={
               filteredData && filteredData.length ? filteredData : dataTable
            }
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
