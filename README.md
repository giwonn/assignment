# Assignment

## 실행 방법

### 개발 환경 실행
```
1. docker compose -f docker-compose.infra.yml up -d
2. npm install
3. npm run dev
```

### 운영 환경 실행
```
1. docker compose build // 이미지 빌드
2. docker compose up -d // 서버 실행
3. docker down // 서버 종료
```
