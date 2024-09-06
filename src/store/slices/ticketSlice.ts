import { db } from '@/configs'
import { FilterValues, ITicket, ITicketPackage, UsageStatus } from '@/types'
import { SerializedError, createAsyncThunk } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'
import dayjs from 'dayjs'
import { addDoc, and, collection, doc, getCountFromServer, getDocs, orderBy, query, QueryFieldFilterConstraint, Timestamp, updateDoc, where, writeBatch } from 'firebase/firestore'

const convertTimestampToSerializable = (timestamp: Timestamp) => {
    return timestamp.toDate().toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' })
}
interface TicketState {
    listTicketPackage: ITicketPackage[]
    isLoading: boolean

    tickets: ITicket[]
    isTicketLoading: boolean
    error: SerializedError | null
}

const initialState: TicketState = {
    listTicketPackage: [],
    tickets: [],
    isTicketLoading: false,
    isLoading: false,
    error: null,
}

const randomBookingCode = (): Uppercase<string> => {
    return ('ALT' + (Math.floor(Math.random() * 90000000) + 10000000)).toUpperCase() as Uppercase<string>
}

const randomTicketNumber = () => {
    const min = 1
    const max = Math.pow(10, 12)
    const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min
    return randomNumber
}

const randomGate = (): string => {
    const min = 1
    const max = 5
    const randomNumber = Math.random()
    if (randomNumber < 0.2) {
        return '-'
    } else {
        const randomNum = Math.floor(Math.random() * (max - min + 1)) + min
        return `GATE${randomNum}`
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
            checkInGate: randomGate(),
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
        await updateDoc(ref, { ...data })
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
        return snapShot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as ITicketPackage))
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

        querySnapshot.forEach(async (document) => {
            batch.update(doc(db, 'ticketPackages', document.id), {
                checkTicket: true,
            })
        })

        await batch.commit()

        return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data(), checkTicket: true } as ITicketPackage))
    } catch (err) {
        return thunk.rejectWithValue(err)
    }
})

export const updateEndDateTicket = createAsyncThunk('tickets/updateEndDateTicket', async (data: ITicketPackage, thunk) => {
    try {
        const ref = doc(db, 'ticketPackages', data.id!)
        await updateDoc(ref, { ...data })
        return { ...data }
    } catch (err) {
        return thunk.rejectWithValue(err)
    }
})

export const startUsingTicket = createAsyncThunk('tickets/startUsingTicket', async (id: string, thunk) => {
    try {
        const dateUsed = dayjs().format('DD/MM/YYYY')
        const ref = doc(db, 'ticketPackages', id)
        await updateDoc(ref, {
            usageStatus: 'used',
            dateUsed: dateUsed,
        })
        return { id, dateUsed: dateUsed }
    } catch (err) {
        return thunk.rejectWithValue(err)
    }
})

// #region addTicketThunk
export const addTicket = createAsyncThunk('tickets/addTicket', async (ticket: any, thunk) => {
    try {
        ticket = {
            ...ticket,
            bookingCode: randomBookingCode(),
            checkingGate: randomGate(),
            ticketTypeName: 'Vé cổng',
            usageStatus: UsageStatus.NOTUSED,
            createdAt: Timestamp.now(),
            updatedAt: Timestamp.now(),
            verifyTicket: false,
        }
        const coll = collection(db, 'tickets')
        const docRef = await addDoc(coll, ticket)
        return {
            id: docRef.id,
            ...ticket,
            startDateApply: convertTimestampToSerializable(ticket.startDateApply),
            endDateExpiresIn: convertTimestampToSerializable(ticket.endDateExpiresIn),
            createdAt: convertTimestampToSerializable(ticket.createdAt),
            updatedAt: convertTimestampToSerializable(ticket.updatedAt),
        }
    } catch (err) {
        return thunk.rejectWithValue(err)
    }
})

