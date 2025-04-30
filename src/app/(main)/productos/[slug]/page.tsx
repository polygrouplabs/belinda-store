import { Suspense } from "react";

import { Params } from "@/types/searchParams";
import { getLocalizedPath } from "@/lib/utils";
import { getRouteTitle } from "@/config/route-titles";
import { HeadlessServerImpl } from "@/controllers/headlessServerImpl";

import {
  productInterface,
  productsQueryBuilderInterface,
  productsQueryResultInterface,
} from "@/interfaces/product";
import { collectionsBySlugResponse } from "@/interfaces/collection";

import ProductList from "@/components/app/product/section/ProductList";

export async function generateMetadata(props: { params: Params }) {
  const params = await props.params;
  const slug = params.slug;
  const title = getLocalizedPath(slug);
  return { title };
}

// * console.log("PARAMS =>", params);
// * console.log("SLUG =>", slug);
// * console.log("PATHNAME =>", pathname);

export default async function SlugPage(props: { params: Params }) {
  const params = await props.params;
  const slug = params.slug;
  const pathname = `/productos/${slug}`;
  const { title, description } = getRouteTitle(pathname);

  const HeadlessServerImplInstance = new HeadlessServerImpl();

  let categoriesSlugData: collectionsBySlugResponse | undefined;

  let productsData: productInterface[] = [];
  let productsQuery: productsQueryBuilderInterface | undefined;
  let productsResponse: productsQueryResultInterface | undefined;

  try {
    categoriesSlugData = await HeadlessServerImplInstance.getCategorieSlugData(
      slug
    );

    if (categoriesSlugData) {
      productsQuery = await HeadlessServerImplInstance.getProductsQuery(
        params.nombre,
        categoriesSlugData.collection?._id,
        params.type,
        Number(params.min) || 0,
        Number(params.max) || 2000000,
        Number(params.limit) || 12,
        params.page
      );
    }

    if (productsQuery) {
      productsResponse = await productsQuery.find();
      productsData = productsResponse.items as productInterface[];
    }
  } catch (error) {
    console.warn("Error fetching categories data:", error);
  }

  return productsData.length > 0 ? (
    <>
      <div className="container mx-auto max-w-[73rem] px-4">
        <div className="flex flex-col items-center text-center max-w-[600px] mt-28 mx-auto">
          <h3 className="text-2xl lg:text-4xl uppercase">{title}</h3>
          <p className="text-grey-dark text-base mt-6">
            {description}
          </p>
        </div>
      </div>
      <Suspense fallback={<div>Loading...</div>}>
        <ProductList products={productsData} />
      </Suspense>
    </>
  ) : (
    <div className="container max-w-[73rem] min-h-[60vh] flex justify-center items-center mx-auto px-4">
      <div className="flex flex-col items-center text-center max-w-[600px] my-20 mx-auto gap-5">
        <h3 className="text-xl lg:text-4xl uppercase">
          Categoría sin productos
        </h3>
        <span className="icon-[icon-park-solid--commodity] text-[80px] opacity-80" />
        <p className="text-grey-dark text-sm lg:text-base">
          No hay productos en esta categoría. Por favor, vuelve más tarde o
          explora otras categorías.
        </p>
      </div>
    </div>
  );
}
