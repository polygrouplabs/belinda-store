"use client"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { QuantityCounter } from "@/components/app/QuantityCounter";
import { useRouter } from "next/navigation";
import { TfiClose } from "react-icons/tfi";

// 模拟数据
const item = {
    id: "1",
    name: "Vestido con espalda descubierta",
    price: 159.99,
    originalPrice: 199.99,
    cover: "/IMG-1.jpg",
    images: ["/IMG-Buy-1.jpg", "/IMG-Buy-2.jpg", "/IMG-1.jpg"],
    description: "Elegante vestido floral perfecto para la temporada de primavera",
    category: "vestidos",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Rosa", "Azul", "Blanco"],
    stock: 50
}

export default function PurchasePage() {
    const router = useRouter();

    return (
        <div>
            {/* 页面标题 */}
            <div className="bg-gold w-full h-[80px] flex items-center justify-center">
                <span className="text-h3 font-bold text-white">Finalizar compra</span>
            </div>

            <div className="max-w-[1200px] mx-auto px-4 mt-10">
                {/* 商品信息 */}
                <div className="flex items-center gap-4 p-4 border-b border-grey-50 relative">
                    <button
                        className="absolute top-2 right-2 text-grey hover:text-black"
                    >
                        <TfiClose size={16} />
                    </button>
                    <div className="relative w-[120px] aspect-[95/122]">
                        <Image
                            src={item.cover}
                            alt={item.name}
                            fill
                            className="object-cover"
                            sizes="120px"
                        />
                    </div>
                    <div className="flex-1 flex flex-col gap-3">
                        <h6 className="text-h6">{item.name}</h6>
                        <span className="text-h6 font-bold">${item.price.toLocaleString('es-CO')}</span>
                        <QuantityCounter className="max-w-[240px] h-[33px] text-base" value={1} onValueChange={() => { }} />
                    </div>
                </div>

                <div className="w-full lg:w-[700px] lg:ml-auto mt-10 flex flex-col gap-4">
                    {/* 免运费提示 */}
                    <div className="bg-pink rounded-md text-white p-2 text-h6">
                        <span className='font-bold'>ENVÍO GRATIS</span> POR COMPRAS
                        SUPERIORES A <span className='font-bold'>$ 200.000</span>
                    </div>

                    {/* 优惠码输入 */}
                    <div className="mt-6 h-[40px] grid grid-cols-[1fr,auto]">
                        <Input className="h-full rounded-r-none rounded-l-md" />
                        <Button variant="form-solid" className="h-full w-[112px] rounded-l-none text-[14px] font-bold rounded-r-md">
                            Aplicar
                        </Button>
                    </div>

                    <div className="my-6 flex flex-col gap-4 lg:flex-row">
                        {/* 添加更多商品按钮 */}
                        <Button
                            onClick={() => router.push('/store')}
                            variant="hollow-grey-dark"
                            className="w-full h-[68px] text-h6 text-grey"
                        >
                            Añadir más productos
                        </Button>

                        {/* 结账按钮 */}
                        <Button onClick={() => router.push('/finish')} variant="form-solid" className="w-full h-[68px]">
                            Finalizar compra
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
