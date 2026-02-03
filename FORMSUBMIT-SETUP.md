# 문의하기 폼 - FormSubmit.co 설정 가이드 📧

## ⚠️ 중요: 첫 사용 시 이메일 인증 필요

**FormSubmit.co**는 첫 번째 폼 제출 시 **firemaster532nd@gmail.com**으로 인증 메일을 보냅니다.

---

## 🔐 인증 절차 (최초 1회만)

### 1단계: 테스트 문의 제출
1. 메인 페이지 접속: https://8000-iuas78bjc2ylvi9b30jh1-82b888ba.sandbox.novita.ai/
2. 하단 "문의하기" 섹션으로 스크롤
3. 테스트 데이터 입력:
   ```
   이름: 테스트
   회사명: (비워도 됨)
   연락처: 010-1234-5678
   이메일: test@example.com
   문의 유형: 견적 문의
   문의내용: FormSubmit 인증 테스트입니다.
   ```
4. "문의하기" 버튼 클릭
5. FormSubmit 확인 페이지로 리다이렉트됨

### 2단계: 이메일 인증 (firemaster532nd@gmail.com)
1. **firemaster532nd@gmail.com** 받은편지함 확인
2. 발신자: **FormSubmit** (no-reply@formsubmit.co)
3. 제목: **Confirm your email address for FormSubmit**
4. 이메일 내용:
   ```
   Hello,
   
   We received a form submission from your website to firemaster532nd@gmail.com.
   
   Please click the button below to confirm your email address and activate form submissions.
   
   [Confirm Email Address] ← 이 버튼 클릭!
   ```
5. **"Confirm Email Address"** 버튼 클릭
6. 브라우저에서 확인 완료 메시지 표시

### 3단계: 인증 완료!
인증 후 모든 문의는 자동으로 **firemaster532nd@gmail.com**로 전송됩니다!

---

## 📬 인증 후 수신 이메일 형식

### 제목
```
[EZ Solution] 새로운 문의가 접수되었습니다
```

### 발신자
```
FormSubmit <no-reply@formsubmit.co>
```

### 본문 (Table 템플릿)
```
┌──────────────────────────────────────┐
│  EZ Solution 문의 내역               │
└──────────────────────────────────────┘

이름:      홍길동
회사명:    ABC건설
연락처:    010-1234-5678
이메일:    hong@example.com
문의유형:  견적 문의

문의내용:
인천 오피스 빌딩 내화채움공사 견적 문의드립니다.
규모는 약 5000㎡이며, 자세한 상담 부탁드립니다.

──────────────────────────────────────
Sent via FormSubmit.co
```

---

## 🎯 FormSubmit.co 특징

### 장점
- ✅ **완전 무료** (제한 없음)
- ✅ **설정 간단** (이메일 인증만 필요)
- ✅ **스팸 방지** (Honeypot 필드 포함)
- ✅ **커스텀 템플릿** (Table, Box, Basic)
- ✅ **안정적인 전송**
- ✅ **무제한 전송** (무료)

### Hidden 필드 설정
```html
<input type="hidden" name="_subject" value="[EZ Solution] 새로운 문의가 접수되었습니다">
<input type="hidden" name="_template" value="table">
<input type="hidden" name="_captcha" value="false">
<input type="text" name="_honey" style="display:none">
```

- `_subject`: 이메일 제목 커스터마이징
- `_template`: 이메일 디자인 (table, box, basic)
- `_captcha`: reCAPTCHA 비활성화
- `_honey`: 스팸봇 방지용 Honeypot

---

## 🧪 테스트 방법

### 인증 전 (최초 1회)
1. 폼 제출
2. FormSubmit 확인 페이지로 이동
3. firemaster532nd@gmail.com에서 인증 메일 확인
4. "Confirm Email Address" 버튼 클릭

### 인증 후
1. 폼 제출
2. FormSubmit 확인 페이지로 이동
3. **firemaster532nd@gmail.com에 바로 이메일 도착!** ✅

---

## 🔄 폼 동작 흐름

### 사용자 관점
```
1. 폼 작성
   ↓
2. "문의하기" 버튼 클릭
   ↓
3. FormSubmit 확인 페이지로 이동
   (URL: https://formsubmit.co/confirm)
   ↓
4. "문의가 접수되었습니다" 메시지 표시
```

### 관리자 관점 (인증 후)
```
1. 사용자가 폼 제출
   ↓
2. FormSubmit이 이메일 전송
   ↓
3. firemaster532nd@gmail.com 수신
   ↓
4. 이메일 확인 및 답변
```

---

## 🌐 확인 링크

### 메인 페이지
https://8000-iuas78bjc2ylvi9b30jh1-82b888ba.sandbox.novita.ai/

### 문의하기 섹션
https://8000-iuas78bjc2ylvi9b30jh1-82b888ba.sandbox.novita.ai/#contact

### Pull Request
https://github.com/firemaster532nd-tech/hi/pull/1

---

