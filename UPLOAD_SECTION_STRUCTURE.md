# 📸 사진/영상 업로드 섹션 구성

## 🎯 전체 구조

```
📦 upload-section (섹션 전체)
├── 📋 h2.section-title: "사진/영상 업로드"
├── 🎨 upload-container (그리드 레이아웃)
│   ├── 📁 upload-box (왼쪽: 파일 선택 영역)
│   │   ├── upload-content (초기 상태)
│   │   │   ├── 📤 아이콘 (fa-cloud-upload-alt)
│   │   │   ├── h3: "파일을 드래그하거나 클릭하세요"
│   │   │   ├── p: "JPG, PNG, GIF, MP4 파일 지원 (최대 10MB)"
│   │   │   ├── input#fileInput (숨김)
│   │   │   └── button#selectFileBtn: "파일 선택"
│   │   └── upload-preview-box (파일 선택 후 표시)
│   │       └── #previewImagesGrid (미리보기 그리드)
│   │
│   └── 📝 upload-form (오른쪽: 입력 폼)
│       ├── form-group: 제목
│       │   ├── label: "제목"
│       │   └── input#photoTitle
│       ├── form-group: 날짜
│       │   ├── label: "촬영 날짜"
│       │   └── input#photoDate (type="date")
│       ├── form-group: 카테고리
│       │   ├── label: "카테고리"
│       │   └── select#photoCategory
│       │       ├── option: "선택하세요" (value="")
│       │       ├── option: "일상" (value="daily")
│       │       ├── option: "미용사진" (value="grooming")
│       │       ├── option: "여행" (value="travel")
│       │       ├── option: "친구들" (value="friends")
│       │       └── option: "특별한 날" (value="special")
│       ├── form-group: 설명
│       │   ├── label: "설명"
│       │   └── textarea#photoDescription (rows="4")
│       └── button#uploadBtn: "업로드하기"
│
└── 🖼️ upload-preview (추가 미리보기, 현재 미사용)
    ├── h3: "미리보기"
    └── #previewGrid
```

---

## 🎨 레이아웃 구조

### 전체 레이아웃 (Desktop)

```
┌─────────────────────────────────────────────────────────────┐
│                    사진/영상 업로드                          │
├──────────────────────────┬──────────────────────────────────┤
│  📁 파일 선택 영역        │  📝 입력 폼                       │
│  (upload-box)            │  (upload-form)                   │
│                          │                                  │
│  ┌────────────────────┐  │  ┌────────────────────────────┐ │
│  │  📤 클라우드 아이콘 │  │  │  제목: [           ]       │ │
│  │                    │  │  │  날짜: [2024-02-05]        │ │
│  │ 파일을 드래그하거나 │  │  │  카테고리: [일상 ▼]        │ │
│  │   클릭하세요       │  │  │  설명: [               ]   │ │
│  │                    │  │  │       [               ]   │ │
│  │  JPG, PNG, GIF...  │  │  │                            │ │
│  │                    │  │  │  [   업로드하기   ]        │ │
│  │  [  파일 선택  ]   │  │  └────────────────────────────┘ │
│  └────────────────────┘  │                                  │
│                          │                                  │
│  (파일 선택 후)          │                                  │
│  ┌────────────────────┐  │                                  │
│  │ 미리보기 그리드     │  │                                  │
│  │  [img] [img] [img] │  │                                  │
│  │  [img] [img] [img] │  │                                  │
│  └────────────────────┘  │                                  │
└──────────────────────────┴──────────────────────────────────┘
```

### 모바일 레이아웃

```
┌─────────────────────────────┐
│    사진/영상 업로드          │
├─────────────────────────────┤
│  📁 파일 선택 영역           │
│  ┌───────────────────────┐  │
│  │  📤 클라우드 아이콘    │  │
│  │                       │  │
│  │ 파일을 드래그하거나    │  │
│  │   클릭하세요          │  │
│  │                       │  │
│  │  [  파일 선택  ]      │  │
│  └───────────────────────┘  │
│                             │
│  📝 입력 폼                  │
│  ┌───────────────────────┐  │
│  │ 제목: [           ]   │  │
│  │ 날짜: [2024-02-05]    │  │
│  │ 카테고리: [일상 ▼]    │  │
│  │ 설명: [           ]   │  │
│  │                       │  │
│  │  [  업로드하기  ]     │  │
│  └───────────────────────┘  │
└─────────────────────────────┘
```

---

## 📋 HTML 구조 상세

### 1. 섹션 헤더

```html
<section id="upload" class="upload-section">
    <div class="container">
        <h2 class="section-title">사진/영상 업로드</h2>
```

### 2. 파일 선택 영역 (왼쪽)

