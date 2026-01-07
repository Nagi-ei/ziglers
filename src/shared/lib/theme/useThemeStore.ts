import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Theme = "light" | "dark" | "system";

interface ThemeState {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      theme: "system",
      setTheme: (theme) => {
        set({ theme });
        // 상태가 변경될 때마다 실제 DOM 클래스도 업데이트
        const isDark =
          theme === "dark" ||
          (theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches);
        document.documentElement.classList.toggle("dark", isDark);
      },
    }),
    {
      name: "theme-storage", // localStorage 키 이름
    },
  ),
);
