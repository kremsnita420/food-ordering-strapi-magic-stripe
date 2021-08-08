import Head from 'next/dist/next-server/lib/head'
import { twoDecimals } from '../../utils/format'
import { fromImageToUrl, API_URL } from '../../utils/urls'



const Product = ({ product }) => {
    return (
        <div>
            {/* SEO */}
            <Head>
                {product.meta_title &&
                    <title>{product.meta_title}</title>
                }
                {product.meta_description &&
                    <meta name="description" content={product.meta_description} />
                }
            </Head>
            <h3>{product.name}</h3>
            <img src={fromImageToUrl(product.image)} />
            <h3>{product.name}</h3>
            <p>€{twoDecimals(product.price)}</p>

            <p>
                {product.content}
            </p>
        </div>
    )
}

export async function getStaticProps({ params: { slug } }) {
    const product_res = await fetch(`${API_URL}/products/?slug=${slug}`)
    const found = await product_res.json()

    return {
        props: {
            product: found[0] // beacuse api response for filters is an array
        }
    }
}

export async function getStaticPaths() {
    //Fetch all possible paths and
    const products_res = await fetch(`${API_URL}/products/`)
    const products = await products_res.json()

    //push them to NextJS context

    return {
        paths: products.map(product => ({
            params: { slug: String(product.slug) }
        })),
        fallback: false //show error 404 if params are not found
    }

}

export default Product