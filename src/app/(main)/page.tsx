export const dynamic = "force-dynamic";

import Banner from "@/components/app/Banner";
import Features from "@/components/app/Features";
import Poster from "@/components/app/Poster";
import Categories from "@/components/app/categories/Categories";

import { HeadlessServerImpl } from "@/controllers/headlessServerImpl";
import {
  NEXT_PUBLIC_BEST_SELLERS_ID,
  NEXT_PUBLIC_ACCESORY_ID,
  NEXT_PUBLIC_NEW_COLLECTION_ID,
} from "@/utils/env";
import About from "@/components/app/About/About";

const env = {
  bestSellers: NEXT_PUBLIC_BEST_SELLERS_ID!,
  accesories: NEXT_PUBLIC_ACCESORY_ID!,
  newCollection: NEXT_PUBLIC_NEW_COLLECTION_ID!,
};

export default async function Page() {
  const HeadlessServerImplInstance = new HeadlessServerImpl();

  const [categoriesData, bestSellingProducts, newCollectionProducts] =
    await Promise.all([
      await HeadlessServerImplInstance.getCategories(),
      await HeadlessServerImplInstance.getProductsByCollectionId(
        env.bestSellers,
        8
      ),
      await HeadlessServerImplInstance.getProductsByCollectionId(
        env.newCollection,
        8
      ),
    ]);

  return (
    <>
      <Banner />
      <About />
      <Features title="Destacados" products={bestSellingProducts} />
      <Categories categories={categoriesData} />
      <Poster />
      <Features title="Nueva colección" products={newCollectionProducts} />
    </>
  );
}
