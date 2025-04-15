import { BREADCRUMB_MAPPING } from "@/config/menu";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getLocalizedPath(path: string) {
  return path
    .split("/")
    .map((segment) => BREADCRUMB_MAPPING[segment] || segment)
    .join(" / ");
}
