"use client";

import useSearch from "@/hooks/search/useSearch";

import { UIState } from "../types";
import { BsSearch } from "react-icons/bs";

interface DesktopSearchProps {
  uiState: UIState;
  setUiState: (state: UIState | ((prev: UIState) => UIState)) => void;
}

export default function DesktopSearch({
  uiState,
  setUiState,
}: DesktopSearchProps) {
  const { handleSearch, inputRef, loading, error } = useSearch();

  const handleSubmitSearch = (e: React.FormEvent<HTMLFormElement>) => {
    toggleSearchVisibility(uiState.keyword);

    handleSearch(e, uiState.keyword, () => {
      setUiState((prev) => ({
        ...prev,
        keyword: "",
      }));
    });
  };

  const toggleSearchVisibility = (keyword: string) => {
    setUiState((prev) => ({
      ...prev,
      searchVisible:
        keyword.length === 0
          ? !prev.searchVisible
          : keyword.length < 4
          ? true
          : false,
    }));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUiState((prev) => ({ ...prev, keyword: e.target.value }));
  };

  return (
    <form
      onSubmit={handleSubmitSearch}
      className="flex gap-4 items-center hover:text-gold"
    >
      <input
        ref={inputRef}
        type="text"
        value={uiState.keyword}
        onChange={handleInputChange}
        className={`h-max ${
          uiState.searchVisible ? "w-[240px]" : "w-[0px]"
        } border-b-2 border-current outline-none transition-[width] duration-300`}
        aria-invalid={!!error}
        aria-describedby="search-error"
      />
      <button disabled={loading} type="submit" aria-label="Buscar">
        <BsSearch size={22} />
      </button>
    </form>
  );
}
