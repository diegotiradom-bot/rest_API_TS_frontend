import { deleteProduct } from "../services/ProductServices"
import type { Product } from "../types"
import { formatCurrency } from "../utils"
import { useNavigate, Form, type ActionFunctionArgs, redirect, useFetcher} from "react-router-dom"





type PorductDetailsProps = {
    product: Product
}

export async function action({params}: ActionFunctionArgs){
    if(params.id !== undefined){
    await deleteProduct(+params.id)
    return redirect('/')
    }
   
}

export default function ProductDetailes({product}: PorductDetailsProps) {

    const fetcher = useFetcher()
    const navigate = useNavigate()

    const isAvailable = product.availability
  return (
    <tr className="border-b ">
        <td className="p-3 text-lg text-gray-800">
            {product.name}

        </td>
        <td className="p-3 text-lg text-gray-800">
            {formatCurrency(product.price)}

        </td>
        <td className="p-3 text-lg text-gray-800">
            <fetcher.Form className="" method="POST">
                <button
                type="submit"
                name="id"
                value={product.id}
                className={`${isAvailable ? 'text-black': 'text-red-600'} rounded-lg p-2 text-xs uppercase font-bold w-full border border-black hover:cursor-pointer`}
                > {isAvailable ? 'available' : 'not available'}</button>
                
            </fetcher.Form>
            
   
        </td>
        <td className="p-3 text-lg text-gray-800 ">
            <td className="p-3 text-lg text-gray-800">
                <div className="flex gap-2 items-center">
                    <button
                    onClick={() => navigate(`/products/${product.id}/edit`)}
                    className="bg-indigo-600 text-white rounded-lg w-full uppercase p-2 font-bold text-center text-xs cursor-pointer"
                    >Edit</button>
                    <Form
                    className="w-full"
                    method="post"
                    action={`products/${product.id}/delete`}
                    onSubmit={(e) => {
                        if(!confirm('delete?')) {
                            e.preventDefault()
                        }
                    }}
                    >
                        <input type="submit"
                        value="delete" className="bg-red-600 text-white rounded-lg w-full uppercase p-2 font-bold text-center text-xs cursor-pointer"/>
                    </Form>
                </div>
            </td>
           
        </td>
    </tr> 
  )
}
