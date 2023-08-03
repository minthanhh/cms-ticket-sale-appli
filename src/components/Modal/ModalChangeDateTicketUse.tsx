import { DatePicker, Modal } from 'antd';
import { RootState } from '@/store';
import { useAppDispatch, useAppSelector } from '@/hooks/storeHooks';
import { onCloseModalChangeDateTicketUse } from '@/store/slices/modalAddTickets';
import HeadingModal from './HeadingModal';
import Button from '../Button/Button';

const ModalChangeTicketDay = () => {
   const dispatch = useAppDispatch();
   const { isOpenModalChangeDateTicketUse } = useAppSelector(
      (state: RootState) => state.modal
   );

   return (
      <Modal
         open={isOpenModalChangeDateTicketUse}
         width={758}
         footer={null}
         closeIcon={null}
      >
         <HeadingModal title="Đổi ngày sử dụng vé" />

         <form>
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
                           PKG20210502
                        </span>
                     </td>
                  </tr>
                  <tr>
                     <td>
                        <span className="mb-6 font-montserrat leading-[26px] font-semibold text-base mr-[78px] block">
                           Số vé
                        </span>
                     </td>
                     <td>
                        <span className="mb-6 font-montserrat leading-[19.5px] font-medium text-base block">
                           Vé cổng - Gói sự kiện
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
                        <DatePicker picker="date" format={'DD/MM/YYYY'} />
                     </td>
                  </tr>
               </tbody>
            </table>

            <div className="flex items-center gap-6 text-center justify-center mt-8">
               <Button
                  title="Huỷ"
                  outline
                  onClick={() => dispatch(onCloseModalChangeDateTicketUse())}
                  className="w-[160px]"
                  type="button"
               />
               <Button title="Lưu" className="w-[160px]" type="submit" />
            </div>
         </form>
      </Modal>
   );
};

export default ModalChangeTicketDay;
