import { createSlice } from "@reduxjs/toolkit";

const modalAddTicketSlice = createSlice({
    name: 'modal',
    initialState: {
        isOpenModalAddTickets: false,
        isOpenModalUpdateTicketPackage: false,
        isOpenModalFillter: false
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
        },
        onOpenModalFillter(state) {
            state.isOpenModalFillter = true
        },
        onCloseModalFillter(state) {
            state.isOpenModalFillter = false
        }
    }
})

export const { onOpenModalFillter, onCloseModalFillter, onCloseModalAddTickets, onOpenModalAddTickets, onCloseModalUpdateTicketPackage,onOpenModalUpdateTicketPackage } = modalAddTicketSlice.actions
export default modalAddTicketSlice.reducer