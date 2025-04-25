import Logo from "@/assets/Belinda-text-Icon-Colorway-Gold.svg";
import Link from "next/link";
import MobileSearch from "./MobileSearch";
import { MobileMenu } from "./MobileMenu";
import { UIState } from "../types";
import { useScrollPosition } from "@/hooks/handlers/useScrollPosition";

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
          <Logo />
        </Link>
        <div className="flex items-center gap-4">
          <MobileSearch uiState={uiState} setUiState={setUiState} />
          {children}
          <MobileMenu uiState={uiState} setUiState={setUiState} />
        </div>
      </div>
    </nav>
  );
}
