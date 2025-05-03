"use client";

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";

import { User2Icon } from "lucide-react";
import { members } from "@wix/members";
import { motion, AnimatePresence } from "framer-motion";
import { HiLogout, HiOutlineMenu, HiOutlineMenuAlt3 } from "react-icons/hi";
import MobileMenuItem from "./MobileMenuItem";

import { UIState } from "../types";

import { MENU_ITEMS } from "@/config/menu";

import {
  SheetContent,
  Sheet,
  SheetTrigger,
  SheetTitle,
  SheetDescription,
  SheetHeader,
} from "@/components/ui/sheet";

interface MobileMenuProps {
  isLoggedIn: boolean;
  isLoading: boolean;
  currentMember:
    | (members.GetMyMemberResponse &
        members.GetMyMemberResponseNonNullableFields)
    | undefined;
  handleLogout: () => void;
  uiState: UIState;
  setUiState: (state: UIState | ((prev: UIState) => UIState)) => void;
}

export function MobileMenu({
  isLoggedIn,
  isLoading,
  currentMember,
  handleLogout,
  uiState,
  setUiState,
}: MobileMenuProps) {
  const router = useRouter();

  const [showMenu, setShowMenu] = useState(false);

  const handleCloseMenu = () => {
    setShowMenu(false);
    setUiState((prev: UIState) => ({
      ...prev,
      menuVisible: !prev.menuVisible,
    }));
  };

  return (
    <Sheet open={showMenu} onOpenChange={setShowMenu}>
      <SheetTrigger>
        <AnimatePresence mode="wait" initial={false}>
          {uiState.menuVisible ? (
            <motion.div
              key="menu"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <HiOutlineMenuAlt3
                onClick={handleCloseMenu}
                aria-label="Cerrar menú"
                size={26}
              />
            </motion.div>
          ) : (
            <motion.div
              key="close"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <HiOutlineMenu
                aria-label="Abrir menú"
                onClick={handleCloseMenu}
                size={26}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </SheetTrigger>

      <SheetContent
        side={"left"}
        className="max-w-[320px] z-[9999] flex flex-col p-0"
      >
        <SheetHeader className="mx-6 py-4 border-b h-14">
          <SheetTitle className="text-h4 font-normal text-grey-dark" />
          <SheetDescription className="sr-only">
            Menu de navegación
          </SheetDescription>
        </SheetHeader>
        <div className="flex text-xl min-h-[90vh] overflow-hidden relative">
          <div className="w-full max-h-[calc(100vh_-132px)] overflow-auto ml-6">
            {MENU_ITEMS.filter((item) => !item.desktopOnly).map(
              (item, index) => (
                <MobileMenuItem
                  key={index}
                  item={item}
                  uiState={uiState}
                  setUiState={setUiState}
                  onCloseMenu={handleCloseMenu}
                />
              )
            )}
          </div>
          <div className="w-full flex justify-between absolute left-2 right-0 bottom-10 px-5">
            {isLoggedIn ? (
              <>
                <button
                  onClick={() => {
                    handleCloseMenu();
                    router.push("/perfil");
                  }}
                  className="flex items-center gap-4"
                >
                  <div className="relative">
                    <div className="w-2 h-2 rounded-full bg-pink absolute -top-1 -right-1 animate-pulse" />
                    {currentMember?.member?.profile?.photo?.url ? (
                      <Image
                        width={40}
                        height={40}
                        src={currentMember?.member?.profile?.photo?.url}
                        alt="Foto de perfil"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-grey flex items-center justify-center">
                        <p className="text-white font-bold">
                          {currentMember?.member?.profile?.nickname
                            ?.charAt(0)
                            .toUpperCase()}
                        </p>
                      </div>
                    )}
                  </div>
                  <div className="flex text-start flex-col">
                    <span className="text-h6 font-bold">
                      {currentMember?.member?.profile?.nickname}
                    </span>
                    <span className="text-[.8rem]">
                      {currentMember?.member?.profile?.slug}
                    </span>
                  </div>
                </button>
                <button disabled={isLoading} onClick={handleLogout}>
                  <HiLogout className="hover:text-gold-dark" size={30} />
                </button>
              </>
            ) : (
              <button
                onClick={() => {
                  handleCloseMenu();
                  router.push("/login");
                }}
                className="flex items-center gap-2 text-[.8rem]"
              >
                <User2Icon
                  className="hover:text-gold-dark rounded-full p-1 bg-grey"
                  size={35}
                />
                Iniciar sesión | Registrarte
              </button>
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
