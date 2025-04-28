import { Params } from "@/types/searchParams";
import { getRouteTitle } from "@/config/route-titles";

import {
  productInterface,
  productsQueryBuilderInterface,
  productsQueryResultInterface,
} from "@/interfaces/product";
import { collectionsBySlugResponse } from "@/interfaces/collection";
import { HeadlessServerImpl } from "@/controllers/headlessServerImpl";

import Filter from "@/components/app/Filter";
import ProductList from "@/components/app/product/section/ProductList";
import Pagination from "@/components/app/pagination/Pagination";

export default async function StorePage(props: { searchParams: Params }) {
  const { title, description } = getRouteTitle("/productos");

  const paramsResponse = await props.searchParams;
  const slug = paramsResponse.categorie || "all-products";

  // * console.log("PARAMS =>", paramsResponse.sort);

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
        paramsResponse.nombre,
        categoriesSlugData.collection?._id,
        paramsResponse.type,
        Number(paramsResponse.min) || 0,
        Number(paramsResponse.max) || 2000000,
        Number(paramsResponse.limit) || 8,
        paramsResponse.page,
        paramsResponse.sort
      );
    }

    if (productsQuery) {
      productsResponse = await productsQuery.find();
      productsData = productsResponse.items as productInterface[];
    }
  } catch (error) {
    console.warn("Error fetching categories data:", error);
  }

  return (
    <div className="container flex flex-col mx-auto max-w-[73rem] pb-10">
      {productsData.length > 0 ? (
        <>
          <div className="flex flex-col items-center text-center max-w-[600px] mt-28 mx-auto">
            <h3 className="text-2xl lg:text-4xl font-bold">{title}</h3>
            <p
              className="text-grey-dark text-base mt-6"
              dangerouslySetInnerHTML={{
                __html: description.replace(
                  "Belinda",
                  '<span class="font-bold">Belinda</span>'
                ),
              }}
            />
          </div>
          <Filter />
          <ProductList products={productsData} />
          {productsResponse && (
            <Pagination
              hasPrev={productsResponse.hasPrev()}
              hasNext={productsResponse.hasNext()}
              currentPage={productsResponse.currentPage || 0}
            />
          )}
        </>
      ) : (
        <div className="container max-w-[73rem] min-h-[60vh] flex justify-center items-center mx-auto px-4">
          <div className="flex flex-col items-center text-center max-w-[600px] my-20 mx-auto gap-5">
            <h3 className="text-xl lg:text-4xl font-bold">Sin productos</h3>
            <span className="icon-[icon-park-solid--commodity] text-[80px] opacity-80" />
            <p className="text-grey-dark text-sm lg:text-base">
              No hay productos en esta busqueda. Por favor, explora otras
              categorías o nombre de producto.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
