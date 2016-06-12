[![js-standard-style](https://cdn.rawgit.com/feross/standard/master/badge.svg)](https://github.com/feross/standard)

# smtp-dev-tool

![Screenshot](http://i.imgur.com/vtkL51P.gif)
A local SMTP to use in your dev environment.

## Features

- Runs a local SMTP server, so that you can send emails locally
- Have a look at your emails in your browser in real-time

## Dev

`npm run dev` to start a Node server restarting on file change as well as a Webpack dev server. Default configuration is :
- **SMTP_PORT**: 5000
- **SMTP_HOST**: localhost
- **PORT**: 8080
- **HOST**: localhost
- **CLIENT_HOST**: 8081
- **CLIENT_HOST**: localhost

You can change these variables in the `betterScripts` section of the package.json.

## "Production"

If you just want to run and build the project without file reloading, just run `npm start`.
