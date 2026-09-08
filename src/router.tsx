

import{createBrowserRouter} from 'react-router-dom'
import Layout from './layouts/Layout'
import Products, {loader as porductsLoader, action as UpdateAvailabilityAction} from './views/Products'
import NewProducts, {action as newProductAction} from './views/NewProducts'
import EditProduct, {loader as EditProductLoader, action as editProductAction } from './views/EditProduct'
import { action as deleteProductAction } from './components/ProductDetails'

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout/>,
        children: [
            {
                index:true,
                element: <Products/>,
                loader: porductsLoader,
                action: UpdateAvailabilityAction
            },
            {
                path: 'products/new',
                element:<NewProducts/>,
                action: newProductAction
            },
            {
                path: 'products/:id/edit', // ROA pattern
                element: <EditProduct/>,
                loader: EditProductLoader,
                action: editProductAction
            },
            {
                path: 'products/:id/delete',
                action: deleteProductAction
            }
        ],
    }
])
