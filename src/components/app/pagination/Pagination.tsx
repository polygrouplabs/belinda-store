"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";

interface PaginationContentProps {
  currentPage: number;
  hasPrev: boolean;
  hasNext: boolean;
}

function PaginationContent({
  hasPrev,
  hasNext,
  currentPage,
}: PaginationContentProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();

  const createPageUrl = (pageNumber: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", pageNumber.toString());
    replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="w-full flex justify-between">
      <button
        onClick={() => {
          createPageUrl(currentPage - 1);
        }}
        disabled={!hasPrev}
        className="w-[110px] h-[34px] hover:bg-gold-dark cursor-pointer bg-gold flex justify-center items-center gap-1 text-white disabled:bg-gray-500"
      >
        Previo
      </button>
      <button
        onClick={() => {
          createPageUrl(currentPage + 1);
        }}
        disabled={!hasNext}
        className="w-[110px] h-[34px] hover:bg-gold-dark cursor-pointer bg-gold flex justify-center items-center gap-1 text-white disabled:bg-gray-500"
      >
        Siguiente
      </button>
    </div>
  );
}

export default function Pagination({
  currentPage,
  hasPrev,
  hasNext,
}: {
  currentPage: number;
  hasPrev: boolean;
  hasNext: boolean;
}) {
  return (
    <Suspense>
      <PaginationContent
        currentPage={currentPage}
        hasPrev={hasPrev}
        hasNext={hasNext}
      />
    </Suspense>
  );
}
