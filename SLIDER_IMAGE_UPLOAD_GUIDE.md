# 📸 슬라이더 이미지 업로드 가이드

## ✅ 슬라이더 구현 완료!

"지금의 김치" 섹션에 3장의 이미지 슬라이더가 구현되었습니다.

---

## 🎯 **필요한 이미지**

### 📌 이미지 3장 준비
슬라이더에는 **3장의 사진**이 필요합니다:

1. **사진 1** (추천: 정면 샷)
   - 김치가 카메라를 보고 있는 모습
   - 선명하고 밝은 사진

2. **사진 2** (추천: 활동 샷)
   - 산책 중이거나 놀고 있는 모습
   - 움직임이 있는 활동적인 사진

3. **사진 3** (추천: 편안한 샷)
   - 쉬고 있거나 귀여운 포즈
   - 일상적인 모습

---

## 📁 **이미지 업로드 방법**

### 방법 1: FTP/파일 관리자 (추천)
```
1. /home/user/webapp/images/ 폴더로 이동
2. 3장의 사진을 다음 이름으로 저장:
   - kimchi-current-1.jpg
   - kimchi-current-2.jpg
   - kimchi-current-3.jpg
```

### 방법 2: 명령어로 업로드
```bash
# 이미지 폴더로 이동
cd /home/user/webapp/images

# 이미지 파일을 해당 위치에 복사
# (이미지를 images 폴더에 넣으면 됩니다)
```

---

## 🖼️ **이미지 파일명**

반드시 다음 파일명을 사용하세요:

| 슬라이드 | 파일명 | 설명 |
|---------|--------|------|
| 1번째 | `kimchi-current-1.jpg` | 정면 샷 |
| 2번째 | `kimchi-current-2.jpg` | 활동 샷 |
| 3번째 | `kimchi-current-3.jpg` | 편안한 샷 |

**경로**: `/home/user/webapp/images/`

---

## 📐 **이미지 권장 사양**

### 최적 해상도
- **가로**: 600px ~ 1200px
- **세로**: 400px ~ 800px
- **비율**: 3:2 또는 4:3 (가로가 세로보다 긴 사진)

### 파일 형식
- ✅ **JPG** (권장)
- ✅ PNG
- ✅ WebP

### 파일 크기
- **최대**: 2MB 이하
- **권장**: 500KB ~ 1MB

### 화질
- 선명하고 밝은 사진
- 흐릿하거나 어두운 사진 지양

---

## 🎨 **현재 슬라이더 구성**

### HTML 구조
```html
<div class="timeline-slider">
    <div class="slider-container">
        <!-- 슬라이드 1 -->
        <div class="slide active">
            <img src="images/kimchi-current-1.jpg" alt="현재 김치의 모습 1">
            <div class="slide-placeholder">
                <i class="fas fa-camera"></i>
                <p>사진 1</p>
            </div>
        </div>
        
        <!-- 슬라이드 2 -->
        <div class="slide">
            <img src="images/kimchi-current-2.jpg" alt="현재 김치의 모습 2">
            <div class="slide-placeholder">
                <i class="fas fa-camera"></i>
                <p>사진 2</p>
            </div>
        </div>
        
        <!-- 슬라이드 3 -->
        <div class="slide">
            <img src="images/kimchi-current-3.jpg" alt="현재 김치의 모습 3">
            <div class="slide-placeholder">
                <i class="fas fa-camera"></i>
                <p>사진 3</p>
            </div>
        </div>
    </div>
    
    <!-- 좌우 버튼 -->
    <button class="slider-btn prev">◀</button>
    <button class="slider-btn next">▶</button>
    
    <!-- 인디케이터 점 -->
    <div class="slider-dots">
        <span class="dot active"></span>
        <span class="dot"></span>
        <span class="dot"></span>
    </div>
</div>
```

---

## ⚙️ **슬라이더 기능**

### 자동 슬라이드
- ⏰ **5초마다** 자동으로 다음 사진으로 전환
- 🔄 마지막 사진 후 첫 번째로 순환

### 수동 조작
- **← 이전 버튼**: 이전 사진으로 이동
- **다음 → 버튼**: 다음 사진으로 이동
- **● 점(dot)**: 특정 사진으로 바로 이동

