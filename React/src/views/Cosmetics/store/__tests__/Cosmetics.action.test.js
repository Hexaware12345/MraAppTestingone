import axios from '../../../../axios'
import MockAdapter from 'axios-mock-adapter'
import store from 'store/store'
import {
    fetchCosmetics,
    addCosmetics,
    editCosmetics,
    deleteCosmetics,
} from '../cosmetics.action'

const getCosmeticsListResponse = [
    {
        id: 1,
        Productname: 'Productname',
        Description: 'Description',
        Price: 3,
    },
]

const addCosmeticsListResponse = (data) => {
    return { id: 2, ...data }
}
const editCosmeticsListResponse = (data) => {
    return data
}

describe('should test Cosmetics redux tooklit asyncThunk api action and redux store updation', () => {
    const mock = new MockAdapter(axios)
    const endPoint = 'cosmetics'
    test('Should be able to fetch the cosmetics list and update cosmetics redux store', async () => {
        mock.onGet(`/${endPoint}`).reply(200, getCosmeticsListResponse)
        const result = await store.dispatch(fetchCosmetics())
        const cosmeticsList = result.payload
        expect(result.type).toBe('cosmetics/fetchCosmetics/fulfilled')
        expect(cosmeticsList).toEqual(getCosmeticsListResponse)

        const state = store.getState().cosmetics
        expect(state.entities).toEqual(cosmeticsList)
    })

    test('Should be able to add new cosmetics to list and make post api and update cosmetics redux store', async () => {
        const body = {
            Productname: 'Productname',
            Description: 'Description',
            Price: 56,
        }
        mock.onPost(`/${endPoint}`, body).reply(
            201,
            addCosmeticsListResponse(body)
        )
        const result = await store.dispatch(addCosmetics(body))
        const cosmeticsItem = result.payload
        expect(result.type).toBe('cosmetics/addCosmetics/fulfilled')
        expect(cosmeticsItem).toEqual(addCosmeticsListResponse(body))

        const state = store.getState().cosmetics
        expect(state.entities).toContainEqual(addCosmeticsListResponse(body))
    })

    test('Should be able to edit cosmetics in list and make put api call and update cosmetics redux store', async () => {
        const body = {
            id: 1,
            Productname: 'Productname',
            Description: 'Description',
            Price: 16,
        }
        mock.onPut(`/${endPoint}/${body.id}`, body).reply(
            201,
            editCosmeticsListResponse(body)
        )
        const result = await store.dispatch(editCosmetics(body))
        const cosmeticsItem = result.payload
        expect(result.type).toBe('cosmetics/editCosmetics/fulfilled')
        expect(cosmeticsItem).toEqual(editCosmeticsListResponse(body))

        const state = store.getState().cosmetics
        let changedCosmetics = state.entities.find((p) => p.id === body.id)
        expect(changedCosmetics.name).toEqual(body.name)
    })

    test('Should be able to delete cosmetics in list and update cosmetics redux store', async () => {
        const input = {
            id: 2,
        }
        mock.onDelete(`/${endPoint}/${input.id}`, input).reply(200)
        let state = store.getState().cosmetics
        const initialLength = state.entities.length
        const result = await store.dispatch(deleteCosmetics(input))
        const deletId = result.payload
        expect(result.type).toBe('cosmetics/deleteCosmetics/fulfilled')
        expect(deletId).toEqual(input.id)

        state = store.getState().cosmetics
        const updateLength = initialLength - 1
        expect(state.entities.length).toEqual(updateLength)
    })
})
