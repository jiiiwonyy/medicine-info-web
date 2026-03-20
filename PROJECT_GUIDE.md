# 프로젝트 컨텍스트 — medicineInfoWeb (1인 풀스택 프로젝트)

> 이 파일은 Claude 웹에서 포트폴리오 작업을 진행하기 위한 프로젝트 지침 및 컨텍스트 문서입니다.

---

## 1. 프로젝트 개요

**의약품 안전정보 통합 웹 서비스** — 1인 풀스택 개발

의약품 정보 검색부터 국내·FDA·WHO 부작용 보고 데이터 시각화, DUR(의약품 안전사용 서비스) 안내, 부작용 피해구제 안내까지 의약품 안전 관련 정보를 한 곳에서 제공하는 웹 서비스입니다.

- 비의료인(일반인)도 쉽게 의약품 안전정보에 접근할 수 있도록 설계
- 공공 데이터(식약처, FDA FAERS, WHO VigiAccess) 기반 시각화
- 프론트엔드부터 백엔드, DB 설계, 인프라(AWS S3) 연동까지 혼자 구현

---

## 2. 기술 스택

### 프론트엔드

| 분류 | 기술 |
|------|------|
| 프레임워크 | React 19 |
| 언어 | TypeScript 5.8 |
| 빌드 도구 | Vite 7 |
| 스타일링 | Tailwind CSS v4 |
| 서버 상태 관리 | TanStack Query v5 |
| 라우팅 | React Router v7 |
| HTTP 클라이언트 | Axios |
| 데이터 시각화 | Recharts |
| 유틸리티 | clsx, tailwind-merge, react-icons |
| 테스트 | Vitest + Testing Library |

### 백엔드

| 분류 | 기술 |
|------|------|
| 프레임워크 | FastAPI |
| 언어 | Python |
| 서버 | Uvicorn + Gunicorn |
| DB 드라이버 | psycopg2 (PostgreSQL) |
| 스키마 검증 | Pydantic v2 |
| 파일 스토리지 | AWS S3 (boto3) |
| HTML/XML 파싱 | BeautifulSoup4 + lxml |
| 설정 관리 | pydantic-settings + python-dotenv |
| 테스트 | pytest + httpx |

### 인프라 / 기타

| 분류 | 기술 |
|------|------|
| 데이터베이스 | PostgreSQL |
| 파일 스토리지 | AWS S3 (안전성 서한, 실마리정보 PDF) |
| 배포 | Vercel (프론트엔드), 별도 서버 (백엔드) |

---

## 3. 프로젝트 구조

```
medicineInfoWeb/
├── frontend/
│   └── src/
│       ├── App.tsx                  # 앱 진입점
│       ├── main.tsx                 # React 루트 마운트
│       ├── shared/
│       │   ├── Router.tsx           # 전체 라우트 정의
│       │   └── cn.ts                # clsx + tailwind-merge 유틸
│       ├── api/
│       │   ├── axiosInstance.ts     # Axios 기본 설정
│       │   └── searchMedicine.ts    # 의약품 검색 API
│       ├── components/              # 공용 컴포넌트
│       │   ├── ui/                  # 디자인 시스템 (Button, Input, Table, Tabs, Card, Callout, Footer, SectionTitle)
│       │   ├── header/              # HeaderTop, HeaderNav
│       │   ├── Layout.tsx           # 페이지 공통 레이아웃
│       │   ├── PageLayout.tsx       # 내부 페이지 래퍼
│       │   ├── SearchBar.tsx        # 글로벌 검색바
│       │   ├── Spinner.tsx
│       │   └── TopButton.tsx
│       ├── hooks/
│       │   ├── useDebounce.ts
│       │   └── useScrollSpy.ts
│       ├── styles/
│       │   └── typography.ts        # textStyles 객체 (공통 타이포그래피)
│       ├── types/                   # 공용 타입 정의
│       └── features/                # Feature-based 모듈 구조
│           ├── home/
│           ├── medicine-search/
│           ├── medicine-detail/
│           ├── dur-page/
│           ├── medication-safety/
│           ├── safe-medication-process/
│           ├── error-reduction-strategy/
│           ├── safety-letters/
│           ├── signal-info/
│           ├── adverse-event-domestic/
│           ├── fda-page/
│           ├── who-adverse/
│           ├── relief/
│           ├── adverse-relief-page/
│           ├── local-center/
│           ├── medication-guide/
│           ├── kops/
│           ├── nims/
│           └── law-info/
└── backend/
    └── app/
        ├── main.py                  # FastAPI 앱 초기화, CORS, 라우터 등록
        ├── database.py              # PostgreSQL 연결 설정 (psycopg2 + pydantic-settings)
        ├── schemas.py               # Pydantic 모델 (Medicine, DURInfo)
        ├── crud.py                  # DB 쿼리 함수 (검색, 상세, XML 파싱, DUR 매칭)
        └── routers/
            ├── faers.py             # FDA FAERS API (/api/faers/*)
            ├── safety_letters.py    # 안전성 서한 API + S3 presigned URL
            ├── signal_info.py       # 실마리정보 API + S3 presigned URL (PDF)
            └── admin_router.py      # 관리자 API (Firebase 인증)
```

