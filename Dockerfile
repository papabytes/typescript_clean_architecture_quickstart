FROM node:18 as build
WORKDIR /build
COPY package.json package.json
RUN npm install
COPY . .
RUN npm run build

FROM node:18-alpine3.20 as final
WORKDIR /app
COPY --from=build /build/node_modules node_modules
COPY --from=build /build/dist .
ENTRYPOINT [ "node" "app.js" ]
