# 구성원(People) 정보 관리

이 문서는 연구실 홈페이지의 교수님 및 학생(재학생, 졸업생) 정보를 수정하는 방법을 설명합니다.

## 1. 개요

모든 데이터는 `src/data/people/` 폴더 내의 JSON 파일로 관리됩니다.

- 교수님: `src/data/people/professor.json`
- 학생: `src/data/people/students.json`

## 2. 교수님 정보 수정

- 파일 경로: `src/data/people/professor.json`
- 주요 필드:
  - `career`: 경력 사항 (배열)
  - `awards`: 수상 내역 (배열)
  - `researchInterests`: 연구 분야 (배열)

## 3. 학생 정보 수정 (재학생/졸업생)

- 파일 경로: `src/data/people/students.json`
- 특징: 재학생과 졸업생을 하나의 파일에서 통합 관리합니다.

### 3.1 데이터 구조 예시

```json
{
  "id": 21,
  "nameKo": "홍길동",
  "nameEn": "Hong Gil-dong",
  "role": "Ph.D. Student",
  "email": "example@seoultech.ac.kr",
  "academicBackground": [
    { "degree": "B.S.", "school": "서울과학기술대학교", "year": 2020 },
    { "degree": "M.S.", "school": "서울과학기술대학교", "year": 2022, "thesis": "논문 제목" }
  ],
  "category": "Member",
  "course": "Ph.D.",
  "description": [
    {
      "title": "Research Interests",
      "contents": ["Deep Learning", "SLAM"]
    }
  ]
}
```

### 3.2 주요 필드 설명

1. category: 현재 신분 (필수)
   - `"Member"`: 현재 연구실 소속 재학생
   - `"Alumni"`: 졸업생

2. course: 과정 또는 졸업 구분 (필수)
   - 재학생: `"Ph.D."`, `"M.S."`, `"M.S./Ph.D."` (석박통합), `"Researcher"`
   - 졸업생: `"General Graduated"` (일반대학원 졸업), `"Professional Graduated"` (특수/전문대학원 졸업)

3. description: 상세 정보 (객체 배열)
   - 재학생: `title: "Research Interests"`, `contents`: 연구 분야 목록
   - 졸업생: `title: "Current Workplace"`, `contents`: 직장명 목록 (보통 1개)

## 4. 프로필 이미지 추가/변경

이미지는 데이터 파일에 경로를 적지 않고, 파일명 규칙을 통해 자동 연결됩니다.

- 저장 위치:
  - 교수님: `src/assets/people/professor/`
  - 학생: `src/assets/people/students/`
- 파일명 규칙: `[ID]_[한글이름].webp`
  - 예: ID가 `21`이고 이름이 `홍길동`인 경우 -> `21_홍길동.webp`
- 참고: `.webp` 형식을 권장합니다.
