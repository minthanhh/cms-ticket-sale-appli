import { RootState } from '@/store';
import {
   Checkbox,
   ConfigProvider,
   DatePicker,
   Input,
   Modal,
   Select,
} from 'antd';
import { IoIosArrowDown } from 'react-icons/io';
import { WiTime3 } from 'react-icons/wi';
import { useSelector } from 'react-redux';
import Button from '../Button/Button';
import { onCloseModalAddTickets } from '@/store/slices/modalAddTickets';
import { useState, useEffect } from 'react';
import { CheckboxChangeEvent } from 'antd/es/checkbox';
import locale from 'antd/locale/vi_VN';
import dayjs from 'dayjs';
import 'dayjs/locale/vi';
import HeadingModal from './HeadingModal';
import { addTicketPackage } from '@/store/slices/ticketSlice';
import { ITicketPackage } from '@/types';
import { useAppDispatch, useAppSelector } from '@/hooks/storeHooks';
import { SerializedError } from '@reduxjs/toolkit';

const ModalAddTickets = () => {
   const { isOpenModalAddTickets } = useSelector(
      (state: RootState) => state.modal
   );
   const { isLoading } = useAppSelector((state: RootState) => state.ticket);
   const dispatch = useAppDispatch();
   const [checked, setIsChecked] = useState({
      singleTicket: false,
      comboTicket: false,
   });
   const [ticketPackageName, setTicketPackageName] = useState('');
   const [status, setStatus] = useState('apply');

   const [effectiveAndExpirationDate, setEffectiveAndExpirationDate] = useState(
      {
         effectiveDate: {
            date: '',
            time: '',
         },
         expirationDate: {
            date: '',
            time: '',
         },
      }
   );
   const [ticketPriceApply, setTicketPriceApply] = useState({
      singleTicket: '',
      comboTicket: '',
      quantity: 1,
   });

   useEffect(() => {
      if (
         checked.comboTicket &&
         ticketPriceApply.comboTicket === '' &&
         !ticketPriceApply.quantity
      ) {
         setTicketPriceApply((prev) => ({ ...prev, singleTicket: '' }));
      }

      if (
         checked.comboTicket &&
         ticketPriceApply.comboTicket === '' &&
         ticketPriceApply.quantity
      ) {
         setTicketPriceApply((prev) => ({ ...prev, singleTicket: '' }));
      }

      if (
         checked.comboTicket &&
         ticketPriceApply.comboTicket !== '' &&
         !ticketPriceApply.quantity
      ) {
         setTicketPriceApply((prev) => ({ ...prev, singleTicket: '' }));
      }
   }, [
      checked.comboTicket,
      ticketPriceApply.comboTicket,
      ticketPriceApply.quantity,
   ]);

   const handleChangeChecked = (e: CheckboxChangeEvent) => {
      const { checked, name } = e.target;
      if (checked && name === 'comboTicket') {
         setIsChecked({ comboTicket: true, singleTicket: true });
         setTicketPriceApply((prev) => ({ ...prev, quantity: 1 }));
      }
      setIsChecked((prev) => ({ ...prev, [name!]: checked }));
   };

   const handleChangeTicketPriceApply = (
      e: React.ChangeEvent<HTMLInputElement>
   ) => {
      const { id, value } = e.target;

      if (checked.singleTicket && !checked.comboTicket) {
         setTicketPriceApply({
            comboTicket: '',
            quantity: 0,
            singleTicket: value,
         });
      } else {
         if (id === 'comboTicket') {
            setTicketPriceApply((prev) => ({
               ...prev,
               [id]: value,
               singleTicket: (Number(value) / prev.quantity).toString(),
            }));
         } else {
            setTicketPriceApply((prev) => ({
               ...prev,
               [id]: value,
               singleTicket: (
                  Number(prev.comboTicket) / Number(value)
               ).toString(),
            }));
         }
      }
   };

   const resetForm = () => {
      setIsChecked({
         comboTicket: false,
         singleTicket: false,
      });
      setTicketPackageName('');
      setStatus('apply');
      setEffectiveAndExpirationDate({
         effectiveDate: {
            date: '',
            time: '',
         },
         expirationDate: {
            date: '',
            time: '',
         },
      });
      setTicketPriceApply({
         comboTicket: '',
         quantity: 1,
         singleTicket: '',
      });
   };

   const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      let newTicketPackage: ITicketPackage;

      if (!checked.comboTicket) {
         newTicketPackage = {
            ticketPackageName,
            ...effectiveAndExpirationDate,
            ...ticketPriceApply,
            comboTicket: '',
            quantity: 1,
            status,
         };
      } else {
         newTicketPackage = {
            ticketPackageName,
            ...effectiveAndExpirationDate,
            ...ticketPriceApply,
            status,
         };
      }

      if (newTicketPackage) {
         dispatch(addTicketPackage(newTicketPackage))
            .unwrap()
            .then(() => {
               resetForm();
            })
            .catch((err: SerializedError) => {
               resetForm();
            });
      }
   };

   return (
      <Modal
         open={isOpenModalAddTickets}
         closeIcon={null}
         width={758}
         footer={null}
      >
         <HeadingModal title="Thêm gói vé" />

         <form method="POST" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6 w-full mb-[11px]">
               <div className="flex items-start flex-col justify-center">
                  <label
                     htmlFor="ticketPackageName"
                     className="text-secondary font-semibold leading-[26px] text-base mb-[5px]"
                  >
                     Tên gói vé
                     <sup className="text-red-500">*</sup>
                  </label>
                  <Input
                     id="ticketPackageName"
                     name="ticketPackageName"
                     onChange={(e) => setTicketPackageName(e.target.value)}
                     value={ticketPackageName}
                     required
                     placeholder="Nhập tên gói vé"
                     className="w-[52%] py-[10px] px-3 placeholder-textPlaceholder border-input border rounded-lg"
                  />
               </div>

               <div className="flex items-center justify-between">
                  <div className="flex items-start flex-col justify-center">
                     <label className="text-secondary font-semibold leading-[26px] text-base mb-[5px]">
                        Ngày áp dụng
                     </label>
                     <div className="flex items-center gap-[9px]">
                        <ConfigProvider locale={locale}>
                           <DatePicker
                              picker="date"
                              placeholder="dd/mm/yy"
                              format={'DD/MM/YYYY'}
                              className="border border-input placeholder-placeholder py-2 px-3 text-base leading-[19.5px] font-medium font-montserrat"
                              onChange={(_, dateString) =>
                                 setEffectiveAndExpirationDate((prev) => ({
                                    ...prev,
                                    effectiveDate: {
                                       date: dateString,
                                       time: prev.effectiveDate.time,
                                    },
                                 }))
                              }
                           />
                           <DatePicker
                              picker="time"
                              placeholder="hh:mm:ss"
                              className="border border-input placeholder-placeholder py-2 px-3 text-base leading-[19.5px] font-medium font-montserrat"
                              onChange={(_, dateString) =>
                                 setEffectiveAndExpirationDate((prev) => ({
                                    ...prev,
                                    effectiveDate: {
                                       date: prev.effectiveDate.date,
                                       time: dateString,
                                    },
                                 }))
                              }
                           />
                        </ConfigProvider>
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
                           className="border border-input placeholder-placeholder py-2 px-3 text-base leading-[19.5px] font-medium font-montserrat"
                           onChange={(_, dateString) =>
                              setEffectiveAndExpirationDate((prev) => ({
                                 ...prev,
                                 expirationDate: {
                                    date: dateString,
                                    time: prev.expirationDate.time,
                                 },
                              }))
                           }
                        />
                        <DatePicker
                           placeholder="hh:mm:ss"
                           picker="time"
                           className="border border-input placeholder-placeholder py-2 px-3 text-base leading-[19.5px] font-medium font-montserrat"
                           suffixIcon={
                              <WiTime3 size={24} className="text-[#ff993b]" />
                           }
                           onChange={(_, dateString) =>
                              setEffectiveAndExpirationDate((prev) => ({
                                 ...prev,
                                 expirationDate: {
                                    date: prev.expirationDate.date,
                                    time: dateString,
                                 },
                              }))
                           }
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
                           onChange={handleChangeChecked}
                           checked={checked.singleTicket}
                           disabled={checked.comboTicket}
                        />
                        Vé lẻ (vnđ/vé) với giá
                        <Input
                           placeholder="Giá vé"
                           width={148}
                           className="py-[10px] w-[148px] px-3 border-none rounded-lg"
                           disabled={!checked.singleTicket}
                           id="singleTicket"
                           value={ticketPriceApply.singleTicket}
                           onChange={handleChangeTicketPriceApply}
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
                           disabled={!checked.comboTicket}
                           id="comboTicket"
                           value={ticketPriceApply.comboTicket}
                           onChange={handleChangeTicketPriceApply}
                           required
                        />
                        /
                        <Input
                           placeholder="Giá vé"
                           className="py-[10px] w-[72px] px-3 border-none rounded-lg"
                           disabled={!checked.comboTicket}
                           id="quantity"
                           value={ticketPriceApply.quantity}
                           onChange={handleChangeTicketPriceApply}
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
                     defaultValue="apply"
                     value={status}
                     style={{ width: 176 }}
                     options={[
                        { value: 'apply', label: 'Đang áp dụng' },
                        { value: 'turnOff', label: 'Tắt' },
                     ]}
                     onChange={(value) => setStatus(value)}
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
                  onClick={() => dispatch(onCloseModalAddTickets())}
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

export default ModalAddTickets;
