export const formatToCurrencyVietNam = (value: string) => {
    const changeToNumber = Number(value) * 1000
    return changeToNumber.toLocaleString('vi-VN')
}