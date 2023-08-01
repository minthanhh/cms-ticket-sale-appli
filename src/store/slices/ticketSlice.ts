import { db } from '@/configs';
import { ITicketPackage } from '@/types';
import { SerializedError, createAsyncThunk } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { addDoc, collection, doc, getCountFromServer, getDocs, increment, orderBy, query, updateDoc} from 'firebase/firestore'

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

const randomBookingCode = (): Uppercase<string> => {
    return ('ALT' + (Math.floor(Math.random() * 90000000) + 10000000)).toUpperCase() as Uppercase<string>
}

export const addTicketPackage = createAsyncThunk('tickets/addTicketPackage', async (data: ITicketPackage, thunk) => {
    try {
        const coll = collection(db, 'ticketPackages')
        const querySnapShot = await getDocs(coll)
        const snapshot = await getCountFromServer(coll)
        let stt: number = 1
        const bookingCode = randomBookingCode()

        if (querySnapShot.empty) {
            await addDoc(collection(db, 'ticketPackages'), { ...data, bookingCode,  stt })
        } else {
            const lastTicket = querySnapShot.docs[querySnapShot.docs.length - 1];
            const lastStt = lastTicket.data().stt;
            stt = snapshot.data().count + 1
            await addDoc(collection(db, 'ticketPackages'), { ...data, bookingCode, stt: increment(lastStt + 1) })
        }
        return { ...data, bookingCode, stt }
    } catch (err) {
        return thunk.rejectWithValue(err)
    }
})

export const updateTicPackage = createAsyncThunk('tickets/updateTicPackage', async (data: ITicketPackage, thunk) => {
    try {
        const ref = doc(db, 'ticketPackages', data.id!)
        await updateDoc(ref, {...data})
        return { ...data }
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
        
        
        builder.addCase(updateTicPackage.pending, (state, action) => {
            state.isLoading = true
        })
        builder.addCase(updateTicPackage.fulfilled, (state, action) => {
            const { id } = action.payload
            state.listTicketPackage = [...state.listTicketPackage].map((i) => {
                if (i.id === id) {
                    return action.payload
                }
                return i
            })
            state.isLoading = false
        })
        builder.addCase(updateTicPackage.rejected, (state, action) => {
            state.error = action.error
            state.isLoading = false
        })
    }
})


export default ticketSlice.reducer