import { db } from '@/configs';
import { ITicketPackage } from '@/types';
import { SerializedError, createAsyncThunk } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import dayjs from 'dayjs';
import { addDoc, collection, doc, getCountFromServer, getDocs, orderBy, query, updateDoc, where, writeBatch} from 'firebase/firestore'

interface TicketState {
    listTicketPackage: ITicketPackage[],
    isLoading: boolean,
    error: SerializedError | null,
}

const initialState: TicketState = {
    listTicketPackage: [],
    isLoading: false,
    error: null,
}

const randomBookingCode = (): Uppercase<string> => {
    return ('ALT' + (Math.floor(Math.random() * 90000000) + 10000000)).toUpperCase() as Uppercase<string>
}

const randomTicketNumber = () => {
    const min = 1;
    const max = Math.pow(10, 12);
    const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    return randomNumber;
}

const randomGate = (): string => {
    const min = 1;
    const max = 5;
    const randomNumber = Math.random();
    if (randomNumber < 0.2) {
      return "-";
    } else { 
      const randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
      return `Cổng ${randomNum}`;
    }
}


export const addTicketPackage = createAsyncThunk('tickets/addTicketPackage', async (data: ITicketPackage, thunk) => {
    try {
        const coll = collection(db, 'ticketPackages')
        const querySnapShot = await getDocs(coll)
        const snapshot = await getCountFromServer(coll)
        let stt: number = 1

        const newData = {
            ...data,
            usageStatus: 'notUsedYet',
            bookingCode: randomBookingCode(),
            ticketNumber: randomTicketNumber(),
            checkInGate:  randomGate(),
            ticketTypeName: 'Vé cổng',
            checkTicket: false,
        }

        if (querySnapShot.empty) {
            await addDoc(collection(db, 'ticketPackages'), { ...newData, stt })
        } else {
            stt = snapshot.data().count + 1
            await addDoc(collection(db, 'ticketPackages'), { ...newData, stt })
        }
        return { ...newData, stt }
    } catch (err) {
        return thunk.rejectWithValue(err)
    }
})
    
export const updateTicPackage = createAsyncThunk('tickets/updateTicPackage', async (data: ITicketPackage, thunk) => {
    try {
        const ref = doc(db, 'ticketPackages', data.id!)
        await updateDoc(ref, {...data })
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

export const checkTickets = createAsyncThunk('tickets/checkTickets', async (_, thunk) => {
    try {
        const coll = collection(db, 'ticketPackages')
        const q = query(coll, orderBy('stt', 'asc'))
        const querySnapshot = await getDocs(q)
        const batch = writeBatch(db)
        let check: string = ''
        let data: ITicketPackage[] = [];

        querySnapshot.forEach(async (document) => {
            batch.update(doc(db, 'ticketPackages', document.id), {
                checkTicket: true
            })
        })

        await batch.commit().then(() => check = 'success')

        if (check === 'success') {
            data = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as ITicketPackage))
        }

        return data
    } catch (err) {
        return thunk.rejectWithValue(err)
    }
})


export const updateEndDateTicket = createAsyncThunk('tickets/updateEndDateTicket', async (data: ITicketPackage, thunk) => {
    try {
        const ref = doc(db, "ticketPackages", data.id!);
        await updateDoc(ref, { ...data })
        return { ...data }
    } catch (err) {
        return thunk.rejectWithValue(err)
    }
})


export const startUsingTicket = createAsyncThunk('tickets/startUsingTicket', async (id: string, thunk) => {
    try {
        const dateUsed = dayjs().format('DD/MM/YYYY');
        const ref = doc(db, 'ticketPackages', id)
        await updateDoc(ref, {
            usageStatus: 'used',
            dateUsed: dateUsed
        })
        return { id, dateUsed: dateUsed }
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

        builder.addCase(checkTickets.pending, (state, action) => {
            state.isLoading = true
        })
        builder.addCase(checkTickets.rejected, (state, action) => {
            state.isLoading = false
            state.error = action.error
        })
        builder.addCase(checkTickets.fulfilled, (state, action) => {
            if (action.payload) {
                state.listTicketPackage = action.payload
                state.isLoading = false
            }
        })


        builder.addCase(updateEndDateTicket.pending, (state, _) => {
            state.isLoading = true
        })

        builder.addCase(updateEndDateTicket.rejected, (state, action) => {
            state.isLoading = false
            state.error = action.error
        })

        builder.addCase(updateEndDateTicket.fulfilled, (state, action) => {
            const { id } = action.payload

            state.isLoading = false
            state.listTicketPackage = [...state.listTicketPackage].map((i) => {
                if (i.id === id) {
                    return action.payload
                }
                return i
            })
        })


        builder.addCase(startUsingTicket.pending, (state, _) => {
            state.isLoading = true
        })

        builder.addCase(startUsingTicket.rejected, (state, action) => {
            state.isLoading = false
            state.error = action.error
        })

        builder.addCase(startUsingTicket.fulfilled, (state, action) => {
            const { id, dateUsed } = action.payload

            state.isLoading = false
            state.listTicketPackage = [...state.listTicketPackage].map((i) => {
                if (i.id === id) {
                    return { ...i, usageStatus: 'used', dateUsed }
                }
                return i
            })
        })

    }
})


export default ticketSlice.reducer