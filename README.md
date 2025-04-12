# 🚀 plz 프로젝트

Vite + SCSS 기반의 정적 사이트 프로젝트입니다.  
GitHub Pages 배포 및 전달용 빌드가 분리되어 있습니다.

---

## 📁 폴더 구조

```
📁 src/
├── pages/        # HTML 페이지들
├── components/   # header, footer 등 핸들바 컨포넌트
├── js/           # main.js, 페이지별 JS, 공통 모듈
├── scss/         # main.scss, layout, utils, components 등
📁 public/
└── assets/       # 정적 이미지, 폰트 등
```

---

## 🛠️ 사용 방법

```bash
# 의존성 설치
npm install

# 로컬 개발 서버 실행
npm run dev

# 외부 개발 서버 연동용
npm run dev:remote
```

---

## 🏗️ 빌드

```bash
# GitHub Pages 배포용 빌드
npm run build:pages

# 전달용 로컬 빌드
npm run build:local
```

- `dist/` → GitHub Pages용 (절대경로 `/plz/`)
- `build/` → 디자이너 전달용 (상대 경로 `./`)

---

## 🌐 배포

```bash
# GitHub Pages에 배포
npm run deploy
```

> 🔗 https://richosj.github.io/plz/

---

## ⚙️ 환경 변수

| 모드             | 파일명              | 설명                           |
|------------------|----------------------|--------------------------------|
| 로컬 개발        | `.env.localdev`      | `VITE_IMAGE_PATH=/assets/images` |
| 외부 개발 서버   | `.env.dev`           | 서버 API 등 연동 시 사용       |
| GitHub Pages     | `.env.ghpages`       | 절대 경로로 설정               |
| 로컬 전달용 빌드 | `.env.localbuild`    | 상대 경로로 설정               |

---

## 🎨 SCSS 구조

- `main.scss` 기준으로 전체 통합 관리
- `@use` / `@forward` 방식으로 모듈화
- 이미지 경로는 `$image-path` 변수로 제어 (모드별 다르게 적용)

```scss
background: url('#{$image-path}/login-bg.svg');
```

---

## 💬 기타

- 템플릿 엔진: Handlebars
- Vite 핫리로드 및 재시작 자동화 플러그인 적용
- 페이지별 JS는 필요한 경우 `about.js`처럼 별도 분리 가능
- GitHub Pages용은 `base: '/plz/'` 자동 적용됨

---

## 👨‍💻 Author

- 오승준 ([@richosj](https://github.com/richosj))