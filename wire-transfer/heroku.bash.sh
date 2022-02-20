heroku login
heroku create transferwise-apitest
heroku addons:create heroku-postgresql:hobby-dev --app transferwise-apitest
heroku config --app transferwise-apitest

heroku pg:psql postgresql-flexible-60926 --app transferwise-apitest
heroku run node dist/core/models/db/migrations.db.js --app transferwise-apitest

heroku config:set KEY=VALUE --app transferwise-apitest


heroku pg:psql --app transferwise-apitest < ./dist/core/models/db/migrations.sql