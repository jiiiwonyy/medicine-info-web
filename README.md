# 💊 MedisafeNurse (의약품 정보 검색 및 이상사례 분석 플랫폼)

> **"대용량 의약품 이상사례 데이터를 기반으로 안전한 의약품 사용을 지원하는 통합 정보 플랫폼"**  
> 🔗 **배포 링크**: https://www.medisafenurse.com  
> 💡 **개발 기간**: 2025.10 ~ 2026.03 (약 6개월)  
> 👨‍💻 **개발 인원**: 1인 (프론트엔드 + 백엔드 풀스택 개발, 간호학과 협업)

<br/>

## 📝 1. 프로젝트 기획 배경 (Motivation)

의약품 부작용 및 투약 오류 사례는 지속적으로 발생하고 있지만,  
일반 사용자나 의료 종사자가 **이상사례 통계 및 안전 정보를 직관적으로 확인할 수 있는 서비스는 부족**했습니다.

특히, FAERS와 같은 대규모 데이터는 존재하지만  
👉 **데이터 접근성과 가독성이 낮아 실질적인 활용이 어려운 문제**가 있었습니다.

이에 **약 1.8억 건 이상의 이상사례 데이터를 기반으로**  
의약품 정보와 통계를 누구나 쉽게 탐색할 수 있는 웹 서비스를 기획하였습니다.

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
| 처방·조제·투약 단계별 오류 예방 정보 제공 | 의약품 상세정보 + DUR + 실마리정보 통합 제공 |
<br/>

## 🎯 4. 트러블 슈팅 및 문제 해결 (Trouble Shooting)

### 💡 1) 대용량 데이터 조회 시 응답 지연 문제

- **문제 발생**  
  약 1.8억 건의 FAERS 데이터를 기반으로 통계 조회 시  
  👉 API 응답 지연 및 불필요한 데이터 요청 발생

- **해결 방법**
  - FastAPI 기반 통계 API 설계 및 필터링 로직 구현
  - PostgreSQL에서 `DISTINCT`, `JOIN` 최적화 쿼리 설계
  - React Query를 활용한 서버 상태 캐싱 및 중복 요청 제거

- **결과**
  - 불필요한 API 호출 감소
  - 사용자 체감 응답 속도 개선

---

### 💡 2) 데이터 시각화 및 렌더링 성능 문제

- **문제 발생**  
  통계 데이터를 차트로 렌더링 시  
  👉 렌더링 지연 및 UI 블로킹 발생

- **해결 방법**
  - 컴포넌트 단위 데이터 fetching 분리
  - 차트 데이터 구조 사전 가공
  - Recharts 기반 경량화된 차트 구성

- **결과**
  - 렌더링 성능 개선
  - 안정적인 UI 흐름 확보
 
---


### 💡 3) 반응형 UI/UX 및 데이터 가독성 개선

- **문제 발생**
  - 데이터 테이블 및 차트가 모바일 기기에서 짤리거나 가독성이 현저히 떨어지는 문제
- **해결 방법**
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
