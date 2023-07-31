import { Button, Heading } from '@/components';
import TableSearch from '@/components/Table/SearchTable';
import { DatePicker } from 'antd';

const CheckTicket = () => {
   return (
      <div className="w-full h-[calc(100%_-_32px)] flex items-start gap-6">
         <div className="bg-white rounded-3xl shadow-md p-6 w-8/12 h-full">
            <Heading title="Đối soát vé" />

            <div className="flex items-center justify-between">
               <TableSearch />
               <Button title="Chốt đối soát" />
            </div>
         </div>

         <div className="bg-white rounded-3xl shadow-md w-4/12 h-full p-6">
            <Heading title="Lọc vé" />

            <table className="table">
               <tbody>
                  <tr className="text-left">
                     <td className="align-text-top">
                        <span className="mr-[26px] text-base leading-[26px] font-semibold font-montserrat">
                           Tình trạng đối soát
                        </span>
                     </td>
                     <td>
                        <div className="flex flex-col select-none mb-6">
                           <label
                              htmlFor="ticketFilterAll"
                              className="leading-[19.5px] cursor-pointer font-montserrat text-base font-medium flex gap-2 items-center"
                           >
                              <input type="radio" id="ticketFilterAll" />
                              Tất cả
                           </label>
                           <label
                              htmlFor="ticketFilterCheck"
                              className="leading-[19.5px] cursor-pointer font-montserrat text-base font-medium flex gap-2 items-center"
                           >
                              <input type="radio" id="ticketFilterCheck" />
                              Đã đối soát
                           </label>
                           <label
                              htmlFor="ticketFilterNotCheck"
                              className="leading-[19.5px] cursor-pointer font-montserrat text-base font-medium flex gap-2 items-center"
                           >
                              <input type="radio" id="ticketFilterNotCheck" />
                              Chưa đối soát
                           </label>
                        </div>
                     </td>
                  </tr>
                  <tr className="text-left">
                     <td className="align-text-top">
                        <span className="mr-[26px] text-base leading-[26px] font-semibold font-montserrat">
                           Loại vé
                        </span>
                     </td>
                     <td>
                        <span className="text-base font-montserrat font-medium leading-[19.5px] mb-6 block">
                           Vé cổng
                        </span>
                     </td>
                  </tr>
                  <tr className="text-left">
                     <td className="align-text-top">
                        <span className="mr-[26px] text-base leading-[26px] font-semibold font-montserrat">
                           Từ ngày
                        </span>
                     </td>
                     <td>
                        <DatePicker className="mb-6" />
                     </td>
                  </tr>
                  <tr className="text-left">
                     <td className="align-text-top">
                        <span className="mr-[26px] text-base leading-[26px] font-semibold font-montserrat">
                           Đến ngày
                        </span>
                     </td>
                     <td>
                        <DatePicker className="mb-6" />
                     </td>
                  </tr>
               </tbody>
               <tfoot>
                  <tr>
                     <td colSpan={2}>
                        <Button
                           title="Lọc"
                           outline
                           className="w-[160px] mx-auto"
                        />
                     </td>
                  </tr>
               </tfoot>
            </table>
         </div>
      </div>
   );
};

export default CheckTicket;
