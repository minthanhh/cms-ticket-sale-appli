import { UsageStatus } from '@/types'

export class ConvertUtil {
    static readonly _usageStatus = {
        [UsageStatus.USED]: {
            label: 'Đã sử dụng',
            color: 'silver',
        },
        [UsageStatus.EXPIRED]: {
            label: 'Hết hạn',
            color: 'red',
        },
        [UsageStatus.NOTUSED]: {
            label: 'Chưa sử dụng',
            color: 'green',
        },
    }

    static usageStatus(usageStatus: UsageStatus) {
        return ConvertUtil._usageStatus[usageStatus].label
    }

    static usageStatusColor(usageStatus: UsageStatus) {
        return ConvertUtil._usageStatus[usageStatus].color
    }
}
