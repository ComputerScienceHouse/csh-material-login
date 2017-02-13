# CSH Material Login
A Keycloak material theme for [Computer Science House](http://csh.rit.edu).

## Installation

Run `gulp production` to build the theme in production mode and generate the theme archive, which will be saved to `dist/theme.zip`. Then, follow the [instructions here](https://keycloak.gitbooks.io/server-developer-guide/content/v/2.3/topics/themes.html#_deploying_themes) to deploy it to your production instance of Keycloak.

## Contributing

Clone this repo and make sure you have Node installed ([NVM](https://github.com/creationix/nvm) is highly recommended). Install the dependencies by running `npm install`, then run `mkdir -p dist/theme/csh` so Docker will be able to map the folder (more on that below).

To set up a local instance of Keycloak for development, install [Docker](https://www.docker.com/), then, from the project root, run the Keycloak container, mapping the compiled theme into the container as a volume (it'll take a few minutes to pull the image the first time):

```
docker run -d -e KEYCLOAK_USER=admin -e KEYCLOAK_PASSWORD=admin -p 8080:8080 -v `pwd`/dist/theme/csh:/opt/jboss/keycloak/themes/csh jboss/keycloak
```

If this is your first time running the Keycloak container locally for theme development, follow the instructions in the Container Setup section below. Once the container is set up and running, run `npm start` to compile the theme and start the BrowserSync server, which will automatically recompile the theme and refresh your browser when changes are made to the source files. All source files can be found in the appropriately-named subdirectory under `src`.

Although this project is configured for BrowserSync, at the time of writing Keycloak will not allow logins to the admin portal through the BrowserSync proxy. As a result, you must visit Keycloak directly at http://127.0.0.1:8080 to work on the theme, and the page will not automatically refresh when changes are made.

To stop the container, find the name of the container with `docker ps`, then run `docker stop [CONTAINER_NAME]`.

### Container Setup

To allow theme development without restarting the container after each change, you must disable theme caching in Keycloak's configuration file. This only has to be after you pull a new version of the `jboss/keycloak` image (e.g. the first time you run it). To do this:

1. Get the name of the container by running `docker ps`. For example:

	```
	CONTAINER ID        IMAGE               COMMAND                  CREATED             STATUS              PORTS                    NAMES
	923f98083c8f        jboss/keycloak      "/opt/jboss/docker..."   1 minute ago        Up 1 minute         0.0.0.0:8080->8080/tcp   heuristic_visvesvaraya
	```

	The name for the container above is `heuristic_visvesvaraya`.

2. Get a shell in the container by running the following command, substituting the name of your container:

	```
	docker exec -it heuristic_visvesvaraya /bin/bash
	```

3. Run `vi /opt/jboss/keycloak/standalone/configuration/standalone.xml`, then change the appropriate nodes in the `<theme>` section to match the following:

	```
	<theme>
	    <staticMaxAge>-1</staticMaxAge>
	    <cacheThemes>false</cacheThemes>
	    <cacheTemplates>false</cacheTemplates>
	    ...
	</theme>
	```

4. Save and exit vi by hitting `ESC` followed by typing `:x` and hitting `ENTER`. Run `exit` to exit the shell in the container.

5. Commit the changes to the container by running the following command, again substituting the name of your container:

	```
	docker commit heuristic_visvesvaraya jboss/keycloak
	```

6. Restart the container by running `docker restart heuristic_visvesvaraya`, substituing the name of your container.
