# 🖼️ 김치 갤러리 - 사진첩 섹션 전체 구성

## 📋 목차
1. [HTML 구조](#html-구조)
2. [CSS 스타일](#css-스타일)
3. [JavaScript 기능](#javascript-기능)
4. [레이아웃 설명](#레이아웃-설명)

---

## 🏗️ HTML 구조

### 1. 갤러리 헤더
```html
<section class="page-header">
    <div class="container">
        <h1><i class="fas fa-images"></i> 김치 갤러리</h1>
        <p>소중한 순간들을 사진과 영상으로 기록해요</p>
    </div>
</section>
```

### 2. 필터 버튼
```html
<section class="gallery-filter">
    <div class="container">
        <div class="filter-buttons">
            <button class="filter-btn active" data-filter="all">
                <i class="fas fa-th"></i> 전체보기
            </button>
            <button class="filter-btn" data-filter="daily">
                <i class="fas fa-calendar-day"></i> 일상
            </button>
            <button class="filter-btn" data-filter="grooming">
                <i class="fas fa-cut"></i> 미용사진
            </button>
            <button class="filter-btn" data-filter="travel">
                <i class="fas fa-plane"></i> 여행
            </button>
            <button class="filter-btn" data-filter="friends">
                <i class="fas fa-users"></i> 친구들
            </button>
            <button class="filter-btn" data-filter="special">
                <i class="fas fa-star"></i> 특별한 날
            </button>
        </div>
    </div>
</section>
```

### 3. 사진첩 섹션 (핵심)
```html
<section id="photos" class="gallery-photos">
    <div class="container">
        <h2 class="section-title">사진첩</h2>
        <div class="masonry-gallery">
            
            <!-- 카드 1: 일상 사진 -->
            <div class="gallery-item" data-category="daily">
                <div class="gallery-placeholder tall">
                    <i class="fas fa-image fa-3x"></i>
                    <p>일상 사진 1</p>
                    <span class="category-badge">일상</span>
                </div>
                <div class="gallery-info">
                    <h4>산책하는 김치</h4>
                    <p>2024년 2월 1일</p>
                </div>
            </div>

            <!-- 카드 2: 여행 사진 -->
            <div class="gallery-item" data-category="travel">
                <div class="gallery-placeholder">
                    <i class="fas fa-image fa-3x"></i>
                    <p>여행 사진 1</p>
                    <span class="category-badge travel">여행</span>
                </div>
                <div class="gallery-info">
                    <h4>바다에서</h4>
                    <p>2023년 8월 15일</p>
                </div>
            </div>

            <!-- 카드 3: 특별한 날 -->
            <div class="gallery-item" data-category="special">
                <div class="gallery-placeholder">
                    <i class="fas fa-image fa-3x"></i>
                    <p>생일 사진</p>
                    <span class="category-badge special">특별한 날</span>
                </div>
                <div class="gallery-info">
                    <h4>4번째 생일</h4>
                    <p>2024년 3월 15일</p>
                </div>
            </div>

            <!-- 카드 4: 친구들 -->
            <div class="gallery-item" data-category="friends">
                <div class="gallery-placeholder tall">
                    <i class="fas fa-image fa-3x"></i>
                    <p>친구들과</p>
                    <span class="category-badge friends">친구들</span>
                </div>
                <div class="gallery-info">
                    <h4>강아지 놀이터</h4>
                    <p>2023년 11월 20일</p>
                </div>
            </div>

            <!-- 카드 5: 일상 사진 2 -->
            <div class="gallery-item" data-category="daily">
                <div class="gallery-placeholder">
                    <i class="fas fa-image fa-3x"></i>
                    <p>일상 사진 2</p>
                    <span class="category-badge">일상</span>
                </div>
                <div class="gallery-info">
                    <h4>낮잠 자는 김치</h4>
                    <p>2024년 1월 28일</p>
                </div>
            </div>

            <!-- 카드 6: 일상 사진 3 -->
            <div class="gallery-item" data-category="daily">
                <div class="gallery-placeholder">
                    <i class="fas fa-image fa-3x"></i>
                    <p>일상 사진 3</p>
                    <span class="category-badge">일상</span>
                </div>
                <div class="gallery-info">
                    <h4>간식 먹는 김치</h4>
                    <p>2024년 2월 3일</p>
                </div>
            </div>

            <!-- 카드 7: 여행 사진 2 -->
            <div class="gallery-item" data-category="travel">
                <div class="gallery-placeholder tall">
                    <i class="fas fa-image fa-3x"></i>
                    <p>여행 사진 2</p>
                    <span class="category-badge travel">여행</span>
                </div>
                <div class="gallery-info">
                    <h4>제주도에서</h4>
                    <p>2023년 10월 5일</p>
                </div>
            </div>

            <!-- 카드 8: 특별한 날 2 -->
            <div class="gallery-item" data-category="special">
                <div class="gallery-placeholder">
                    <i class="fas fa-image fa-3x"></i>
                    <p>특별한 날</p>
                    <span class="category-badge special">특별한 날</span>
                </div>
                <div class="gallery-info">
                    <h4>미용 후 김치</h4>
                    <p>2024년 1월 15일</p>
                </div>
            </div>

        </div>
    </div>
</section>
```

---

## 🎨 CSS 스타일

### 1. Grid 레이아웃
```css
.masonry-gallery {
    display: grid;
    grid-template-columns: repeat(3, 1fr);  /* 3열 그리드 */
    gap: 1.5rem;
    margin-bottom: 2rem;
}
```

### 2. 갤러리 아이템 (카드)
```css
.gallery-item {
    background: white;
    border-radius: 15px;
    overflow: hidden;
    box-shadow: var(--shadow);
    transition: transform 0.3s ease;
    position: relative;
}

.gallery-item:hover {
    transform: translateY(-5px);      /* 호버 시 살짝 위로 */
    box-shadow: var(--shadow-lg);
}
```

### 3. 이미지 스타일
```css
.gallery-item img {
    width: 100%;
    height: 280px;                    /* 모든 이미지 높이 280px로 통일 */
    object-fit: cover;                /* 비율 유지하며 크롭 */
    object-position: center;          /* 중앙 정렬 */
    display: block;
}
```

### 4. 플레이스홀더 (업로드 전)
```css
.gallery-placeholder {
    background: var(--bg-light);
    height: 200px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: var(--text-light);
    position: relative;
}

.gallery-placeholder.tall {
    height: 300px;                    /* tall 클래스: 세로로 긴 카드 */
}
```

### 5. 카테고리 배지
```css
.category-badge {
    position: absolute;
    top: 1rem;
    right: 1rem;
    background: var(--primary-color);
    color: white;
    padding: 0.3rem 0.8rem;
    border-radius: 20px;
    font-size: 0.85rem;
}
```

### 6. 갤러리 정보 (제목, 날짜)
```css
.gallery-info {
    padding: 1rem;
}

.gallery-info h4 {
    margin-bottom: 0.5rem;
    color: var(--text-dark);
}

.gallery-info p {
    color: var(--text-light);
    font-size: 0.9rem;
}
```

### 7. 반응형 디자인
```css
/* 태블릿 (최대 1024px) */
@media (max-width: 1024px) {
    .masonry-gallery {
        grid-template-columns: repeat(2, 1fr);  /* 2열 */
    }
}

/* 모바일 (최대 768px) */
@media (max-width: 768px) {
    .masonry-gallery {
        grid-template-columns: 1fr;             /* 1열 */
    }
}
```

---

## ⚙️ JavaScript 기능

### 1. 갤러리 매니저 클래스
```javascript
class GalleryManager {
    constructor() {
        this.photos = this.loadPhotos();
        this.videos = this.loadVideos();
    }

    // 사진 추가
    addPhoto(photo) {
        this.photos.push(photo);
        this.savePhotos();
        this.renderPhotos();
        this.updateRecentGallery();
    }

    // 사진첩 렌더링
    renderPhotos() {
        const gallery = document.querySelector('.masonry-gallery');
        
        // 기존 동적 아이템 제거
        const dynamicItems = gallery.querySelectorAll('.gallery-item[data-dynamic="true"]');
        dynamicItems.forEach(item => item.remove());

        // 배열을 역순으로 렌더링 (최신 사진이 먼저)
        [...this.photos].reverse().forEach((photo, index) => {
            const originalIndex = this.photos.length - 1 - index;
            const item = this.createPhotoElement(photo, originalIndex);
            gallery.appendChild(item);  // 왼쪽에서 오른쪽으로 추가
        });
    }

    // 사진 요소 생성
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

        // 수정/삭제 버튼 이벤트
        div.querySelector('.edit-btn').addEventListener('click', () => this.editPhoto(index));
        div.querySelector('.delete-btn').addEventListener('click', () => this.deletePhoto(index));

        return div;
    }
}
```

### 2. 필터 기능
```javascript
// 카테고리 필터
document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        // 활성화 상태 변경
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        this.classList.add('active');

        const filter = this.getAttribute('data-filter');
        const items = document.querySelectorAll('.gallery-item');

        items.forEach(item => {
            const category = item.getAttribute('data-category');
            if (filter === 'all' || category === filter) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    });
});
```

---

## 📐 레이아웃 설명

### 그리드 구조 (Desktop - 3열)
```
┌─────────────────────────────────────────────────────┐
│                    갤러리 필터                        │
│  [전체] [일상] [미용사진] [여행] [친구들] [특별한날]   │
└─────────────────────────────────────────────────────┘

┌──────────────┐  ┌──────────────┐  ┌──────────────┐
│   카드 1     │  │   카드 2     │  │   카드 3     │
│  (최신 사진)  │  │  (2번째 사진) │  │  (3번째 사진) │
│   [이미지]   │  │   [이미지]   │  │   [이미지]   │
│   280px     │  │   280px     │  │   280px     │
│   제목/날짜   │  │   제목/날짜   │  │   제목/날짜   │
└──────────────┘  └──────────────┘  └──────────────┘

┌──────────────┐  ┌──────────────┐  ┌──────────────┐
│   카드 4     │  │   카드 5     │  │   카드 6     │
│  (4번째 사진) │  │  (5번째 사진) │  │  (6번째 사진) │
│   [이미지]   │  │   [이미지]   │  │   [이미지]   │
│   280px     │  │   280px     │  │   280px     │
│   제목/날짜   │  │   제목/날짜   │  │   제목/날짜   │
└──────────────┘  └──────────────┘  └──────────────┘

┌──────────────┐  ┌──────────────┐  ┌──────────────┐
│   카드 7     │  │   카드 8     │  │   카드 9     │
│   ...        │  │   ...        │  │   ...        │
└──────────────┘  └──────────────┘  └──────────────┘
```

### 업로드 순서
1. **사진 업로드** → localStorage에 저장
2. **renderPhotos() 호출** → 배열을 역순으로 처리
3. **appendChild()로 추가** → 왼쪽→오른쪽→아래 순서

```
업로드 순서:  1 → 2 → 3 → 4 → 5 → 6 → 7 → 8 → 9

화면 표시:
  [9] [8] [7]    ← 최신 사진 (위쪽)
  [6] [5] [4]
  [3] [2] [1]    ← 오래된 사진 (아래쪽)
```

### 카드 구성 요소
```
┌────────────────────────────┐
│  🏷️ [카테고리 배지]        │  ← 오른쪽 상단
│                            │
│       [이미지 영역]         │  ← 280px 고정 높이
│        (중앙 정렬)         │     object-fit: cover
│                            │
├────────────────────────────┤
│  제목: 산책하는 김치        │  ← gallery-info
│  📅 2024년 2월 1일         │
├────────────────────────────┤
│  ✏️ [수정] 🗑️ [삭제]       │  ← 호버 시 표시
└────────────────────────────┘
```

---

## 🎯 주요 특징

### ✅ 균일한 카드 크기
- 모든 이미지: 280px 높이 고정
- 중앙 크롭으로 일관성 유지

### ✅ 업로드 순서 반영
- 최신 사진이 왼쪽 상단(카드1)에 표시
- 자동으로 오른쪽→아래 순서로 배치

### ✅ 반응형 디자인
- Desktop: 3열
- Tablet: 2열
- Mobile: 1열

### ✅ 필터 기능
- 전체보기 / 일상 / 미용사진 / 여행 / 친구들 / 특별한 날
- 카테고리별 필터링

### ✅ 수정/삭제 기능
- 카드 호버 시 수정/삭제 버튼 표시
- localStorage 연동

---

## 📦 데이터 저장 (localStorage)

```javascript
// 저장 형식
{
    title: "산책하는 김치",
    date: "2024-02-01",
    category: "daily",
    description: "오늘 날씨가 좋아서...",
    dataUrl: "data:image/jpeg;base64,...",
    uploadDate: "2024-02-04T12:34:56.789Z"
}
```

---

이 구조로 김치 갤러리의 사진첩 섹션이 완벽하게 작동합니다! 🐶✨
