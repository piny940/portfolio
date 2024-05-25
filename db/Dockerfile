FROM alpine:latest

RUN apk add --no-cache postgresql-client

WORKDIR /app
COPY scripts/ /app/scripts/

CMD ["sh", "scripts/migrate.sh"]
