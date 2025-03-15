"use client"

import ProductDisplay from './ProductDisplay';
import { newSeries } from '@/data/products';

const NewSeries = () => {
    return (
        <>
            <div className="relative w-full h-[250px] bg-gold-50">
                <div className="absolute inset-0 flex items-center justify-center">
                    <h2 className="text-2xl tracking-wider flex flex-col lg:flex-row items-center lg:font-bold text-black text-center">
                        <span>DESCUBRE LA</span>
                        <span>NUEVA COLECCIÓN</span>
                    </h2>
                </div>
            </div>
            <div className="w-full bg-gold-50 lg:pb-32">
                <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-4 lg:max-w-6xl lg:mx-auto">
                    {/* 左侧大图 */}
                    <ProductDisplay
                        product={newSeries[0]}
                        className='w-full aspect-square'
                        sizes="(min-width: 1024px) 576px, 100vw"
                    />
                    {/* 右侧四张小图，仅在 lg 下显示网格 */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 lg:gap-4">
                        <ProductDisplay
                            product={newSeries[1]}
                            className='w-full aspect-square'
                            sizes="(min-width: 1024px) 288px, (min-width: 640px) 50vw, 100vw"
                        />
                        <ProductDisplay
                            product={newSeries[2]}
                            className='w-full aspect-square'
                            sizes="(min-width: 1024px) 288px, (min-width: 640px) 50vw, 100vw"
                        />
                        <ProductDisplay
                            product={newSeries[3]}
                            className='w-full aspect-square'
                            sizes="(min-width: 1024px) 288px, (min-width: 640px) 50vw, 100vw"
                        />
                        <ProductDisplay
                            product={newSeries[4]}
                            className='w-full aspect-square'
                            sizes="(min-width: 1024px) 288px, (min-width: 640px) 50vw, 100vw"
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default NewSeries;