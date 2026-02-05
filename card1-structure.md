# 🎴 카드1 상세 구성

## 📐 시각적 레이아웃

```
┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃                                        ┃
┃  ┌─────────┐              🏷️ [일상]  ┃ ← 카테고리 배지 (오른쪽 상단)
┃  │ ✏️ 수정 │                          ┃ ← 수정/삭제 버튼 (호버시만 표시)
┃  │ 🗑️ 삭제 │                          ┃
┃  └─────────┘                          ┃
┃                                        ┃
┃          ┌──────────────┐             ┃
┃          │              │             ┃
┃          │   이미지     │             ┃ ← 이미지 영역 (280px 고정)
┃          │   영역       │             ┃    - 중앙 크롭
┃          │  (280px)     │             ┃    - object-fit: cover
┃          │              │             ┃
┃          └──────────────┘             ┃
┃                                        ┃
┃  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  ┃
┃                                        ┃
┃  제목: 산책하는 김치                    ┃ ← 사진 제목
┃  📅 2024년 2월 1일                    ┃ ← 촬영 날짜
┃                                        ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
```

---

## 🏗️ HTML 구조

### 1️⃣ 전체 컨테이너
```html
<div class="gallery-item" data-category="daily">
    <!-- 모든 내용이 여기에 -->
</div>
```
**설명:**
- `class="gallery-item"`: 카드 스타일 적용
- `data-category="daily"`: 필터링에 사용 (일상 카테고리)

---

### 2️⃣ 이미지/플레이스홀더 영역
```html
<div class="gallery-placeholder tall">
    <i class="fas fa-image fa-3x"></i>
    <p>일상 사진 1</p>
    <span class="category-badge">일상</span>
</div>
```
**설명:**
- `gallery-placeholder`: 이미지가 없을 때 표시되는 영역
- `tall`: 세로로 긴 카드 (300px 높이)
- 업로드된 사진이 있으면 이 영역이 `<img>` 태그로 교체됨

---

### 3️⃣ 실제 업로드 시 (JavaScript 생성)
```html
<img src="data:image/jpeg;base64,..." alt="산책하는 김치">
```
**설명:**
- `src`: Base64 인코딩된 이미지 데이터
- `alt`: 접근성을 위한 대체 텍스트
- 자동으로 280px 높이로 조정됨

---

### 4️⃣ 카테고리 배지
```html
<span class="category-badge">일상</span>
```
**위치:** 이미지 위, 오른쪽 상단에 절대 위치

---

### 5️⃣ 사진 정보 영역
```html
<div class="gallery-info">
    <h4>산책하는 김치</h4>
    <p>2024년 2월 1일</p>
</div>
```
**설명:**
- `h4`: 사진 제목
- `p`: 촬영 날짜

---

### 6️⃣ 수정/삭제 버튼 (호버 시)
```html
<div class="gallery-actions">
    <button class="action-btn edit-btn" title="수정">
        <i class="fas fa-edit"></i>
    </button>
    <button class="action-btn delete-btn" title="삭제">
        <i class="fas fa-trash"></i>
    </button>
</div>
```
**설명:**
- 평소에는 투명 (`opacity: 0`)
- 카드에 마우스 호버 시 표시 (`opacity: 1`)
- 오른쪽 상단에 절대 위치

---

## 🎨 CSS 스타일 상세

### 1️⃣ 카드 전체
```css
.gallery-item {
    background: white;
    border-radius: 15px;
    overflow: hidden;
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    transition: transform 0.3s ease;
    position: relative;
}

.gallery-item:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 20px rgba(0,0,0,0.15);
}
```
**효과:**
- 기본: 흰 배경, 둥근 모서리, 약간의 그림자
- 호버: 위로 5px 이동, 그림자 증가

---

### 2️⃣ 이미지
```css
.gallery-item img {
    width: 100%;
    height: 280px;
    object-fit: cover;
    object-position: center;
    display: block;
}
```
**설명:**
- `width: 100%`: 카드 너비에 맞춤
- `height: 280px`: 모든 카드 이미지 높이 통일
- `object-fit: cover`: 비율 유지하며 영역 채우기
- `object-position: center`: 중앙 부분 표시

---

### 3️⃣ 플레이스홀더 (업로드 전)
```css
.gallery-placeholder {
    background: #f5f5f5;
    height: 200px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: #999;
    position: relative;
}

.gallery-placeholder.tall {
    height: 300px;
}
```
**설명:**
- 기본: 200px 높이
- `tall` 클래스: 300px 높이 (세로로 긴 카드)
- 아이콘과 텍스트를 중앙 정렬

---

### 4️⃣ 카테고리 배지
```css
.category-badge {
    position: absolute;
    top: 10px;
    right: 10px;
    background: #ff6b9d;  /* 핑크색 (일상) */
    color: white;
    padding: 0.3rem 0.8rem;
    border-radius: 15px;
    font-size: 0.8rem;
}

/* 카테고리별 색상 */
.category-badge.travel {
    background: #2196F3;  /* 파란색 (여행) */
}

.category-badge.friends {
    background: #9C27B0;  /* 보라색 (친구들) */
}

.category-badge.special {
    background: #FF9800;  /* 주황색 (특별한 날) */
}
```
**설명:**
- 이미지 위, 오른쪽 상단에 떠있음
- 카테고리별로 다른 색상

---

