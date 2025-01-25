export default function Home(){
    return(
        <>
        <h1>Homepage</h1>
        
        <ul className = "productBox">
            <li>
                <a href = "/product/129" className = "productLink"><img className="productImage" src={require('../src/assets/images/hoodie.jpg')} alt="Product"/>
                <br /> <a href = "/product/129" className = "productLink"> This is a good product</a>

                </a>
            </li>
        </ul>




        </>
    )
}