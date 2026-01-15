# 논문(Publications) 정보 관리

이 문서는 연구실의 논문 실적(Journal, Conference)을 업데이트하고 관리하는 방법을 설명합니다.

## 1. 개요

논문 데이터는 직접 `src/data/publications.json`을 수정하는 것이 아니라, 서지 관리 프로그램(Zotero)에서 내보낸 **단일 통합 파일(`My Library.json`)**을 스크립트로 가공하여 생성합니다.

- 원본 데이터 위치: `src/data/My Library.json`
- 변환 스크립트: `scripts/make_publication.py`
- 최종 데이터: `src/data/publications.json` (자동 생성됨)

## 2. 원본 데이터 업데이트

Zotero 등의 서지 관리 도구에서 **전체 라이브러리**를 CSL JSON 형식으로 내보내어 아래 경로에 덮어씌웁니다.

- 파일명: `My Library.json`
- 위치: `src/data/My Library.json`

> **주의**: 파일명은 정확히 `My Library.json`이어야 합니다. 스크립트가 이 파일을 자동으로 읽어 `Journal`과 `Conference`로 분류합니다.

## 3. 데이터 변환 스크립트 실행

원본 JSON 파일을 업데이트한 후, 파이썬 스크립트를 실행하여 웹사이트용 데이터로 변환합니다.

### 3.1 실행 명령어

프로젝트 루트 경로에서 아래 명령어를 실행합니다.

```bash
python scripts/make_publication.py
```

### 3.2 스크립트 주요 기능

- **자동 분류**: JSON의 `type` 필드를 분석하여 분류합니다.
  - `article-journal`, `article` → **Journal**
  - `paper-conference`, `conference` → **Conference**
- **한글 감지**: 제목이나 학회명에 한글이 포함된 경우 `Domestic`으로, 그렇지 않으면 `International`로 분류합니다.
- **정렬**: 연도(Year) 기준 내림차순으로 정렬합니다.
- **데이터 가공**: 웹사이트 표시에 필요한 저자 이름, Venue, DOI 등을 최적화하여 저장합니다.

## 4. 결과 확인

스크립트 실행 후 `src/data/publications.json` 파일이 갱신되었는지 확인합니다.
이 파일이 변경되면 웹사이트의 Publications 및 관련 섹션에 즉시 반영됩니다.
