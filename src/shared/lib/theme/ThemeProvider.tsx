"use client";

import { type ReactNode, useEffect } from "react";
import { useThemeStore } from "./useThemeStore";

export function ThemeProvider({ children }: { children: ReactNode }) {
  const { theme } = useThemeStore();

  useEffect(() => {
    // 1. 초기 로드 시 및 테마 변경 시 클래스 적용
    const root = window.document.documentElement;
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const applyTheme = () => {
      const isDark = theme === "dark" || (theme === "system" && mediaQuery.matches);
      root.classList.toggle("dark", isDark);
    };

    applyTheme();

    // 2. 'system' 모드일 때 OS 테마 변경 감지
    const handleChange = () => {
      if (theme === "system") applyTheme();
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [theme]);

  // 이 컴포넌트는 UI를 그리지 않고 로직만 실행하거나,
  // 필요하다면 Context.Provider 역할을 할 수도 있습니다.
  return <>{children}</>;
}
