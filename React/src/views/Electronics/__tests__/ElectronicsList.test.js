const { render, screen, cleanup } = require('@testing-library/react')
import '@testing-library/jest-dom/extend-expect'
import { Provider } from 'react-redux'
import store from 'store/store'
import { BrowserRouter as Router } from 'react-router-dom'
import { SettingsProvider } from 'common/contexts/SettingsContext'
import { MatxTheme } from 'components'
import ElectronicsList from '../ElectronicsList'
import axios from '../../../axios'
import MockAdapter from 'axios-mock-adapter'

afterEach(cleanup)

test('should render Electronics rows when api response has data', async () => {
    const endPoint = 'electronics'
    const getElectronicsListResponse = [
        {
            id: 1,
            Productname: 'Productname',
            Description: 'Description',
            Offer: false,
            Price: 70,
            Deliverydate: 39,
        },
    ]
    const mock = new MockAdapter(axios)
    mock.onGet(`/${endPoint}`).reply(200, getElectronicsListResponse)
    render(
        <Provider store={store}>
            <SettingsProvider>
                <MatxTheme>
                    <Router>
                        <ElectronicsList />
                    </Router>
                </MatxTheme>
            </SettingsProvider>
        </Provider>
    )
    const electronicsProductnameCell = await screen.findByText(/Productname/i)

    expect(electronicsProductnameCell).toHaveTextContent(/Productname/i)
    mock.reset()
})
