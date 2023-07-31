import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { DatePicker, Input, Modal, Select } from 'antd';

import { RootState } from '@/store';

import { useAppDispatch, useAppSelector } from '@/hooks/storeHooks';
import { onCloseModalUpdateTicketPackage } from '@/store/slices/modalAddTickets';
import { ITicketPackage } from '@/types';
import HeadingModal from './HeadingModal';
import { IoIosArrowDown } from 'react-icons/io';
import Checkbox, { CheckboxChangeEvent } from 'antd/es/checkbox';
import Button from '../Button/Button';

const ModalUpdateTicketPakage = () => {
   const dispatch = useAppDispatch();
   const [checked, setIsChecked] = useState({
      singleTicket: false,
      comboTicket: false,
   });

   const [singleTicketPackage, setSingleTicketPackage] =
      useState<ITicketPackage>();
   const [status, setStatus] = useState(singleTicketPackage?.status);

   const [searchParams, setSearchParams] = useSearchParams();
   const { listTicketPackage } = useAppSelector(
      (state: RootState) => state.ticket
   );
   const { isOpenModalUpdateTicketPackage } = useAppSelector(
      (state: RootState) => state.modal
   );

   useEffect(() => {
      if (searchParams.get('id')) {
         const getTicketPackageById = () => {
            const data = listTicketPackage.find(
               (item) => item.id === (searchParams.get('id') as string)
            );
            setSingleTicketPackage(data);
         };
         getTicketPackageById();
      }
   }, [searchParams, listTicketPackage]);

   useEffect(() => {
      if (singleTicketPackage?.comboTicket !== '') {
         setIsChecked((prev) => ({ ...prev, comboTicket: true }));
      }
      if (singleTicketPackage?.singleTicket !== '') {
         setIsChecked((prev) => ({ ...prev, singleTicket: true }));
      }
      if (
         singleTicketPackage?.comboTicket !== '' &&
         singleTicketPackage?.singleTicket !== ''
      ) {
         setIsChecked({ comboTicket: true, singleTicket: true });
      }
   }, [singleTicketPackage?.comboTicket, singleTicketPackage?.singleTicket]);

   const handleChangeChecked = (e: CheckboxChangeEvent) => {
      const { checked, name } = e.target;
      if (checked && name === 'comboTicket') {
         setIsChecked({ comboTicket: true, singleTicket: true });
      }
      setIsChecked((prev) => ({ ...prev, [name!]: checked }));
   };

   const handleChangeTicketPackage = (
      e: React.ChangeEvent<HTMLInputElement>
   ) => {
      const { id, value } = e.target;

      setSingleTicketPackage(
         (prev) => ({ ...prev, [id]: value } as ITicketPackage)
      );
   };

   return (
      <Modal
         width={758}
         open={isOpenModalUpdateTicketPackage}
         onCancel={() => {
            dispatch(onCloseModalUpdateTicketPackage());
            setSearchParams('');
         }}
      >
         <HeadingModal title="Cập nhật thông tin gói vé" />

         <form>
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
                           format={'DD/MM/YYYY'}
                           className="border w-[129px] border-input placeholder-placeholder py-2 px-3 text-base leading-[19.5px] font-medium font-montserrat"
                        />
                        <DatePicker
                           picker="time"
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
                           className="border w-[129px] border-input placeholder-placeholder py-2 px-3 text-base leading-[19.5px] font-medium font-montserrat"
                        />
                        <DatePicker
                           placeholder="hh:mm:ss"
                           picker="time"
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
                           required
                           value={singleTicketPackage?.singleTicket}
                           onChange={handleChangeTicketPackage}
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
                           required
                        />
                        /
                        <Input
                           placeholder="Giá vé"
                           className="py-[10px] w-[72px] px-3 border-none rounded-lg"
                           disabled={!checked.comboTicket}
                           id="quantity"
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
                     value={status}
                     style={{ width: 176 }}
                     onChange={(value) => setStatus(value)}
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
                  onClick={() => dispatch(onCloseModalUpdateTicketPackage())}
                  className="w-[160px]"
                  type="button"
               />
               <Button title="Lưu" className="w-[160px]" type="submit" />
            </div>
         </form>
      </Modal>
   );
};

export default ModalUpdateTicketPakage;
