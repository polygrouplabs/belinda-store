"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { AnimatePresence } from "framer-motion";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import FilterContent from "./FilterContent";
import { FaFilter } from "react-icons/fa";

import { useMediaQuery } from "@/hooks/handlers/use-media-query";

export const filterItems = [
  { label: "Ver todos", href: "/" },
  { label: "Más vendidos", href: "/" },
  { label: "Descuento", href: "/" },
  { label: "Mayor a menor precio", href: "/" },
  { label: "Menor a mayor Precio", href: "/" },
];

interface FilterProps {
  filterVisible: boolean;
  onFilterVisibleChange: (visible: boolean) => void;
}

export default function Filter({
  filterVisible,
  onFilterVisibleChange,
}: FilterProps) {
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  if (isDesktop) {
    return (
      <div className="container max-w-[73rem] mx-auto px-4 flex justify-between items-center">
        <AnimatePresence>
          {filterVisible && (
            <motion.ul
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="flex items-center gap-8 overflow-hidden"
            >
              {filterItems.map((item) => (
                <li key={item.label}>
                  <Link href={item.href}>
                    <span className="text-grey hover:text-gold">
                      {item.label}
                    </span>
                  </Link>
                </li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>
        <div
          onClick={() => onFilterVisibleChange(!filterVisible)}
          className="w-[96px] h-[34px] ml-auto hover:bg-gold-dark cursor-pointer bg-gold flex justify-center items-center gap-1 text-white"
        >
          <FaFilter size={18} />
          <span>Filtro</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4">
      <Sheet>
        <SheetTrigger asChild>
          <button className="w-[96px] h-[34px] bg-gold hover:bg-gold-dark flex justify-center items-center gap-1 text-white">
            <FaFilter size={18} />
            <span>Filtro</span>
          </button>
        </SheetTrigger>
        <SheetContent side="right" className="z-[9999]">
          <SheetHeader>
            <SheetTitle>Filtrar por</SheetTitle>
          </SheetHeader>
          <FilterContent />
        </SheetContent>
      </Sheet>
    </div>
  );
}
