"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import type { ComponentProps } from "react";

export function ThemeProvider({ children, ...props }: ComponentProps<typeof NextThemesProvider>) {
  return (
    <NextThemesProvider
      attribute="class" // html 태그에 'dark' 클래스 추가.
      defaultTheme="system"
      enableSystem={true} // 시스템 테마 감지 활성화.
      disableTransitionOnChange // 테마 변경 시 CSS 애니메이션이 튀는 것을 방지.
      {...props}
    >
      {children}
    </NextThemesProvider>
  );
}
