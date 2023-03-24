import store from 'store/store'
import {
    electronicsAdded,
    electronicsDeleted,
    electronicsUpdated,
} from '../electronicsSlice'

describe('testing electronics redux store reducers', () => {
    test('add electronics to store test', () => {
        let state = store.getState().electronics
        expect(state.entities).toHaveLength(0)
        const initialInput = {
            id: 1,
            Productname: 'Productname',
            Description: 'Description',
            Offer: true,
            Price: 48,
            Deliverydate: 19,
        }
        store.dispatch(electronicsAdded(initialInput))
        state = store.getState().electronics
        expect(state.entities).toHaveLength(1)
    })

    test('update electronics from store should change the length of the entities array in redux store', () => {
        const initialInput = {
            id: 2,
            Productname: 'Productname',
            Description: 'Description',
            Offer: false,
            Price: 81,
            Deliverydate: 90,
        }
        store.dispatch(electronicsAdded(initialInput))
        let state = store.getState().electronics
        expect(state.entities).toHaveLength(2)

        const updatedInput = {
            id: initialInput.id,
            Productname: 'Productname',
            Description: 'Description',
            Offer: false,
            Price: 21,
            Deliverydate: 45,
        }
        store.dispatch(electronicsUpdated(updatedInput))
        state = store.getState().electronics
        let changedElectronics = state.entities.find((p) => p.id === 2)
        expect(changedElectronics).toStrictEqual(updatedInput)
    })

    test('delete electronics from store should reduce the length of the entities array in redux store', () => {
        const initialInput = {
            id: 3,
            Productname: 'Productname',
            Description: 'Description',
            Offer: true,
            Price: 64,
            Deliverydate: 23,
        }
        store.dispatch(electronicsAdded(initialInput))
        let state = store.getState().electronics
        expect(state.entities).toHaveLength(3)

        store.dispatch(
            electronicsDeleted({
                id: initialInput.id,
            })
        )
        state = store.getState().electronics
        expect(state.entities).toHaveLength(2)
    })
})
