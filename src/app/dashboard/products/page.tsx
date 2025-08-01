import { getProducts, ProductGrid,  } from "@/src/products";


const ProductsPage = async (): Promise<JSX.Element> => {

    const products = await getProducts({ limit: 30, offset: 0, basePath: '/dashboard/product' });

    return (
        <div>
            <h1>Products Page</h1>
            {/* { JSON.stringify( products ) } */}
            <div className="flex flex-col">

                <span>Listado de Productos <small>Estatico</small></span>

                <ProductGrid products={ products } />

            </div>
        </div>
    )
}

export default ProductsPage;