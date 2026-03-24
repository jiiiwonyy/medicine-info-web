# 💊 MedisafeNurse (의약품 정보 검색 및 이상사례 분석 플랫폼)

> **"대용량 의약품 이상사례 데이터를 기반으로 안전한 의약품 사용을 지원하는 통합 정보 플랫폼"**  
> 🔗 **배포 링크**: https://www.medisafenurse.com  
> 💡 **개발 기간**: 2025.10 ~ 2026.03 (약 6개월)  
> 👨‍💻 **개발 인원**: 1인 (프론트엔드 + 백엔드 풀스택 개발, 간호학과 협업)

<br/>

## 📝 1. 프로젝트 기획 배경 (Motivation)

전남대학교 간호학과와 협업하여 안전한 투약을 위한 의약품 정보를 제공하고,  
식품의약품안전처 및 공공기관 데이터를 기반으로 신뢰할 수 있는 정보를  
쉽고 직관적으로 전달하는 웹 서비스를 기획하였습니다.

특히 간호사를 주요 사용자로 설정하여, 실제 임상에서 필요로 하는  
의약품 정보와 이상사례 데이터를 효과적으로 제공하는 것을 목표로 하였습니다.

그러나 간호학과에서 보유한 FAERS와 같은 대규모 데이터는  
데이터 접근성과 가독성이 낮아 실질적인 활용이 어려운 문제가 있었습니다.

이에 **약 1.8억 건 이상의 이상사례 데이터**를 기반으로  
의약품 정보와 통계를 간호사가 쉽고 빠르게 탐색할 수 있는  
웹 서비스를 설계 및 구현하였습니다.

<br/>

## 🛠 2. 사용 기술 및 선정 배경 (Tech Stack)

### Frontend

- **React 19 & TypeScript**  
  → 안정적인 타입 기반 컴포넌트 설계 및 유지보수성 향상

- **Vite**  
  → 빠른 개발 환경 구축 및 빌드 속도 최적화

- **Tailwind CSS**  
  → 일관된 디자인 시스템 및 반응형 UI 구현

- **TanStack React Query**  
  → 서버 상태 캐싱 및 비동기 데이터 처리 최적화

- **Recharts**  
  → 대용량 통계 데이터를 직관적인 차트로 시각화

---

### Backend

- **FastAPI**  
  → 비동기 기반 고성능 API 서버 구현

- **PostgreSQL**  
  → 1.8억 건 이상의 이상사례 데이터 저장 및 쿼리 처리

- **AWS S3**  
  → 정적 리소스 관리

---

### Infra

- **AWS EC2**, **Vercel**

<br/>

## ✨ 3. 핵심 기능 (Key Features)

| 국내 이상사례 통계 시각화 | 지역별 센터 현황 지도 |
| :----------------------: | :------------------: |
| <img src="https://github.com/user-attachments/assets/92dee265-b388-4478-88fa-c97c0b3c103d" width="400"/> | <img src="https://github.com/user-attachments/assets/5a5e3d2a-3a57-449f-8ade-54b2c789c75e" width="400"/> |
| Recharts 기반 연도별/지역별 통계 차트 구현<br/>필터링에 따른 동적 차트 렌더링 | 전국 의약품 지역센터 맵 연동<br/>모바일 퍼스트 반응형 UI 적용 |

| 의약품 안전 및 투약 가이드 | 의약품 상세 검색 결과 |
| :----------------------: | :------------------: |
| <img src="https://github.com/user-attachments/assets/c757075b-47ec-4bd9-b357-159200a341cd" width="400"/> | <img src="https://github.com/user-attachments/assets/7adf5580-5b1d-46f0-83a0-86632b276da7" width="400"/> |
| 처방,투여,관찰 단계별 오류 예방 정보 제공 | 의약품 상세정보 + DUR + 실마리정보 통합 제공 |
<br/>

## 🎯 4. 트러블 슈팅 및 문제 해결 (Trouble Shooting)
### 💡 1) 대용량 FAERS 데이터 약물명 정규화 및 쿼리 최적화

**문제 발생**

약 1.9억 건의 FAERS 데이터에서 약물 부작용을 조회할 때 두 가지 문제가 동시에 발생했다.

