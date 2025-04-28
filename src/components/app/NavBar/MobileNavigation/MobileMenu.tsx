import { useState } from "react";

import { motion, AnimatePresence } from "framer-motion";
import { HiOutlineMenu, HiOutlineMenuAlt3 } from "react-icons/hi";
import { UIState } from "../types";
import MobileMenuItem from "./MobileMenuItem";
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
  uiState: UIState;
  setUiState: (state: UIState | ((prev: UIState) => UIState)) => void;
}

export function MobileMenu({ uiState, setUiState }: MobileMenuProps) {
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
        <div className="flex text-xl overflow-hidden">
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
        </div>
      </SheetContent>
    </Sheet>
  );
}
