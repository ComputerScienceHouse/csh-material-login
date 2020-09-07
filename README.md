# CSH Material Login

A Keycloak material theme for [Computer Science House](http://csh.rit.edu).

## Installation

Run `yarn build` to build the theme in production mode and generate the theme archive, which will be saved to `dist/csh-material-login_v2.x.x.jar`. Then, [deploy it to your instance of Keycloak](https://www.keycloak.org/docs/latest/server_development/index.html#deploying-themes).

## Contributing

Clone this repo and make sure you have:

- [Node v14+](https://nodejs.org/en/download/releases) ([`asdf`](https://asdf-vm.com) or [`nvm`](https://github.com/creationix/nvm) are recommended)
- [Yarn](https://classic.yarnpkg.com/en/docs/install)

Install the dependencies by running `yarn`.

To set up a local instance of Keycloak for development, install [Docker](https://www.docker.com/), then, from the project root, run `docker-compose up -d` to build and run the development container. Once the container is up and running, run `yarn start` to compile the theme and start watching the source files for changes. All source files can be found in the appropriately-named subdirectory under `src`.

Keycloak will be available at [http://127.0.0.1:8080](http://127.0.0.1:8080). The username and password for the default administrative user are both `admin`. Once logged in, change the Login, Account, and Email themes to `csh` under the Themes tab on the Realm Settings page, then log out to see the theme.

To stop the container, simply run `docker-compose down` from the project root.

## Creating a Theme

Just here to add a theme to the gallery? Simply create a folder in `src/login/resources/js/themes` named with a unique ID for your theme (lowercase alpha-numeric, no spaces), add any resources that your theme requires, and create a `theme.json` that describes your theme. Take a look at the existing themes for an example. The supported options are:

- `id`: The unique ID for your theme, same as its folder name.
- `name`: A printable name for your theme that will appear in the theme gallery.
- `authorUsername`: The theme author's username.
- `authorName`: The theme author's name.
- `stylesheets`: An array of stylesheets URLs (either absolute or relative to the theme) to be loaded with the theme.
- `background`: Configures the page background.
  - `color`: A hex or RGB color value. Maps to the CSS `background-color` property.
  - `image`: A CSS image value. Maps to the CSS `background-image` property.
  - `size`: One of `auto|length|cover|contain|initial|inherit`. Maps to the CSS `background-size` property.
  - `repeat`: One of `repeat|repeat-x|repeat-y|no-repeat|initial|inherit`. Maps to the CSS `background-repeat` property.
- `backgroundUrl`: A convenience property to set a background image that will cover the page. Should simply contain an absolute URL to the background image or a path relevant to the theme directory.

Example from the `gradient` theme:

```
{
	"id": "gradient",
	"name": "Gradient",
	"authorUsername": "smirabito",
	"authorName": "Steven Mirabito",
	"stylesheets": [
		"../dark/dark.css"
	],
	"background": {
		"color": "#b0197e",
		"image": "linear-gradient(#430a30, #b0197e)",
		"size": "cover",
		"repeat": "no-repeat"
	}
}
```
