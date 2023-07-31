import { configureStore, combineReducers } from "@reduxjs/toolkit";
import modalAddTicketsReducer from "./slices/modalAddTickets";
import ticketReducer from './slices/ticketSlice'

const rootReducer = combineReducers({
    modal: modalAddTicketsReducer,
    ticket: ticketReducer
})

const store = configureStore({
    reducer: rootReducer
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store