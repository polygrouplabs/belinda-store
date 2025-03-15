"use client"

import { Roboto } from "next/font/google"
import { products } from '@/data/products';
import ProductList from './ProductList';

const roboto = Roboto({
    subsets: ['latin'],
    display: 'swap',
    weight: ['700']
})

const BestSelling = () => {
    return (
        <div id='main'>
            <div className="h-[150px] hidden lg:flex items-center justify-center mb-8">
                <h2 className={`text-5xl font-bold tracking-wider text-grey-dark text-center ${roboto.className}`}>
                    MÁS VENDIDOS
                </h2>
            </div>
            <ProductList products={products} />
        </div>
    );
};

export default BestSelling;