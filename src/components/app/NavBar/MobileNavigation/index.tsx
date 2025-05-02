import Image from "next/image";
import Link from "next/link";
import { useScrollPosition } from "@/hooks/handlers/useScrollPosition";

import MobileSearch from "./MobileSearch";
import { UIState } from "../types";

interface MobileNavigationProps {
  uiState: UIState;
  setUiState: (state: UIState | ((prev: UIState) => UIState)) => void;
  children?: React.ReactNode;
}

export function MobileNavigation({
  uiState,
  setUiState,
  children,
}: MobileNavigationProps) {
  const { scrollValue } = useScrollPosition();

  return (
    <nav
      className={`w-full z-[900] h-[65px] lg:hidden bg-background duration-100 fixed ${
        scrollValue >= 40 ? "top-0" : "top-[40px]"
      }`}
    >
      <div className="h-full flex container px-4 mx-auto justify-between items-center">
        <Link
          href="/"
          className="w-[150px] h-[auto] flex items-center justify-center"
        >
          <Image
            width={150}
            height={80}
            src={"/Belinda-text-Icon-Colorway-Gold.png"}
            alt="Logo"
            priority={true}
            style={{ width: "auto", height: "auto" }}
          />
        </Link>
        <div className="flex items-center gap-4">
          <MobileSearch uiState={uiState} setUiState={setUiState} />
          {children}
        </div>
      </div>
    </nav>
  );
}
