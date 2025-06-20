# 반려라이프 웹사이트 배포 가이드

GitHub Pages를 통해 banlife.kr 도메인으로 웹사이트를 배포하는 방법을 안내합니다.

## 📋 준비사항

1. GitHub 계정
2. banlife.kr 도메인 (도메인 관리 권한 필요)
3. Git 설치

## 🚀 배포 단계

### 1. GitHub 저장소 생성

1. GitHub에서 새 저장소를 생성합니다
   - 저장소 이름: `banryeolife-website` (또는 원하는 이름)
   - Public으로 설정
   - README 파일 생성 체크

### 2. 코드 업로드

```bash
# 로컬에서 Git 초기화
git init
git add .
git commit -m "Initial commit: 반려라이프 웹사이트"

# GitHub 원격 저장소 연결
git remote add origin https://github.com/[YOUR_USERNAME]/[YOUR_REPOSITORY].git
git branch -M main
git push -u origin main
```

### 3. GitHub Pages 활성화

1. GitHub 저장소의 **Settings** 탭으로 이동
2. 왼쪽 사이드바에서 **Pages** 클릭
3. Source 설정:
   - **Deploy from a branch** 선택
   - Branch: **main** 선택
   - Folder: **/ (root)** 선택
4. **Save** 클릭

### 4. GitHub Actions 설정 (자동 배포)

1. 저장소의 **Actions** 탭으로 이동
2. 이미 생성된 `.github/workflows/deploy.yml` 파일이 자동으로 실행됩니다
3. 배포 상태를 확인하고 완료될 때까지 대기

### 5. 커스텀 도메인 설정

#### A. GitHub에서 도메인 설정
1. GitHub 저장소 **Settings > Pages**로 이동
2. **Custom domain** 섹션에 `banlife.kr` 입력
3. **Save** 클릭
4. **Enforce HTTPS** 체크박스 활성화 (DNS 설정 후)

#### B. 도메인 DNS 설정
도메인 관리 업체(예: 가비아, 호스팅케이알)에서 다음 DNS 레코드를 설정:

**방법 1: CNAME 레코드 (권장)**
```
Type: CNAME
Name: www
Value: [YOUR_USERNAME].github.io
TTL: 300 (또는 기본값)
```

**방법 2: A 레코드**
```
Type: A
Name: @
Value: 185.199.108.153
TTL: 300

Type: A
Name: @
Value: 185.199.109.153
TTL: 300

Type: A
Name: @
Value: 185.199.110.153
TTL: 300

Type: A
Name: @
Value: 185.199.111.153
TTL: 300
```

**CNAME 레코드 (www 서브도메인)**
```
Type: CNAME
Name: www
Value: [YOUR_USERNAME].github.io
TTL: 300
```

### 6. SSL 인증서 설정

1. DNS 설정이 완료된 후 24-48시간 대기
2. GitHub Pages에서 자동으로 Let's Encrypt SSL 인증서 발급
3. **Enforce HTTPS** 옵션이 활성화되면 체크

## 🔧 추가 설정

### Analytics 추가 (선택사항)

Google Analytics를 추가하려면 `index.html`의 `<head>` 섹션에 추가:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

### 검색엔진 등록

1. **Google Search Console**
   - https://search.google.com/search-console
   - banlife.kr 속성 추가
   - sitemap.xml 제출

2. **네이버 웹마스터도구**
   - https://searchadvisor.naver.com
   - 사이트 등록 및 sitemap.xml 제출

## 📁 파일 구조

배포 후 다음과 같은 구조가 됩니다:

```
banryeolife-website/
├── .github/
│   └── workflows/
│       └── deploy.yml          # 자동 배포 설정
├── index.html                  # 메인 페이지
├── styles.css                  # 스타일시트
├── script.js                   # JavaScript
├── CNAME                       # 커스텀 도메인 설정
├── robots.txt                  # 검색엔진 크롤링 설정
├── sitemap.xml                 # 사이트맵
├── README.md                   # 프로젝트 설명
└── DEPLOYMENT_GUIDE.md         # 이 파일
```

## 🌐 접속 URL

- **메인 도메인**: https://banlife.kr
- **www 서브도메인**: https://www.banlife.kr (자동 리다이렉트)
- **GitHub Pages 기본 URL**: https://[YOUR_USERNAME].github.io/[YOUR_REPOSITORY]

## 🔍 배포 확인

1. 브라우저에서 https://banlife.kr 접속
2. 모든 페이지와 링크가 정상 작동하는지 확인
3. 모바일에서도 정상 표시되는지 확인
4. Google PageSpeed Insights로 성능 확인

## 🛠 업데이트 방법

웹사이트를 업데이트하려면:

```bash
# 파일 수정 후
git add .
git commit -m "업데이트 내용 설명"
git push origin main
```

GitHub Actions가 자동으로 배포를 진행합니다.

## ❗ 주의사항

1. DNS 설정은 최대 48시간이 소요될 수 있습니다
2. HTTPS 인증서 발급은 DNS 설정 완료 후 가능합니다
3. 도메인 연결 후 캐시 때문에 즉시 반영되지 않을 수 있습니다
4. 문제 발생 시 GitHub Pages 상태 페이지를 확인하세요

## 📞 지원

배포 과정에서 문제가 발생하면:
- GitHub Pages 문서: https://docs.github.com/en/pages
- 도메인 업체 고객센터 문의
- DNS 설정 확인: https://www.whatsmydns.net

---

🎉 성공적인 배포를 위해 단계별로 차근차근 진행하세요! 