import prismadb from "@/lib/prismadb";
import { ProductForm } from "./components/product-forms";

const ProductPage = async ({
    params
}: {
    params: { productId: string }
}) => {
    const product = await prismadb.product.findUnique({
        where: {
            id: params.productId
        },
        include: {
            images: true
        }
    })

    const categories = await prismadb.category.findMany({
        where: {
            storeId : params.productId,
        }
    })

    const sizes = await prismadb.size.findMany({
        where: {
            storeId : params.productId,
        }
    })
    
    const colors = await prismadb.color.findMany({
        where: {
            storeId : params.productId,
        }
    })

    return ( 
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <ProductForm 
                    initialData={product} 
                    categories={categories}
                    colors={colors}
                    sizes={sizes}
                />
            </div>
        </div>
    );
}
 
export default ProductPage;