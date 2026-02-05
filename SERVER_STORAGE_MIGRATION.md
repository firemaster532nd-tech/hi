# 서버 저장소 마이그레이션 가이드

## 🎯 문제점 해결

### 이전 문제
- **localStorage 사용**: 각 사용자 브라우저에만 데이터 저장
- **데이터 불일치**: 다른 사용자가 다른 데이터를 봄
- **업로드 불안정**: 브라우저마다 업로드 결과가 다름

### 해결 방법
- **서버 기반 저장소**: Node.js + Express 백엔드
- **공유 데이터**: 모든 사용자가 동일한 데이터를 봄
- **영구 저장**: JSON 파일로 서버에 저장

---

## 📁 프로젝트 구조

```
/home/user/webapp/
├── server.js              # Node.js 서버 (Express)
├── package.json           # npm 패키지 설정
├── data/                  # 데이터 저장 디렉토리
│   ├── photos.json        # 사진 데이터
│   └── videos.json        # 영상 데이터
├── js/
│   ├── kimchi-gallery.js  # 갤러리 관리 (서버 API 사용)
│   └── kimchi-script.js   # 기타 스크립트
├── css/
│   └── kimchi-style.css
└── *.html                 # HTML 페이지들
```

---

## 🚀 서버 구조

### 1. Express 서버 (server.js)

**포트**: 3000  
**데이터 저장**: `/home/user/webapp/data/`

**주요 기능**:
- 정적 파일 서빙 (HTML, CSS, JS, 이미지)
- RESTful API 제공
- JSON 파일로 데이터 영구 저장
- CORS 활성화

---

## 🔌 API 엔드포인트

### 사진 API

| 메서드 | 경로 | 설명 | 요청 본문 | 응답 |
|--------|------|------|-----------|------|
| GET | `/api/photos` | 모든 사진 조회 | - | `{ success: true, data: [...] }` |
| POST | `/api/photos` | 사진 추가 | `{ title, date, category, description, dataUrl }` | `{ success: true, data: {...} }` |
| PUT | `/api/photos/:id` | 사진 수정 | `{ title?, date?, category?, description? }` | `{ success: true, data: {...} }` |
| DELETE | `/api/photos/:id` | 사진 삭제 | - | `{ success: true }` |

### 영상 API

| 메서드 | 경로 | 설명 | 요청 본문 | 응답 |
|--------|------|------|-----------|------|
| GET | `/api/videos` | 모든 영상 조회 | - | `{ success: true, data: [...] }` |
| POST | `/api/videos` | 영상 추가 | `{ title, date, description, dataUrl }` | `{ success: true, data: {...} }` |
| PUT | `/api/videos/:id` | 영상 수정 | `{ title?, date?, description? }` | `{ success: true, data: {...} }` |
| DELETE | `/api/videos/:id` | 영상 삭제 | - | `{ success: true }` |

---

## 💻 클라이언트 변경 사항

### GalleryManager 클래스 수정

**이전 (localStorage)**:
```javascript
loadPhotos() {
    const stored = localStorage.getItem('kimchi_photos');
    return stored ? JSON.parse(stored) : [];
}

savePhotos() {
    localStorage.setItem('kimchi_photos', JSON.stringify(this.photos));
}
```

**현재 (서버 API)**:
```javascript
async loadPhotos() {
    const response = await fetch(`${API_BASE}/api/photos`);
    const result = await response.json();
    if (result.success) {
        this.photos = result.data;
    }
}

async savePhoto(photo) {
    const response = await fetch(`${API_BASE}/api/photos`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(photo)
    });
    return await response.json();
}
```

---

## 🔄 데이터 흐름

### 업로드 프로세스

```
1. 사용자가 파일 선택
   ↓
2. FileReader로 Base64 변환
   ↓
3. fetch POST /api/photos (데이터 전송)
   ↓
4. 서버가 data/photos.json에 저장
   ↓
5. 서버가 응답 (저장된 데이터 + ID)
   ↓
6. 클라이언트가 화면 업데이트
   ↓
7. 모든 사용자가 동일한 데이터 확인 ✅
```

### 조회 프로세스

```
1. 페이지 로드 (DOMContentLoaded)
   ↓
2. GalleryManager.init() 호출
   ↓
3. fetch GET /api/photos (데이터 요청)
   ↓
4. 서버가 data/photos.json 읽기
   ↓
5. 서버가 JSON 응답
   ↓
6. 클라이언트가 this.photos에 저장
   ↓
7. renderPhotos() 호출 → 화면에 표시
```

---

