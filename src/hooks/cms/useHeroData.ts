import { useEffect, useState } from "react";
import { items } from "@wix/data";
import { useHeadlessClient } from "@/hooks/sdk/useHeadlessClient";
import { BannerData } from "@/interfaces/cms";

type heroDataQuery = items.WixDataQuery;
type heroResponse = items.WixDataResult;

interface HeroState {
  data: BannerData | null;
  loading: boolean;
  error: string | null;
}

export function useHeroData() {
  const [state, setState] = useState<HeroState>({
    data: null,
    loading: true,
    error: null,
  });

  const headlessClient = useHeadlessClient();
  const heroDataQuery: heroDataQuery | null =
    headlessClient.items.query("Homeslide");

  useEffect(() => {
    const fetchHeroData = async () => {
      try {
        const response: heroResponse = await heroDataQuery.find();
        const heroData = response.items[0] as BannerData;

        setState({ data: heroData, loading: false, error: null });
      } catch (err) {
        console.error("Error fetching hero data:", err);
        setState({
          data: null,
          loading: false,
          error: "Failed to fetch banners",
        });
      }
    };

    fetchHeroData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return state;
}
