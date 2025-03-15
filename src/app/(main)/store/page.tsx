'use client'

import ProductList from '@/components/app/ProductList';
import { getRouteTitle } from '@/config/route-titles';
import { products } from '@/data/products';
import Filter from '@/components/app/Filter';
import { useState } from 'react';

export default function StorePage() {
    const { title, description } = getRouteTitle('/store');
    const [filterVisible, setFilterVisible] = useState(false);

    return (
        <>
            <div className="container mx-auto max-w-[73rem] px-4">
                <div className="flex flex-col items-center text-center max-w-[600px] my-20 mx-auto">
                    <h3 className='text-xl lg:text-4xl font-bold'>
                        {title}
                    </h3>
                    <p className="text-grey-dark text-sm lg:text-base mt-6"
                        dangerouslySetInnerHTML={{
                            __html: description.replace('Belinda', '<span class="font-bold">Belinda</span>')
                        }}
                    />
                </div>
            </div>
            <Filter filterVisible={filterVisible} onFilterVisibleChange={setFilterVisible} />
            <ProductList products={products} />
        </>
    );
}
