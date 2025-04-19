"use client";

import React, { ReactNode } from "react";
import { ThemeProvider } from "next-themes";

function ThemeProviderComp({ children }: { children: ReactNode }) {
  return (
    <div>
      <ThemeProvider attribute="class" defaultTheme="system">
        {children}
      </ThemeProvider>
    </div>
  );
}

export default ThemeProviderComp;