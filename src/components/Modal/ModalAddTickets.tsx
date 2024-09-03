import { Checkbox, DatePicker, Form, FormRule, Input, Modal, Select, Typography, Button } from 'antd'
import { useState, memo, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { IoIosArrowDown } from 'react-icons/io'

import { RootState } from '@/store'
import { addTicket } from '@/store/slices/ticketSlice'
import { useAppDispatch, useAppSelector } from '@/hooks/storeHooks'
import { Timestamp } from 'firebase/firestore'

const caculateSinglePrice = (quantity: string, comboPrice: string) => {
    const quantityInt = parseInt(quantity || '0')
    const comboPriceInt = parseInt(comboPrice || '0')
    return (comboPriceInt / quantityInt).toFixed()
}

const removeCommas = (input: string) => {
    return input.replace(/,/g, '')
}

const formatCurrencyToVND = (input: string) => {
    let cleanedInput = input.replace(/[^0-9,]/g, '')
    // Bước 2: Loại bỏ tất cả các dấu phẩy hiện có để xử lý lại định dạng
    cleanedInput = cleanedInput.replace(/,/g, '')
    // Bước 3: Định dạng lại chuỗi thành dạng tiền tệ (thêm dấu phẩy mỗi 3 chữ số)
    cleanedInput = cleanedInput.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    // Bước 4: Đảm bảo chuỗi kết thúc với " vnđ"
    return cleanedInput
}

const addTicketRules: Record<string, FormRule[]> = {
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

const INIT_VALUES = {
    ticketName: '',
    singlePrice: '',
    comboPrice: '',
    quantity: '1',
    startDateApply: '',
    endDateExpiresIn: '',
    status: 'apply',
}

interface Props {
    isOpen: boolean
    onClose: () => void
}

const ModalAddTickets = ({ isOpen, onClose }: Props) => {
    const [form] = Form.useForm()
    const [, setIsFormSubmitting] = useState(false)
    const [isComboChecked, setIsComboChecked] = useState(false)
    const [isSingleChecked, setIsSingleChecked] = useState(false)

    const isComboDisabled = isSingleChecked || !isComboChecked
    const isSingleDisabled = isComboChecked || !isSingleChecked
    const isSingleOrComboChecked = isComboChecked || isSingleChecked

    const { isOpenModalAddTickets } = useSelector((state: RootState) => state.modal)
    const dispatch = useAppDispatch()

    useEffect(() => {
        if (!isComboChecked && !isSingleChecked && !isOpen) {
            form.setFieldsValue({
                singlePrice: '',
                comboPrice: '',
                quantity: 1,
            })
        }
    }, [isComboChecked, isSingleChecked, form, isOpen])

    const onPriceChange = (quantity: string, comboPrice: string) => {
        if (!isComboChecked) return
        const singlePrice = caculateSinglePrice(quantity, removeCommas(comboPrice))

        form.setFieldsValue({
            singlePrice: formatCurrencyToVND(singlePrice),
            comboPrice: formatCurrencyToVND(comboPrice),
        })
    }

    return (
        <Modal centered title="Thêm gói vé" rootClassName="modal-add-tickets" open={isOpenModalAddTickets} footer={null} closeIcon={null} width={758}>
            <Form
                form={form}
                initialValues={INIT_VALUES}
                layout="vertical"
                onFinish={(values) => {
                    setIsFormSubmitting(true)
                    delete values.price

                    const ticket = {
                        ...values,
                        endDateExpiresIn: Timestamp.fromDate(new Date(values.endDateExpiresIn)),
                        startDateApply: Timestamp.fromDate(new Date(values.startDateApply)),
                    }

                    dispatch(addTicket(ticket))
                        .catch((err) => {})
                        .finally(() => setIsFormSubmitting(false))
                }}>
                <Form.Item required={false} label={<FormLabel label="Tên gói vé" />} name="ticketName" rules={addTicketRules.ticketName}>
                    <Input placeholder="Nhập tên gói vé" className="w-[52%]" />
                </Form.Item>

                <Form.Item className="m-0" label={<FormLabel label="Ngày áp dụng" />}>
                    <Form.Item name="startDateApply" rules={addTicketRules.startDateApply}>
                        <DatePicker className="w-[52%]" picker="date" placeholder="dd/mm/yy" format={'DD/MM/YYYY'} />
                    </Form.Item>
                    <Form.Item name="endDateExpiresIn" rules={addTicketRules.endDateExpiresIn}>
                        <DatePicker className="w-[52%]" picker="date" placeholder="dd/mm/yy" format={'DD/MM/YYYY'} />
                    </Form.Item>
                </Form.Item>

                <Form.Item label={<FormLabel label="Giá vé áp dụng" />} rules={addTicketRules.price} name="price">
                    <div className="flex items-center gap-2 mb-2">
                        <Checkbox onChange={(e) => setIsSingleChecked(e.target.checked)} checked={isSingleOrComboChecked} disabled={isComboChecked} className="select-none">
                            Vé lẻ với giá
                        </Checkbox>
                        <Form.Item className="m-0" name="singlePrice">
                            <Input
                                onChange={(e) => {
                                    const { value } = e.target
                                    if (isSingleChecked) {
                                        const singlePrice = formatCurrencyToVND(value)
                                        form.setFieldsValue({
                                            quantity: 1,
                                            comboPrice: singlePrice,
                                            singlePrice,
                                        })
                                    }
                                }}
                                disabled={isSingleDisabled}
                                placeholder="Giá vé"
                                width={148}
                            />
                        </Form.Item>
                        vnđ / vé
                    </div>
                    <div className="flex items-center gap-2">
                        <Checkbox onChange={(e) => setIsComboChecked(e.target.checked)} disabled={isSingleChecked} checked={isComboChecked} className="select-none">
                            Combo vé với giá
                        </Checkbox>
                        <Form.Item className="m-0" name="comboPrice">
                            <Input
                                onChange={(e) => {
                                    const { value: comboPrice } = e.target
                                    onPriceChange(form.getFieldValue('quantity'), comboPrice)
                                }}
                                placeholder="Giá vé"
                                className="w-[148px]"
                                disabled={isComboDisabled}
                            />
                        </Form.Item>
                        vnđ /
                        <Form.Item className="m-0" name="quantity">
                            <Input
                                onChange={(e) => {
                                    const { value: quantity } = e.target
                                    onPriceChange(quantity, form.getFieldValue('comboPrice'))
                                }}
                                disabled={isComboDisabled}
                                placeholder="Số lượng"
                                className="w-[80px]"
                            />
                        </Form.Item>
                        vé
                    </div>
                </Form.Item>

                <Form.Item required={false} label={<FormLabel label="Tình trạng" />} name="status">
                    <Select
                        style={{ width: 176 }}
                        options={[
                            { value: 'apply', label: 'Đang áp dụng' },
                            { value: 'off', label: 'Tắt' },
                        ]}
                        suffixIcon={<IoIosArrowDown width={10.54} height={6.25} className="text-[#ff993b] font-bold" />}
                    />
                </Form.Item>
                <p className="mb-[21px] italic leading-[14.63px] text-sm font-normal text-italic">
                    <span className="text-red-500 mr-1 leading-[26px] text-base font-montserrat font-semibold not-italic">*</span>
                    là thông tin bắt buộc
                </p>
                <div className="flex items-center gap-6 text-center justify-center">
                    <Button onClick={onClose}>Huỷ</Button>
                    <Button type="primary" htmlType="submit">
                        Lưu
                    </Button>
                </div>
            </Form>
        </Modal>
    )
}

export default ModalAddTickets

const FormLabel = memo(({ label }: { label: string }) => {
    return (
        <Typography.Text className="text-secondary font-semibold text-base">
            {label}
            <sup className="text-red-500">*</sup>
        </Typography.Text>
    )
})
