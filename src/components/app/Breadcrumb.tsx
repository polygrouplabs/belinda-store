"use client";

import { usePathname } from "next/navigation";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { getLocalizedPath } from "@/lib/utils";
import { HiChevronRight } from "react-icons/hi2";

export function PageBreadcrumb() {
  const pathname = usePathname();
  const paths = pathname.split("/").filter(Boolean);

  if (paths.length === 0) return null;

  return (
    <Breadcrumb className="container mx-auto max-w-[73rem] px-4 my-4">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">
            <span className="hover:text-gold">Inicio</span>
          </BreadcrumbLink>
        </BreadcrumbItem>
        {paths.map((path, index) => {
          const href = `/${paths.slice(0, index + 1).join("/")}`;

          const label = getLocalizedPath(path);

          return (
            <BreadcrumbItem key={path}>
              <BreadcrumbSeparator>
                <HiChevronRight className="text-foreground" />
              </BreadcrumbSeparator>
              <BreadcrumbLink href={href} className="hover:text-gold">
                {label}
              </BreadcrumbLink>
            </BreadcrumbItem>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
