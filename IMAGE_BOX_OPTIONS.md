# 🖼️ 이미지 박스 구성 옵션 가이드

## 📋 현재 상황
- **위치**: 김치의 역사 페이지 > "지금의 김치" 섹션
- **현재 상태**: 플레이스홀더 (아이콘만 표시)
- **목표**: 실제 김치 사진 추가

---

## 🎯 추천 옵션 비교

### ⭐ **추천 1위: 단일 이미지 (가장 심플)**
```
┌─────────────────────────┐
│                         │
│      [대표 사진]        │
│    (고정 크기 박스)     │
│                         │
└─────────────────────────┘
```

**장점:**
- ✅ 가장 깔끔하고 심플
- ✅ 페이지 로딩 빠름
- ✅ 모바일 최적화
- ✅ 유지보수 쉬움

**단점:**
- ❌ 한 장만 보여줌

**적합한 경우:**
- 김치의 **대표 사진 1장**이 있을 때
- 심플하고 깔끔한 디자인 선호
- 페이지 로딩 속도 중요

---

### ⭐ **추천 2위: 슬라이더 (여러 사진 표시)**
```
┌─────────────────────────┐
│   [←]  [사진]  [→]     │
│                         │
│    ● ○ ○ (인디케이터)  │
└─────────────────────────┘
```

**장점:**
- ✅ 여러 장의 사진 표시 가능
- ✅ 자동 슬라이드 가능
- ✅ 인터랙티브한 경험
- ✅ 공간 효율적

**단점:**
- ❌ 구현 복잡도 중간
- ❌ JavaScript 필요

**적합한 경우:**
- 김치의 **다양한 모습** 보여주고 싶을 때
- 3~5장의 사진이 있을 때
- 사용자 인터랙션 원할 때

---

### 추천 3위: 그리드 (2x2 또는 1x3)
```
┌───────┬───────┐
│ 사진1 │ 사진2 │
├───────┼───────┤
│ 사진3 │ 사진4 │
└───────┴───────┘
```

**장점:**
- ✅ 한눈에 여러 사진 확인
- ✅ 구현 간단
- ✅ JavaScript 불필요

**단점:**
- ❌ 공간 많이 차지
- ❌ 모바일에서 작아질 수 있음

**적합한 경우:**
- 4장 정도의 사진이 있을 때
- 모든 사진을 동시에 보여주고 싶을 때

---

### 추천 4위: 호버 갤러리
```
┌─────────────────────────┐
│    [메인 사진 크게]     │
│                         │
│  [썸네일1][썸네일2][3]  │
└─────────────────────────┘
```

**장점:**
- ✅ 큰 이미지 + 작은 썸네일
- ✅ 인터랙티브
- ✅ 여러 사진 효율적 표시

**단점:**
- ❌ 구현 복잡
- ❌ 공간 차지

**적합한 경우:**
- 5장 이상의 사진이 있을 때
- 사용자가 선택하여 볼 수 있게 하고 싶을 때

---

## 🏆 **최종 추천: 상황별**

### 📌 사진 1장인 경우
**→ 단일 이미지 (추천 1위)**
- 가장 깔끔하고 효과적
- 구현 시간: 5분

### 📌 사진 2~3장인 경우
**→ 슬라이더 (추천 2위)**
- 자동 전환으로 모든 사진 보여줌
- 구현 시간: 15분

### 📌 사진 4장인 경우
**→ 그리드 2x2 (추천 3위)**
- 한눈에 모든 사진 확인
- 구현 시간: 10분

### 📌 사진 5장 이상인 경우
**→ 슬라이더 + 갤러리 링크**
- 슬라이더로 대표 3장 표시
- "더 많은 사진 보기" 버튼 → 갤러리 페이지로 연결
- 구현 시간: 20분

---

## 💻 **구현 방법**

### 옵션 1: 단일 이미지 (심플)

#### HTML
```html
<div class="timeline-image">
    <img src="images/kimchi-current.jpg" alt="현재 김치의 모습">
</div>
```

#### CSS
```css
.timeline-image {
    width: 100%;
    max-width: 600px;
    margin: 2rem auto;
    border-radius: 15px;
    overflow: hidden;
    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}

.timeline-image img {
    width: 100%;
    height: 400px;
    object-fit: cover;
    object-position: center;
}
```

---

### 옵션 2: 슬라이더 (추천!)

#### HTML
```html
<div class="timeline-slider">
    <div class="slider-container">
        <div class="slide active">
            <img src="images/kimchi-current-1.jpg" alt="김치 1">
        </div>
        <div class="slide">
            <img src="images/kimchi-current-2.jpg" alt="김치 2">
        </div>
        <div class="slide">
            <img src="images/kimchi-current-3.jpg" alt="김치 3">
        </div>
    </div>
    <button class="slider-btn prev">
        <i class="fas fa-chevron-left"></i>
    </button>
    <button class="slider-btn next">
        <i class="fas fa-chevron-right"></i>
    </button>
    <div class="slider-dots">
        <span class="dot active" data-slide="0"></span>
        <span class="dot" data-slide="1"></span>
        <span class="dot" data-slide="2"></span>
    </div>
</div>
```