```html
<div class="upload-box" id="uploadBox">
    <!-- 초기 상태 -->
    <div class="upload-content">
        <i class="fas fa-cloud-upload-alt fa-4x"></i>
        <h3>파일을 드래그하거나 클릭하세요</h3>
        <p>JPG, PNG, GIF, MP4 파일 지원 (최대 10MB)</p>
        <input type="file" id="fileInput" multiple 
               accept="image/*,video/*" style="display: none;">
        <button class="btn-primary" id="selectFileBtn" type="button">
            <i class="fas fa-folder-open"></i> 파일 선택
        </button>
    </div>
    
    <!-- 파일 선택 후 표시 -->
    <div class="upload-preview-box" id="uploadPreviewBox" style="display: none;">
        <div id="previewImagesGrid"></div>
    </div>
</div>
```

### 3. 입력 폼 (오른쪽)

```html
<div class="upload-form">
    <!-- 제목 -->
    <div class="form-group">
        <label for="photoTitle">
            <i class="fas fa-heading"></i> 제목
        </label>
        <input type="text" id="photoTitle" 
               placeholder="사진/영상 제목을 입력하세요">
    </div>
    
    <!-- 날짜 -->
    <div class="form-group">
        <label for="photoDate">
            <i class="fas fa-calendar"></i> 촬영 날짜
        </label>
        <input type="date" id="photoDate">
    </div>
    
    <!-- 카테고리 -->
    <div class="form-group">
        <label for="photoCategory">
            <i class="fas fa-tag"></i> 카테고리
        </label>
        <select id="photoCategory">
            <option value="">선택하세요</option>
            <option value="daily">일상</option>
            <option value="grooming">미용사진</option>
            <option value="travel">여행</option>
            <option value="friends">친구들</option>
            <option value="special">특별한 날</option>
        </select>
    </div>
    
    <!-- 설명 -->
    <div class="form-group">
        <label for="photoDescription">
            <i class="fas fa-comment"></i> 설명
        </label>
        <textarea id="photoDescription" rows="4" 
                  placeholder="이 사진/영상에 대한 설명을 입력하세요"></textarea>
    </div>
    
    <!-- 업로드 버튼 -->
    <button class="btn-primary btn-large" id="uploadBtn">
        <i class="fas fa-upload"></i> 업로드하기
    </button>
</div>
```

---

## 🎨 CSS 스타일

### 전체 섹션

```css
.upload-section {
    padding: 4rem 2rem;
}

.upload-container {
    display: grid;
    grid-template-columns: 1fr 1fr;  /* 2열 그리드 */
    gap: 3rem;
    margin-bottom: 2rem;
}
```

### 파일 선택 박스

```css
.upload-box {
    background: white;
    border: 3px dashed var(--border-color);  /* 점선 테두리 */
    border-radius: 15px;
    padding: 3rem;
    text-align: center;
    transition: all 0.3s ease;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    min-height: 400px;
}

.upload-box:hover {
    border-color: var(--primary-color);
    background: rgba(255, 107, 157, 0.05);  /* 호버 시 연한 핑크 */
}
```

### 업로드 콘텐츠

```css
.upload-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.upload-box i {
    color: var(--secondary-color);
    margin-bottom: 1rem;
}

.upload-box h3 {
    margin-bottom: 1rem;
}

.upload-box p {
    color: var(--text-light);
    margin-bottom: 1.5rem;
}
```

### 미리보기 박스

```css
.upload-preview-box {
    flex: 1;
    overflow-y: auto;
    max-height: 300px;
    padding: 1rem;
    border-top: 2px solid var(--border-color);
    margin-top: 1rem;
}

#previewImagesGrid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
    gap: 0.5rem;
}

#previewImagesGrid .preview-image-item img,
#previewImagesGrid .preview-image-item video {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
}
```

### 입력 폼

```css
.upload-form {
    background: white;
    padding: 2rem;
    border-radius: 15px;
    box-shadow: var(--shadow);
}

.form-group {
    margin-bottom: 1.5rem;
}

.form-group label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 600;
    color: var(--text-dark);
}

.form-group label i {
    color: var(--primary-color);
    margin-right: 0.5rem;
}

.form-group input,
.form-group select,
.form-group textarea {
    width: 100%;
    padding: 0.8rem;
    border: 1px solid var(--border-color);
    border-radius: 8px;
    font-family: inherit;
}

.form-group textarea {
    resize: vertical;
}
```

---

## 🔄 상태별 UI 변화

### 초기 상태

```
┌──────────────────────┐
│     📤 아이콘        │
│                      │
│ 파일을 드래그하거나   │
│   클릭하세요         │
│                      │
│ JPG, PNG, GIF...     │
│                      │
│  [  파일 선택  ]     │
└──────────────────────┘

upload-box: 표시 (display: flex)
uploadPreviewBox: 숨김 (display: none)
```

### 파일 선택 후

```
┌──────────────────────┐
│   미리보기 그리드     │
│  ┌───┐ ┌───┐ ┌───┐  │
│  │img│ │img│ │img│  │
│  └───┘ └───┘ └───┘  │
│  ┌───┐ ┌───┐        │
│  │img│ │img│        │
│  └───┘ └───┘        │
└──────────────────────┘

upload-content: 숨김
uploadPreviewBox: 표시 (display: block)
```