## 📝 Git 커밋 정보

### Commit ID
- **main**: `c303572`
- **genspark_ai_developer**: `6fc314b`

### 커밋 메시지
```
fix: use FormSubmit.co with native form POST for reliable email delivery
```

### 변경 파일
- `index.html`: Form action 추가, hidden 필드 설정, 필드명 한글화
- `script.js`: AJAX 제거, 기본 POST 방식 사용

### 변경 사항
- ✅ FormSubmit.co로 변경
- ✅ 기본 HTML form POST 사용
- ✅ 페이지 리다이렉트 방식 (확인 페이지)
- ✅ Table 템플릿 사용
- ✅ Honeypot 스팸 방지

---

## 🐛 문제 해결

### 인증 메일이 오지 않는 경우

**1. 스팸 폴더 확인**
- Gmail 스팸함 확인
- 발신자: `no-reply@formsubmit.co`
- 제목: "Confirm your email address for FormSubmit"

**2. 정확한 이메일 주소 확인**
```html
<form action="https://formsubmit.co/firemaster532nd@gmail.com" method="POST">
```

**3. 다시 테스트 제출**
- 폼을 다시 제출하면 인증 메일 재전송

**4. 이메일 필터 확인**
- Gmail 설정 → 필터 및 차단된 주소
- `formsubmit.co`가 차단되지 않았는지 확인

### 인증 후에도 메일이 오지 않는 경우

**1. 인증 완료 확인**
- 인증 버튼 클릭 후 "Email confirmed!" 메시지 확인

**2. 폼 재제출**
- 인증 후 새로운 문의 제출

**3. FormSubmit 대시보드 확인**
- https://formsubmit.co/dashboard
- firemaster532nd@gmail.com으로 로그인
- 제출 내역 확인

**4. 스팸 폴더 확인**
- 일반 문의 메일도 스팸으로 분류될 수 있음

---

## 📊 FormSubmit.co vs 다른 서비스

| 서비스 | 인증 필요 | 무료 한도 | AJAX | 안정성 |
|--------|----------|----------|------|--------|
| **FormSubmit.co** | ✅ 1회 | 무제한 | ❌ | ⭐⭐⭐⭐⭐ |
| Web3Forms | ❌ | 월 250건 | ✅ | ⭐⭐⭐ |
| Formspree | ❌ | 월 50건 | ✅ | ⭐⭐⭐⭐ |
| EmailJS | ❌ | 월 200건 | ✅ | ⭐⭐⭐⭐ |

**결론**: FormSubmit.co가 가장 안정적이고 무제한 무료! 🎯

---

## 💡 장점 vs 단점

### 장점
- ✅ 완전 무료, 무제한 전송
- ✅ 설정 매우 간단 (이메일 인증만)
- ✅ 안정적인 전송 보장
- ✅ 스팸 방지 기능
- ✅ 커스텀 템플릿 지원
- ✅ API 키 불필요

### 단점
- ⚠️ 페이지 리다이렉트 (AJAX 아님)
- ⚠️ 첫 사용 시 이메일 인증 필요
- ⚠️ 확인 페이지로 이동됨

---

## 🎉 사용 방법 요약

### 최초 설정 (1회만)
1. ✅ 테스트 문의 제출
2. ✅ firemaster532nd@gmail.com에서 인증 메일 확인
3. ✅ "Confirm Email Address" 버튼 클릭
4. ✅ 인증 완료!

### 이후 사용
1. ✅ 고객이 문의 제출
2. ✅ firemaster532nd@gmail.com에 자동 전송
3. ✅ 이메일 확인 및 답변

---

## 📞 추가 문의

문제가 계속되면:
- **이메일**: firemaster532nd@gmail.com
- **전화**: 070-6455-0300
- **FormSubmit 지원**: https://formsubmit.co/help

---

## 🚀 다음 단계

### 선택사항: 고급 기능

**1. 커스텀 리다이렉트 URL**
```html
<input type="hidden" name="_next" value="https://yourdomain.com/thanks.html">
```

**2. reCAPTCHA 활성화**
```html
<input type="hidden" name="_captcha" value="true">
```

**3. 자동 응답 이메일**
```html
<input type="hidden" name="_autoresponse" value="감사합니다. 빠른 시일 내에 연락드리겠습니다.">
```

**4. CC 수신자 추가**
```html
<input type="hidden" name="_cc" value="backup@example.com">
```

---

**작성일**: 2026-02-03  
**버전**: 3.0.0 (FormSubmit.co - Native POST)  
**상태**: ✅ 인증 대기 중

## ⚠️ 지금 해야 할 일

**즉시 실행하세요:**
1. 메인 페이지에서 테스트 문의 제출
2. firemaster532nd@gmail.com 받은편지함 확인
3. FormSubmit 인증 메일에서 "Confirm Email Address" 클릭
4. 인증 완료 후 다시 테스트!

**인증 완료 후 모든 문의가 자동으로 전송됩니다!** 🎊
