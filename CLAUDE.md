# CLAUDE.md

반려라이프 공식 회사소개 사이트(banlife.kr) 소스 레포. 작업 전 이 파일을 먼저 읽는다.

## 구조
- 정적 HTML/CSS/JS 사이트. 빌드 없음, 패키지 설치 없음.
- 주요 파일: `index.html`, `styles.css`, `script.js`, `manifest.json`, `sitemap.xml`, `robots.txt`, `.htaccess`, `CNAME`(banlife.kr), `assets/`
- 서비스 소개와 연락처는 `README.md`에 있다. 여기에 중복해서 적지 않는다.

## 로컬 실행
```
python3 -m http.server 8000
```
브라우저에서 http://localhost:8000 을 연다.

## 배포 경로
- 호스팅: GitHub Pages (legacy), https 강제. 도메인 banlife.kr, DNS A 레코드 185.199.108~111.153.
- `.github/workflows/deploy.yml`: `main` push 시 자동 배포.
- 같은 워크플로가 PR에서도 실행된다. PR 단계에서 운영에 반영되는지는 UNVERIFIED로 본다.
- GitHub Pages는 `.htaccess`를 적용하지 않는다. 리다이렉트나 헤더 설정을 이 파일에 의존하지 않는다.

## 주의
- 공개 레포다. 비밀값(API 키, `.env`), 고객정보, 내부문서를 커밋하지 않는다.
- `main` push는 즉시 운영 반영이다. 대표 확인 후에만 push하거나 머지한다.
- 스마트스토어 상품 이미지와 상세 콘텐츠를 삭제하지 않는다.
- 대용량 temp 폴더(`assets/img/temp/`, `.gitignore` 처리됨)를 커밋하지 않는다.
- 기준 스냅샷(2025-12-24): 운영 `index.html`, `styles.css`, `script.js`는 `main`과 바이트 동일했다.
