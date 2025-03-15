"use client"

import { cn } from '@/lib/utils';
import Image from 'next/image';
import { useState } from 'react';
import { HiOutlineShoppingCart } from 'react-icons/hi2';
import Link from 'next/link';
import { useCartStore } from '@/store/cart';
import { Product } from '@/types/product';
interface ProductDisplayProps {
    className?: string;
    sizes?: string;
    product: Product;
}

const ProductDisplay = ({ product, className, sizes = '100vw' }: ProductDisplayProps) => {
    const [isHovered, setIsHovered] = useState(false);
    const addToCart = useCartStore(state => state.addItem);

    return (
        <div
            className={cn('relative', className)}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <Link href={`/product/${product.id}`} className='block w-full h-full relative'>
                <Image
                    src={product.cover}
                    alt="product"
                    fill
                    sizes={sizes}
                    className="object-top object-cover"
                    quality={100}
                />
            </Link>
            <div onClick={() => addToCart(product)} className={`absolute bottom-0 left-0 right-0 h-[72px] bg-gold cursor-pointer hover:bg-gold-dark transition-opacity duration-300 flex items-center justify-center ${isHovered ? 'opacity-100' : 'opacity-0'
                }`}>
                <HiOutlineShoppingCart size={20} className='text-white' />
            </div>
        </div>
    );
};

export default ProductDisplay;