// #region updateTicketThunk
export const updateTicket = createAsyncThunk('tickets/updateTicket', async (ticket: any, thunk) => {
    try {
        const docRef = doc(db, 'tickets', ticket.id)
        await updateDoc(docRef, { ...ticket, updatedAt: Timestamp.now() })
        return {
            ...ticket,
            startDateApply: convertTimestampToSerializable(ticket.startDateApply),
            endDateExpiresIn: convertTimestampToSerializable(ticket.endDateExpiresIn),
            updatedAt: convertTimestampToSerializable(Timestamp.now()),
        }
    } catch (err) {
        return thunk.rejectWithValue(err)
    }
})

// #region getTicketsThunk
export const getTickets = createAsyncThunk('tickets/getTickets', async (filterValues?: FilterValues | undefined, thunk?) => {
    try {
        const coll = collection(db, 'tickets')
        let queryConditions: QueryFieldFilterConstraint[] = []

        if (filterValues) {
            if (filterValues?.['checkingGate']?.length > 0 && filterValues?.['checkingGate']?.[0] !== 'ALL') {
                queryConditions.push(where('checkingGate', 'in', filterValues['checkingGate']))
            }

            if (filterValues?.['usageStatus'] !== undefined && filterValues?.['usageStatus'] !== 'ALL') {
                queryConditions.push(where('usageStatus', '==', filterValues['usageStatus']))
            }

            if (filterValues?.['verifyTicket'] !== undefined && typeof filterValues?.['verifyTicket'] !== 'string') {
                queryConditions.push(where('verifyTicket', '==', filterValues['verifyTicket']))
            }

            if (filterValues?.['startDateApply'] !== undefined && filterValues?.['startDateApply'] !== '') {
                queryConditions.push(where('endDateExpiresIn', '<=', Timestamp.fromDate(new Date(filterValues.startDateApply))))
            }
        }

        const querySnapshot = await getDocs(query(coll, and(...queryConditions), orderBy('createdAt', 'asc')))

        const filteredDocs = querySnapshot.docs.filter((doc) => {
            const docData = doc.data()
            if (filterValues?.['endDateExpiresIn'] !== undefined && filterValues?.['endDateExpiresIn'] !== '') {
                const endDateExpiresIn = Timestamp.fromDate(new Date(filterValues.endDateExpiresIn))
                return docData.startDateApply.toDate() <= endDateExpiresIn.toDate()
            }
            return true
        })

        return filteredDocs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
            startDateApply: convertTimestampToSerializable(doc.data().startDateApply),
            endDateExpiresIn: convertTimestampToSerializable(doc.data().endDateExpiresIn),
            updatedAt: convertTimestampToSerializable(doc.data().updatedAt),
            createdAt: convertTimestampToSerializable(doc.data().createdAt),
        }))
    } catch (err) {
        return thunk?.rejectWithValue(err)
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

        // #region getTickets
        builder
            .addCase(getTickets.pending, (state, action) => {
                state.isTicketLoading = true
            })
            .addCase(getTickets.rejected, (state, action) => {
                state.isTicketLoading = false
            })
            .addCase(getTickets.fulfilled, (state, action) => {
                state.tickets = action.payload as ITicket[]
                state.isTicketLoading = false
            })

        // #region updateTicket
        builder
            .addCase(updateTicket.pending, (state) => {
                state.isTicketLoading = true
            })
            .addCase(updateTicket.rejected, (state) => {
                state.isTicketLoading = false
            })
            .addCase(updateTicket.fulfilled, (state, action) => {
                const ticket = action.payload as ITicket
                state.tickets = state.tickets.map((t) => (t.id === ticket.id ? ticket : t))
                state.isTicketLoading = false
            })

        // #region addTicket
        builder
            .addCase(addTicket.pending, (state) => {
                state.isTicketLoading = true
            })
            .addCase(addTicket.rejected, (state, action) => {
                state.isTicketLoading = false
            })
            .addCase(addTicket.fulfilled, (state, action) => {
                const ticket = action.payload as ITicket
                state.tickets = [ticket, ...state.tickets]
                state.isTicketLoading = false
            })
    },
})

export default ticketSlice.reducer
