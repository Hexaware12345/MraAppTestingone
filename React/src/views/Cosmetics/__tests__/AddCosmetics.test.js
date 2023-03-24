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
import AddCosmetics from '../AddCosmetics'

beforeEach(() => {
    const endPoint = 'Cosmetics'
    const getStudentListResponse = [
        {
            id: 1,
            Productname: 'Productname',
            Description: 'Description',
            Price: 60,
        },
    ]
    const mock = new MockAdapter(axios)
    mock.onGet(`/${endPoint}`).reply(200, getStudentListResponse)
    render(
        <Provider store={store}>
            <SettingsProvider>
                <MatxTheme>
                    <Router>
                        <AddCosmetics />
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

describe('testing view CosmeticsAdd Component', () => {
    test('should render AddCosmetics and to display Add Form title', async () => {
        const headingNote = screen.getByText(/Add Form/i)
        expect(headingNote).toBeInTheDocument()
    })

    test('should have all input fields present in the add form', async () => {
        const addCosmeticsButtonElement = screen.getByRole('button', {
            name: /Add/i,
        })

        const ProductnameElement = screen.getByLabelText(/Productname/i)
        const DescriptionElement = screen.getByLabelText(/Description/i)
        const PriceElement = screen.getByLabelText(/Price/i)

        expect(addCosmeticsButtonElement).toBeInTheDocument()

        expect(ProductnameElement).toBeInTheDocument()
        expect(DescriptionElement).toBeInTheDocument()
        expect(PriceElement).toBeInTheDocument()
    })

    test('should be able to give inputs to all fields of Cosmetics add form', async () => {
        const ProductnameElement = screen.getByLabelText(/Productname/i)
        const DescriptionElement = screen.getByLabelText(/Description/i)
        const PriceElement = screen.getByLabelText(/Price/i)

        fireEvent.change(ProductnameElement, {
            target: { value: 'Productname' },
        })
        fireEvent.change(DescriptionElement, {
            target: { value: 'Description' },
        })
        fireEvent.change(PriceElement, { target: { value: 94 } })
    })

    test('should return error message when add Cosmetics button is clicked on invalid form', async () => {
        jest.useFakeTimers()
        const addCosmeticsButtonElement = screen.getByRole('button', {
            name: /Add/i,
        })

        await clickAndWait(addCosmeticsButtonElement)

        let errorList = await screen.findAllByText('this field is required')
        expect(errorList).toHaveLength(3)
    })
})