#### CSS
```css
.timeline-slider {
    position: relative;
    width: 100%;
    max-width: 600px;
    margin: 2rem auto;
    border-radius: 15px;
    overflow: hidden;
    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}

.slider-container {
    position: relative;
    width: 100%;
    height: 400px;
}

.slide {
    position: absolute;
    width: 100%;
    height: 100%;
    opacity: 0;
    transition: opacity 1s ease;
}

.slide.active {
    opacity: 1;
}

.slide img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
}

.slider-btn {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background: rgba(255,255,255,0.9);
    border: none;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    cursor: pointer;
    z-index: 10;
    transition: all 0.3s;
}

.slider-btn:hover {
    background: white;
    box-shadow: 0 2px 8px rgba(0,0,0,0.2);
}

.slider-btn.prev {
    left: 10px;
}

.slider-btn.next {
    right: 10px;
}

.slider-dots {
    position: absolute;
    bottom: 15px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    gap: 10px;
    z-index: 10;
}

.dot {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: rgba(255,255,255,0.5);
    cursor: pointer;
    transition: all 0.3s;
}

.dot.active {
    background: white;
    width: 12px;
    height: 12px;
}
```

#### JavaScript
```javascript
// 슬라이더 기능
const initTimelineSlider = () => {
    const slides = document.querySelectorAll('.timeline-slider .slide');
    const dots = document.querySelectorAll('.timeline-slider .dot');
    const prevBtn = document.querySelector('.timeline-slider .prev');
    const nextBtn = document.querySelector('.timeline-slider .next');
    let currentSlide = 0;

    const showSlide = (n) => {
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        currentSlide = (n + slides.length) % slides.length;
        
        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
    };

    prevBtn?.addEventListener('click', () => showSlide(currentSlide - 1));
    nextBtn?.addEventListener('click', () => showSlide(currentSlide + 1));
    
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => showSlide(index));
    });

    // 자동 슬라이드 (5초마다)
    setInterval(() => showSlide(currentSlide + 1), 5000);
};

document.addEventListener('DOMContentLoaded', initTimelineSlider);
```

---

### 옵션 3: 그리드 2x2

#### HTML
```html
<div class="timeline-grid">
    <div class="grid-item">
        <img src="images/kimchi-1.jpg" alt="김치 1">
    </div>
    <div class="grid-item">
        <img src="images/kimchi-2.jpg" alt="김치 2">
    </div>
    <div class="grid-item">
        <img src="images/kimchi-3.jpg" alt="김치 3">
    </div>
    <div class="grid-item">
        <img src="images/kimchi-4.jpg" alt="김치 4">
    </div>
</div>
```

#### CSS
```css
.timeline-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
    max-width: 600px;
    margin: 2rem auto;
}

.grid-item {
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.grid-item img {
    width: 100%;
    height: 200px;
    object-fit: cover;
    transition: transform 0.3s;
}

.grid-item:hover img {
    transform: scale(1.05);
}

@media (max-width: 768px) {
    .timeline-grid {
        grid-template-columns: 1fr;
    }
}
```

---

## 📊 **옵션 비교표**

| 옵션 | 사진 개수 | 구현 난이도 | 시각적 효과 | 모바일 최적화 | 추천도 |
|-----|----------|-----------|-----------|-------------|--------|
| 단일 이미지 | 1장 | ⭐ 쉬움 | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ |
| 슬라이더 | 2~5장 | ⭐⭐ 보통 | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| 그리드 | 4장 | ⭐ 쉬움 | ⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐ |
| 호버 갤러리 | 5장+ | ⭐⭐⭐ 어려움 | ⭐⭐⭐⭐ | ⭐⭐ | ⭐⭐ |

---

## 💡 **최종 결론**

### 🥇 **가장 추천하는 방법**
**→ 슬라이더 (3장 구성)**

#### 이유:
1. ✅ 여러 장의 사진을 효과적으로 보여줌
2. ✅ 자동 슬라이드로 모든 사진 노출
3. ✅ 인터랙티브하고 현대적인 느낌
4. ✅ 공간 효율적
5. ✅ 모바일 친화적

#### 추천 구성:
- **사진 1**: 정면 샷 (김치가 카메라를 보는 모습)
- **사진 2**: 활동 샷 (산책, 놀이 중)
- **사진 3**: 편안한 샷 (쉬고 있거나 귀여운 포즈)

---

## 🎨 **시각적 예시**

### 슬라이더 동작 흐름
```
[5초] 사진 1 표시 (정면 샷)
       ↓
[페이드 전환 1초]
       ↓
[5초] 사진 2 표시 (활동 샷)
       ↓
[페이드 전환 1초]
       ↓
[5초] 사진 3 표시 (편안한 샷)
       ↓
[처음으로 순환]
```

### 사용자 인터랙션
```
마우스 호버 → 자동 슬라이드 일시정지
좌우 버튼 클릭 → 수동 이동
하단 점 클릭 → 원하는 사진으로 이동
```

---

## 🚀 **다음 단계**

어떤 옵션을 선택하시겠어요?
1. **슬라이더** (추천!) - 사진 2~3장 필요
2. **단일 이미지** - 사진 1장 필요
3. **그리드** - 사진 4장 필요

선택하시면 바로 구현해드리겠습니다! 🐶✨
