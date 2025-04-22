"use client";

import { HeadlessClientContext } from "@/context/headlessContext";
import { useContext } from "react";

export const useHeadlessClient = () => {
  return useContext(HeadlessClientContext);
};
