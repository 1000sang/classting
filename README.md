# Petdeasonson Project

## Description

반려동물 종합관리 앱

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
nodemon    

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
