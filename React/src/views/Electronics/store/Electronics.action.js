import { createAsyncThunk } from '@reduxjs/toolkit'
import { showSuccess } from 'middleware/notification/store/notification.actions'
import axios from '../../../axios'

const endPoint = 'Electronics'

export const fetchElectronics = createAsyncThunk(
    'Electronics/fetchElectronics',
    async () => {
        const response = await axios.get(`/${endPoint}`)
        const Electronics = await response.data
        return Electronics
    }
)

export const addElectronics = createAsyncThunk(
    'Electronics/addElectronics',
    async (data, thunkAPI) => {
        const response = await axios.post(`/${endPoint}`, data)
        const Electronics = await response.data
        thunkAPI.dispatch(showSuccess('Electronics added successfully'))
        return Electronics
    }
)

export const editElectronics = createAsyncThunk(
    'Electronics/editElectronics',
    async (data, thunkAPI) => {
        const response = await axios.put(`/${endPoint}/${data.id}`, data)
        const Electronics = await response.data
        thunkAPI.dispatch(showSuccess('Electronics updated successfully'))
        return Electronics
    }
)

export const deleteElectronics = createAsyncThunk(
    'Electronics/deleteElectronics',
    async (data, thunkAPI) => {
        const response = await axios.delete(`/${endPoint}/${data.id}`)
        const status = await response.status
        if (status === 200) {
            thunkAPI.dispatch(
                showSuccess('Selected Electronics deleted successfully.')
            )
            return data.id
        }
    }
)
