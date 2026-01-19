# 📝 Session Note: [#5]ui--landing-page

- **Date:** 2026-01-20
- **Branch:** (to be created)
- **Agent Role:** Interface Crafter

## 🎯 세션 목표

- Zieglers 랜딩 페이지 UI 구현
- 프로젝트 문서에서 배럴(barrel) 구조 관련 내용 제거

## 🛠 주요 기술적 결정 (Decision Log)

### 1. 배럴(barrel) 구조 미사용

- **결정 사항:** `index.ts` 배럴 파일 사용하지 않음
- **이유 및 근거:** 사용자 요청. 직접 import 방식이 더 명확함

### 2. 랜딩 페이지 전용 레이아웃

- **결정 사항:** `src/app/(landing)/layout.tsx` 라우트 그룹 생성
- **이유 및 근거:** Sidebar가 필요한 인증 후 페이지와 분리

### 3. Hero 디자인 선택

- **결정 사항:** 후보 A (Grid Reveal) 우선 구현
- **이유 및 근거:** 3×3 만다라트 그리드 모티프가 서비스 정체성을 잘 전달, 각진 컴포넌트 스타일과 조화

### 4. 컴포넌트 스타일

- **결정 사항:** shadcn/ui 컴포넌트는 `rounded-none` (각진 모서리) 스타일
- **이유 및 근거:** 기존 설정 유지, 참조 이미지와 다르지만 더 모던하고 강렬한 인상

## 🚀 프롬프트 및 피드백 히스토리

- 사용자: 배럴 구조 미사용 결정
- 사용자: Hero 디자인 3가지 후보 중 선택 가능하도록 plan.md에 포함
- 사용자: 다크모드 토글 버튼 Header에 추가

## 🔍 트러블슈팅 및 블로커 (Blockers)

(작업 진행 중 기록 예정)

## ⚠️ 기술적 부채 및 할 일 (Next Steps)

- Header 네비게이션 메뉴 (Features, Templates, Pricing) - MVP 이후
- Footer 링크 (Privacy, Terms) - 실제 페이지 연결 필요
- Hero 애니메이션 - 추후 개선 가능
