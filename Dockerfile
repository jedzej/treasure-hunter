FROM node:12 AS frontend-builder

WORKDIR /usr/src/frontend

COPY ./frontend/package.json .

COPY ./frontend/yarn.lock .

RUN yarn install

COPY ./frontend .

RUN yarn build


FROM nginx:alpine

# install dependencies
RUN apk add python3 supervisor postgresql-dev gcc python3-dev musl-dev

# prepare flask app
WORKDIR /usr/src/backend

COPY backend/requirements.txts .

RUN pip3 install --no-cache-dir -r requirements.txt

# copy runtime data

COPY --from=frontend-builder /usr/src/frontend/build /var/www/

COPY backend/ ./

COPY supervisor/supervisord.conf /etc/

COPY supervisor/start.sh /var/

COPY release.sh /var/

COPY nginx/* /etc/nginx/

CMD ["/var/start.sh"]