### 호버 효과
- 🖱️ 마우스를 올리면 자동 슬라이드 **일시정지**
- 🖱️ 마우스를 빼면 자동 슬라이드 **재개**

---

## 🔍 **플레이스홀더 동작**

이미지가 없을 때:
```
┌─────────────────────┐
│        📷          │
│                     │
│     사진 1         │
│  이미지를 업로드해주세요 │
└─────────────────────┘
```

이미지가 있을 때:
```
┌─────────────────────┐
│                     │
│   [김치 사진]       │
│                     │
└─────────────────────┘
```

---

## 📱 **반응형 디자인**

### Desktop (PC)
- 슬라이더 높이: **400px**
- 버튼 크기: **40px**
- 최대 너비: **600px**

### Mobile (스마트폰)
- 슬라이더 높이: **300px**
- 버튼 크기: **35px**
- 전체 너비 사용

---

## 🧪 **테스트 방법**

### 1. 이미지 업로드 전
```
1. 김치의 역사 페이지 열기
2. "지금의 김치" 섹션으로 스크롤
3. 플레이스홀더 확인 (카메라 아이콘)
```

### 2. 이미지 업로드 후
```
1. images 폴더에 3장의 이미지 업로드
   - kimchi-current-1.jpg
   - kimchi-current-2.jpg
   - kimchi-current-3.jpg
   
2. 페이지 새로고침 (Ctrl + Shift + R)

3. 슬라이더 확인
   - 자동 슬라이드 작동 확인
   - 좌우 버튼 클릭 테스트
   - 하단 점 클릭 테스트
   - 마우스 호버 시 일시정지 확인
```

---

## 🌐 **페이지 URL**

**김치의 역사 페이지**: https://8000-iwzj5lfq6ruydrdcgro8q-82b888ba.sandbox.novita.ai/kimchi-history.html

**슬라이더 위치**: "2026년 현재" > "지금의 김치" 섹션

---

## 💡 **이미지 선택 팁**

### ✅ 좋은 사진의 특징
- 선명하고 밝은 조명
- 김치가 중앙에 위치
- 배경이 너무 복잡하지 않음
- 김치의 표정이 잘 보임

### ❌ 피해야 할 사진
- 흐릿하거나 어두운 사진
- 너무 작은 사진 (해상도 부족)
- 김치가 잘 안 보이는 사진
- 과도하게 편집된 사진

---

## 🔧 **문제 해결**

### 이미지가 표시되지 않을 때
```bash
# 파일명 확인
ls -la /home/user/webapp/images/kimchi-current-*.jpg

# 파일 권한 확인
chmod 644 /home/user/webapp/images/kimchi-current-*.jpg
```

### 슬라이더가 작동하지 않을 때
```
1. 브라우저 콘솔(F12) 확인
2. JavaScript 오류 확인
3. 강력 새로고침 (Ctrl + Shift + R)
```

### 이미지 크기가 맞지 않을 때
```css
/* CSS에서 object-fit이 자동으로 조정합니다 */
.slide img {
    object-fit: cover;  /* 비율 유지하며 영역 채우기 */
    object-position: center;  /* 중앙 정렬 */
}
```

---

## 📝 **체크리스트**

이미지 업로드 전 확인사항:

- [ ] 3장의 사진 준비 완료
- [ ] 파일명 확인 (kimchi-current-1.jpg, 2.jpg, 3.jpg)
- [ ] 파일 형식 JPG 또는 PNG
- [ ] 파일 크기 2MB 이하
- [ ] 이미지 해상도 적정 (600px 이상)
- [ ] 밝고 선명한 사진

업로드 후 확인사항:

- [ ] 페이지에 이미지 표시 확인
- [ ] 자동 슬라이드 작동 확인 (5초)
- [ ] 좌우 버튼 작동 확인
- [ ] 하단 점 클릭 확인
- [ ] 마우스 호버 일시정지 확인
- [ ] 모바일에서도 정상 작동 확인

---

## 🎉 **완료!**

이미지만 업로드하면 슬라이더가 자동으로 작동합니다!

**이미지 경로**: `/home/user/webapp/images/`
**파일명**: `kimchi-current-1.jpg`, `kimchi-current-2.jpg`, `kimchi-current-3.jpg`

준비되면 이미지를 업로드해주세요! 🐶✨
