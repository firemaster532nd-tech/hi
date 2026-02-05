# 🔧 갤러리 업로드 문제 해결 가이드

## 📋 문제 상황
**사진/영상 업로드 시 사진첩 섹션에 카드가 추가되지 않음**

---

## 🧪 테스트 방법

### 1단계: 테스트 페이지 사용
🔗 **테스트 페이지**: https://8000-iwzj5lfq6ruydrdcgro8q-82b888ba.sandbox.novita.ai/test-gallery-upload.html

#### 할 수 있는 것:
- ✅ localStorage 상태 확인
- ✅ 테스트 사진 자동 추가
- ✅ localStorage 초기화
- ✅ 갤러리 페이지로 이동

#### 사용 방법:
1. 테스트 페이지 열기
2. "테스트 사진 추가" 버튼 클릭
3. "갤러리 페이지로 이동" 버튼 클릭
4. 사진첩 섹션에서 사진 확인

---

### 2단계: 실제 업로드 테스트
🔗 **갤러리 페이지**: https://8000-iwzj5lfq6ruydrdcgro8q-82b888ba.sandbox.novita.ai/kimchi-gallery.html

#### 업로드 순서:
1. **사진/영상 업로드 섹션**으로 스크롤
2. **"파일 선택"** 버튼 클릭
3. 이미지 파일 선택 (JPG, PNG 등)
4. 업로드 박스 내에서 **미리보기 확인**
5. 폼 작성:
   - 제목 입력
   - 촬영 날짜 선택
   - 카테고리 선택 (일상, 미용사진, 여행, 친구들, 특별한 날)
   - 설명 입력 (선택)
6. **"업로드하기"** 버튼 클릭
7. "업로드가 완료되었습니다!" 알림 확인
8. 자동으로 사진첩 섹션으로 스크롤

---

### 3단계: 개발자 도구로 디버깅

#### 콘솔 열기:
- Windows: `F12` 또는 `Ctrl + Shift + I`
- Mac: `Cmd + Option + I`

#### 확인할 로그:
```
Upload button clicked
Form values: {title: "...", date: "...", category: "...", description: "..."}
Selected files: [...]
Starting upload process...
Processing file 1/1: image.jpg
File 1 loaded successfully
Adding photo to gallery
GalleryManager.addPhoto called with: {...}
Photo saved. Total photos: 1
renderPhotos called
Gallery element found
Removing 0 existing dynamic items
Adding 1 photos to gallery
Creating element for photo 1: ...
Photos added to DOM
Upload progress: 1/1
All files uploaded successfully
```

---

## 🔍 문제 진단 체크리스트

### ✅ JavaScript 로드 확인
```javascript
// 콘솔에서 실행
console.log(typeof galleryManager); // "object"가 출력되어야 함
console.log(galleryManager.photos.length); // 업로드된 사진 개수
```

### ✅ localStorage 확인
```javascript
// 콘솔에서 실행
console.log(localStorage.getItem('kimchi_photos'));
```

### ✅ DOM 요소 확인
```javascript
// 콘솔에서 실행
console.log(document.getElementById('uploadBtn')); // 버튼이 존재해야 함
console.log(document.getElementById('fileInput')); // input이 존재해야 함
console.log(document.querySelector('.masonry-gallery')); // 갤러리가 존재해야 함
```

---

## 🐛 자주 발생하는 문제

### 1. 파일이 선택되지 않음
**증상**: 파일 선택 후 미리보기가 표시되지 않음

**해결**:
- 파일 입력 클릭 후 파일을 제대로 선택했는지 확인
- 지원되는 파일 형식인지 확인 (JPG, PNG, GIF, MP4)
- 파일 크기가 10MB 이하인지 확인

### 2. 폼 유효성 검사 실패
**증상**: "제목을 입력해주세요" 등의 알림

**해결**:
- 제목, 날짜, 카테고리를 모두 입력했는지 확인
- 파일을 선택했는지 확인

### 3. 업로드 후 사진이 보이지 않음
**증상**: "업로드가 완료되었습니다!" 알림 후 사진이 없음

**해결 방법 A - 페이지 새로고침**:
```
Ctrl + Shift + R (강력 새로고침)
```

**해결 방법 B - 필터 확인**:
- 사진첩 상단의 필터 버튼 확인
- "전체보기" 버튼 클릭
- 업로드한 카테고리 버튼 클릭

**해결 방법 C - 콘솔 확인**:
```javascript
// localStorage 확인
const photos = JSON.parse(localStorage.getItem('kimchi_photos'));
console.log('Total photos:', photos.length);
photos.forEach((p, i) => console.log(`${i+1}. ${p.title} - ${p.category}`));

// 강제 렌더링
galleryManager.renderPhotos();
```

### 4. 캐시 문제
**증상**: 변경 사항이 적용되지 않음

**해결**:
- 강력 새로고침: `Ctrl + Shift + R` (Windows) / `Cmd + Shift + R` (Mac)
- 시크릿 모드에서 테스트

---

## 🔧 수동 수정 방법

### localStorage 직접 추가
콘솔에서 다음 코드를 실행하여 테스트 사진 추가:

```javascript
const testPhoto = {
    title: '테스트 사진',
    date: '2024-02-04',
    category: 'daily',
    description: '테스트 설명',
    dataUrl: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8DwHwAFBQIAX8jx0gAAAABJRU5ErkJggg==',
    uploadDate: new Date().toISOString()
};

let photos = JSON.parse(localStorage.getItem('kimchi_photos') || '[]');
photos.push(testPhoto);
localStorage.setItem('kimchi_photos', JSON.stringify(photos));
alert('테스트 사진 추가됨! 페이지를 새로고침하세요.');
location.reload();
```

---

## 📊 정상 작동 확인

### 업로드 성공 시:
1. ✅ "업로드가 완료되었습니다!" 알림
2. ✅ 사진첩 섹션으로 자동 스크롤
3. ✅ 왼쪽 상단(카드1)에 새 사진 표시
4. ✅ 폼 필드 초기화
5. ✅ 미리보기 영역 숨김

### 콘솔 로그 (정상):
```
Upload button clicked
Form values: {title: "산책하는 김치", date: "2024-02-04", category: "daily", ...}
Selected files: [File]
Starting upload process...
Processing file 1/1: image.jpg
File 1 loaded successfully
Adding photo to gallery
GalleryManager.addPhoto called with: {...}
Photo saved. Total photos: 1
renderPhotos called
✅ 모든 로그 정상
```

---

## 🆘 여전히 안 될 때

### 1. localStorage 초기화
```javascript
localStorage.clear();
location.reload();
```

### 2. 테스트 페이지로 확인
https://8000-iwzj5lfq6ruydrdcgro8q-82b888ba.sandbox.novita.ai/test-gallery-upload.html

### 3. 브라우저 콘솔에서 에러 확인
- 빨간색 에러 메시지 확인
- 스크린샷 캡처

---

## 📱 연락처

문제가 계속되면 다음 정보와 함께 알려주세요:
1. 어떤 단계에서 문제가 발생하는지
2. 콘솔 로그 스크린샷
3. localStorage 상태 (`localStorage.getItem('kimchi_photos')`)

---

**최종 업데이트**: 2024-02-04
