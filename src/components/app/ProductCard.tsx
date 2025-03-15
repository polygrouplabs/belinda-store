import { Product } from '@/types/product';
import ProductDisplay from './ProductDisplay';

interface ProductCardProps {
    product: Product
}

const ProductCard = ({ product }: ProductCardProps) => {
    return (
        <div className="w-fit block relative">
            <div className="absolute left-0 top-6 z-10">
                {product.isOnSale && (
                    <div className="bg-red text-white text-xs px-2 py-1 mb-2">
                        SALE
                    </div>
                )}
                {product.isNew && (
                    <div className="bg-black text-white text-xs px-2 py-1">
                        NEW
                    </div>
                )}
            </div>

            <ProductDisplay
                product={product}
                className='w-[312px] h-[400px]'
                sizes='312px'
            />
            <div className="w-full px-2 mt-4 space-y-1 text-h5">
                <h5 className='text-black'>{product.name}</h5>
                <div className='flex justify-between items-center'>
                    <h5 className="text-black/50">{product.category}</h5>
                    <div className="flex items-center gap-2">
                        {product.isOnSale && product.originalPrice && (
                            <span className="text-h6 text-black/50 line-through">${product.originalPrice}</span>
                        )}
                        <h5 className={`font-bold ${product.isOnSale ? 'text-red' : 'text-black'}`}>${product.price}</h5>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;