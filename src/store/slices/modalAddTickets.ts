import { createSlice } from "@reduxjs/toolkit";

const modalAddTicketSlice = createSlice({
    name: 'modal',
    initialState: {
        isOpenModalAddTickets: false,
        isOpenModalUpdateTicketPackage: false
    },
    reducers: {
        onOpenModalAddTickets(state) {
            state.isOpenModalAddTickets = true
        },
        onCloseModalAddTickets(state) {
            state.isOpenModalAddTickets = false
        },
        onOpenModalUpdateTicketPackage(state) {
            state.isOpenModalUpdateTicketPackage = true
        },
        onCloseModalUpdateTicketPackage(state) {
            state.isOpenModalUpdateTicketPackage = false
        }
    }
})

export const { onCloseModalAddTickets, onOpenModalAddTickets, onCloseModalUpdateTicketPackage,onOpenModalUpdateTicketPackage } = modalAddTicketSlice.actions
export default modalAddTicketSlice.reducer