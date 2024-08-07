# Typescript Clean architecture Quickstart

## Introduction
This project serves as project template/code boilerplate for a typescript based web api with basic user management integration using MongoDB with the Mongoose package.  
  
  To boot up the project run
```bash
npm install && npm start
```

## Building and running the project in release mode
```bash
npm run build && node ./dist/main.js
```

## Docker Compability
You can easily boot all dependencies using Docker Compose by running:
```bash
docker compose -f docker-compose.yaml -f docker-compose.override.example.yaml up -d
```

## Notes
This project uses nodemon for the start command which helps you "hot-reload" the project without having to manually restart the application process.




