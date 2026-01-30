# 내화채움공사 시공 소개 홈페이지

내화채움공사 전문 시공업체를 위한 전문적인 다중 페이지 웹사이트입니다.

## 주요 기능

### 📱 반응형 디자인
- 모바일, 태블릿, 데스크톱 모든 기기에서 최적화된 화면
- 햄버거 메뉴를 통한 모바일 네비게이션
- 드롭다운 메뉴 지원

### 🎨 페이지 구성

#### 메인 페이지 (index.html)
1. **히어로 섹션**: 강력한 첫인상을 주는 메인 배너
2. **회사소개**: 회사의 전문성과 강점 소개
3. **시공분야**: 6가지 주요 시공 분야 요약
4. **시공프로세스**: 6단계 체계적인 시공 과정
5. **시공사례**: 포트폴리오 갤러리
6. **문의하기**: 연락처 정보 및 문의 폼

#### 시공분야 상세 페이지 (6개)
각 시공분야별 독립 페이지로 상세 정보 제공:
- **floor-fireproofing.html**: 바닥 내화채움 상세 정보
- **wall-fireproofing.html**: 벽체 내화채움 상세 정보
- **ceiling-fireproofing.html**: 천장 내화채움 상세 정보
- **cable-tray-fireproofing.html**: 케이블 트레이 내화 상세 정보
- **special-fireproofing.html**: 특수 내화공사 상세 정보
- **maintenance-fireproofing.html**: 보수/보강공사 상세 정보

각 상세 페이지 포함 내용:
- 시공 개요 및 중요성
- 시공 대상
- 시공 공법 (3가지 이상)
- 사용 자재
- 품질 기준
- 사이드바 (시공분야 메뉴, 문의 위젯)

### ⚡ 인터랙티브 기능
- 드롭다운 메뉴 (시공분야)
- 부드러운 스크롤 애니메이션
- 숫자 카운팅 효과 (통계 섹션)
- 스크롤 시 요소 등장 애니메이션
- 폼 유효성 검사
- 전화번호 자동 포맷팅

### 🎯 디자인 특징
- 전문적이고 신뢰감 있는 컬러 스킴
- 그라디언트 및 모던한 UI 요소
- 직관적인 사용자 경험
- 아이콘 및 비주얼 요소 활용
- 2단 레이아웃 (메인 콘텐츠 + 사이드바)

## 파일 구조

```
webapp/
├── index.html                          # 메인 홈페이지
├── floor-fireproofing.html            # 바닥 내화채움 상세
├── wall-fireproofing.html             # 벽체 내화채움 상세
├── ceiling-fireproofing.html          # 천장 내화채움 상세
├── cable-tray-fireproofing.html       # 케이블 트레이 내화 상세
├── special-fireproofing.html          # 특수 내화공사 상세
├── maintenance-fireproofing.html      # 보수/보강공사 상세
├── styles.css                          # 전체 스타일시트
├── script.js                           # JavaScript 기능
└── README.md                           # 프로젝트 문서
```

## 실행 방법

### 방법 1: 직접 열기
`index.html` 파일을 브라우저에서 직접 열기

### 방법 2: 간단한 웹 서버 실행
```bash
# Python 3가 설치되어 있는 경우
python -m http.server 8000

# Node.js가 설치되어 있는 경우
npx http-server -p 8000
```

브라우저에서 `http://localhost:8000` 접속

## 네비게이션 구조

```
홈 (index.html)
├── 회사소개 (#about)
├── 시공분야 (드롭다운)
│   ├── 바닥 내화채움 (floor-fireproofing.html)
│   ├── 벽체 내화채움 (wall-fireproofing.html)
│   ├── 천장 내화채움 (ceiling-fireproofing.html)
│   ├── 케이블 트레이 내화 (cable-tray-fireproofing.html)
│   ├── 특수 내화공사 (special-fireproofing.html)
│   └── 보수/보강공사 (maintenance-fireproofing.html)
├── 시공프로세스 (#process)
├── 시공사례 (#portfolio)
└── 문의하기 (#contact)
```

