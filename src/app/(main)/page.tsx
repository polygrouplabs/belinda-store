export const dynamic = "force-dynamic";

import Banner from "@/components/app/Banner";
import BestSelling from "@/components/app/BestSelling";
import Poster from "@/components/app/Poster";
import Categories from "@/components/app/categories/Categories";

import { HeadlessServerImpl } from "@/controllers/headlessServerImpl";
import {
  NEXT_PUBLIC_BEST_SELLERS_ID,
  NEXT_PUBLIC_ACCESORY_ID,
} from "@/utils/env";
import About from "@/components/app/About/About";

const env = {
  bestSellers: NEXT_PUBLIC_BEST_SELLERS_ID!,
  accesories: NEXT_PUBLIC_ACCESORY_ID!,
};

export default async function Page() {
  const HeadlessServerImplInstance = new HeadlessServerImpl();

  const [categoriesData, bestSellingProducts] = await Promise.all([
    await HeadlessServerImplInstance.getCategories(),
    await HeadlessServerImplInstance.getProductsByCollectionId(
      env.bestSellers,
      8
    ),
  ]);

  return (
    <>
      <Banner />
      <About />
      <BestSelling title="Destacados" products={bestSellingProducts} />
      <Poster />
      <Categories categories={categoriesData} />
    </>
  );
}
