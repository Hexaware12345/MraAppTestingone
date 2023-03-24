import { createAsyncThunk } from '@reduxjs/toolkit'
import { showSuccess } from 'middleware/notification/store/notification.actions'
import axios from '../../../axios'

const endPoint = 'Cosmetics'

export const fetchCosmetics = createAsyncThunk(
    'Cosmetics/fetchCosmetics',
    async () => {
        const response = await axios.get(`/${endPoint}`)
        const Cosmetics = await response.data
        return Cosmetics
    }
)

export const addCosmetics = createAsyncThunk(
    'Cosmetics/addCosmetics',
    async (data, thunkAPI) => {
        const response = await axios.post(`/${endPoint}`, data)
        const Cosmetics = await response.data
        thunkAPI.dispatch(showSuccess('Cosmetics added successfully'))
        return Cosmetics
    }
)

export const editCosmetics = createAsyncThunk(
    'Cosmetics/editCosmetics',
    async (data, thunkAPI) => {
        const response = await axios.put(`/${endPoint}/${data.id}`, data)
        const Cosmetics = await response.data
        thunkAPI.dispatch(showSuccess('Cosmetics updated successfully'))
        return Cosmetics
    }
)

export const deleteCosmetics = createAsyncThunk(
    'Cosmetics/deleteCosmetics',
    async (data, thunkAPI) => {
        const response = await axios.delete(`/${endPoint}/${data.id}`)
        const status = await response.status
        if (status === 200) {
            thunkAPI.dispatch(
                showSuccess('Selected Cosmetics deleted successfully.')
            )
            return data.id
        }
    }
)