각 feature 디렉토리 내부 구조:
```
features/[feature-name]/
├── index.tsx          # 페이지 컴포넌트
├── components/        # feature 전용 컴포넌트
├── hooks/             # feature 전용 훅
├── api/               # feature 전용 API 함수
├── data/              # 정적 데이터 / 상수
├── section/           # 페이지 섹션 단위 컴포넌트
└── types.ts           # feature 전용 타입
```

---

## 4. 백엔드 API 엔드포인트

### 의약품 정보
| 메서드 | 경로 | 설명 |
|--------|------|------|
| GET | `/api/medicines` | 의약품 검색 (커서 기반 페이지네이션, ILIKE 검색) |
| GET | `/api/medicines/{id}` | 의약품 상세 + DUR 정보 포함 |

### FDA FAERS
| 메서드 | 경로 | 설명 |
|--------|------|------|
| GET | `/api/faers/suggest?q=` | 약물명 자동완성 (prefix 매칭) |
| GET | `/api/faers/summary?drug=` | 연간 보고 건수, 상위 부작용(PT) |
| GET | `/api/faers/timeseries?drug=` | 상위 PT 시계열 데이터 |

**FAERS 공통 파라미터:**
- `role_filter`: `all` / `suspect`(PS,SS) / `ps` / `ss` / `c` / `i`
- `year_from`, `year_to`: 연도 범위 필터

### 안전성 서한 / 실마리정보
| 메서드 | 경로 | 설명 |
|--------|------|------|
| GET | `/api/safety-letters` | 안전성 서한 목록 (검색, offset 페이지네이션) |
| GET | `/api/safety-letters/{id}/files/{idx}/download` | S3 presigned URL 발급 (첨부파일 다운로드) |
| GET | `/api/signal-infos` | 실마리정보 목록 |
| GET | `/api/signal-infos/{id}/view` | S3 presigned URL 발급 (PDF 인라인 보기) |
| GET | `/api/signal-infos/{id}/download` | S3 presigned URL 발급 (PDF 다운로드) |

---

## 5. DB 테이블 구조

| 테이블 | 설명 |
|--------|------|
| `medicine` | 의약품 기본 정보 (제품명, 성분명, 분류 등) |
| `medicine_detail` | 의약품 상세 XML raw + BeautifulSoup 파싱 JSON (efficacy / dosage / warning) |
| `dur_interaction` | DUR 병용금기 데이터 |
| `dur_age` | DUR 연령금기 데이터 |
| `dur_pregnancy` | DUR 임부금기 데이터 |
| `safety_letter` | 안전성 서한 (title, summary, files JSON) |
| `signal_info` | 실마리정보 (title, pdf_key, raw_filename) |
| `public.faers_drug_dict` | FAERS 약물명 사전 (display ↔ norm 매핑) |
| `FAERS.SD_FAERS_DRUG` | FAERS 약물 데이터 |
| `FAERS.SD_FAERS_DEMO` | FAERS 인구통계 데이터 |
| `FAERS.SD_FAERS_REAC` | FAERS 부작용 반응 데이터 |

---

## 6. 주요 페이지 및 기능

| 경로 | 기능 |
|------|------|
| `/` | 홈 — 주요 기능 퀵링크, 의약품 주의사항 설명 |
| `/search` | 의약품 검색 — 무한스크롤, ILIKE 통합검색 |
| `/medicines/:id` | 의약품 상세 — XML 파싱 데이터 + DUR 정보 |
| `/dur` | DUR 안내 — 병용금기, 임부금기 등 |
| `/medication-safety-info` | 투약 안전 정보 (HAM, WHO 고위험 약물) |
| `/safe-medication-process` | 안전한 투약 프로세스 |
| `/error-reduction-strategy` | 투약 오류 감소 전략 |
| `/safety-letter` | 안전성 서한 (S3 파일 다운로드) |
| `/signal` | 실마리정보 (PDF 뷰어/다운로드) |
| `/domestic` | 국내 부작용 보고 통계 |
| `/fda` | FDA FAERS 검색 + 시계열/Top PT 차트 시각화 |
| `/who` | WHO 부작용 보고 데이터 |
| `/relief` | 부작용 보고 안내 |
| `/drug-adverse-relief` | 의약품 부작용 피해구제 안내 |
| `/local-center` | 지역 피해구제 센터 SVG 지도 |
| `/medication-guide` | 투약 가이드 |
| `/kops` `/nims` `/lawinfo` | 관련 기관/사이트 안내 |

---

## 7. 코드 컨벤션

