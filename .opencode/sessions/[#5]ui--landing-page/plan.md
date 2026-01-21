# 📝 Plan: Landing Page UI

- **세션:** `[#5]ui--landing-page`
- **작성일:** 2026-01-20
- **작성자:** AI Agent (Interface Crafter)

---

## 🎯 목표

1. Zieglers 랜딩 페이지 UI 구현
2. 프로젝트 문서에서 배럴(barrel) 구조 관련 내용 제거

---

## 📚 Phase 0: 문서 수정 (배럴 구조 제거)

### 수정 대상

- `AGENTS.md` - barrel 감지 규칙 삭제
- `SCAFFOLD_STRUCTURE.md` - `index.ts` 및 Public API 예시 삭제
- `docs/AGENTS.ko.md` - 한국어 버전 동일 수정
- `docs/SCAFFOLD_STRUCTURE.ko.md` - 한국어 버전 동일 수정

---

## 📐 Phase 1: 레이아웃 구조

```
src/app/(landing)/
├── layout.tsx          # 랜딩 전용 레이아웃 (Sidebar 없음)
└── page.tsx            # 랜딩 페이지 메인

src/widgets/landing/
├── Header.tsx          # 로고 + 네비게이션 + 다크모드 토글
├── HeroSection.tsx     # Hero 섹션 (3가지 후보 중 선택)
├── MethodSection.tsx   # 만다라트 방법론 3단계 설명
├── TemplateSection.tsx # 템플릿 예시 카드
├── CtaSection.tsx      # 최종 CTA
└── Footer.tsx          # 푸터

src/shared/ui/
└── ThemeToggle.tsx     # 다크모드 토글 버튼 (신규)
```

---

## 🎨 Phase 2: Hero 디자인 후보 (3가지)

### 후보 A: **Grid Reveal** (대담한 브랜드 중심) ⭐ 기본 선택

- **배경:** 버건디(`primary`) 풀 블리드
- **중앙:** 3×3 만다라트 그리드가 순차적으로 페이드인
- **그리드 중앙 셀:** "Your Goals, 81 Steps" 메인 카피
- **주변 8개 셀:** 아이콘 + 키워드 (Career, Health, Learning...)
- **하단:** CTA 버튼 2개 (Get Started / Learn More)
- **특징:** 서비스 정체성을 강렬하게 전달, 각진 스타일과 잘 어울림

### 후보 B: **Split Layout** (참조 이미지 스타일)

- **좌측 50%:** 헤드라인 + 설명 + CTA 버튼
- **우측 50%:** 3×3 인터랙티브 그리드 미리보기 (호버 효과)
- **배경:** 베이지(`background`)
- **특징:** 클래식하고 안정적, 정보 전달력 높음

### 후보 C: **Typography Focus** (미니멀)

- **중앙:** 초대형 타이포그래피 "Turn One Goal Into 81 Actions"
- **배경:** 은은한 그리드 패턴 (투명도 5%)
- **하단:** 단일 CTA + 스크롤 다운 화살표
- **특징:** 임팩트 있는 첫인상, 스크롤 유도

---

## 🔧 Phase 3: 구현 상세

### 3.1 레이아웃 분리

- `(landing)` 라우트 그룹 생성
- Sidebar 제외, ThemeProvider 유지
- 메타데이터: `title: "Zieglers - Turn Your Goals Into Action"`

### 3.2 Header

- 좌측: 로고 (`public/logo.png`) + 서비스명 "Zieglers"
- 중앙: (MVP에서는 비워둠)
- 우측: 다크모드 토글 + Login + Get Started 버튼

### 3.3 Hero Section

- 선택된 디자인 후보로 구현 (기본: A)
- 반응형: 모바일에서는 세로 스택

### 3.4 Method Section

- "The Mandalart Method" 타이틀
- 3열 카드: ① 목표 설정 → ② 8개 하위 목표 → ③ 실행 가능한 81 액션

### 3.5 Template Section

- "Ready-to-Use Templates" 타이틀
- 4열 카드 그리드 (모바일 2열)
- 카드: 아이콘 + 제목 + 간단 설명

### 3.6 CTA Section

- 버건디 배경 풀 블리드
- "Start Your Journey Today" + CTA 버튼

### 3.7 Footer

- 로고 + 카피라이트
- 링크: Privacy, Terms (placeholder)

---

## ✅ 체크리스트

### Phase 0: 문서 수정

- [ ] `AGENTS.md` 배럴 내용 삭제
- [ ] `SCAFFOLD_STRUCTURE.md` 배럴 내용 삭제
- [ ] `docs/AGENTS.ko.md` 배럴 내용 삭제
- [ ] `docs/SCAFFOLD_STRUCTURE.ko.md` 배럴 내용 삭제

### Phase 1: 구조

- [ ] 라우트 그룹 `(landing)` 및 레이아웃 생성
- [ ] `ThemeToggle.tsx` 컴포넌트 생성

### Phase 2: 컴포넌트

- [ ] `Header.tsx` 구현
- [ ] `HeroSection.tsx` 구현 (후보 A)
- [ ] `MethodSection.tsx` 구현
- [ ] `TemplateSection.tsx` 구현
- [ ] `CtaSection.tsx` 구현
- [ ] `Footer.tsx` 구현

### Phase 3: 조립 및 검증

- [ ] `page.tsx` 조립
- [ ] 반응형 확인
- [ ] 다크모드 확인
- [ ] `pnpm build` 통과

---

## 📏 FSD 준수 확인

| 규칙                           | 상태          |
| ------------------------------ | ------------- |
| 의존성 방향 (widgets → shared) | ✅            |
| 파일당 1컴포넌트               | ✅            |
| ~~barrel export (`index.ts`)~~ | ❌ 사용 안 함 |
| shadcn 컴포넌트 미수정         | ✅            |
| globals.css 색상만 사용        | ✅            |

---

## 📝 커밋 계획

1. `📝 docs: remove barrel structure references from project docs`
2. `🏗️ chore: add landing page route group and layout`
3. `✨ feat: add ThemeToggle component`
4. `✨ feat: implement landing page Header`
5. `✨ feat: implement landing page HeroSection`
6. `✨ feat: implement landing page sections (Method, Template, CTA, Footer)`
7. `💄 style: finalize landing page responsive design`
