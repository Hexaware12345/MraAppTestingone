const { render, screen, cleanup } = require('@testing-library/react')
import '@testing-library/jest-dom/extend-expect'
import { Provider } from 'react-redux'
import store from 'store/store'
import { BrowserRouter as Router } from 'react-router-dom'
import { SettingsProvider } from 'common/contexts/SettingsContext'
import { MatxTheme } from 'components'
import CosmeticsList from '../CosmeticsList'
import axios from '../../../axios'
import MockAdapter from 'axios-mock-adapter'

afterEach(cleanup)

test('should render Cosmetics rows when api response has data', async () => {
    const endPoint = 'cosmetics'
    const getCosmeticsListResponse = [
        {
            id: 1,
            Productname: 'Productname',
            Description: 'Description',
            Price: 56,
        },
    ]
    const mock = new MockAdapter(axios)
    mock.onGet(`/${endPoint}`).reply(200, getCosmeticsListResponse)
    render(
        <Provider store={store}>
            <SettingsProvider>
                <MatxTheme>
                    <Router>
                        <CosmeticsList />
                    </Router>
                </MatxTheme>
            </SettingsProvider>
        </Provider>
    )
    const cosmeticsProductnameCell = await screen.findByText(/Productname/i)

    expect(cosmeticsProductnameCell).toHaveTextContent(/Productname/i)
    mock.reset()
})
