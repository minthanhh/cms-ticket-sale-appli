import { db } from '@/configs';
import { ITicketPackage } from '@/types';
import { SerializedError, createAsyncThunk } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { addDoc, collection, getDocs, increment, orderBy, query} from 'firebase/firestore'

interface TicketState {
    listTicketPackage: ITicketPackage[],
    isLoading: boolean,
    error: SerializedError | null
}

const initialState: TicketState = {
    listTicketPackage: [],
    isLoading: false,
    error: null
}

export const addTicketPackage = createAsyncThunk('tickets/addTicketPackage', async (data: ITicketPackage, thunk) => {
    try {
        const coll = collection(db, 'ticketPackages')
        const querySnapShot = await getDocs(coll)
        let stt: number = 1

        if (querySnapShot.empty) {
            await addDoc(collection(db, 'ticketPackages'), { ...data, stt })
        } else {
            const lastTicket = querySnapShot.docs[querySnapShot.docs.length - 1];
            const lastStt = lastTicket.data().stt;
            stt = lastStt + stt
            await addDoc(collection(db, 'ticketPackages'), { ...data, stt: increment(lastStt + 1) })
        }
        return { ...data, stt }
    } catch (err) {
        return thunk.rejectWithValue(err)
    }
})

export const getAllTicketPackage = createAsyncThunk('tickets/getAllTicketPackage', async (_, thunk) => {
    try {
        const coll = collection(db, 'ticketPackages')
        const q = query(coll, orderBy('stt', 'asc'))
        const snapShot = await getDocs(q)
        return snapShot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as ITicketPackage ))
    } catch (err) {
        return thunk.rejectWithValue(err)
    }
})

const ticketSlice = createSlice({
    name: 'ticket',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getAllTicketPackage.fulfilled, (state, action) => {
            if (action.payload) {
                state.listTicketPackage = action.payload
            }
        })

        builder.addCase(addTicketPackage.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(addTicketPackage.fulfilled, (state, action) => {
            state.isLoading = false
            if (action.payload) {
                state.listTicketPackage.push(action.payload)
            }
        })
        builder.addCase(addTicketPackage.rejected, (state, action) => {
            state.isLoading = false
            state.error = action.error
        })
    }
})


export default ticketSlice.reducer