---

## 🔗 DOM 요소 ID

| ID | 요소 타입 | 용도 |
|----|----------|------|
| `uploadBox` | div | 파일 선택 박스 전체 |
| `fileInput` | input[type="file"] | 실제 파일 입력 (숨김) |
| `selectFileBtn` | button | 파일 선택 버튼 |
| `uploadPreviewBox` | div | 미리보기 박스 컨테이너 |
| `previewImagesGrid` | div | 미리보기 이미지 그리드 |
| `photoTitle` | input[type="text"] | 제목 입력 |
| `photoDate` | input[type="date"] | 날짜 선택 |
| `photoCategory` | select | 카테고리 선택 |
| `photoDescription` | textarea | 설명 입력 |
| `uploadBtn` | button | 업로드 버튼 |

---

## ⚙️ JavaScript 동작

### 1. 파일 선택

```javascript
selectFileBtn.addEventListener('click', () => {
    fileInput.click();  // 숨겨진 파일 입력 트리거
});
```

### 2. 파일 변경 감지

```javascript
fileInput.addEventListener('change', (e) => {
    selectedFiles = Array.from(e.target.files);
    
    // UI 전환
    uploadBox.style.display = 'none';
    uploadPreviewBox.style.display = 'block';
    
    // 미리보기 생성
    files.forEach(file => {
        const reader = new FileReader();
        reader.onload = (e) => {
            // previewImagesGrid에 미리보기 추가
        };
        reader.readAsDataURL(file);
    });
});
```

### 3. 업로드 처리

```javascript
uploadBtn.addEventListener('click', async () => {
    // 폼 데이터 수집
    const title = document.getElementById('photoTitle').value;
    const date = document.getElementById('photoDate').value;
    const category = document.getElementById('photoCategory').value;
    const description = document.getElementById('photoDescription').value;
    
    // 유효성 검사
    if (!title || !date || !category || selectedFiles.length === 0) {
        alert('필수 항목을 채워주세요.');
        return;
    }
    
    // API 전송
    for (const file of selectedFiles) {
        await galleryManager.addPhoto({
            title, date, category, description, dataUrl
        });
    }
    
    // 완료 처리
    alert('업로드가 완료되었습니다!');
    // 폼 초기화
    // 사진첩으로 스크롤
});
```

---

## 📱 반응형 디자인

### Desktop (> 768px)

```css
.upload-container {
    grid-template-columns: 1fr 1fr;  /* 2열 */
    gap: 3rem;
}
```

### Mobile (≤ 768px)

```css
@media (max-width: 768px) {
    .upload-container {
        grid-template-columns: 1fr;  /* 1열 */
        gap: 2rem;
    }
    
    .upload-box {
        min-height: 300px;
    }
}
```

---

## 🎯 주요 기능

### 1. 파일 선택
- ✅ "파일 선택" 버튼 클릭
- ✅ 드래그 앤 드롭 (미구현)
- ✅ 다중 파일 선택 (multiple)
- ✅ 이미지/영상 필터 (accept="image/*,video/*")

### 2. 미리보기
- ✅ 선택한 파일 썸네일 표시
- ✅ 그리드 레이아웃 (auto-fill)
- ✅ 이미지/영상 구분
- ✅ 스크롤 가능 (max-height: 300px)

### 3. 폼 입력
- ✅ 제목 (필수)
- ✅ 날짜 (필수, 자동 설정)
- ✅ 카테고리 (필수, 6가지)
- ✅ 설명 (선택)

### 4. 유효성 검사
- ✅ 필수 항목 체크
- ✅ 상세 에러 로깅
- ✅ 포커스 이동
- ✅ 알림 메시지

### 5. 업로드
- ✅ Base64 인코딩
- ✅ API 전송 (POST /api/photos)
- ✅ 진행 상황 로깅
- ✅ 완료 후 초기화

---

## 📊 요약

| 항목 | 값 |
|------|-----|
| **레이아웃** | 2열 그리드 (Desktop), 1열 (Mobile) |
| **파일 선택 영역** | 왼쪽, 점선 테두리, 호버 효과 |
| **입력 폼** | 오른쪽, 4개 필드 + 버튼 |
| **필수 입력** | 제목, 날짜, 카테고리, 파일 |
| **선택 입력** | 설명 |
| **카테고리** | 일상, 미용사진, 여행, 친구들, 특별한 날 |
| **지원 파일** | JPG, PNG, GIF, MP4 |
| **최대 크기** | 10MB (설명만, 실제 제한 없음) |
| **미리보기** | 그리드, 100px 썸네일 |

---

## 🔗 관련 파일

- **HTML**: `/home/user/webapp/kimchi-gallery.html` (249-308줄)
- **CSS**: `/home/user/webapp/css/kimchi-style.css` (836-958줄)
- **JavaScript**: `/home/user/webapp/js/kimchi-gallery.js` (540-680줄)

---

**업로드 섹션 구성 문서 완료!** 📸✨
