# CSH Material Login
A Keycloak material theme for [Computer Science House](http://csh.rit.edu).

## Installation

Run `gulp production` to build the theme in production mode and generate the theme archive, which will be saved to `dist/theme.zip`. Then, follow the [instructions here](https://keycloak.gitbooks.io/server-developer-guide/content/v/2.3/topics/themes.html#_deploying_themes) to deploy it to your production instance of Keycloak.

## Contributing

Clone this repo and make sure you have Node installed ([NVM](https://github.com/creationix/nvm) is highly recommended). Install the dependencies by running `npm install`.

To set up a local instance of Keycloak for development, install [Docker](https://www.docker.com/), then, from the project root, run `docker-compose up -d` to build and run the container. Once the container is up and running, run `npm start` to compile the theme and start watching the source files for changes. All source files can be found in the appropriately-named subdirectory under `src`.

Keycloak will be available at [http://127.0.0.1:8080](http://127.0.0.1:8080). The username and password for the default administrative user are both `admin`. Once logged in, change the Login, Account, and Email themes to `csh` under the Themes tab on the Realm Settings page, then log out to see the theme.

To stop the container, simply run `docker-compose stop` from the project root.