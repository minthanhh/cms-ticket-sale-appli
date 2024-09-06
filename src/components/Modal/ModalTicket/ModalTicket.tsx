import { Checkbox, DatePicker, Form, Input, Modal, Select, Typography, Button, Radio } from 'antd'
import { useState, memo, useEffect } from 'react'
import { IoIosArrowDown } from 'react-icons/io'
import { Timestamp } from 'firebase/firestore'

import { addTicket, updateTicket } from '@/store/slices/ticketSlice'
import { useAppDispatch, useAppSelector } from '@/hooks/storeHooks'
import { AmountUtil } from '@/utilities/amount.util'
import { ticketRules } from './ticket.validators'
import { RootState } from '@/store'
import viVN from 'antd/es/date-picker/locale/vi_VN'
import dayjs from 'dayjs'
import { toast } from 'react-toastify'
import { SerializedError } from '@reduxjs/toolkit'
import { TicketPackageType } from '@/types'

const INIT_VALUES = {
    ticketName: '',
    singlePrice: '',
    comboPrice: '',
    quantity: '1',
    startDateApply: '',
    endDateExpiresIn: '',
    status: 'apply',
    packageType: TicketPackageType.FAMILY_PACKAGE,
}

interface Props {
    isOpen: boolean
    onClose: () => void
    type: 'edit' | 'create'
    id?: string
}

const ModalTicket = ({ isOpen, onClose, type, id }: Props) => {
    const [form] = Form.useForm()
    const [isFormSubmitting, setIsFormSubmitting] = useState(false)
    const [isComboChecked, setIsComboChecked] = useState(false)
    const [isSingleChecked, setIsSingleChecked] = useState(false)
    const [isValueChanges, setIsValueChanges] = useState(false)
    const { tickets } = useAppSelector((state: RootState) => state.ticket)
    const ticket = tickets.find((t) => t.id === id)

    const isComboDisabled = isSingleChecked || !isComboChecked
    const isSingleDisabled = isComboChecked || !isSingleChecked
    const isSingleOrComboChecked = isComboChecked || isSingleChecked
    const isSetFieldsValue = !isComboChecked && !isSingleChecked && !isOpen

    const dispatch = useAppDispatch()

    const onReset = () => {
        Promise.all([form.resetFields(), setIsValueChanges(false), setIsFormSubmitting(false), setIsComboChecked(false), setIsSingleChecked(false)])
    }

    useEffect(() => {
        if (isSetFieldsValue) {
            form.setFieldsValue({
                singlePrice: '',
                comboPrice: '',
                quantity: 1,
            })
        }

        if (type === 'edit' && ticket) {
            form.setFieldsValue({
                singlePrice: ticket.singlePrice,
                comboPrice: ticket.comboPrice,
                quantity: ticket.quantity,
                ticketName: ticket.ticketName,
                startDateApply: dayjs(ticket.startDateApply, 'DD/MM/YYYY'),
                endDateExpiresIn: dayjs(ticket.endDateExpiresIn, 'DD/MM/YYYY'),
                status: ticket.status,
            })
            setIsComboChecked(true)
        }
    }, [type, ticket, isSetFieldsValue, form])

    const onPriceChange = (quantity: string, comboPrice: string) => {
        if (!isComboChecked) return
        const singlePrice = AmountUtil.caculateSinglePrice(quantity, AmountUtil.removeCommas(comboPrice))

        form.setFieldsValue({
            singlePrice: AmountUtil.formatCurrencyToVND(singlePrice),
            comboPrice: AmountUtil.formatCurrencyToVND(comboPrice),
        })
    }

    return (
        <Modal afterClose={onReset} centered title={<Typography.Title level={2}>Thêm gói vé</Typography.Title>} rootClassName="modal-add-tickets" open={isOpen} footer={null} closeIcon={null} width={758}>
            <Form
                form={form}
                initialValues={INIT_VALUES}
                layout="vertical"
                onValuesChange={!isValueChanges ? () => setIsValueChanges(true) : undefined}
                onFinish={(values) => {
                    setIsFormSubmitting(true)
                    delete values.price

                    const rawTicket = {
                        ...values,
                        endDateExpiresIn: Timestamp.fromDate(new Date(values.endDateExpiresIn)),
                        startDateApply: Timestamp.fromDate(new Date(values.startDateApply)),
                    }

                    const ticketAction = type === 'edit' ? updateTicket({ id: ticket?.id, ...rawTicket }) : addTicket(rawTicket)

                    dispatch(ticketAction)
                        .then(onClose)
                        .catch((error: SerializedError) => toast.error(error.message))
                        .finally(() => setIsFormSubmitting(false))
                }}>
                <Form.Item required={false} label={<FormLabel label="Tên gói vé" />} name="ticketName" rules={ticketRules.ticketName}>
                    <Input placeholder="Nhập tên gói vé" className="w-[52%]" />
                </Form.Item>

                <Form.Item className="m-0" label={<FormLabel label="Ngày áp dụng" />}>
                    <Form.Item name="startDateApply" rules={ticketRules.startDateApply}>
                        <DatePicker className="w-[52%]" picker="date" format={'DD/MM/YYYY'} locale={viVN} />
                    </Form.Item>
                    <Form.Item name="endDateExpiresIn" rules={ticketRules.endDateExpiresIn}>
                        <DatePicker className="w-[52%]" picker="date" format={'DD/MM/YYYY'} locale={viVN} />
                    </Form.Item>
                </Form.Item>

                <Form.Item label={<FormLabel label="Giá vé áp dụng" />} rules={ticketRules.price} name="price">
                    <div className="flex items-center gap-2 mb-2">
                        <Checkbox onChange={(e) => setIsSingleChecked(e.target.checked)} checked={isSingleOrComboChecked} disabled={isComboChecked} className="select-none">
                            Vé lẻ với giá
                        </Checkbox>
                        <Form.Item className="m-0" name="singlePrice">
                            <Input
                                onChange={(e) => {
                                    const { value } = e.target
                                    if (isSingleChecked) {
                                        const singlePrice = AmountUtil.formatCurrencyToVND(value)
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

                <Form.Item required={false} label={<FormLabel label="Loại gói" />} name="packageType">
                    <Radio.Group>
                        <Radio value={TicketPackageType.FAMILY_PACKAGE}>Gói gia đình</Radio>
                        <Radio value={TicketPackageType.EVENT_PACKAGE}>Gói sự kiện</Radio>
                    </Radio.Group>
                </Form.Item>

                <p className="mb-[21px] italic leading-[14.63px] text-sm font-normal text-italic">
                    <span className="text-red-500 mr-1 leading-[26px] text-base font-montserrat font-semibold not-italic">*</span>
                    là thông tin bắt buộc
                </p>
                <div className="flex items-center gap-2 text-center justify-center">
                    <Button onClick={onClose} disabled={isFormSubmitting}>
                        Huỷ
                    </Button>
                    <Button type="primary" htmlType="submit" className="bg-primary hover:bg-orange-500 transition-colors duration-150 ease-in-out" loading={isFormSubmitting} disabled={isFormSubmitting}>
                        Lưu
                    </Button>
                </div>
            </Form>
        </Modal>
    )
}

export default ModalTicket

const FormLabel = memo(({ label }: { label: string }) => {
    return (
        <Typography.Text className="text-secondary font-semibold text-base">
            {label}
            <sup className="text-red-500">*</sup>
        </Typography.Text>
    )
})
