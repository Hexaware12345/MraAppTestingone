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
import EditElectronics from '../EditElectronics'
import { ElectronicsAdded } from '../store/ElectronicsSlice'
beforeAll(() => {
    store.dispatch(
        ElectronicsAdded({
            id: 1,
            Productname: 'Productname',
            Description: 'Description',
            Offer: true,
            Price: 61,
            Deliverydate: 34,
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
                                    <Navigate to="Electronics/edit/1" replace />
                                }
                            />
                            <Route
                                path="Electronics/edit/:id"
                                element={<EditElectronics />}
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

describe('testing view of ElectronicsEdit Component', () => {
    test('should render EditElectronics and display the heading Edit Form', async () => {
        const headingNote = screen.getByText(/Edit Form/i)
        expect(headingNote).toBeInTheDocument()
    })

    test('should have all input fields present in the edit form', async () => {
        const saveElectronicsButtonElement = screen.getByRole('button', {
            name: /save/i,
        })
        const ProductnameElement = screen.getByLabelText(/Productname/i)
        const DescriptionElement = screen.getByLabelText(/Description/i)
        const OfferElement = screen.getByLabelText(/Offer/i)
        const PriceElement = screen.getByLabelText(/Price/i)
        const DeliverydateElement = screen.getByLabelText(/Deliverydate/i)

        expect(saveElectronicsButtonElement).toBeInTheDocument()

        expect(ProductnameElement).toBeInTheDocument()
        expect(DescriptionElement).toBeInTheDocument()
        expect(OfferElement).toBeInTheDocument()
        expect(PriceElement).toBeInTheDocument()
        expect(DeliverydateElement).toBeInTheDocument()
    })

    test('should be able to give inputs to all fields of Electronics edit form', async () => {
        const ProductnameElement = screen.getByLabelText(/Productname/i)
        const DescriptionElement = screen.getByLabelText(/Description/i)
        const OfferElement = screen.getByLabelText(/Offer/i)
        const PriceElement = screen.getByLabelText(/Price/i)
        const DeliverydateElement = screen.getByLabelText(/Deliverydate/i)

        fireEvent.change(ProductnameElement, {
            target: { value: 'Productname' },
        })
        fireEvent.change(DescriptionElement, {
            target: { value: 'Description' },
        })
        fireEvent.change(PriceElement, { target: { value: 39 } })
        fireEvent.change(DeliverydateElement, { target: { value: 45 } })

        expect(ProductnameElement.value).toBe('Productname')

        expect(DescriptionElement.value).toBe('Description')

        expect(PriceElement.value).toBe(39)
        expect(DeliverydateElement.value).toBe(45)

        fireEvent.mouseDown(OfferElement)
        const Offerlistbox = within(screen.getByRole('listbox'))
        fireEvent.click(Offerlistbox.getByText(/False/))
        expect(OfferElement).toHaveTextContent(/False/i)
    })

    test('should return error message when save button is clicked on invalid form', async () => {
        jest.useFakeTimers()
        const ProductnameElement = screen.getByLabelText(/Productname/i)
        const DescriptionElement = screen.getByLabelText(/Description/i)
        const PriceElement = screen.getByLabelText(/Price/i)
        const DeliverydateElement = screen.getByLabelText(/Deliverydate/i)

        fireEvent.change(ProductnameElement, { target: { value: '' } })
        fireEvent.change(DescriptionElement, { target: { value: '' } })
        fireEvent.change(PriceElement, { target: { value: '' } })
        fireEvent.change(DeliverydateElement, { target: { value: '' } })
        await act(async () => {
            jest.runOnlyPendingTimers()
        })
        const saveElectronicsButtonElement = screen.getByRole('button', {
            name: /save/i,
        })

        await clickAndWait(saveElectronicsButtonElement)

        const errorList = await screen.findAllByText('this field is required')
        expect(errorList).toHaveLength(4)
    })
})
