import { db } from "@/configs";
import { getWeeksInMonth } from "@/helpers";
import { ITicketPackage } from "@/types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import dayjs from "dayjs";
import { collection, getDocs, query, where } from "firebase/firestore";


export const getTotalPriceInWeeks = createAsyncThunk('chart/getTotalPriceInWeeks', async (_, thunk) => {
    try {
        const coll = collection(db, 'ticketPackages')
        const querySnapshot = await getDocs(coll)
        const weeks = getWeeksInMonth()
        const listTicket = querySnapshot.docs.map((item) => ({ id: item.id, ...item.data()} as ITicketPackage))
        
        let countItem: number[] = []
       
        weeks.forEach((item) => {
            const i = item.split(' - ')
            const startDate = dayjs(i[0], 'DD/MM').date()
            const endDate = dayjs(i[1], 'DD/MM').date()
            
            const filter = listTicket.filter((it) => {
                const days = dayjs(it.effectiveDate.date, 'DD/MM').date()
                return days >= startDate && days <= endDate
            })

             const count = filter.reduce((acc, cur) => {
                if (cur.comboTicket) {
                    acc += Number(cur.comboTicket)
                } else {
                    acc += Number(cur.singleTicket)
                }
                return acc
             }, 0)

             countItem.push(count)
        })
        
        return countItem
    } catch (err) {
        return thunk.rejectWithValue(err)
    }
})


export const ticketResults = createAsyncThunk('tickets/familyTicketResult', async (_, thunk) => {
    try {
        const coll = collection(db, 'ticketPackages')
        const querySnapshot = await getDocs(coll)

        const data = querySnapshot.docs.map(i => i.data() as ITicketPackage)

        return { 
            familyPackage: {
                used: data.filter((i) => i.usageStatus === 'used' && i.ticketPackageName === 'Gói gia đình').length,
                notUsedYet: data.filter((i) => i.usageStatus === 'notUsedYet' && i.ticketPackageName === 'Gói gia đình').length
            }, 
            eventPackage: { 
                used: data.filter((i) => i.usageStatus === 'used' && i.ticketPackageName === 'Gói sự kiện').length,
                notUsedYet: data.filter((i) => i.usageStatus === 'notUsedYet' && i.ticketPackageName === 'Gói sự kiện').length
            } 
        }
    } catch (err) {
        return thunk.rejectWithValue(err)
    }
})

const initialState = {
    listPrice: [] as number[],
    familyPackage: {
        used: 0,
        notUsedYet: 0
    },
    eventPackage: {
        used: 0,
        notUsedYet: 0
    },
}

const chartSlice = createSlice({
    name: 'chart',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder.addCase(getTotalPriceInWeeks.fulfilled, (state, action) => {
            state.listPrice = action.payload
        })

        builder.addCase(ticketResults.fulfilled, (state, action) => {
            state.familyPackage = action.payload.familyPackage
            state.eventPackage = action.payload.eventPackage
        })
    },

    
})

export default chartSlice.reducer