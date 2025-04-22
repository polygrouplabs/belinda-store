import { useEffect, useState } from "react";

export function useScrollPosition(threshold: number = 200) {
  const [scrollValue, setScrollValue] = useState<number>(0);
  const [showFixedMenu, setShowFixedMenu] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = (): void => {
      const scrollY = window.scrollY;
      setScrollValue(scrollY);
      setShowFixedMenu(scrollY > threshold);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [threshold]);

  return { scrollValue, showFixedMenu };
}
