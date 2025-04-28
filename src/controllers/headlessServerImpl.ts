import { headlessServer } from "@/sdk/headlessServer";
import { NEXT_PUBLIC_ALL_PRODUCTS_ID } from "@/utils/env";

import {
  productInterface,
  productsQueryBuilderInterface,
} from "@/interfaces/product";

import {
  collectionsBySlugResponse,
  collectionsInterface,
  collectionsQueryBuilderInterface,
  collectionsQueryResultInterface,
} from "@/interfaces/collection";

const env = {
  all_products: NEXT_PUBLIC_ALL_PRODUCTS_ID ?? "",
};

export interface ApplicationErrorDetails {
  description: string;
  code: string;
  data: Record<string, unknown>;
}

export interface ErrorDetails {
  applicationError: ApplicationErrorDetails;
}

export interface ServerError {
  message: string;
  details: ErrorDetails;
}

export class HeadlessServerImpl {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private headlessServerInstance: any;
  private productsQuery!: productsQueryBuilderInterface;
  private collectionsQuery!: collectionsQueryBuilderInterface;

  constructor() {
    this.initialize();
  }

  private async initialize() {
    this.headlessServerInstance = await headlessServer();
    this.productsQuery =
      await this.headlessServerInstance.products.queryProducts();
    this.collectionsQuery =
      await this.headlessServerInstance.collections.queryCollections();
  }

  private async ensureInitialized() {
    if (!this.productsQuery || !this.collectionsQuery) {
      await this.initialize();
    }
  }

  async getAllProducts(limit: number): Promise<productInterface[]> {
    await this.ensureInitialized();
    const productsResponse = await this.productsQuery
      .limit(limit)
      .descending("lastUpdated")
      .find();
    return productsResponse.items as productInterface[];
  }

  async getProductByEq(
    slug: string,
    typeEq: "slug" | "_id"
  ): Promise<productInterface | undefined> {
    await this.ensureInitialized();
    const productResponse = await this.productsQuery.eq(typeEq, slug).find();
    const product = productResponse.items[0] as productInterface;
    return product;
  }

  async getProductsQuery(
    nombre: string | undefined,
    categorieSlug: string | undefined | null,
    type: "physical" | "digital" | undefined,
    min: number,
    max: number,
    PRODUCT_PER_LIST_SECTION: number,
    page: string | undefined,

    sortOrder?: "asc" | "desc"
  ): Promise<productsQueryBuilderInterface | undefined> {
    await this.ensureInitialized();

    try {
      // let productsData: productInterface[] = [];
      const productsQuery = this.productsQuery
        .startsWith("name", nombre || "")
        .eq("collectionIds", categorieSlug ?? env.all_products)
        .hasSome("productType", type ? [type] : [type ?? "physical", "digital"])
        .gt("priceData.price", min)
        .lt("priceData.price", max)
        .limit(PRODUCT_PER_LIST_SECTION)
        .descending("lastUpdated")
        .skip(page ? parseInt(page) * PRODUCT_PER_LIST_SECTION : 0);

      if (sortOrder === "asc") {
        productsQuery.ascending("price");
      } else if (sortOrder === "desc") {
        productsQuery.descending("price");
      }

      if (productsQuery) {
        // const productResponse = await productsQuery.find();
        // productsData = productResponse.items as productInterface[];
      }
      return productsQuery;
    } catch (error) {
      console.error("Error fetching products:", error);
      return undefined;
    }
  }

  async getProductsByCollectionId(
    collectionId: string,
    limit: number
  ): Promise<productInterface[]> {
    await this.ensureInitialized();
    const productsResponse = await this.productsQuery
      .eq("collectionIds", collectionId)
      .limit(limit)
      .descending("lastUpdated")
      .find();
    return productsResponse.items as productInterface[];
  }

  async getCategories(): Promise<collectionsInterface[]> {
    await this.ensureInitialized();
    const categoriesResponse: collectionsQueryResultInterface =
      await this.collectionsQuery.find();
    return categoriesResponse.items as collectionsInterface[];
  }

  async getCategorieSlugData(
    slug: string = "all-products"
  ): Promise<collectionsBySlugResponse | undefined> {
    await this.ensureInitialized();
    try {
      const categorieBySlug =
        await this.headlessServerInstance.collections.getCollectionBySlug(slug);
      return categorieBySlug as collectionsBySlugResponse;
    } catch (error: unknown) {
      const thisError = error as ServerError;
      if (thisError?.details?.applicationError?.code === "CATEGORY_NOT_FOUND") {
        console.warn(
          `Category with slug "${slug}" was not found. Returning undefined.`
        );
        return undefined;
      }
      console.error("Error fetching categories data:", error);
      return undefined;
    }
  }
}
