import { ITicketPackage } from "@/types";
import { utils, writeFile } from "xlsx";



export const formatToCurrencyVietNam = (value: string) => {
    const changeToNumber = Number(value) * 1000
    return changeToNumber.toLocaleString('vi-VN')
}


 export const exportToCSV = (dataTable: ITicketPackage[]) => {
    const processedData = dataTable.map((i) => ({
       STT: i.stt,
       'Mã gói': i.bookingCode,
       'Tên gói vé': i.ticketPackageName,
       'Số vé': i.ticketNumber?.toString(),
       'Ngày áp dụng': i.effectiveDate ? i.effectiveDate.date : '',
       'Ngày hết hạn': i.expirationDate ? i.expirationDate.date : '',
       'Giá vé (VNĐ/Vé)':
          (Number(i.comboTicket) / Number(i.quantity)).toString() +
          ` VNĐ/${i.quantity} vé`,
       'Giá Combo (VNĐ/Combo)': i.comboTicket ? `${i.comboTicket} VNĐ` : '',
       'Tình trạng': i.status === 'apply' ? 'Đang áp dụng' : 'Tắt',
       'Đối soát vé': i.checkTicket ? 'Đã đối soát' : 'chưa đối soát',
       'Tên loại vé': i.ticketTypeName || '',
       'Cổng check - in': i.checkInGate,
    }));

    const ws = utils.json_to_sheet(processedData, {
       header: [
          'STT',
          'Mã gói',
          'Tên gói vé',
          'Số vé',
          'Ngày áp dụng',
          'Ngày hết hạn',
          'Giá vé (VNĐ/Vé)',
          'Giá Combo (VNĐ/Combo)',
          'Tình trạng',
          'Đối soát vé',
          'Tên loại vé',
          'Cổng check - in',
       ],
    });

    const wb = utils.book_new();
    utils.book_append_sheet(wb, ws, 'Sheet1');

    writeFile(wb, 'list-of-package-data.xlsx');
 }