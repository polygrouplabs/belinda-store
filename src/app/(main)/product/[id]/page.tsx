"use client"

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import Image from 'next/image';
import 'swiper/css';
import 'swiper/css/navigation';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { QuantityCounter } from '@/components/app/QuantityCounter';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetDescription } from '@/components/ui/sheet';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import './index.css';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useRouter } from 'next/navigation';
import { TbTie } from "react-icons/tb";

// 模拟商品数据
const product = {
    id: '1',
    name: 'Vestido con espalda descubierta',
    price: 206910,
    images: [
        '/IMG-1.jpg',
        '/IMG-Buy-1.jpg',
        '/IMG-Buy-2.jpg',
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['#ded2bd'],
    description: 'Ref: VFPD-1421',
    originalPrice: 206910,
};

// 尺码表数据
const sizeGuideData = [
    { size: 'XS', bust: 84, hip: 93 },
    { size: 'S', bust: 88, hip: 96 },
    { size: 'M', bust: 92, hip: 100 },
    { size: 'L', bust: 96, hip: 104 },
    { size: 'XL', bust: 100, hip: 108 },
];

export default function ProductPage() {
    const [selectedSize, setSelectedSize] = useState('');
    const [quantity, setQuantity] = useState(1);
    const router = useRouter();

    return (
        <div className="container mx-auto py-8">
            <div className="space-y-2 px-4 lg:hidden">
                <h1 className="text-h3 font-bold">{product.name}</h1>
                <p className="text-grey text-h5">{product.description}</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-[600px_1fr] lg:gap-8">
                {/* 移动端轮播图 */}
                <div className="relative my-10 lg:hidden">
                    <Swiper
                        modules={[Navigation]}
                        navigation
                        loop={true}
                        className="aspect-[3/4] w-full product-swiper"
                    >
                        {product.images.map((image, index) => (
                            <SwiperSlide key={index}>
                                <div className="relative w-full h-full">
                                    <Image
                                        src={image}
                                        alt={product.name}
                                        fill
                                        className="object-cover"
                                        sizes="100vw"
                                        priority={index === 0}
                                    />
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>

                {/* 桌面端图片网格 */}
                <div className="hidden lg:block h-[80vh] overflow-y-auto pr-4">
                    <div className="grid grid-cols-2 gap-4">
                        {product.images.map((image, index) => (
                            <div
                                key={index}
                                className={`relative ${index === 0 ? 'col-span-2' : 'col-span-1'}`}
                            >
                                <div className="relative aspect-[3/4] w-full">
                                    <Image
                                        src={image}
                                        alt={`${product.name} - 图片 ${index + 1}`}
                                        fill
                                        className="object-cover"
                                        sizes="(min-width: 1024px) 50vw, 100vw"
                                        priority={index === 0}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 右侧商品信息 */}
                <div className="space-y-6 px-4">
                    <div className="space-y-2 hidden lg:block">
                        <h1 className="text-h3 font-bold">{product.name}</h1>
                        <p className="text-grey text-h5">{product.description}</p>
                    </div>
                    <div className="flex items-center gap-2 text-h3">
                        <span className='text-grey line-through'>$ {product.originalPrice.toLocaleString()}</span>
                        <span className='font-bold'>$ {product.price.toLocaleString()}</span>
                    </div>

                    {/* 免运费提示 */}
                    <div className="bg-pink rounded-md text-white p-2 text-h6">
                        <span className='font-bold'>ENVÍO GRATIS</span> POR COMPRAS
                        SUPERIORES A <span className='font-bold'>$ 200.000</span>
                    </div>

                    {/* 颜色选择 */}
                    <div className="space-y-2">
                        <span className="text-h6">Color:</span>
                        <div className="flex gap-2">
                            {product.colors.map((color, index) => (
                                <div
                                    key={index}
                                    className="w-8 h-8 rounded-full border-2 border-grey cursor-pointer"
                                    style={{ backgroundColor: color }}
                                />
                            ))}
                        </div>
                    </div>

                    {/* 尺码选择 */}
                    <div className="space-y-2">
                        <span className="text-h6">Talla:</span>
                        <Select value={selectedSize} onValueChange={setSelectedSize}>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Seleccionar talla" />
                            </SelectTrigger>
                            <SelectContent>
                                {product.sizes.map((size) => (
                                    <SelectItem key={size} value={size}>
                                        {size}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    {/* 数量选择 */}
                    <div className="space-y-2">
                        <span className="text-h6">Cantidad:</span>
                        <QuantityCounter className='w-[180px]' value={quantity} onValueChange={setQuantity} />
                    </div>

                    {/* 购买按钮 */}
                    <Button onClick={() => router.push('/purchase')} variant="form-solid" className='w-full h-[68px]'>
                        Comprar
                    </Button>

                    {/* 尺码指南 - 移动端使用Sheet */}
                    <div className="lg:hidden">
                        <Sheet>
                            <SheetTrigger asChild>
                                <button className="w-full px-2 flex items-center gap-1 h-[44px] text-grey hover:bg-grey-dark hover:text-gold border border-grey text-h6 rounded-md">
                                    <TbTie size={20} />
                                    <span>Guía de tallas</span>
                                </button>
                            </SheetTrigger>
                            <SheetContent side="bottom" className="h-[100vh] overflow-y-auto z-[9999] p-2">
                                <SheetHeader className="relative pb-4">
                                    <SheetTitle className="text-h2 font-bold">Guia de tallas</SheetTitle>
                                    <SheetDescription className="sr-only">
                                        Guia de tallas de Belinda Store. Aquí puedes ver las tallas y cortes de los productos.
                                    </SheetDescription>
                                    <p className="text-h4">Talla y Corte</p>
                                    <p className="text-h6 mt-1">Las medidas están en <span className='font-bold'>CM</span></p>
                                </SheetHeader>

                                {/* 尺码表格 */}
                                <div className="mt-6">
                                    <div className="bg-grey-light">
                                        <div className="grid grid-cols-3 font-bold py-3 text-h5">
                                            <div className="text-center">TALLA</div>
                                            <div className="text-center">BUSTO</div>
                                            <div className="text-center">CADERA</div>
                                        </div>
                                    </div>

                                    {sizeGuideData.map((item, index) => (
                                        <div key={index} className="grid grid-cols-3 py-3 border-b text-h6">
                                            <div className="text-center">{item.size}</div>
                                            <div className="text-center">{item.bust}</div>
                                            <div className="text-center">{item.hip}</div>
                                        </div>
                                    ))}
                                </div>

                                {/* 尺码指南图片 */}
                                <div className="mt-4">
                                    <Image
                                        src="/size.png"
                                        alt="Guía de tallas"
                                        className="object-contain w-full max-w-[400px] mx-auto rounded-md"
                                        width={400}
                                        height={962}
                                        sizes="400px"
                                    />
                                </div>
                            </SheetContent>
                        </Sheet>
                    </div>

                    {/* 尺码指南 - PC端使用Dialog */}
                    <div className="hidden lg:block">
                        <Dialog>
                            <DialogTrigger asChild>
                                <button className="w-[173px] px-2 flex items-center gap-1 h-[44px] text-grey hover:bg-grey-dark hover:text-gold border border-grey text-h6 rounded-md">
                                    <TbTie size={20} />
                                    <span>Guía de tallas</span>
                                </button>
                            </DialogTrigger>
                            <DialogContent className="max-w-[800px] rounded-md p-0">
                                <div className="grid grid-cols-2">
                                    {/* 左侧图片 - 添加居中对齐 */}
                                    <div className="flex justify-center items-center">
                                        <Image
                                            src="/size.png"
                                            alt="Guía de tallas"
                                            className="object-contain w-[400px] p-2 rounded-sm"
                                            width={400}
                                            height={500}
                                            sizes="400px"
                                        />
                                    </div>

                                    {/* 右侧内容 */}
                                    <div className="p-6">
                                        <DialogHeader className="border-b pb-4">
                                            <DialogTitle className="text-h2 font-bold">Guia de tallas</DialogTitle>
                                            <p className="text-h4 mt-2">Talla y Corte</p>
                                            <p className="text-h6 mt-1">Las medidas están en <span className='font-bold'>CM</span></p>
                                        </DialogHeader>

                                        {/* 尺码表格 */}
                                        <div className="mt-4">
                                            <div className="bg-grey-light">
                                                <div className="grid grid-cols-3 text-h5 py-3">
                                                    <div className="text-center">TALLA</div>
                                                    <div className="text-center">BUSTO</div>
                                                    <div className="text-center">CADERA</div>
                                                </div>
                                            </div>

                                            {sizeGuideData.map((item, index) => (
                                                <div key={index} className="grid grid-cols-3 py-2 border-b text-h6">
                                                    <div className="text-center">{item.size}</div>
                                                    <div className="text-center">{item.bust}</div>
                                                    <div className="text-center">{item.hip}</div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </DialogContent>
                        </Dialog>
                    </div>

                    {/* 添加Accordion */}
                    <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value="item-1">
                            <AccordionTrigger>Detalles</AccordionTrigger>
                            <AccordionContent>
                                • Vestido corto<br />
                                • Escote en V<br />
                                • Manga larga<br />
                                • Espalda descubierta<br />
                                • Cierre con cremallera invisible en costado<br />
                                • Forro interior
                            </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="item-2">
                            <AccordionTrigger>Materiales y cuidados</AccordionTrigger>
                            <AccordionContent>
                                • 100% Poliéster<br />
                                • Lavar a mano<br />
                                • No usar secadora<br />
                                • Planchar a baja temperatura<br />
                                • No lavar en seco
                            </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="item-3">
                            <AccordionTrigger>Envío y devoluciones</AccordionTrigger>
                            <AccordionContent>
                                • Envío estándar: 3-5 días hábiles<br />
                                • Envío express: 1-2 días hábiles<br />
                                • Devoluciones gratuitas dentro de los 30 días<br />
                                • Cambios sin costo en tienda
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </div>
            </div>
        </div>
    );
}
