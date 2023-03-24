const {
    render,
    screen,
    fireEvent,
    within,
    getByRole,
    act,
    cleanup,
} = require('@testing-library/react')
import '@testing-library/jest-dom/extend-expect'
import { Provider } from 'react-redux'
import store from 'store/store'
import {
    BrowserRouter as Router,
    Navigate,
    Route,
    Routes,
} from 'react-router-dom'
import { SettingsProvider } from 'common/contexts/SettingsContext'
import { MatxTheme } from 'components'
import EditCosmetics from '../EditCosmetics'
import { CosmeticsAdded } from '../store/CosmeticsSlice'
beforeAll(() => {
    store.dispatch(
        CosmeticsAdded({
            id: 1,
            Productname: 'Productname',
            Description: 'Description',
            Price: 47,
        })
    )
})

beforeEach(() => {
    render(
        <Provider store={store}>
            <SettingsProvider>
                <MatxTheme>
                    <Router>
                        <Routes>
                            <Route
                                path="/"
                                element={
                                    <Navigate to="Cosmetics/edit/1" replace />
                                }
                            />
                            <Route
                                path="Cosmetics/edit/:id"
                                element={<EditCosmetics />}
                            />
                        </Routes>
                    </Router>
                </MatxTheme>
            </SettingsProvider>
        </Provider>
    )
})

const clickAndWait = async (element) => {
    await act(async () => {
        fireEvent.click(element)
    })

    await act(async () => {
        jest.runOnlyPendingTimers()
    })
}

afterEach(cleanup)

describe('testing view of CosmeticsEdit Component', () => {
    test('should render EditCosmetics and display the heading Edit Form', async () => {
        const headingNote = screen.getByText(/Edit Form/i)
        expect(headingNote).toBeInTheDocument()
    })

    test('should have all input fields present in the edit form', async () => {
        const saveCosmeticsButtonElement = screen.getByRole('button', {
            name: /save/i,
        })
        const ProductnameElement = screen.getByLabelText(/Productname/i)
        const DescriptionElement = screen.getByLabelText(/Description/i)
        const PriceElement = screen.getByLabelText(/Price/i)

        expect(saveCosmeticsButtonElement).toBeInTheDocument()

        expect(ProductnameElement).toBeInTheDocument()
        expect(DescriptionElement).toBeInTheDocument()
        expect(PriceElement).toBeInTheDocument()
    })

    test('should be able to give inputs to all fields of Cosmetics edit form', async () => {
        const ProductnameElement = screen.getByLabelText(/Productname/i)
        const DescriptionElement = screen.getByLabelText(/Description/i)
        const PriceElement = screen.getByLabelText(/Price/i)

        fireEvent.change(ProductnameElement, {
            target: { value: 'Productname' },
        })
        fireEvent.change(DescriptionElement, {
            target: { value: 'Description' },
        })
        fireEvent.change(PriceElement, { target: { value: 54 } })

        expect(ProductnameElement.value).toBe('Productname')

        expect(DescriptionElement.value).toBe('Description')

        expect(PriceElement.value).toBe(54)
    })

    test('should return error message when save button is clicked on invalid form', async () => {
        jest.useFakeTimers()
        const ProductnameElement = screen.getByLabelText(/Productname/i)
        const DescriptionElement = screen.getByLabelText(/Description/i)
        const PriceElement = screen.getByLabelText(/Price/i)

        fireEvent.change(ProductnameElement, { target: { value: '' } })
        fireEvent.change(DescriptionElement, { target: { value: '' } })
        fireEvent.change(PriceElement, { target: { value: '' } })
        await act(async () => {
            jest.runOnlyPendingTimers()
        })
        const saveCosmeticsButtonElement = screen.getByRole('button', {
            name: /save/i,
        })

        await clickAndWait(saveCosmeticsButtonElement)

        const errorList = await screen.findAllByText('this field is required')
        expect(errorList).toHaveLength(3)
    })
})
