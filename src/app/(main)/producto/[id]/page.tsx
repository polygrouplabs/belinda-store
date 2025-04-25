import "swiper/css";
import "./index.css";
import "swiper/css/navigation";
import Image from "next/image";
import DOMPurify from "isomorphic-dompurify";
import { HeadlessServerImpl } from "@/controllers/headlessServerImpl";

import {
  productInterface,
  productOptionInterface,
  productVariantInterface,
} from "@/interfaces/product";
import { productMediaInterface } from "@/interfaces/product";
import { Params } from "@/types/searchParams";

import { TbTie } from "react-icons/tb";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetDescription,
} from "@/components/ui/sheet";
import Add from "@/components/app/product/detail/Add";
import HandlerImage from "@/components/app/product/detail/HandlerImage";
import CustomizeProduct from "@/components/app/product/detail/CustomizeProduct";

// * SIZES GUIDE
const sizeGuideData = [
  { size: "XS", bust: 84, hip: 93 },
  { size: "S", bust: 88, hip: 96 },
  { size: "M", bust: 92, hip: 100 },
  { size: "L", bust: 96, hip: 104 },
  { size: "XL", bust: 100, hip: 108 },
];

export default async function ProductPage(props: { params: Params }) {
  const HeadlessServerImplInstance = new HeadlessServerImpl();

  const params = await props.params;
  const productID = params.id;

  const decodeProductSlug = decodeURIComponent(productID);

  const product: productInterface | undefined =
    await HeadlessServerImplInstance.getProductByEq(decodeProductSlug, "_id");

  const productMedia = product?.media as productMediaInterface;

  const productVariants: productVariantInterface[] = product?.variants || [];
  const productOptions: productOptionInterface[] =
    product?.productOptions || [];

  return (
    <section className="container mx-auto py-10 mt-20 sm:mt-32">
      <div className="space-y-2 px-4 lg:hidden">
        <h1 className="text-h3 font-bold">{product?.name}</h1>
        <p className="text-grey text-h5">{product?.description}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[600px_1fr] lg:gap-8">
        {product && productMedia.items && <HandlerImage product={product} />}

        {/* * PRODUCT INFO */}
        <div className="space-y-6 px-4">
          <div className="space-y-2 hidden lg:block">
            <h1 className="text-h3 font-bold">{product?.name}</h1>
            <p className="text-grey text-h5">{product?.description}</p>
          </div>

          {productVariants && productOptions ? (
            <CustomizeProduct
              productID={productID}
              productVariants={productVariants}
              productOptions={productOptions}
            />
          ) : (
            <Add
              productId={productID}
              variantId="00000000-0000-0000-0000-000000000000"
              stockNumber={product?.stock?.quantity || 0}
            />
          )}

          {/* Guia de tallas */}
          <div className="lg:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <button className="w-full px-2 flex items-center gap-1 h-[44px] text-grey hover:bg-grey-dark hover:text-gold border border-grey text-h6 rounded-md">
                  <TbTie size={20} />
                  <span>Guía de tallas</span>
                </button>
              </SheetTrigger>
              <SheetContent
                side="bottom"
                className="h-[100vh] overflow-y-auto z-[9999] p-2"
              >
                <SheetHeader className="relative pb-4">
                  <SheetTitle className="text-h2 font-bold">
                    Guia de tallas
                  </SheetTitle>
                  <SheetDescription className="sr-only">
                    Guia de tallas de Belinda Store. Aquí puedes ver las tallas
                    y cortes de los productos.
                  </SheetDescription>
                  <p className="text-h4">Talla y Corte</p>
                  <p className="text-h6 mt-1">
                    Las medidas están en <span className="font-bold">CM</span>
                  </p>
                </SheetHeader>

                <div className="mt-6">
                  <div className="bg-grey-light">
                    <div className="grid grid-cols-3 font-bold py-3 text-h5">
                      <div className="text-center">TALLA</div>
                      <div className="text-center">BUSTO</div>
                      <div className="text-center">CADERA</div>
                    </div>
                  </div>

                  {sizeGuideData.map((item, index) => (
                    <div
                      key={index}
                      className="grid grid-cols-3 py-3 border-b text-h6"
                    >
                      <div className="text-center">{item.size}</div>
                      <div className="text-center">{item.bust}</div>
                      <div className="text-center">{item.hip}</div>
                    </div>
                  ))}
                </div>

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

          {/* Dialogo */}
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
                      <DialogTitle className="text-h2 font-bold">
                        Guia de tallas
                      </DialogTitle>
                      <p className="text-h4 mt-2">Talla y Corte</p>
                      <p className="text-h6 mt-1">
                        Las medidas están en{" "}
                        <span className="font-bold">CM</span>
                      </p>
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
                        <div
                          key={index}
                          className="grid grid-cols-3 py-2 border-b text-h6"
                        >
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

          <div className="h-[2px] bg-gray-200" />

          <Accordion type="single" collapsible className="w-full">
            {product?.additionalInfoSections?.map((info, i) => {
              return (
                <AccordionItem key={i} value={`item-${i}`}>
                  <AccordionTrigger>{info.title}</AccordionTrigger>
                  <AccordionContent>
                    <p
                      className="text-gray-500 px-2 overflow-auto"
                      dangerouslySetInnerHTML={{
                        __html: DOMPurify.sanitize(info.description ?? ""),
                      }}
                    />
                  </AccordionContent>
                </AccordionItem>
              );
            })}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