- 데이터 정확도: `aspirin` / `ASPIRIN` / `aspirin.` 등 표기가 달라 같은 약이 별개로 집계 → 실제 600,294건 중 377,813건만 조회되는 **222,481건(58.9%) 누락**
- 응답 속도: `ANY(ARRAY(서브쿼리))` 구조로 인해 플래너가 실행 계획 시점에 값을 알 수 없어 36GB 테이블 **Parallel Seq Scan 발생 → 항상 12~13초 소요**

**해결 방법**

- `faers_drug_dict` synonym 테이블 설계 및 PK를 `drugname_display` 기준으로 재설계해 1:N 매핑 구조 확보
- 서브쿼리 → **파라미터 바인딩**으로 전환해 플래너가 계획 시점에 배열 값을 인식하도록 변경, Index Scan 유도
- `standardized_drug` 테이블(91M행) 발견 및 브랜드명 → INN 성분명 매핑 적용으로 조회 방식을 substance 단일 값 기반으로 전환
- `EXPLAIN ANALYZE`로 실행 계획 확인 후 `CREATE INDEX CONCURRENTLY`로 운영 중단 없이 인덱스 4개 추가 (커버링 인덱스 포함)
- `matched_isr` CTE 중복 계산(3회 → 1회) 제거 및 `MATERIALIZED` 키워드로 강제 단일 실행

**결과**

| 항목 | 개선 전 | 개선 후 |
|---|---|---|
| 데이터 커버리지 (aspirin 기준) | 377,813건 | 1,053,195건 (+179%) |
| 단건 쿼리 응답속도 (rituximab 기준) | 12,504ms | 1,017ms (12.3x) |
| summary 쿼리 응답속도 (aspirin 기준) | ~50,000ms | ~26,000ms |
| 자동완성 응답속도 | 최대 207초 | 즉시 응답 |

---

### 💡 2) 데이터 시각화 및 렌더링 성능 문제

**문제 발생**

통계 데이터를 차트로 렌더링 시 👉 렌더링 지연 및 UI 블로킹 발생

**해결 방법**

- 컴포넌트 단위 데이터 fetching 분리
- 차트 데이터 구조 사전 가공
- Recharts 기반 경량화된 차트 구성

**결과**

- 렌더링 성능 개선
- 안정적인 UI 흐름 확보

---

### 💡 3) 반응형 UI/UX 및 데이터 가독성 개선

**문제 발생**

데이터 테이블 및 차트가 모바일 기기에서 짤리거나 가독성이 현저히 떨어지는 문제

**해결 방법**

- Tailwind CSS를 활용해 모바일-퍼스트(Mobile-First) 디자인 설계
- 지도와 연동된 지역 센터 표기 인터페이스를 모바일에서는 상하단 배치, 데스크탑에서는 좌우 배치로 분리
- 긴 설명 글은 `BulletList`와 아코디언 컴포넌트를 직접 구현하여 스크롤 피로도 단축

<br/>

## ⚙️ 5. 프로젝트 로컬 실행 방법 (How to Run)

```bash
# 1. 저장소 클론
git clone https://github.com/jiiiwonyy/medicine-info-web.git
cd medicine-info-web

# 2. 프론트엔드 실행
cd frontend
npm install
npm run dev

# 3. 백엔드 실행
cd ../backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```
<br/>

## 📂 6. 프로젝트 구조 (Folder Structure)
```bash
medicineInfoWeb/
├── frontend/src/
│   ├── components/       # 재사용 가능한 UI 컴포넌트 (버튼, 헤더, 테이블 등)
│   ├── features/         # 도메인 별 기능 캡슐화 (이상사례, 안전가이드 등)
│   ├── hooks/            # 커스텀 훅 세팅 (API 페칭, 로직 분리)
│   ├── pages/            # 라우팅 되는 페이지 단위 컴포넌트
│   └── routes/           # React Router DOM 라우트 설정
└── backend/
```
<br/>

## 💡 7. 배운 점 (What I Learned)
- 대용량 데이터 환경에서의 쿼리 최적화 및 API 설계 경험
- React Query 기반 서버 상태 관리 구조 설계
- 프론트엔드와 백엔드를 아우르는 풀스택 개발 경험
