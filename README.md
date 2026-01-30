# 내화채움공사 시공 소개 홈페이지

내화채움공사 전문 시공업체를 위한 전문적인 홈페이지 템플릿입니다.

## 주요 기능

### 📱 반응형 디자인
- 모바일, 태블릿, 데스크톱 모든 기기에서 최적화된 화면
- 햄버거 메뉴를 통한 모바일 네비게이션

### 🎨 섹션 구성
1. **히어로 섹션**: 강력한 첫인상을 주는 메인 배너
2. **회사소개**: 회사의 전문성과 강점 소개
3. **시공분야**: 6가지 주요 시공 분야 상세 설명
   - 바닥 내화채움
   - 벽체 내화채움
   - 천장 내화채움
   - 케이블 트레이 내화
   - 특수 내화공사
   - 보수/보강공사
4. **시공프로세스**: 6단계 체계적인 시공 과정
5. **시공사례**: 포트폴리오 갤러리
6. **문의하기**: 연락처 정보 및 문의 폼

### ⚡ 인터랙티브 기능
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

## 파일 구조

```
webapp/
├── index.html      # 메인 HTML 파일
├── styles.css      # 스타일시트
├── script.js       # JavaScript 기능
└── README.md       # 프로젝트 문서
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
`index.html` 파일에서 다음 정보 수정:
- 회사명 (로고 영역)
- 주소, 전화번호, 이메일
- 회사 소개 텍스트
- 시공사례 내용

### 3. 이미지 추가
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

### 4. 폼 제출 처리
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

## 향후 개선 사항

- [ ] 백엔드 API 연동
- [ ] 실제 시공사진 추가
- [ ] 다국어 지원
- [ ] SEO 최적화
- [ ] Google Analytics 연동
- [ ] 챗봇 기능 추가
- [ ] 온라인 견적 계산기

## 라이선스

이 템플릿은 교육 및 상업적 목적으로 자유롭게 사용 가능합니다.

## 문의

프로젝트 관련 문의사항이 있으시면 이슈를 등록해주세요.
