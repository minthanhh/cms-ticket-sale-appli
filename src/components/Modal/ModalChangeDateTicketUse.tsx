import { DatePicker, Modal } from 'antd';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import dayjs from 'dayjs';
import { toast } from 'react-toastify';

import { RootState } from '@/store';
import { useAppDispatch, useAppSelector } from '@/hooks/storeHooks';
import { onCloseModalChangeDateTicketUse } from '@/store/slices/modalAddTickets';
import { ITicketPackage } from '@/types';

import HeadingModal from './HeadingModal';
import Button from '../Button/Button';
import { updateEndDateTicket } from '@/store/slices/ticketSlice';

const ModalChangeTicketDay = () => {
   const dispatch = useAppDispatch();
   const [searchParams, setSearchParams] = useSearchParams();
   const [ticketPackage, setTicketPacket] = useState<ITicketPackage | null>(
      null
   );
   const { listTicketPackage, isLoading } = useAppSelector(
      (state: RootState) => state.ticket
   );
   const { isOpenModalChangeDateTicketUse } = useAppSelector(
      (state: RootState) => state.modal
   );

   useEffect(() => {
      const id = searchParams.get('id');

      if (id) {
         const singleTicket = listTicketPackage.find((i) => i.id === id)!;
         setTicketPacket(singleTicket);
      } else {
         setTicketPacket(null);
      }
   }, [searchParams, listTicketPackage]);

   const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      dispatch(updateEndDateTicket(ticketPackage as ITicketPackage))
         .then(() => toast.success('Vé đã được cập nhật hạn sử dụng mới.'))
         .catch(() => toast.error('Cập nhật không thành công!'));
   };

   return (
      <Modal
         open={isOpenModalChangeDateTicketUse}
         width={758}
         footer={null}
         closeIcon={null}
      >
         <HeadingModal title="Đổi ngày sử dụng vé" />

         <form onSubmit={handleSubmit}>
            <table>
               <tbody>
                  <tr>
                     <td>
                        <span className="mb-6 font-montserrat leading-[26px] font-semibold text-base mr-[78px] block">
                           Số vé
                        </span>
                     </td>
                     <td>
                        <span className="mb-6 font-montserrat leading-[19.5px] font-medium text-base block">
                           {ticketPackage?.ticketNumber}
                        </span>
                     </td>
                  </tr>
                  <tr>
                     <td>
                        <span className="mb-6 font-montserrat leading-[26px] font-semibold text-base mr-[78px] block">
                           Tên vé/gói
                        </span>
                     </td>
                     <td>
                        <span className="mb-6 font-montserrat leading-[19.5px] font-medium text-base block">
                           {ticketPackage?.ticketTypeName} -{' '}
                           {ticketPackage?.ticketPackageName}
                        </span>
                     </td>
                  </tr>
                  <tr>
                     <td>
                        <span className="mb-6 font-montserrat leading-[26px] font-semibold text-base mr-[78px] block">
                           Tên sự kiện
                        </span>
                     </td>
                     <td>
                        <span className="mb-6 font-montserrat leading-[19.5px] font-medium text-base block">
                           Hội trợ triển lãm hàng tiêu dùng 2021
                        </span>
                     </td>
                  </tr>
                  <tr>
                     <td>
                        <span className="font-montserrat leading-[26px] font-semibold text-base mr-[78px] block">
                           Hạn sử dụng
                        </span>
                     </td>
                     <td>
                        <DatePicker
                           picker="date"
                           format={'DD/MM/YYYY'}
                           onChange={(_, date) => {
                              setTicketPacket(
                                 (prev) =>
                                    ({
                                       ...prev,
                                       expirationDate: {
                                          time: prev?.expirationDate.time,
                                          date: date,
                                       },
                                    } as ITicketPackage)
                              );
                           }}
                           value={dayjs(
                              ticketPackage?.expirationDate.date,
                              'DD/MM/YYYY'
                           )}
                        />
                     </td>
                  </tr>
               </tbody>
            </table>

            <div className="flex items-center gap-6 text-center justify-center mt-8">
               <Button
                  title="Huỷ"
                  outline
                  onClick={() => {
                     dispatch(onCloseModalChangeDateTicketUse());
                     setSearchParams('');
                  }}
                  className="w-[160px]"
                  type="button"
               />
               <Button
                  title="Lưu"
                  className="w-[160px]"
                  type="submit"
                  disabled={isLoading}
               />
            </div>
         </form>
      </Modal>
   );
};

export default ModalChangeTicketDay;
