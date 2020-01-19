FROM node:9.8.0-onbuild as builder
COPY . .
RUN yarn
RUN ./node_modules/@angular/cli/bin/ng build

FROM nginx:1.13-alpine
COPY .config/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /usr/src/app/dist/browser /usr/src/app
