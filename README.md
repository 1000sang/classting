# 클래스팅 과제

## Description

자세한 문서는 아래 링크를 참고해주세요

https://1000sang.notion.site/a834d2fc81ad4251842089e23a204b73?pvs=4

## Requirement
- docker
- docker-compose

## Installation
```angular2html
# docker 설치
$ brew install cask docker

# docker-compose 설치
$ brew install cask docker-compose

```

## Environment
```angular2html
# .env file

ENV=dev
DB_USER=admin
DB_PASSWORD=admin1234
DB_PORT=5432
DB_HOST=postgres
DB_NAME=classting
SECRET_KEY=secretKey
```

## Running the app

```
$ docker compose up
```

## Test
```angular2html
$ cd server

# test coverage
$ npm run test:cov
```
