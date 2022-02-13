heroku login
heroku create transferwise-apitest
heroku addons:create heroku-postgresql:hobby-dev --app transferwise-apitest
heroku config --app transferwise-apitest