### 5️⃣ 정보 영역
```css
.gallery-info {
    padding: 1rem;
}

.gallery-info h4 {
    margin-bottom: 0.5rem;
    color: #333;
    font-size: 1rem;
}

.gallery-info p {
    color: #999;
    font-size: 0.9rem;
}
```
**설명:**
- 이미지 아래 영역
- 제목은 진한 색, 날짜는 연한 색

---

### 6️⃣ 수정/삭제 버튼
```css
.gallery-actions {
    position: absolute;
    top: 0.5rem;
    right: 0.5rem;
    display: flex;
    gap: 0.3rem;
    opacity: 0;
    transition: opacity 0.3s ease;
    z-index: 10;
}

.gallery-item:hover .gallery-actions {
    opacity: 1;
}

.action-btn {
    background: rgba(255, 255, 255, 0.95);
    border: none;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;
    box-shadow: 0 2px 5px rgba(0,0,0,0.2);
}

.action-btn:hover {
    transform: scale(1.1);
}

.edit-btn:hover {
    background: #2196F3;
    color: white;
}

.delete-btn:hover {
    background: #f44336;
    color: white;
}
```
**설명:**
- 평소 투명, 호버 시 나타남
- 수정 버튼: 파란색
- 삭제 버튼: 빨간색

---

## ⚙️ JavaScript 생성 (업로드 시)

### createPhotoElement() 함수
```javascript
createPhotoElement(photo, index) {
    const categoryNames = {
        'daily': '일상',
        'grooming': '미용사진',
        'travel': '여행',
        'friends': '친구들',
        'special': '특별한 날'
    };

    const div = document.createElement('div');
    div.className = 'gallery-item';
    div.setAttribute('data-dynamic', 'true');
    div.setAttribute('data-category', photo.category);
    div.setAttribute('data-photo-index', index);
    
    div.innerHTML = `
        <img src="${photo.dataUrl}" alt="${photo.title}">
        <div class="gallery-info">
            <h4>${photo.title}</h4>
            <p>${this.formatDate(photo.date)}</p>
        </div>
        <span class="category-badge">${categoryNames[photo.category] || '일상'}</span>
        <div class="gallery-actions">
            <button class="action-btn edit-btn" title="수정">
                <i class="fas fa-edit"></i>
            </button>
            <button class="action-btn delete-btn" title="삭제">
                <i class="fas fa-trash"></i>
            </button>
        </div>
    `;

    // 이벤트 리스너 추가
    div.querySelector('.edit-btn').addEventListener('click', () => this.editPhoto(index));
    div.querySelector('.delete-btn').addEventListener('click', () => this.deletePhoto(index));

    return div;
}
```

---

## 📊 카드 크기 및 간격

```
┌─────────┬─────────┬─────────┐
│         │         │         │
│  카드1  │  카드2  │  카드3  │  ← 1.5rem 간격
│         │         │         │
└─────────┴─────────┴─────────┘
    ↓         ↓         ↓
  1.5rem    1.5rem   1.5rem
    ↓         ↓         ↓
```

### 그리드 설정
- **컬럼**: 3개 (repeat(3, 1fr))
- **간격**: 1.5rem (약 24px)
- **카드 너비**: 컨테이너의 1/3 - 간격

### 카드 내부
- **이미지 높이**: 280px (고정)
- **정보 영역 패딩**: 1rem (약 16px)
- **배지 위치**: top 10px, right 10px

---

## 🎯 카드1 속성 요약

| 속성 | 값 |
|-----|---|
| 배경색 | white |
| 테두리 반경 | 15px |
| 그림자 | 약간 (0 2px 10px) |
| 이미지 높이 | 280px |
| 이미지 정렬 | center (중앙) |
| 카테고리 | daily (일상) |
| 배지 색상 | #ff6b9d (핑크) |
| 호버 효과 | 위로 5px 이동 |

---

## 🖱️ 인터랙션

### 1. 일반 상태
```
┌────────────┐
│  [이미지]  │
│   280px   │
│   제목     │
│   날짜     │
└────────────┘
```

### 2. 호버 상태
```
┌────────────┐
│ ✏️🗑️       │ ← 버튼 나타남
│  [이미지]  │ ← 카드가 위로 5px 이동
│   280px   │ ← 그림자 증가
│   제목     │
│   날짜     │
└────────────┘
```

### 3. 버튼 호버
- **수정 버튼**: 파란색으로 변경
- **삭제 버튼**: 빨간색으로 변경

---

## 📱 반응형

### Desktop (기본)
```
[카드1] [카드2] [카드3]
```

### Tablet (≤1024px)
```
[카드1] [카드2]
[카드3] [카드4]
```

### Mobile (≤768px)
```
[카드1]
[카드2]
[카드3]
```

---

## 💾 데이터 구조 (localStorage)

```javascript
{
    title: "산책하는 김치",
    date: "2024-02-01",
    category: "daily",
    description: "오늘 날씨가 좋아서 공원으로 산책을 갔어요",
    dataUrl: "data:image/jpeg;base64,/9j/4AAQSkZJRg...",
    uploadDate: "2024-02-04T12:34:56.789Z"
}
```

---

이것이 **카드1**의 완전한 구성입니다! 🎴✨

각 레이어가 어떻게 쌓이고, CSS가 어떻게 적용되며, JavaScript가 어떻게 동작하는지 상세히 설명했습니다.
