import {useParams} from 'react-router-dom'
import {useContext} from 'react'
import Context from '../components/Context'

export default function Product(){
    const userData = useContext(Context)

    const params = useParams()
    let productData = null

    //if using database
    if(params.id == '129'){
        productData = {
            name: 'Hoodie',
            price: 50.00,
            image: require('../src/assets/images/hoodie.jpg')
        }
    }



    return (
        <>
            <h1>Product Details</h1>
            <p>The Product ID is{params.id}</p>
            <p>Cart Items: {userData.cartItems}</p>

            {
                productData !=null ?
                <>
                    <img src={productData.image} alt={productData.name} width="100"/>
                    <h2>{productData.name}-${productData.price}</h2>
                </>
                :""
            }
        </>
    )
}