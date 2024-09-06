import { useState } from 'react'
import { Checkbox, DatePicker, Modal, Radio, Typography, Button, Form, Row, Col } from 'antd'

import { FilterValues, UsageStatus } from '@/types'
import { ConvertUtil } from '@/utilities/convert.util'

const INIT_VALUES = {
    startDateApply: '',
    endDateExpiresIn: '',
    usageStatus: 'ALL',
    checkingGate: ['ALL'],
}

interface Props {
    open: boolean
    onCancel: () => void
    loadTickets: (values?: FilterValues) => void
}

const ModalFilterTicket = ({ open, onCancel, loadTickets }: Props) => {
    const [form] = Form.useForm()
    const [hasAllDisabledUnChecked, setHasAllDisabledUnChecked] = useState(false)
    const [isFilterDisabled, setIsFilterDisabled] = useState(true)

    // useEffect(() => {
    //     if (!open) return
    //     setHasAllDisabledUnChecked(true)
    //     form.setFieldValue('checkingGate', ['ALL'])
    // }, [open, form])

    return (
        <Modal
            afterClose={() => {
                setIsFilterDisabled(true)
            }}
            centered
            title={<Typography.Title level={2}>Lọc vé</Typography.Title>}
            open={open}
            onCancel={onCancel}
            footer={null}
            width={634}>
            <Form
                form={form}
                initialValues={INIT_VALUES}
                layout="vertical"
                onValuesChange={() => setIsFilterDisabled(false)}
                onFinish={async (values) => {
                    loadTickets(values)
                    onCancel()
                }}>
                <div className="flex items-center gap-5">
                    <Form.Item name="startDateApply" label="Từ ngày">
                        <DatePicker picker="date" format={'DD/MM/YYYY'} />
                    </Form.Item>
                    <Form.Item name="endDateExpiresIn" label="Đến ngày">
                        <DatePicker picker="date" format={'DD/MM/YYYY'} />
                    </Form.Item>
                </div>

                <Form.Item name="usageStatus" label="Tình trạng sử dụng">
                    <Radio.Group name="usageStatus">
                        <Radio value={'ALL'}>Tất cả</Radio>
                        <Radio value={UsageStatus.USED}>{ConvertUtil.usageStatus(UsageStatus.USED)}</Radio>
                        <Radio value={UsageStatus.NOTUSED}>{ConvertUtil.usageStatus(UsageStatus.NOTUSED)}</Radio>
                        <Radio value={UsageStatus.EXPIRED}>{ConvertUtil.usageStatus(UsageStatus.EXPIRED)}</Radio>
                    </Radio.Group>
                </Form.Item>

                <Form.Item name="checkingGate" label="Cổng Check - in">
                    <Checkbox.Group
                        onChange={(checkedValue) => {
                            if (checkedValue.includes('ALL')) {
                                setHasAllDisabledUnChecked(true)
                                form.setFieldValue('checkingGate', ['ALL'])
                            } else {
                                setHasAllDisabledUnChecked(false)
                                form.setFieldValue('checkingGate', checkedValue)
                            }
                        }}>
                        <Row>
                            {Array(6)
                                .fill('gate')
                                .map((gate, idx) => {
                                    const gateValue = gate.toUpperCase() + idx
                                    const isFirstIndex = idx === 0
                                    return (
                                        <Col span={8} key={gateValue}>
                                            <Checkbox className="select-none" disabled={!isFirstIndex && hasAllDisabledUnChecked} value={isFirstIndex ? 'ALL' : gateValue}>
                                                {isFirstIndex ? 'Tất cả' : `Cổng ${idx}`}
                                            </Checkbox>
                                        </Col>
                                    )
                                })}
                        </Row>
                    </Checkbox.Group>
                </Form.Item>

                <Form.Item className="text-center">
                    <Button disabled={isFilterDisabled} htmlType="submit" type="primary" className="bg-primary disabled:bg-orange-300">
                        Lọc
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default ModalFilterTicket
