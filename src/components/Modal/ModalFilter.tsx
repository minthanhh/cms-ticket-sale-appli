import { useState } from 'react';
import { CheckboxChangeEvent } from 'antd/es/checkbox';
import { Checkbox, DatePicker, Modal, Radio, RadioChangeEvent } from 'antd';

import { RootState } from '@/store';
import { useAppDispatch, useAppSelector } from '@/hooks/storeHooks';
import { onCloseModalFillter } from '@/store/slices/modalAddTickets';
import Button from '../Button/Button';
import HeadingModal from './HeadingModal';
import { useNavigate } from 'react-router-dom';

const ModalFilter = () => {
   const initialCheckInGateState = {
      allGate: '',
      gateOne: '',
      gateTwo: '',
      gateThree: '',
      gateFour: '',
      gateFine: '',
   };

   const initialFilterDate = {
      from: '',
      to: '',
   };

   const dispatch = useAppDispatch();
   const { isOpenModalFillter } = useAppSelector(
      (state: RootState) => state.modal
   );

   const navigate = useNavigate();
   const [isChecked, setIsChecked] = useState(initialCheckInGateState);
   const [isCheckedRadio, setIsCheckedRadio] = useState('');
   const [filter, setFilter] = useState(initialFilterDate);
   const [disabledCheckBox, setDisabledCheckBox] = useState(false);

   const handleChangeCheckInGate = (e: CheckboxChangeEvent) => {
      const { id, value, checked } = e.target;

      if (id === 'allGate' && checked) {
         setDisabledCheckBox((value) => !value);
         setIsChecked({
            allGate: value,
            gateFine: '',
            gateFour: '',
            gateOne: '',
            gateThree: '',
            gateTwo: '',
         });
      } else {
         if (id === 'allGate') {
            setIsChecked((prev) => ({
               ...prev,
               [id!]: id === 'allGate' ? '' : value,
            }));
         }
      }
   };

   const handleChangeStatus = (e: RadioChangeEvent) => {
      const { value } = e.target;
      setIsCheckedRadio(value);
   };

   const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      dispatch(onCloseModalFillter());
      navigate('/manage-tickets', {
         state: {
            ...filter,
            status: isCheckedRadio,
         },
      });
   };

   return (
      <Modal
         open={isOpenModalFillter}
         onCancel={() => dispatch(onCloseModalFillter())}
         footer={null}
         width={634}
      >
         <HeadingModal title="Lọc vé" />

         <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-5 mb-10">
               <div className="flex items-center">
                  <div className="w-2/4 flex items-center justify-start">
                     <div className="flex flex-col items-start justify-center">
                        <label
                           htmlFor=""
                           className="mb-[5px] block text-secondary font-semibold text-base font-montserrat leading-[26px]"
                        >
                           Từ ngày
                        </label>
                        <DatePicker
                           onChange={(_, dateString) =>
                              setFilter({ ...filter, from: dateString })
                           }
                           picker="date"
                           format={'DD/MM/YYYY'}
                           placeholder="dd/mm/yy"
                        />
                     </div>
                  </div>
                  <div className="w-2/4 flex items-start">
                     <div className="flex flex-col items-start justify-center">
                        <label
                           htmlFor=""
                           className="mb-[5px] block text-secondary font-semibold text-base font-montserrat leading-[26px]"
                        >
                           Đến ngày
                        </label>
                        <DatePicker
                           onChange={(_, dateString) =>
                              setFilter({ ...filter, to: dateString })
                           }
                           picker="date"
                           format={'DD/MM/YYYY'}
                           placeholder="dd/mm/yy"
                        />
                     </div>
                  </div>
               </div>

               <div className="flex items-start flex-col">
                  <label className="mb-[5px] block text-secondary font-semibold text-base font-montserrat leading-[26px]">
                     Tình trạng sử dụng
                  </label>

                  <Radio.Group className="flex items-center gap-10">
                     <label className="text-secondary leading-[19.5px] text-base font-medium font-montserrat">
                        <Radio
                           type="radio"
                           name="status"
                           value="all"
                           onChange={handleChangeStatus}
                        />
                        Tất cả
                     </label>
                     <label className="text-secondary leading-[19.5px] text-base font-medium font-montserrat">
                        <Radio
                           type="radio"
                           name="status"
                           value="used"
                           onChange={handleChangeStatus}
                        />
                        Đã sử dụng
                     </label>
                     <label className="text-secondary leading-[19.5px] text-base font-medium font-montserrat">
                        <Radio
                           type="radio"
                           name="status"
                           value="notUsedYet"
                           onChange={handleChangeStatus}
                        />
                        Chưa sử dụng
                     </label>
                     <label className="text-secondary leading-[19.5px] text-base font-medium font-montserrat">
                        <Radio
                           type="radio"
                           name="status"
                           value="expired"
                           onChange={handleChangeStatus}
                        />
                        Hết hạn
                     </label>
                  </Radio.Group>
               </div>

               <div className="flex items-start flex-col">
                  <label className="mb-[5px] block text-secondary font-semibold text-base font-montserrat leading-[26px]">
                     Cổng Check - in
                  </label>

                  <div className="grid grid-cols-3 w-full gap-[14px]">
                     <label
                        id="allGate"
                        className="text-secondary leading-[19.5px] text-base font-medium font-montserrat"
                     >
                        <Checkbox
                           id="allGate"
                           className="mr-2"
                           value={'allGate'}
                           onChange={handleChangeCheckInGate}
                        />
                        Tất cả
                     </label>
                     <label
                        id="gateOne"
                        className="text-secondary leading-[19.5px] text-base font-medium font-montserrat"
                     >
                        <Checkbox
                           id="gateOne"
                           value={'gateOne'}
                           className="mr-2"
                           onChange={handleChangeCheckInGate}
                           disabled={disabledCheckBox}
                        />
                        Cổng 1
                     </label>
                     <label
                        id="gateTwo"
                        className="text-secondary leading-[19.5px] text-base font-medium font-montserrat"
                     >
                        <Checkbox
                           id="gateTwo"
                           value={'gateTwo'}
                           className="mr-2"
                           onChange={handleChangeCheckInGate}
                           disabled={disabledCheckBox}
                        />
                        Cổng 2
                     </label>
                     <label
                        id="gateThree"
                        className="text-secondary leading-[19.5px] text-base font-medium font-montserrat"
                     >
                        <Checkbox
                           id="gateThree"
                           value={'gateThree'}
                           className="mr-2"
                           onChange={handleChangeCheckInGate}
                           disabled={disabledCheckBox}
                        />
                        Cổng 3
                     </label>
                     <label
                        id="gateFour"
                        className="text-secondary leading-[19.5px] text-base font-medium font-montserrat"
                     >
                        <Checkbox
                           id="gateFour"
                           value="gateFour"
                           className="mr-2"
                           onChange={handleChangeCheckInGate}
                           disabled={disabledCheckBox}
                        />
                        Cổng 4
                     </label>
                     <label
                        id="gateFine"
                        className="text-secondary leading-[19.5px] text-base font-medium font-montserrat"
                     >
                        <Checkbox
                           id="gateFine"
                           value="gateFine"
                           className="mr-2"
                           onChange={handleChangeCheckInGate}
                           disabled={disabledCheckBox}
                        />
                        Cổng 5
                     </label>
                  </div>
               </div>
            </div>

            <Button
               title="Lọc"
               outline
               className="w-[160px] mx-auto"
               type="submit"
            />
         </form>
      </Modal>
   );
};

export default ModalFilter;
