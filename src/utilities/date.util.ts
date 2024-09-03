export class DateHandler {
    static caculateSinglePrice(quantity: string, comboPrice: string) {
        const quantityInt = parseInt(quantity || '0')
        const comboPriceInt = parseInt(comboPrice || '0')
        return (comboPriceInt / quantityInt).toFixed()
    }

    removeCommas = (input: string) => {
        return input.replace(/,/g, '')
    }

    formatCurrencyToVND = (input: string) => {
        let cleanedInput = input.replace(/[^0-9,]/g, '')
        // Bước 2: Loại bỏ tất cả các dấu phẩy hiện có để xử lý lại định dạng
        cleanedInput = cleanedInput.replace(/,/g, '')
        // Bước 3: Định dạng lại chuỗi thành dạng tiền tệ (thêm dấu phẩy mỗi 3 chữ số)
        cleanedInput = cleanedInput.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        // Bước 4: Đảm bảo chuỗi kết thúc với " vnđ"
        return cleanedInput
    }
}
