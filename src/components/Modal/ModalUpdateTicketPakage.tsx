import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { DatePicker, Input, Modal, Select, Checkbox } from 'antd';
import { IoIosArrowDown } from 'react-icons/io';
import dayjs from 'dayjs';
import { toast } from 'react-toastify';

import { RootState } from '@/store';
import { ITicketPackage } from '@/types';
import { useAppDispatch, useAppSelector } from '@/hooks/storeHooks';
import { onCloseModalUpdateTicketPackage } from '@/store/slices/modalAddTickets';
import { updateTicPackage } from '@/store/slices/ticketSlice';
import { CheckboxChangeEvent } from 'antd/es/checkbox';
import HeadingModal from './HeadingModal';
import Button from '../Button/Button';

const ModalUpdateTicketPakage = () => {
   const dispatch = useAppDispatch();
   const [searchParams, setSearchParams] = useSearchParams();
   const [ticketPackage, setTicketPackage] = useState<ITicketPackage | null>(
      null
   );
   const [checked, setIsChecked] = useState({
      singleTicket: false,
      comboTicket: false,
   });

   const { listTicketPackage, isLoading } = useAppSelector(
      (state: RootState) => state.ticket
   );
   const { isOpenModalUpdateTicketPackage } = useAppSelector(
      (state: RootState) => state.modal
   );

   useEffect(() => {
      const ticketId = searchParams.get('id');
      if (ticketId) {
         const data = listTicketPackage.find((i) => i.id === ticketId);
         setTicketPackage(data as ITicketPackage);
      } else {
         setTicketPackage(null);
      }
   }, [searchParams, listTicketPackage]);

   useEffect(() => {
      if (ticketPackage?.comboTicket && ticketPackage?.singleTicket) {
         setIsChecked({ comboTicket: true, singleTicket: true });
      }
      if (!ticketPackage?.comboTicket && ticketPackage?.singleTicket) {
         setIsChecked({ comboTicket: false, singleTicket: true });
      }
   }, [ticketPackage?.comboTicket, ticketPackage?.singleTicket]);

   const handleChangeChecked = (e: CheckboxChangeEvent) => {
      const { checked, name } = e.target;
      if (checked && name === 'comboTicket') {
         setIsChecked({ comboTicket: true, singleTicket: true });
      }
      setIsChecked((prev) => ({ ...prev, [name!]: checked }));
   };

   const handleChangeApplyTicket = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { id, value } = e.target;

      if (checked.comboTicket && value === '') {
         setTicketPackage(
            (prev) => ({ ...prev, singleTicket: '' } as ITicketPackage)
         );
      }

      if (checked.comboTicket && (id === 'comboTicket' || id === 'quantity')) {
         setTicketPackage((prev) => {
            let calc;

            if (id === 'comboTicket') {
               calc = (Number(value) / Number(prev?.quantity))
                  .toFixed()
                  .toString();
            } else {
               calc = (Number(prev?.comboTicket) / Number(value))
                  .toFixed()
                  .toString();
            }
            return {
               ...prev,
               [id]: value,
               singleTicket: calc,
            } as ITicketPackage;
         });
      } else {
         setTicketPackage(
            (prev) => ({ ...prev, [id]: value } as ITicketPackage)
         );
      }
   };

   const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      let updatedData = {
         ...ticketPackage,
      };

      if (!checked.comboTicket) {
         updatedData = {
            ...ticketPackage,
            comboTicket: '',
            quantity: 1,
         };
      }

      dispatch(updateTicPackage(updatedData as ITicketPackage))
         .unwrap()
         .then(() => toast.success('Gói vé được cập nhật thành công'))
         .catch(() => toast.error('Đã xảy ra lỗi không thể cập nhật!'));
   };

   return (
      <Modal
         width={758}
         open={isOpenModalUpdateTicketPackage}
         onCancel={() => {
            dispatch(onCloseModalUpdateTicketPackage());
            setSearchParams('');
         }}
         footer={null}
         closeIcon={null}
      >
         <HeadingModal title="Cập nhật thông tin gói vé" />

         <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6 w-full mb-[11px]">
               <div className="flex items-center w-full justify-between">
                  <div className="w-[35%]">
                     <label
                        htmlFor="bookingCode"
                        className="text-secondary font-semibold leading-[26px] text-base mb-[5px]"
                     >
                        Mã sự kiện <sup className="text-red-500">*</sup>
                     </label>
                     <Input
                        id="bookingCode"
                        className="w-full py-[10px] px-3 placeholder-textPlaceholder border-input border rounded-lg"
                        placeholder="Nhập mã sự kiện"
                     />
                  </div>
                  <div className="w-[52%]">
                     <label
                        htmlFor="bookingCode"
                        className="text-secondary font-semibold leading-[26px] text-base mb-[5px]"
                     >
                        Tên sự kiện
                     </label>
                     <Input
                        id="bookingCode"
                        className="w-full py-[10px] px-3 placeholder-textPlaceholder border-input border rounded-lg"
                        placeholder="Nhập tên sự kiện"
                     />
                  </div>
               </div>

               <div className="flex items-center gap-[64px]">
                  <div className="flex items-start flex-col justify-center">
                     <label className="text-secondary font-semibold leading-[26px] text-base mb-[5px]">
                        Ngày áp dụng
                     </label>
                     <div className="flex items-center gap-[9px]">
                        <DatePicker
                           picker="date"
                           placeholder="dd/mm/yy"
                           value={dayjs(
                              ticketPackage?.effectiveDate.date,
                              'DD/MM/YYYY'
                           )}
                           onChange={(_, date) =>
                              setTicketPackage(
                                 (prev) =>
                                    ({
                                       ...prev,
                                       effectiveDate: {
                                          date: date,
                                          time: prev?.effectiveDate.time,
                                       },
                                    } as ITicketPackage)
                              )
                           }
                           format={'DD/MM/YYYY'}
                           className="border w-[129px] border-input placeholder-placeholder py-2 px-3 text-base leading-[19.5px] font-medium font-montserrat"
                        />
                        <DatePicker
                           picker="time"
                           format={'hh:mm:ss'}
                           value={dayjs(
                              ticketPackage?.effectiveDate.time,
                              'hh:mm:ss'
                           )}
                           onChange={(_, time) =>
                              setTicketPackage(
                                 (prev) =>
                                    ({
                                       ...prev,
                                       effectiveDate: {
                                          date: prev?.effectiveDate.date,
                                          time: time,
                                       },
                                    } as ITicketPackage)
                              )
                           }
                           placeholder="hh:mm:ss"
                           className="border w-[129px] border-input placeholder-placeholder py-2 px-3 text-base leading-[19.5px] font-medium font-montserrat"
                        />
                     </div>
                  </div>
                  <div className="flex items-start flex-col justify-center">
                     <label className="text-secondary font-semibold leading-[26px] text-base mb-[5px]">
                        Ngày hết hạn
                     </label>
                     <div className="flex items-center gap-[9px]">
                        <DatePicker
                           placeholder="dd/mm/yy"
                           picker="date"
                           format={'DD/MM/YYYY'}
                           value={dayjs(
                              ticketPackage?.expirationDate.date,
                              'DD/MM/YYYY'
                           )}
                           onChange={(_, date) =>
                              setTicketPackage(
                                 (prev) =>
                                    ({
                                       ...prev,
                                       expirationDate: {
                                          date: date,
                                          time: prev?.expirationDate.time,
                                       },
                                    } as ITicketPackage)
                              )
                           }
                           className="border w-[129px] border-input placeholder-placeholder py-2 px-3 text-base leading-[19.5px] font-medium font-montserrat"
                        />
                        <DatePicker
                           placeholder="hh:mm:ss"
                           picker="time"
                           format={'hh:mm:ss'}
                           value={dayjs(
                              ticketPackage?.expirationDate.time,
                              'hh:mm:ss'
                           )}
                           onChange={(_, time) =>
                              setTicketPackage(
                                 (prev) =>
                                    ({
                                       ...prev,
                                       expirationDate: {
                                          date: prev?.expirationDate.date,
                                          time: time,
                                       },
                                    } as ITicketPackage)
                              )
                           }
                           className="border w-[129px] border-input placeholder-placeholder py-2 px-3 text-base leading-[19.5px] font-medium font-montserrat"
                        />
                     </div>
                  </div>
               </div>

               <div className="flex items-start flex-col justify-center gap-2">
                  <label className="text-secondary font-semibold leading-[26px] text-base mb-[5px]">
                     Giá vé áp dụng
                  </label>

                  <div className="flex items-start justify-center flex-col gap-3 w-full">
                     <label
                        htmlFor=""
                        className="flex items-center gap-2 whitespace-nowrap"
                     >
                        <Checkbox
                           name="singleTicket"
                           checked={checked.singleTicket}
                           disabled={checked.comboTicket}
                           onChange={handleChangeChecked}
                        />
                        Vé lẻ (vnđ/vé) với giá
                        <Input
                           placeholder="Giá vé"
                           width={148}
                           className="py-[10px] w-[148px] px-3 border-none rounded-lg"
                           id="singleTicket"
                           value={ticketPackage?.singleTicket}
                           disabled={!checked.singleTicket}
                           onChange={handleChangeApplyTicket}
                           required
                        />
                        / vé
                     </label>
                  </div>

                  <div className="flex items-start justify-center flex-col gap-3 w-full">
                     <label
                        htmlFor=""
                        className="flex items-center gap-2 whitespace-nowrap"
                     >
                        <Checkbox
                           name="comboTicket"
                           onChange={handleChangeChecked}
                           checked={checked.comboTicket}
                        />
                        Combo vé với giá
                        <Input
                           placeholder="Giá vé"
                           className="py-[10px] w-[148px] px-3 border-none rounded-lg"
                           id="comboTicket"
                           disabled={!checked.comboTicket}
                           value={ticketPackage?.comboTicket}
                           onChange={handleChangeApplyTicket}
                           required
                        />
                        /
                        <Input
                           placeholder="Giá vé"
                           className="py-[10px] w-[72px] px-3 border-none rounded-lg"
                           id="quantity"
                           disabled={!checked.comboTicket}
                           value={ticketPackage?.quantity as number}
                           onChange={handleChangeApplyTicket}
                           required
                        />
                        vé
                     </label>
                  </div>
               </div>

               <div className="flex flex-col items-start justify-center">
                  <label
                     htmlFor="ticketPackageName"
                     className="text-secondary font-semibold leading-[26px] text-base mb-[5px]"
                  >
                     Tình trạng
                  </label>

                  <Select
                     id="status"
                     style={{ width: 176 }}
                     value={ticketPackage?.status}
                     onChange={(value) =>
                        setTicketPackage(
                           (prev) =>
                              ({ ...prev, status: value } as ITicketPackage)
                        )
                     }
                     options={[
                        { value: 'apply', label: 'Đang áp dụng' },
                        { value: 'turnOff', label: 'Tắt' },
                     ]}
                     suffixIcon={
                        <IoIosArrowDown
                           width={10.54}
                           height={6.25}
                           className="text-[#ff993b] font-bold"
                        />
                     }
                  />
               </div>
            </div>
            <p className="mb-[21px] italic leading-[14.63px] text-sm font-normal text-italic">
               <span className="text-red-500 mr-1 leading-[26px] text-base font-montserrat font-semibold not-italic">
                  *
               </span>
               là thông tin bắt buộc
            </p>

            <div className="flex items-center gap-6 text-center justify-center">
               <Button
                  title="Huỷ"
                  outline
                  onClick={() => {
                     dispatch(onCloseModalUpdateTicketPackage());
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

export default ModalUpdateTicketPakage;
