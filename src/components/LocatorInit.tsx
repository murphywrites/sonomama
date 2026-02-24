"use client";

import { useEffect } from "react";

export default function LocatorInit() {
  useEffect(() => {
    if (process.env.NODE_ENV === "development") {
      import("@locator/runtime").then((setupLocatorUI) => {
        setupLocatorUI.default();
      });
    }
  }, []);

  return null;
}
