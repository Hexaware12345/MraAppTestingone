import React, { lazy } from 'react'
import Loadable from 'components/Loadable/Loadable'

const ElectronicsList = Loadable(lazy(() => import('./ElectronicsList')))
const EditElectronics = Loadable(lazy(() => import('./EditElectronics')))
const AddElectronics = Loadable(lazy(() => import('./AddElectronics')))

const ElectronicsRoutes = [
    {
        path: '/Electronics',
        element: <ElectronicsList />,
    },
    {
        path: '/Electronics/edit/:id',
        element: <EditElectronics />,
    },
    {
        path: '/Electronics/add',
        element: <AddElectronics />,
    },
]

export default ElectronicsRoutes
