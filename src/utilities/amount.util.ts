export class AmountUtil {
    static caculateSinglePrice(quantity: string, comboPrice: string) {
        const quantityInt = parseInt(quantity || '0')
        const comboPriceInt = parseInt(comboPrice || '0')
        return (comboPriceInt / quantityInt).toFixed()
    }

    static removeCommas(input: string) {
        return input.replace(/,/g, '')
    }

    static formatCurrencyToVND(input: string, hasCurrency: boolean = false) {
        let cleanedInput = input.replace(/[^0-9,]/g, '')
        // Bước 2: Loại bỏ tất cả các dấu phẩy hiện có để xử lý lại định dạng
        cleanedInput = cleanedInput.replace(/,/g, '')
        // Bước 3: Định dạng lại chuỗi thành dạng tiền tệ (thêm dấu phẩy mỗi 3 chữ số)
        cleanedInput = cleanedInput.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        // Bước 4: Đảm bảo chuỗi kết thúc với " vnđ"
        if (hasCurrency) {
            cleanedInput = AmountUtil.addCurrencyInEndLine(cleanedInput)
        }

        return cleanedInput
    }

    static addCurrencyInEndLine(current: string) {
        return (current += ' VNĐ')
    }
}
