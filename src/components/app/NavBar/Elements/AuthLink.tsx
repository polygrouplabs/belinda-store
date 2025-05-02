"use client";

import { User2Icon } from "lucide-react";
import { HiLogout } from "react-icons/hi";
import Link from "next/link";

export default function AuthLink({
  isLoggedIn,
  isLoading,
  handleLogout,
}: {
  isLoggedIn: boolean;
  isLoading: boolean;
  handleLogout: () => void;
}) {
  return !isLoggedIn ? (
    <Link href={"/login"}>
      <User2Icon className="hover:text-gold-dark" size={25} />
    </Link>
  ) : (
    <button disabled={isLoading} onClick={handleLogout}>
      <HiLogout className="hover:text-gold-dark" size={25} />
    </button>
  );
}
