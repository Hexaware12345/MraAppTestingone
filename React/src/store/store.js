import { configureStore } from '@reduxjs/toolkit'
import CosmeticsReducer from '../views/Cosmetics/store/CosmeticsSlice'
import ElectronicsReducer from '../views/Electronics/store/ElectronicsSlice'
import { createLogger } from 'redux-logger'
import notificationReducer from '../middleware/notification/store/notificationSlice'
let middlewares = []
if (process.env.NODE_ENV === `development`) {
    const logger = createLogger({
        collapsed: (getState, action, logEntry) => !logEntry.error,
    })
    middlewares.push(logger)
}
export default configureStore({
    reducer: {
        notification: notificationReducer,
        Electronics: ElectronicsReducer,
        Cosmetics: CosmeticsReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(middlewares),
    devTools: process.env.NODE_ENV !== 'production',
})
