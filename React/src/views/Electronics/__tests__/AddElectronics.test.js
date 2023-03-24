const {
    render,
    screen,
    fireEvent,
    within,
    waitFor,
    getByRole,
    act,
    cleanup,
} = require('@testing-library/react')
import '@testing-library/jest-dom/extend-expect'
import { Provider } from 'react-redux'
import store from 'store/store'
import { BrowserRouter as Router } from 'react-router-dom'
import { SettingsProvider } from 'common/contexts/SettingsContext'
import { MatxTheme } from 'components'
import axios from '../../../axios'
import MockAdapter from 'axios-mock-adapter'
import AddElectronics from '../AddElectronics'

beforeEach(() => {
    const endPoint = 'Electronics'
    const getStudentListResponse = [
        {
            id: 1,
            Productname: 'Productname',
            Description: 'Description',
            Offer: false,
            Price: 5,
            Deliverydate: 53,
        },
    ]
    const mock = new MockAdapter(axios)
    mock.onGet(`/${endPoint}`).reply(200, getStudentListResponse)
    render(
        <Provider store={store}>
            <SettingsProvider>
                <MatxTheme>
                    <Router>
                        <AddElectronics />
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

describe('testing view ElectronicsAdd Component', () => {
    test('should render AddElectronics and to display Add Form title', async () => {
        const headingNote = screen.getByText(/Add Form/i)
        expect(headingNote).toBeInTheDocument()
    })

    test('should have all input fields present in the add form', async () => {
        const addElectronicsButtonElement = screen.getByRole('button', {
            name: /Add/i,
        })

        const ProductnameElement = screen.getByLabelText(/Productname/i)
        const DescriptionElement = screen.getByLabelText(/Description/i)
        const OfferElement = screen.getByLabelText(/Offer/i)
        const PriceElement = screen.getByLabelText(/Price/i)
        const DeliverydateElement = screen.getByLabelText(/Deliverydate/i)

        expect(addElectronicsButtonElement).toBeInTheDocument()

        expect(ProductnameElement).toBeInTheDocument()
        expect(DescriptionElement).toBeInTheDocument()
        expect(OfferElement).toBeInTheDocument()
        expect(PriceElement).toBeInTheDocument()
        expect(DeliverydateElement).toBeInTheDocument()
    })

    test('should be able to give inputs to all fields of Electronics add form', async () => {
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
        fireEvent.change(PriceElement, { target: { value: 28 } })
        fireEvent.change(DeliverydateElement, { target: { value: 57 } })

        fireEvent.mouseDown(OfferElement)
        const Offerlistbox = within(screen.getByRole('listbox'))
        fireEvent.click(Offerlistbox.getByText(/False/))
        expect(OfferElement).toHaveTextContent(/False/i)
    })

    test('should return error message when add Electronics button is clicked on invalid form', async () => {
        jest.useFakeTimers()
        const addElectronicsButtonElement = screen.getByRole('button', {
            name: /Add/i,
        })

        await clickAndWait(addElectronicsButtonElement)

        let errorList = await screen.findAllByText('this field is required')
        expect(errorList).toHaveLength(5)
    })
})
