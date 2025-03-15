import ProductList from "@/components/app/ProductList"
import { getRouteTitle } from "@/config/route-titles"
import { products } from "@/data/products"
import { getLocalizedPath } from "@/lib/utils"
type Params = Promise<{ slug: string }>

export async function generateMetadata(props: {
    params: Params
}) {
    const params = await props.params
    const slug = params.slug
    const title = getLocalizedPath(slug)
    return { title }
}

export default async function SlugPage(props: {
    params: Params
}) {
    const params = await props.params
    const slug = params.slug
    const pathname = `/store/${slug}`
    const { title, description } = getRouteTitle(pathname)

    // 根据slug获取商品列表
    // const products = getProductsBySlug(slug)
    return (
        <>
            <div className="container mx-auto max-w-[73rem] px-4">
                <div className="flex flex-col items-center text-center max-w-[600px] my-20 mx-auto">
                    <h3 className='text-xl lg:text-4xl font-bold'>
                        {title}
                    </h3>
                    <p className="text-grey-dark text-sm lg:text-base mt-6">
                        {description}
                    </p>
                </div>
            </div>
            <ProductList products={products} />
        </>
    )
}