### 프론트엔드
```ts
// 스타일링: cn() + textStyles 패턴
import { cn } from '@/shared/cn';
import { textStyles } from '@/styles/typography';
<h1 className={cn(textStyles.titleXl, 'text-center mb-5')}>제목</h1>

// 경로 alias: @/ → src/
import { useFaersSummaryQuery } from '@/features/fda-page/hooks/useFaers';

// 서버 상태: TanStack Query 커스텀 훅 패턴
const summaryQuery = useFaersSummaryQuery({ drug, enabled, role_filter });
```

### 백엔드
```python
# DB 연결: 매 요청마다 연결 생성 후 finally에서 close
conn = get_connection()
cur = conn.cursor(cursor_factory=RealDictCursor)
try:
    ...
finally:
    cur.close()
    conn.close()

# 라우터: APIRouter prefix 방식
router = APIRouter(prefix="/api/faers", tags=["FAERS"])
```

### 파일 네이밍
- 프론트엔드 컴포넌트: PascalCase (`.tsx`)
- 프론트엔드 훅: camelCase, `use` 접두사 (`.ts`)
- 백엔드 라우터: snake_case (`.py`)

---

## 8. 핵심 구현 포인트 (포트폴리오 강조점)

1. **1인 풀스택 개발** — 프론트엔드(React/TS)부터 백엔드(FastAPI/Python), DB 설계, AWS S3 연동까지 단독 구현
2. **Feature-based 아키텍처** — 도메인별 코드 격리로 확장성 확보
3. **FDA FAERS 데이터 파이프라인** — 대용량 FAERS 데이터를 PostgreSQL에 적재 후 약물명 정규화(norm) + role 필터링 + 연도 필터 쿼리 구현
4. **의약품 XML 파싱** — 식약처 XML 원문을 BeautifulSoup으로 파싱하여 구조화된 JSON으로 변환 (표/텍스트 혼합 처리)
5. **DUR 토큰 매칭** — 성분명 토큰화 기반으로 병용금기/연령금기/임부금기 데이터 실시간 매칭
6. **S3 Presigned URL** — PDF 파일을 S3에 보관하고 서명된 임시 URL로 안전하게 제공
7. **커서 기반 페이지네이션** — 의약품 목록 무한스크롤에 offset 대신 cursor(last_id) 방식 사용
8. **Recharts 시각화** — FAERS 시계열 차트, 연간 보고 건수 막대 차트, Top PT 목록

---

## 9. 작업 이력

### 2026-03-20 — FAERS 쿼리 성능 개선 및 Synonym 정규화

**작업 내용:**

1. **faers_drug_dict PK 변경** — `drugname_norm` → `drugname_display` (synonym 구조에 맞게)
2. **Synonym 데이터 삽입** — 30개 약물 그룹, 95건 (aspirin, rituximab, tylenol 등 대소문자/오표기 변형 매핑)
3. **인덱스 3개 추가** (`CREATE INDEX CONCURRENTLY`)
   - `FAERS.SD_FAERS_DRUG ("ISR")` — 126초
   - `FAERS.SD_FAERS_DRUG ("ROLE_COD")` — 47초
   - `FAERS.SD_FAERS_DEMO ("ISR")` — 46초
4. **faers.py 쿼리 방식 변경** — `resolve_drug_norm` → `resolve_synonyms`
   - 기존: `= ANY(ARRAY(SELECT ... subquery))` → 플래너가 값을 모름 → 풀스캔
   - 변경: Python에서 synonym 목록 먼저 조회 후 리터럴 배열로 바인딩 → 인덱스 스캔
5. **faers_drug_dict 전체 재구축** — SD_FAERS_DRUG distinct 약물명 전체 삽입 (95건 → 869,251건, 103.9초 소요)

**성능 개선 수치:**

| 약물 | 개선 전 | 개선 후 | 배율 |
|------|---------|---------|------|
| aspirin | 13,193ms | 3,357ms | 3.9x |
| rituximab | 12,504ms | 1,017ms | 12.3x |
| xeljanz | 12,493ms | 711ms | 17.6x |

**커버리지 개선 (aspirin 기준):**
- exact match 단독: 377,813건
- synonym 통합: 600,294건 (+222,481건, +58.9%)

**남은 작업:**
- [ ] 2-A: Presigned URL 만료 처리 개선 (S3 다운로드 에러 핸들링 + 자동 재시도)
- [ ] 3-A: Skeleton UI (Spinner → shimmer 효과)
- [ ] 3-B: XML 파싱 pytest 단위 테스트

---

## 10. Claude 웹 작업 시 참고사항

- **Tailwind CSS v4** — v3 문법(`theme()`, `@apply` 등)과 일부 차이 있음
- **TanStack Query v5** — `useQuery`, `useInfiniteQuery` API가 v4와 다름 (옵션 객체 방식)
- **React Router v7** — `useNavigate`, `useSearchParams` 등은 동일하나 일부 API 변경
- **psycopg2 커넥션** — 커넥션 풀 없이 요청마다 연결/해제하는 방식 (현재 구조)
- 새 기능 추가 시 프론트엔드는 **`src/features/[기능명]/`**, 백엔드는 **`app/routers/[기능명].py`** 패턴으로 추가