## 커스터마이징 가이드

### 1. 색상 변경
`styles.css` 파일의 `:root` 섹션에서 CSS 변수 수정:
```css
:root {
    --primary-color: #007bff;    /* 메인 컬러 */
    --secondary-color: #6c757d;  /* 보조 컬러 */
    --accent-color: #ff6b35;     /* 강조 컬러 */
}
```

### 2. 회사 정보 변경
각 HTML 파일에서 다음 정보 수정:
- 회사명 (로고 영역)
- 주소, 전화번호, 이메일
- 회사 소개 텍스트
- 시공사례 내용

### 3. 시공분야 콘텐츠 수정
각 상세 페이지에서 수정:
- `floor-fireproofing.html`: 바닥 내화채움 관련 내용
- `wall-fireproofing.html`: 벽체 내화채움 관련 내용
- 기타 시공분야 페이지도 동일하게 수정

### 4. 이미지 추가
현재는 플레이스홀더 SVG를 사용 중입니다.
실제 이미지로 교체하려면:
```html
<!-- 변경 전 -->
<div class="image-placeholder">
    <svg>...</svg>
</div>

<!-- 변경 후 -->
<img src="이미지경로.jpg" alt="설명">
```

### 5. 폼 제출 처리
`script.js` 파일의 폼 제출 이벤트에 실제 API 연동:
```javascript
contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // 서버로 데이터 전송
    const response = await fetch('/api/contact', {
        method: 'POST',
        body: JSON.stringify(data)
    });
});
```

## 주요 컴포넌트

### 드롭다운 메뉴
- 데스크톱: 마우스 hover로 자동 표시
- 모바일: 클릭으로 토글

### 서브페이지 레이아웃
- 메인 콘텐츠 영역 (왼쪽)
- 사이드바 (오른쪽)
  - 시공분야 메뉴
  - 문의 위젯
  - 혜택 안내

### 콘텐츠 블록
- 정보 박스 (info-box)
- 특징 카드 (feature-card)
- 시공 공법 리스트 (method-list)
- 자재 그리드 (materials-grid)
- CTA 박스 (cta-box)

## 브라우저 호환성

- Chrome (최신 버전)
- Firefox (최신 버전)
- Safari (최신 버전)
- Edge (최신 버전)
- 모바일 브라우저 (iOS Safari, Chrome Mobile)

## 기술 스택

- **HTML5**: 시맨틱 마크업
- **CSS3**: Flexbox, Grid, 애니메이션
- **JavaScript (Vanilla)**: ES6+ 문법
- **Google Fonts**: Noto Sans KR

## 성능 최적화

- CSS 애니메이션 하드웨어 가속
- Intersection Observer를 통한 효율적인 스크롤 애니메이션
- 이미지 레이지 로딩 지원 (실제 이미지 사용 시)
- 최소화된 외부 의존성
- Sticky 사이드바로 사용성 향상

## SEO 최적화

- 시맨틱 HTML 구조
- Meta 태그 (description, keywords)
- Breadcrumb 네비게이션
- 명확한 페이지 제목
- 구조화된 URL

## 향후 개선 사항

- [ ] 백엔드 API 연동
- [ ] 실제 시공사진 추가
- [ ] 시공사례 상세 페이지
- [ ] 온라인 견적 계산기
- [ ] 고객 후기 섹션
- [ ] FAQ 페이지
- [ ] 다국어 지원
- [ ] Google Analytics 연동
- [ ] 챗봇 기능 추가
- [ ] 블로그/뉴스 섹션

## 라이선스

이 템플릿은 교육 및 상업적 목적으로 자유롭게 사용 가능합니다.

## 문의

프로젝트 관련 문의사항이 있으시면 이슈를 등록해주세요.
