# 클래스팅 과제

## Description

자세한 문서는 아래 링크를 참고해주세요
https://1000sang.notion.site/a834d2fc81ad4251842089e23a204b73?pvs=4

## Getting Started

```
$ docker compose up --build
```

### Dependencies

다음 프로그램이 설치되어 있어야 합니다.

node   
npm  
docker  
nestjs    
 

## Package Structure (계층형)
```html
nest
├── src
│   ├── app
│   ├── auth
│   │   ├── dto
│   │   ├── errors
│   │   └── jwt
│   ├── common
│   │   ├── consts
│   │   ├── decorators
│   │   ├── dtos
│   │   ├── entities
│   │   ├── errors
│   │   ├── exceptions
│   │   ├── interceptors
│   │   ├── responses
│   │   └── utils
│   ├── config
│   │   └── database
│   │       ├── mysql
│   │       └── postgres
│   ├── main.ts
│   └── users
│       ├── dto
│       └── entities
```
