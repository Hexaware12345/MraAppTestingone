import store from 'store/store'
import {
    cosmeticsAdded,
    cosmeticsDeleted,
    cosmeticsUpdated,
} from '../cosmeticsSlice'

describe('testing cosmetics redux store reducers', () => {
    test('add cosmetics to store test', () => {
        let state = store.getState().cosmetics
        expect(state.entities).toHaveLength(0)
        const initialInput = {
            id: 1,
            Productname: 'Productname',
            Description: 'Description',
            Price: 100,
        }
        store.dispatch(cosmeticsAdded(initialInput))
        state = store.getState().cosmetics
        expect(state.entities).toHaveLength(1)
    })

    test('update cosmetics from store should change the length of the entities array in redux store', () => {
        const initialInput = {
            id: 2,
            Productname: 'Productname',
            Description: 'Description',
            Price: 7,
        }
        store.dispatch(cosmeticsAdded(initialInput))
        let state = store.getState().cosmetics
        expect(state.entities).toHaveLength(2)

        const updatedInput = {
            id: initialInput.id,
            Productname: 'Productname',
            Description: 'Description',
            Price: 46,
        }
        store.dispatch(cosmeticsUpdated(updatedInput))
        state = store.getState().cosmetics
        let changedCosmetics = state.entities.find((p) => p.id === 2)
        expect(changedCosmetics).toStrictEqual(updatedInput)
    })

    test('delete cosmetics from store should reduce the length of the entities array in redux store', () => {
        const initialInput = {
            id: 3,
            Productname: 'Productname',
            Description: 'Description',
            Price: 52,
        }
        store.dispatch(cosmeticsAdded(initialInput))
        let state = store.getState().cosmetics
        expect(state.entities).toHaveLength(3)

        store.dispatch(
            cosmeticsDeleted({
                id: initialInput.id,
            })
        )
        state = store.getState().cosmetics
        expect(state.entities).toHaveLength(2)
    })
})
