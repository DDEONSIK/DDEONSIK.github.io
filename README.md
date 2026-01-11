<h1 align="center">AIS Lab Homepage</h1>

<p align="center">
  <img src="src/assets/logo/Logo1.png" alt="Header Logo" width="400">
</p>

AIS (Autonomous Intelligent Systems) Lab 공식 홈페이지 프로젝트.

## 1. 프로젝트 개요

연구 성과 및 구성원 정보의 효과적 전달을 위한 정적 웹사이트. 유지보수 편의성과 확장성을 최우선으로 설계.

- 데이터 중심: UI 수정 없이 JSON 파일 관리만으로 콘텐츠 업데이트.
- 구조적 분리: Container-View 패턴 적용, 비즈니스 로직과 뷰의 명확한 분리.
- 안정성 확보: TypeScript 도입으로 데이터 구조의 타입 안정성 보장.

## 2. 기술 스택

- Frontend: React 19 (Vite 기반)
- Language: TypeScript
- Styling: Tailwind CSS, Framer Motion (애니메이션)
- Icons: Lucide React
- CI/CD: GitHub Actions (자동 빌드/배포)

## 3. 폴더 구조

```text
src/
├── assets/         # 정적 자산 (이미지, 로고, 아이콘)
├── components/     # 재사용 가능한 공통 UI 컴포넌트
├── context/        # 전역 상태 관리 (테마 등)
├── data/           # 페이지 콘텐츠 데이터 (JSON 파일)
├── pages/          # 라우트별 페이지 (Container/View 분리)
├── types/          # TypeScript 데이터 인터페이스 정의
├── App.tsx         # 라우팅 및 레이아웃 설정
└── main.tsx        # 앱 진입점
```

## 4. 설치 및 실행

Prerequisites: Node.js v20+

```bash
# 1. 의존성 설치
npm install

# 2. 프로덕션 빌드 (docs/ 생성)
npm run build

# 3. preview 생성
npm run preview
```

## 5. 배포 (Deployment)

GitHub Actions를 통한 완전 자동화 배포 시스템.

- Trigger: `stable` 브랜치 Push 시 자동 실행.
- Process: 빌드(`npm run build`) 후 `gh-pages` 브랜치로 결과물 업로드.
- URL: [ais.seoultech.ac.kr](https://ais.seoultech.ac.kr)

## 6. 유지보수

구성원, 논문, 게시판 등 콘텐츠 데이터 관리 방법은 별도 매뉴얼 참조.

- [📖 홈페이지 관리 매뉴얼 바로가기](./manual/README.md)

<p align="center">
  <img src="src/assets/logo/AIS_logo.png" alt="Footer Logo" width="100">
</p>
