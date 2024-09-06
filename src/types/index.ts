export interface ITicketPackage {
    id?: string
    stt?: number
    bookingCode?: Uppercase<string>
    ticketPackageName: string
    singleTicket: string
    comboTicket: string
    status: string
    effectiveDate: {
        date: string
        time: string
    }
    expirationDate: {
        date: string
        time: string
    }
    quantity: number | string | null
    ticketNumber?: number
    checkInGate?: string
    checkTicket?: boolean
    ticketTypeName?: string
    usageStatus?: string
    dateUsed?: string
}

export interface ITicket {
    id: string
    ticketName: string
    singlePrice: string
    comboPrice: string
    status: string
    startDateApply: string
    endDateExpiresIn: string
    checkInGate: string
    packageType: string
    bookingCode: string
    quantity: string
    usageStatus: string
    createdAt?: string
    updatedAt?: string
}

export enum TicketPackageType {
    FAMILY_PACKAGE = 'FAMILY',
    EVENT_PACKAGE = 'EVENT',
}

export enum UsageStatus {
    NOTUSED = 'NOTUSED',
    USED = 'USED',
    EXPIRED = 'EXPIRED',
}

export type FilterValues = {
    usageStatus: string
    startDateApply: string
    endDateExpiresIn: string
    checkingGate: string[]
    verifyTicket: boolean
}
