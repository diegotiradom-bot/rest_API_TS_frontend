





import { Link, useLoaderData, type ActionFunctionArgs} from 'react-router-dom'
import { getProducts, UpdateProductAvailability } from '../services/ProductServices'
import ProductDetailes from '../components/ProductDetails';
import type { Product } from '../types';



export async function loader(){
  const products = await getProducts()
  return products
}

export async function action( {request}: ActionFunctionArgs){
  const data = Object.fromEntries(await request.formData())
  await UpdateProductAvailability(+data.id)

  return {}
}

export default function Products() {
  const products = useLoaderData() as Product[];
  return (
    <>
    <div className='flex justify-between'>
        <h2 className='text-4xl font-black text-slate-500'>Products</h2>
        <Link
        to="products/new"
        className='rounded-md bg-indigo-600 p-3 text-sm text-white shadow-sm hover:bg-indigo-500'
        >
        add product
        </Link>
    </div>

      <div className="p-2">
    <table className="w-full mt-5 table-auto">
      <thead className="bg-slate-800 text-white">
          <tr>
              <th className="p-2">Product</th>
              <th className="p-2">Price</th>
              <th className="p-2">Availability</th>
              <th className="p-2">Actions</th>
          </tr>
      </thead>
      <tbody>

        {products.map( product => (
          <ProductDetailes
          key={product.id}
          product={product}
          />
        ))}

      </tbody>
    </table>
  </div>
    </>
  )
}


