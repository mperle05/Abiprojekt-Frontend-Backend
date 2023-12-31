# Preparing the environment

npx create-react-app react-mperle05

## Video

https://www.youtube.com/watch?v=NeKm4zOVkO4

Minute: 00:00:00

## Starting the web server

````
cd frontend
npm start
````

# Some other useful JS frameworks

Bulma ist ein freies und Open-Source-CSS-Framework basierend auf Flexbox. Es enthält auf HTML und CSS basierende Gestaltungsvorlagen für Typografie, Formulare, Buttons, Tabellen, Grid-Systeme, Navigations- und andere Oberflächengestaltungselemente. 

Moment is used to format dates


````
npm install bulma moment
````

# Deploy to local docker

````
docker-compose build
docker-compose up
````

# Deploy to heroku from local docker image

````
heroku login
heroku create react-mperle05
heroku container:push web -a react-mperle05
heroku container:release web -a react-mperle05
heroku open
````

# In case of an auth error with Heroku:
````
heroku auth:token
docker login --username=maximilian@perle.name --password=$(heroku auth:token) registry.heroku.com
````


https://react-mperle05.herokuapp.com/


# Pushing to Git for fully automatic deployment

````
git add --all
git commit -m "Update"
git push origin master
````

# Setting up the proxy for Gutenbergschule
````
REM For GIT:
git config --global http.proxy http://192.168.10.10:3128
REM For Heroku
set HTTP_PROXY=http://192.168.10.10:3128
````

# Unsetting up the proxy for Gutenbergschule
````
git config --global --unset http.proxy
set HTTP_PROXY=
````