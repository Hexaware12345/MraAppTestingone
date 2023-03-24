import { createSlice } from '@reduxjs/toolkit'
import { fetchElectronics } from './Electronics.action'
import { addElectronics } from './Electronics.action'
import { editElectronics } from './Electronics.action'
import { deleteElectronics } from './Electronics.action'

const fetchElectronicsExtraReducer = {
    [fetchElectronics.pending]: (state, action) => {
        state.loading = true
    },
    [fetchElectronics.fulfilled]: (state, action) => {
        state.entities = [...action.payload]
        state.loading = false
    },
    [fetchElectronics.rejected]: (state, action) => {
        state.loading = false
    },
}

const addElectronicsExtraReducer = {
    [addElectronics.pending]: (state, action) => {
        state.loading = true
    },
    [addElectronics.fulfilled]: (state, action) => {
        state.entities.push(action.payload)
        state.loading = false
    },
    [addElectronics.rejected]: (state, action) => {
        state.loading = false
    },
}

const editElectronicsExtraReducer = {
    [editElectronics.pending]: (state, action) => {
        state.loading = true
    },
    [editElectronics.fulfilled]: (state, action) => {
        const { id, productname, description, offer, price, deliverydate } =
            action.payload
        const existingElectronics = state.entities.find(
            (Electronics) => Electronics.id.toString() === id.toString()
        )
        if (existingElectronics) {
            existingElectronics.productname = productname
            existingElectronics.description = description
            existingElectronics.offer = offer
            existingElectronics.price = price
            existingElectronics.deliverydate = deliverydate
        }
        state.loading = false
    },
    [editElectronics.rejected]: (state, action) => {
        state.loading = false
    },
}

const deleteElectronicsExtraReducer = {
    [deleteElectronics.pending]: (state, action) => {
        state.loading = true
    },
    [deleteElectronics.fulfilled]: (state, action) => {
        const id = action.payload
        const existingElectronics = state.entities.find(
            (Electronics) => Electronics.id.toString() === id.toString()
        )
        if (existingElectronics) {
            state.entities = state.entities.filter(
                (Electronics) => Electronics.id !== id
            )
        }
        state.loading = false
    },
    [deleteElectronics.rejected]: (state, action) => {
        state.loading = false
    },
}
const ElectronicsSlice = createSlice({
    name: 'Electronics',
    initialState: {
        entities: [],
        loading: false,
    },
    reducers: {
        ElectronicsAdded(state, action) {
            state.entities.push(action.payload)
        },
        ElectronicsUpdated(state, action) {
            const { id, productname, description, offer, price, deliverydate } =
                action.payload
            const existingElectronics = state.entities.find(
                (Electronics) => Electronics.id.toString() === id.toString()
            )
            if (existingElectronics) {
                existingElectronics.productname = productname
                existingElectronics.description = description
                existingElectronics.offer = offer
                existingElectronics.price = price
                existingElectronics.deliverydate = deliverydate
            }
        },
        ElectronicsDeleted(state, action) {
            const { id } = action.payload
            const existingElectronics = state.entities.find(
                (Electronics) => Electronics.id.toString() === id.toString()
            )
            if (existingElectronics) {
                state.entities = state.entities.filter(
                    (Electronics) => Electronics.id !== id
                )
            }
        },
    },
    extraReducers: {
        ...fetchElectronicsExtraReducer,
        ...addElectronicsExtraReducer,
        ...editElectronicsExtraReducer,
        ...deleteElectronicsExtraReducer,
    },
})

export const { ElectronicsAdded, ElectronicsUpdated, ElectronicsDeleted } =
    ElectronicsSlice.actions

export default ElectronicsSlice.reducer
