"use client"

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function FinishPage() {
    const router = useRouter();

    return (
        <div className="container mx-auto px-4 py-8 text-grey-dark">
            <div className="flex flex-col items-center gap-6 lg:gap-20">
                {/* 标题 */}
                <h1 className="text-4xl lg:text-5xl font-bold text-center">
                    ¡Gracias por tu compra!
                </h1>

                {/* 说明文字 */}
                <div className="space-y-4 lg:max-w-[1000px]">
                    <p className="text-base lg:text-lg">
                        Estamos encantados de haberte tenido como cliente y esperamos que disfrutes mucho tu nuevo producto.Si tienes alguna pregunta o necesitas ayuda, no dudes en contactarnos.
                    </p>
                    <p className="text-base text-center lg:text-lg font-bold">
                        ¡Te esperamos pronto!
                    </p>
                </div>

                {/* 返回商店按钮 */}
                <div className="w-full max-w-[560px]">
                    <Button
                        onClick={() => router.push('/productos')}
                        variant="form-solid"
                        className="h-[68px] mt-4 w-full"
                    >
                        Regresar al comercio
                    </Button>
                </div>
            </div>
        </div>
    );
}
