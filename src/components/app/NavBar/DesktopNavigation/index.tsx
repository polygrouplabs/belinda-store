"use client";

import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import { members } from "@wix/members";

import { UIState } from "../types";
import { useScrollPosition } from "@/hooks/handlers/useScrollPosition";

import DesktopMenu from "./DesktopMenu";
import DesktopSearch from "./DesktopSearch";
import Logo from "@/assets/Belinda-text-Icon-Colorway-Gold.svg";

const AuthLink = dynamic(() => import("../Elements/AuthLink"), { ssr: false });

interface DesktopNavigationProps {
  isLoggedIn: boolean;
  isLoading: boolean;
  currentMember:
    | (members.GetMyMemberResponse &
        members.GetMyMemberResponseNonNullableFields)
    | undefined;
  handleLogout: () => void;
  uiState: UIState;
  setUiState: (state: UIState | ((prev: UIState) => UIState)) => void;
  children: React.ReactNode;
}

export function DesktopNavigation({
  isLoggedIn,
  isLoading,
  currentMember,
  handleLogout,
  uiState,
  setUiState,
  children,
}: DesktopNavigationProps) {
  const { scrollValue } = useScrollPosition();

  return (
    <nav
      className={`w-full mx-auto hidden lg:block z-[900] h-[70px] bg-background duration-100 fixed ${
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
        <div className="flex flex-1 items-center gap-6 ">
          <DesktopMenu uiState={uiState} setUiState={setUiState} />
          <DesktopSearch uiState={uiState} setUiState={setUiState} />
          {children}
          {isLoggedIn && (
            <Link
              href={"/perfil"}
              className="flex justify-center items-center gap-2 relative"
            >
              <div className="w-2 h-2 rounded-full bg-pink absolute top-0 -right-3 animate-pulse" />
              {currentMember?.member?.profile?.photo?.url ? (
                <Image
                  width={10}
                  height={10}
                  src={currentMember?.member?.profile?.photo?.url}
                  alt="Foto de perfil"
                />
              ) : (
                <div className="w-8 h-8 rounded-full bg-grey flex items-center justify-center">
                  <p className="text-white font-bold">
                    {currentMember?.member?.profile?.nickname
                      ?.charAt(0)
                      .toUpperCase()}
                  </p>
                </div>
              )}
              <span className="text-h6 font-semibold">
                {currentMember?.member?.profile?.nickname ??
                  currentMember?.member?.loginEmail}
              </span>
            </Link>
          )}
          <AuthLink
            isLoading={isLoading}
            isLoggedIn={isLoggedIn}
            handleLogout={handleLogout}
          />
        </div>
      </div>
    </nav>
  );
}
