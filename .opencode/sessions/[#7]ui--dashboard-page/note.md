# 📝 Session Note: [#7]ui--dashboard-page

- **Date:** 2026-01-24
- **Branch:** feat/dashboard-page
- **Agent Role:** Architect / Feature Builder

## 🎯 세션 목표

- 대시보드 페이지 UI 구현 (두 가지 레이아웃 시안)
- `/dashboard1` (Sidebar Inset + 각진 모서리) vs `/dashboard2` (일반 Sidebar)

## 🛠 주요 기술적 결정 (Decision Log)

### 1. 라우트 그룹 분리 전략

- **결정 사항:** `(inset-sidebar)` / `(default-sidebar)` 두 개의 라우트 그룹 생성
- **이유 및 근거:**
  - 두 가지 시안을 동시에 확인 후 하나 선택
  - 나중에 폴더 하나만 삭제하면 정리 완료
  - 대시보드 콘텐츠(위젯)는 동일하게 재사용

### 2. FSD-Lite 위젯 구조

- **결정 사항:** Coarse-grained 위젯 (기능별 묶음)
  - `dashboard-summary/` - 4개 통계 카드
  - `dashboard-charts/` - Area + Donut 차트
  - `dashboard-boards/` - 보드 목록
- **이유 및 근거:**
  - SCAFFOLD_STRUCTURE.md의 `dashboard-cards/` 예시 패턴 준수
  - 응집도 높음, 빠른 구현

### 3. Mock 데이터 위치

- **결정 사항:** 각 위젯의 `model.ts` 내부
- **이유 및 근거:**
  - 관련 데이터와 UI가 같은 위젯에 위치 (응집도)
  - API 전환 시 `model.ts` 내부만 수정하면 됨

### 4. 사용자 프로필 영역

- **결정 사항:** Placeholder로 구현 (하드코딩된 가짜 데이터)
- **이유 및 근거:**
  - 현재 인증 기능 미구현 상태
  - UI 레이아웃 확인 목적
  - 나중에 인증 구현 시 실제 데이터로 교체

## 🚀 프롬프트 및 피드백 히스토리

### 사용자 피드백 #1

- **요청:** 두 가지 사이드바 시안으로 분리
- **반영:** `/dashboard1` (Inset + 각진), `/dashboard2` (일반) 라우트 분리

### 사용자 피드백 #2

- **요청:** 레퍼런스 이미지 색상 무시, globals.css 색상만 사용
- **반영:** 보드 카드 상단 색상 띠 등도 정의된 색상만 사용

## 🔍 트러블슈팅 및 블로커 (Blockers)

### Next.js 16 Middleware → Proxy 변경

- **문제 현상:** 사용자가 middleware가 proxy로 변경되었는지 확인 요청
- **조사 결과:**
  - Next.js 16에서 `middleware.ts` → `proxy.ts`로 변경됨
  - 함수명도 `export function middleware` → `export function proxy`
  - 런타임: Edge → Node.js로 변경
  - 기존 middleware.ts는 deprecated (하위 호환성 유지)
- **마이그레이션 명령어:** `npx @next/codemod@canary middleware-to-proxy .`
- **참고:** 현재 세션에서는 UI만 구현, 인증은 추후 구현 예정

### 인증 보호 라우트 패턴 (추후 구현 시 참고)

```typescript
// proxy.ts (루트 디렉토리)
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

const protectedRoutes = ["/dashboard"];

export async function proxy(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.some((route) => path.startsWith(route));

  const session = (await cookies()).get("session")?.value;

  if (isProtectedRoute && !session) {
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
```

**권장 패턴:** `proxy.ts` (빠른 체크) + `layout.tsx` (서버사이드 검증) 이중 방어

## ⚠️ 기술적 부채 및 할 일 (Next Steps)

- **미해결 과제:**
  - [ ] 인증 기능 구현 시 proxy.ts 추가
  - [ ] 실제 API 연동 시 mock 데이터 제거
  - [ ] 두 시안 중 하나 선택 후 다른 하나 삭제
- **다음 세션 제언:**
  - 인증 구현 세션에서 proxy.ts 보호 로직 추가
  - 보드 CRUD 기능 구현 시 dashboard-boards 위젯 연동