## 🎨 주요 기능 유지

### 1. 페이지네이션 (9개씩)
- 전체보기: 최신 9개
- 카테고리별: 해당 카테고리 9개씩
- 이전/다음 페이지 버튼

### 2. 필터링
- 전체보기
- 일상
- 미용사진
- 여행
- 친구들
- 특별한 날

### 3. 이미지 초점
- `object-position: center 35%`
- 강아지 중심 정렬

### 4. 최신순 정렬
- `[...photos].reverse()`
- 최신 업로드가 카드1에 표시

---

## 🛠️ 서버 실행 방법

### 1. 의존성 설치
```bash
cd /home/user/webapp
npm install
```

### 2. 서버 시작
```bash
node server.js
```

### 3. 서버 상태 확인
```bash
curl http://localhost:3000/api/photos
```

---

## 🌐 접속 URL

| 환경 | URL |
|------|-----|
| 로컬 | `http://localhost:3000` |
| 샌드박스 | `https://3000-iwzj5lfq6ruydrdcgro8q-82b888ba.sandbox.novita.ai` |

**페이지**:
- 메인: `/kimchi-home.html`
- 갤러리: `/kimchi-gallery.html`
- 역사: `/kimchi-history.html`
- API 테스트: `/api/photos`, `/api/videos`

---

## 📝 데이터 형식

### 사진 데이터 (photos.json)
```json
[
  {
    "id": "1738719998123",
    "title": "산책하는 김치",
    "date": "2024-02-04",
    "category": "daily",
    "description": "즐거운 산책",
    "dataUrl": "data:image/jpeg;base64,...",
    "uploadDate": "2026-02-05T01:26:38.123Z"
  }
]
```

### 영상 데이터 (videos.json)
```json
[
  {
    "id": "1738720001456",
    "title": "김치의 재롱",
    "date": "2024-02-03",
    "description": "귀여운 모습",
    "dataUrl": "data:video/mp4;base64,...",
    "uploadDate": "2026-02-05T01:30:01.456Z"
  }
]
```

---

## ✅ 문제 해결 확인

### 테스트 시나리오

#### 시나리오 1: 여러 브라우저에서 동일한 데이터 확인
1. **브라우저 A**에서 사진 업로드
2. **브라우저 B**에서 새로고침
3. **결과**: 두 브라우저 모두 동일한 사진 확인 ✅

#### 시나리오 2: 업로드 안정성
1. 사진 3장 업로드
2. 페이지 새로고침
3. **결과**: 3장 모두 유지됨 ✅

#### 시나리오 3: 다른 사용자 접속
1. 사용자 A가 5장 업로드
2. 사용자 B가 접속
3. **결과**: 사용자 B도 5장 확인 ✅

---

## 🔧 문제 해결

### 문제 1: 서버가 시작되지 않음
```bash
# 포트 확인
lsof -i :3000

# 다른 프로세스 종료 후 재시작
pkill -f "node server.js"
node server.js
```

### 문제 2: API 응답 없음
```bash
# 서버 로그 확인
cd /home/user/webapp
tail -f server.log

# API 테스트
curl http://localhost:3000/api/photos
```

### 문제 3: 데이터가 저장되지 않음
```bash
# 데이터 파일 확인
cat /home/user/webapp/data/photos.json

# 권한 확인
ls -la /home/user/webapp/data/
```

---

## 📊 성능 최적화

### 현재 구현
- Base64 인코딩으로 이미지 저장
- JSON 파일 직접 읽기/쓰기
- 동기적 파일 I/O

### 향후 개선 가능
- 이미지를 별도 파일로 저장
- 데이터베이스 사용 (MongoDB, PostgreSQL)
- 이미지 압축 및 최적화
- CDN 사용

---

## 🎉 마이그레이션 완료!

**변경 사항 요약**:
1. ✅ localStorage → 서버 저장소
2. ✅ 모든 사용자 동일 데이터
3. ✅ 안정적인 업로드
4. ✅ 영구 데이터 저장
5. ✅ RESTful API 제공

**다음 단계**:
- 실제 이미지 파일 업로드로 전환 (선택 사항)
- 사용자 인증 추가 (선택 사항)
- 이미지 최적화 (선택 사항)

---

## 📞 지원

문제가 발생하면 다음을 확인하세요:
1. 서버가 실행 중인지 확인
2. 브라우저 콘솔에서 오류 확인
3. `/api/photos` API 직접 테스트
4. `data/photos.json` 파일 확인

**현재 버전**: 1.0.0  
**마지막 업데이트**: 2026-02-05
