import { FormRule } from 'antd'

export const ticketRules: Record<string, FormRule[]> = {
    ticketName: [
        { required: true, message: 'Tên gói vé là bắt buộc' },
        {
            message: 'Tên gói vé không được nhỏ hơn 3 ký tự',
            min: 3,
        },
        {
            message: 'Tên gói vé không được vượt quá 40 ký tự',
            max: 40,
        },
    ],
    startDateApply: [
        {
            required: true,
            message: 'Ngày áp dụng là bắt buộc',
        },
        ({ getFieldValue }) => {
            const endDateExpiresIn = getFieldValue('endDateExpiresIn')
            return {
                validator(_rule, value) {
                    if (endDateExpiresIn === null) return Promise.resolve()
                    const startDate = new Date(value)
                    const endDate = new Date(endDateExpiresIn)
                    if (startDate >= endDate) {
                        return Promise.reject('Ngày bắt đầu không được lớn hơn hoặc bằng ngày kết thúc')
                    }
                    return Promise.resolve()
                },
            }
        },
    ],
    endDateExpiresIn: [
        {
            required: true,
            message: 'Ngày hết hạn là bắt buộc',
        },
        ({ getFieldValue }) => {
            const startDateApply = getFieldValue('startDateApply')
            return {
                validator(_rule, value) {
                    if (startDateApply === null) return Promise.resolve()

                    const endDate = new Date(value)
                    const startDate = new Date(startDateApply)
                    if (endDate <= startDate) {
                        return Promise.reject('Ngày kết thúc không được nhỏ hơn hoặc bằng ngày bắt đầu')
                    }
                    return Promise.resolve()
                },
            }
        },
    ],
    price: [
        ({ getFieldValue }) => {
            const singlePrice = getFieldValue('singlePrice')
            const comboPrice = getFieldValue('comboPrice')
            return {
                validator() {
                    if (singlePrice || comboPrice) return Promise.resolve()
                    if (!singlePrice && !comboPrice) return Promise.reject(new Error('Giá vé là bắt buộc'))
                },
            }
        },
    ],
}
