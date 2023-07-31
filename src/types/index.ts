export interface ITicket {
    stt: number
    bookingCode?: Uppercase<string>  
    ticketNumber: number
    status: string
    date: Date
    tiketIssueDate: Date
    checkInGate: string
    eventName?: string
}


export interface ITicketPackage {
    id?: string
    stt?: number
    bookingCode?: Uppercase<string>  
    ticketPackageName: string
    singleTicket: string;
    comboTicket: string;
    status: string
    effectiveDate: {
        date: string;
        time: string;
    };
    expirationDate: {
        date: string;
        time: string;
    };
    quantity: number | string | null;

}

