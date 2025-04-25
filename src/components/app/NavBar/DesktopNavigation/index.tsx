import Link from "next/link";
import { UIState } from "../types";

import DesktopSearch from "./DesktopSearch";
import DesktopMenu from "./DesktopMenu";

import Logo from "@/assets/Belinda-text-Icon-Colorway-Gold.svg";
import { useScrollPosition } from "@/hooks/handlers/useScrollPosition";

interface DesktopNavigationProps {
  uiState: UIState;
  setUiState: (state: UIState | ((prev: UIState) => UIState)) => void;
  children: React.ReactNode;
}

export function DesktopNavigation({
  uiState,
  setUiState,
  children,
}: DesktopNavigationProps) {
  const { scrollValue } = useScrollPosition();

  return (
    <nav
      className={`w-full mx-auto hidden lg:block z-[900] h-[70px] bg-background text-gold-light duration-100 fixed ${
        scrollValue >= 40 ? "top-0" : "top-[40px]"
      }`}
    >
      <div className="container h-full mx-auto px-4 flex items-center gap-4 justify-between">
        <Link
          href="/"
          className="w-[150px] h-[90px] overflow-hidden flex items-center justify-center hover:text-gold"
        >
          <Logo />
        </Link>
        <div className="flex flex-1 items-center gap-6">
          <DesktopMenu uiState={uiState} setUiState={setUiState} />
          <DesktopSearch uiState={uiState} setUiState={setUiState} />
          {children}
        </div>
      </div>
    </nav>
  );
}
