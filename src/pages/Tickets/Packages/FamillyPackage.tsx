import { useEffect, useState } from 'react';
import { Table, TableColumnsType } from 'antd';
import { FiFilter } from 'react-icons/fi';
import { BsThreeDotsVertical } from 'react-icons/bs';

import { Button, Status, TableSearch } from '@/components';
import { ITicketPackage } from '@/types';
import { useAppDispatch, useAppSelector } from '@/hooks/storeHooks';
import {
   onOpenModalChangeDateTicketUse,
   onOpenModalFillter,
} from '@/store/slices/modalAddTickets';
import { BiSolidLeftArrow, BiSolidRightArrow } from 'react-icons/bi';
import { RootState } from '@/store';
import { exportToCSV } from '@/helpers';
import { startUsingTicket } from '@/store/slices/ticketSlice';
import { useSearchParams } from 'react-router-dom';
import useGlobalFilter from '@/hooks/useGlobalFilter';
import dayjs from 'dayjs';

const FamillyPackage = () => {
   const dispatch = useAppDispatch();
   const [searchParams, setSearchParams] = useSearchParams();
   const { listTicketPackage } = useAppSelector(
      (state: RootState) => state.ticket
   );
   const [dataTable, setDataTable] = useState<ITicketPackage[]>([]);
   const [toggleTooltip, setTooltip] = useState(
      Array(dataTable.length).fill(false)
   );

   // const [filterData, setFilterData] = useState<ITicketPackage[]>([]);

   const {
      filteredData,
      globalSearch,
      setSearchText,
      searchText,
      setFilteredData,
   } = useGlobalFilter(dataTable);

   const columns: TableColumnsType<ITicketPackage> = [
      {
         title: 'STT',
         dataIndex: 'stt',
         key: 'stt',
         render(value, record, index) {
            return '' + ++index;
         },
      },
      {
         title: 'Mã gói',
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
         dataIndex: 'dateUsed',
         key: 'dateUsed',
      },
      {
         title: 'Ngày xuất vé',
         dataIndex: 'effectiveDate',
         key: 'effectiveDate',
         render(value, _) {
            return `${value.date}`;
         },
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
            const handleClick = (index: number) => {
               setTooltip((prevList) => {
                  const newTooltipList = [...prevList];
                  newTooltipList[index] = !newTooltipList[index];
                  return newTooltipList;
               });
            };

            return record.usageStatus === 'notUsedYet' ? (
               <>
                  <BsThreeDotsVertical
                     size={24}
                     className="cursor-pointer"
                     onClick={() => handleClick(index)}
                  />
                  {toggleTooltip[index] ? (
                     <div className="bg-[#FFD2A8] shadow-md absolute top-0 right-full overflow-hidden flex items-center flex-col justify-center w-max rounded-lg">
                        <button
                           className="px-3 py-2 w-full hover:bg-[#caa786] default-animate"
                           onClick={() =>
                              dispatch(startUsingTicket(record.id as string))
                           }
                        >
                           Sử dụng vé
                        </button>
                        <button
                           onClick={() => {
                              dispatch(onOpenModalChangeDateTicketUse());
                              setSearchParams({ id: record.id as string });
                           }}
                           className="px-3 w-full hover:bg-[#caa786] py-2 default-animate"
                        >
                           Đổi ngày sử dụng
                        </button>
                     </div>
                  ) : null}
               </>
            ) : (
               ''
            );
         },
      },
   ];

   useEffect(() => {
      const obj: any = {};
      const format = 'DD/MM/YYYY';

      searchParams.forEach((value, key) => {
         if (value === '') return;
         Object.assign(obj, { [key]: value });
      });

      if (obj) {
         const filteredData = dataTable.filter((i) => {
            const start = dayjs(obj.from, format).date();
            const end = dayjs(obj.to, format).date();
            const day = dayjs(i.effectiveDate.date, format).date();

            return (
               i.usageStatus === obj.usageStatus ||
               (day >= start && day <= end) ||
               i.checkInGate === obj.gateOne ||
               i.checkInGate === obj.gateTwo ||
               i.checkInGate === obj.gateThree ||
               i.checkInGate === obj.gateFour ||
               i.checkInGate === obj.gateFine
            );
         });

         setFilteredData(filteredData);
      }
   }, [searchParams, dataTable, setFilteredData]);

   useEffect(() => {
      const familyPackage = listTicketPackage.filter(
         (i) => i.ticketPackageName === 'Gói gia đình'
      );
      setDataTable(familyPackage);
   }, [listTicketPackage]);

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
