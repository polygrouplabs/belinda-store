import { useEffect, useState } from "react";
import { items } from "@wix/data";
import { useHeadlessClient } from "@/hooks/sdk/useHeadlessClient";
import { BannerData } from "@/interfaces/cms";

type heroDataQuery = items.WixDataQuery;
type heroResponse = items.WixDataResult;

export function useHeroData() {
  const [heroData, setHeroData] = useState<BannerData>();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const headlessClient = useHeadlessClient();
  const heroDataQuery: heroDataQuery | null =
    headlessClient.items.query("Homeslide");

  useEffect(() => {
    const getBanners = async () => {
      try {
        const heroDataRes: heroResponse = await heroDataQuery.find();

        if (heroDataRes) {
          const heroDataItems = heroDataRes.items[0] as BannerData;
          setHeroData(heroDataItems);
        }
      } catch (error) {
        console.error("Failed to fetch banners:", error);
        setError("Failed to fetch banners");
      } finally {
        setLoading(false);
      }
    };

    getBanners();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { heroData, loading, error };
}
