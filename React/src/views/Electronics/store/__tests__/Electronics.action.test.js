import axios from '../../../../axios'
import MockAdapter from 'axios-mock-adapter'
import store from 'store/store'
import {
    fetchElectronics,
    addElectronics,
    editElectronics,
    deleteElectronics,
} from '../electronics.action'

const getElectronicsListResponse = [
    {
        id: 1,
        Productname: 'Productname',
        Description: 'Description',
        Offer: true,
        Price: 79,
        Deliverydate: 42,
    },
]

const addElectronicsListResponse = (data) => {
    return { id: 2, ...data }
}
const editElectronicsListResponse = (data) => {
    return data
}

describe('should test Electronics redux tooklit asyncThunk api action and redux store updation', () => {
    const mock = new MockAdapter(axios)
    const endPoint = 'electronics'
    test('Should be able to fetch the electronics list and update electronics redux store', async () => {
        mock.onGet(`/${endPoint}`).reply(200, getElectronicsListResponse)
        const result = await store.dispatch(fetchElectronics())
        const electronicsList = result.payload
        expect(result.type).toBe('electronics/fetchElectronics/fulfilled')
        expect(electronicsList).toEqual(getElectronicsListResponse)

        const state = store.getState().electronics
        expect(state.entities).toEqual(electronicsList)
    })

    test('Should be able to add new electronics to list and make post api and update electronics redux store', async () => {
        const body = {
            Productname: 'Productname',
            Description: 'Description',
            Offer: true,
            Price: 32,
            Deliverydate: 13,
        }
        mock.onPost(`/${endPoint}`, body).reply(
            201,
            addElectronicsListResponse(body)
        )
        const result = await store.dispatch(addElectronics(body))
        const electronicsItem = result.payload
        expect(result.type).toBe('electronics/addElectronics/fulfilled')
        expect(electronicsItem).toEqual(addElectronicsListResponse(body))

        const state = store.getState().electronics
        expect(state.entities).toContainEqual(addElectronicsListResponse(body))
    })

    test('Should be able to edit electronics in list and make put api call and update electronics redux store', async () => {
        const body = {
            id: 1,
            Productname: 'Productname',
            Description: 'Description',
            Offer: true,
            Price: 58,
            Deliverydate: 80,
        }
        mock.onPut(`/${endPoint}/${body.id}`, body).reply(
            201,
            editElectronicsListResponse(body)
        )
        const result = await store.dispatch(editElectronics(body))
        const electronicsItem = result.payload
        expect(result.type).toBe('electronics/editElectronics/fulfilled')
        expect(electronicsItem).toEqual(editElectronicsListResponse(body))

        const state = store.getState().electronics
        let changedElectronics = state.entities.find((p) => p.id === body.id)
        expect(changedElectronics.name).toEqual(body.name)
    })

    test('Should be able to delete electronics in list and update electronics redux store', async () => {
        const input = {
            id: 2,
        }
        mock.onDelete(`/${endPoint}/${input.id}`, input).reply(200)
        let state = store.getState().electronics
        const initialLength = state.entities.length
        const result = await store.dispatch(deleteElectronics(input))
        const deletId = result.payload
        expect(result.type).toBe('electronics/deleteElectronics/fulfilled')
        expect(deletId).toEqual(input.id)

        state = store.getState().electronics
        const updateLength = initialLength - 1
        expect(state.entities.length).toEqual(updateLength)
    })
})
