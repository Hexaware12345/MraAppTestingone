import { createSlice } from '@reduxjs/toolkit'
import { fetchCosmetics } from './Cosmetics.action'
import { addCosmetics } from './Cosmetics.action'
import { editCosmetics } from './Cosmetics.action'
import { deleteCosmetics } from './Cosmetics.action'

const fetchCosmeticsExtraReducer = {
    [fetchCosmetics.pending]: (state, action) => {
        state.loading = true
    },
    [fetchCosmetics.fulfilled]: (state, action) => {
        state.entities = [...action.payload]
        state.loading = false
    },
    [fetchCosmetics.rejected]: (state, action) => {
        state.loading = false
    },
}

const addCosmeticsExtraReducer = {
    [addCosmetics.pending]: (state, action) => {
        state.loading = true
    },
    [addCosmetics.fulfilled]: (state, action) => {
        state.entities.push(action.payload)
        state.loading = false
    },
    [addCosmetics.rejected]: (state, action) => {
        state.loading = false
    },
}

const editCosmeticsExtraReducer = {
    [editCosmetics.pending]: (state, action) => {
        state.loading = true
    },
    [editCosmetics.fulfilled]: (state, action) => {
        const { id, productname, description, price } = action.payload
        const existingCosmetics = state.entities.find(
            (Cosmetics) => Cosmetics.id.toString() === id.toString()
        )
        if (existingCosmetics) {
            existingCosmetics.productname = productname
            existingCosmetics.description = description
            existingCosmetics.price = price
        }
        state.loading = false
    },
    [editCosmetics.rejected]: (state, action) => {
        state.loading = false
    },
}

const deleteCosmeticsExtraReducer = {
    [deleteCosmetics.pending]: (state, action) => {
        state.loading = true
    },
    [deleteCosmetics.fulfilled]: (state, action) => {
        const id = action.payload
        const existingCosmetics = state.entities.find(
            (Cosmetics) => Cosmetics.id.toString() === id.toString()
        )
        if (existingCosmetics) {
            state.entities = state.entities.filter(
                (Cosmetics) => Cosmetics.id !== id
            )
        }
        state.loading = false
    },
    [deleteCosmetics.rejected]: (state, action) => {
        state.loading = false
    },
}
const CosmeticsSlice = createSlice({
    name: 'Cosmetics',
    initialState: {
        entities: [],
        loading: false,
    },
    reducers: {
        CosmeticsAdded(state, action) {
            state.entities.push(action.payload)
        },
        CosmeticsUpdated(state, action) {
            const { id, productname, description, price } = action.payload
            const existingCosmetics = state.entities.find(
                (Cosmetics) => Cosmetics.id.toString() === id.toString()
            )
            if (existingCosmetics) {
                existingCosmetics.productname = productname
                existingCosmetics.description = description
                existingCosmetics.price = price
            }
        },
        CosmeticsDeleted(state, action) {
            const { id } = action.payload
            const existingCosmetics = state.entities.find(
                (Cosmetics) => Cosmetics.id.toString() === id.toString()
            )
            if (existingCosmetics) {
                state.entities = state.entities.filter(
                    (Cosmetics) => Cosmetics.id !== id
                )
            }
        },
    },
    extraReducers: {
        ...fetchCosmeticsExtraReducer,
        ...addCosmeticsExtraReducer,
        ...editCosmeticsExtraReducer,
        ...deleteCosmeticsExtraReducer,
    },
})

export const { CosmeticsAdded, CosmeticsUpdated, CosmeticsDeleted } =
    CosmeticsSlice.actions

export default CosmeticsSlice.reducer
