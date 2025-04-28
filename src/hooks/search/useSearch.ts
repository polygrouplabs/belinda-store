"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useRef, useState } from "react";
import { toast } from "sonner";

export default function useSearch() {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const validateInput = (keyword: string): boolean => {
    if (keyword.length === 0) {
      inputRef.current?.focus();
      return false;
    }

    if (keyword.length < 4) {
      toast.warning(`Busca con al menos 4 caracteres.`);
      inputRef.current?.focus();
      return false;
    }
    setError(null);
    return true;
  };

  const handleSearch = (
    e: FormEvent<HTMLFormElement>,
    keyword: string,
    onSuccess: () => void
  ) => {
    e.preventDefault();
    if (!validateInput(keyword)) return;

    setLoading(true);
    onSuccess();
    router.push(`/productos?nombre=${keyword.toLowerCase()}`);
    setLoading(false);
  };

  return { loading, handleSearch, inputRef, error };
}
