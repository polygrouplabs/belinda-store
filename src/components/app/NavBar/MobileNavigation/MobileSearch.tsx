"use client";

import { FormEvent, RefObject, useRef } from "react";
import { HiOutlineSearch } from "react-icons/hi";
import { useOnClickOutside } from "usehooks-ts";
import { UIState } from "../types";
import { BsSearch } from "react-icons/bs";

import useSearch from "@/hooks/search/useSearch";

interface MobileSearchProps {
  uiState: UIState;
  setUiState: (state: UIState | ((prev: UIState) => UIState)) => void;
}

export default function MobileSearch({
  uiState,
  setUiState,
}: MobileSearchProps) {
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const { inputRef, loading, handleSearch, error } = useSearch();

  const handleClickOutside = () => {
    setUiState((prev: UIState) => ({ ...prev, searchVisible: false }));
  };

  useOnClickOutside(
    searchContainerRef as RefObject<HTMLDivElement>,
    handleClickOutside,
    "touchstart"
  );

  const handleSubmitSearch = (e: FormEvent<HTMLFormElement>) => {
    handleSearch(e, uiState.keyword, () => {
      setUiState((prev) => ({
        ...prev,
        keyword: "",
        searchVisible: false,
      }));
    });
  };

  const toggleSearchVisibility = () => {
    setUiState((prev: UIState) => ({
      ...prev,
      searchVisible: !prev.searchVisible,
    }));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUiState((prev: UIState) => ({ ...prev, keyword: e.target.value }));
  };

  return (
    <div ref={searchContainerRef}>
      <button
        aria-label="Abrir búsqueda"
        onClick={toggleSearchVisibility}
        type="button"
        className="flex items-center justify-center"
      >
        <BsSearch size={26} />
      </button>

      <form
        onSubmit={handleSubmitSearch}
        className={`w-full absolute z-20 left-0 top-full px-5 ${
          uiState.searchVisible ? "h-[63px]" : "h-[0px]"
        } bg-background transition-[height] overflow-hidden duration-300`}
      >
        <div className="gap-2 h-full flex justify-between items-center">
          <input
            ref={inputRef}
            value={uiState.keyword}
            onChange={handleInputChange}
            type="text"
            placeholder="Buscar..."
            className="h-[42px] flex-1 border-b-2 border-grey-dark outline-none"
            aria-invalid={!!error}
            aria-describedby="search-error"
          />

          <button
            disabled={loading}
            type="submit"
            aria-label="Enviar búsqueda"
            className="flex w-10 h-10"
          >
            <HiOutlineSearch size={30} className="m-auto" />
          </button>
        </div>
      </form>
    </div>
  );
}
