Student Score Table
===================


## Setup

- Clone the repo
- Install jspm 
	`$ npm install -g jspm`
- `$ npm install`
- `$ jspm install`


## During Development

- Start the server.js api:
- `$ node server.js`
- Start gulp task:
- `$ gulp`

## Gulp Tasks:

- `gulp` || `gulp serve` To run the application on port 3000, watching changes on js files (compiling jsx) and sass files (compile, autoprefix and produce sourcemaps).
- `gulp test` Shortcut to run karma, it of course can be run directly without gulp
- `gulp build` Same as `gulp` except it doesn't run a server
- `gulp dist` Make a distribution copy: Bundle the application in one JS file and minify it with Uglify, compile sass files and minify them, put everything in the dist folder.


## Uses
- Angular (v1.3), React (v0.13), Express (v4), Nedb (for flat-file persistence)
- Package manager: [jspm](http://jspm.io)
- ES6 modules
- Web server with live reload using [BrowserSync](http://browsersync.io)
- Gulp
- Unit tests: Karma, Mocha, Chai, Sinon


## TODO
- write test!
- add a default value to empty cell entry
- add delete row button, for removing student
- Math.floor avg value
- update min, max and avg values with edits