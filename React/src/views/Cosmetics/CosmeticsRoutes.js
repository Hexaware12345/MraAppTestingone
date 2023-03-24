import React, { lazy } from 'react'
import Loadable from 'components/Loadable/Loadable'

const CosmeticsList = Loadable(lazy(() => import('./CosmeticsList')))
const EditCosmetics = Loadable(lazy(() => import('./EditCosmetics')))
const AddCosmetics = Loadable(lazy(() => import('./AddCosmetics')))

const CosmeticsRoutes = [
    {
        path: '/Cosmetics',
        element: <CosmeticsList />,
    },
    {
        path: '/Cosmetics/edit/:id',
        element: <EditCosmetics />,
    },
    {
        path: '/Cosmetics/add',
        element: <AddCosmetics />,
    },
]

export default CosmeticsRoutes
