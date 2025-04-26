import Banner from "@/components/app/Banner";
import BestSelling from "@/components/app/BestSelling";
import Poster from "@/components/app/Poster";
import NewSeries from "@/components/app/NewSeries";

import { HeadlessServerImpl } from "@/controllers/headlessServerImpl";
import {
  NEXT_PUBLIC_BEST_SELLERS_ID,
  NEXT_PUBLIC_NEW_COLLECTIONS_ID,
} from "@/utils/env";

const env = {
  bestSellers: NEXT_PUBLIC_BEST_SELLERS_ID!,
  newCollection: NEXT_PUBLIC_NEW_COLLECTIONS_ID!,
};

export default async function Page() {
  const HeadlessServerImplInstance = new HeadlessServerImpl();

  const [bestSellingProducts, newCollectionProducts] = await Promise.all([
    await HeadlessServerImplInstance.getProductsByCollectionId(
      env.bestSellers,
      8
    ),
    await HeadlessServerImplInstance.getProductsByCollectionId(
      env.newCollection,
      5
    ),
  ]);

  return (
    <>
      <Banner />
      <BestSelling title="Más vendidos" products={bestSellingProducts} />
      <Poster />
      <NewSeries products={newCollectionProducts} />
    </>
  );
}
