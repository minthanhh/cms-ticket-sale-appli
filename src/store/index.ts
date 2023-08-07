import { configureStore, combineReducers } from "@reduxjs/toolkit";
import modalAddTicketsReducer from "./slices/modalAddTickets";
import ticketReducer from './slices/ticketSlice'
import chartReducer from './slices/chartSlice'

const rootReducer = combineReducers({
    modal: modalAddTicketsReducer,
    ticket: ticketReducer,
    chart: chartReducer
})

const store = configureStore({
    reducer: rootReducer
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store