# 대전의 맛 - 찐맛집 아카이브

대전 지역의 추천 맛집을 모아둔 웹 애플리케이션입니다. 지역별, 카테고리별로 맛집을 검색하고 랜덤 추천 기능을 제공합니다.

## 🚀 기능

- **지역별 필터링**: 유성구, 서구, 중구, 동구 등으로 맛집 필터링
- **카테고리별 필터링**: 한식, 양식, 일식, 중식, 카페/베이커리 등으로 분류
- **검색 기능**: 맛집 이름 또는 메뉴로 검색
- **정렬 기능**: 별점 순 또는 이름 가나다 순 정렬
- **랜덤 추천**: 오늘 뭐 먹을지 고민될 때 랜덤 맛집 추천
- **상세 정보**: 각 맛집의 상세 정보 확인 및 주소 복사
- **지도 연동**: 네이버 지도로 바로 이동

## 📁 프로젝트 구조

```
daejeon-restaurant-list/
├─ index.html                 # 메인 HTML 파일
├─ assets/
│  ├─ css/
│  │  └─ style.css           # 스타일시트
│  ├─ data/
│  │  └─ restaurants.json    # 맛집 데이터 (JSON 형식)
│  └─ img/                   # 이미지 폴더
├─ src/
│  ├─ app.jsx                # 메인 App 컴포넌트
│  ├─ components/
│  │  ├─ RestaurantCard.jsx  # 맛집 카드 컴포넌트
│  │  ├─ DetailModal.jsx     # 상세 정보 모달 컴포넌트
│  │  └─ RandomModal.jsx     # 랜덤 추천 모달 컴포넌트
│  ├─ icons.jsx              # 아이콘 컴포넌트 모음
│  └─ utils/
│     ├─ mapLinks.js         # 지도 링크 생성 유틸리티
│     └─ clipboard.js        # 클립보드 복사 유틸리티
└─ docs/
   └─ README.md              # 프로젝트 문서
```

## 🛠️ 기술 스택

- **React 18**: 사용자 인터페이스 구축
- **Tailwind CSS**: 스타일링
- **Babel Standalone**: 브라우저에서 JSX 컴파일
- **Vanilla JavaScript**: 추가 유틸리티 함수

## 📖 사용 방법

### 1. 로컬에서 실행

1. 프로젝트 폴더 열기
2. `index.html` 파일을 브라우저에서 열기 [대전 맛집 리스트 실행](<https://jtech-co.github.io/Daejeon-Restaurant-List/index>)
   - 로컬 웹 서버를 사용하는 것을 권장합니다 (CORS 이슈 방지)

### 2. 로컬 웹 서버 실행

```bash
# Python 3
python -m http.server 8000

# Node.js (http-server 필요)
npx http-server -p 8000

# VS Code Live Server 확장 사용
```

브라우저에서 `http://localhost:8000` 접속

### 3. 맛집 데이터 추가/수정

`assets/data/restaurants.json` 파일을 열어서 맛집 정보를 추가하거나 수정할 수 있습니다.

**데이터 형식:**
```json
{
  "region": "유성구",
  "rating": 3,
  "name": "맛집 이름",
  "category": "한식 (칼국수)",
  "address": "대전 유성구 주소"
}
```

**필드 설명:**
- `region`: 지역 (유성구, 서구, 중구, 동구)
- `rating`: 별점 (1-4)
- `name`: 맛집 이름
- `category`: 카테고리 (예: "한식 (칼국수)", "일식 (라면)", "카페/베이커리")
- `address`: 주소

## 🎨 주요 컴포넌트

### App (src/app.jsx)
메인 애플리케이션 컴포넌트로 상태 관리 및 필터링, 정렬 로직을 담당합니다.

### RestaurantCard (src/components/RestaurantCard.jsx)
개별 맛집 정보를 카드 형태로 표시하는 컴포넌트입니다.

### DetailModal (src/components/DetailModal.jsx)
맛집 상세 정보를 모달로 표시하고, 주소 복사 및 지도 링크를 제공합니다.

### RandomModal (src/components/RandomModal.jsx)
랜덤으로 선택된 맛집을 추천하는 모달 컴포넌트입니다.

## 🔧 커스터마이징

### 스타일 수정
`assets/css/style.css` 파일에서 추가 스타일을 정의할 수 있습니다.

### Tailwind 설정 변경
`index.html` 파일 내의 `tailwind.config` 섹션에서 테마를 커스터마이징할 수 있습니다.

### 아이콘 추가
`src/icons.jsx` 파일에 새로운 아이콘 컴포넌트를 추가할 수 있습니다.

## 📝 주의사항

- 브라우저에서 직접 파일을 열 경우 CORS 정책으로 인해 fetch가 실패할 수 있습니다. 로컬 웹 서버를 사용하는 것을 권장합니다.
- 맛집 데이터는 추가 작성 시 JSON 형식을 따라야 합니다.
- 네이버 지도 링크는 주소와 이름을 기반으로 합니다.

## 🙋‍♂️ 문의

프로젝트에 대한 문의사항이나 개선 제안이 있으시면 이슈를 등록해주세요.
