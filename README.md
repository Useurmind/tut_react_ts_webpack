# Developing a SPA React application with typescript and webpack

## Init npm

Make sure node and npm are installed:

    node -v
    npm -v

Initialize the npm configuration for your project with `npm init` and answer all questions:

```
C:...>npm init
This utility will walk you through creating a package.json file.
It only covers the most common items, and tries to guess sensible defaults.

See `npm help json` for definitive documentation on these fields
and exactly what they do.

Use `npm install <pkg>` afterwards to install a package and
save it as a dependency in the package.json file.

Press ^C at any time to quit.
package name: (tut_react_ts_webpack)
version: (1.0.0)
description: Tutorial of how to develop a react SPA with typescript and webpack.
entry point: (index.js)
test command:
git repository: (https://github.com/Useurmind/tut_react_ts_webpack.git)
keywords:
license: (ISC)
About to write to C:\Entwicklung\Projekte\Github\tut_react_ts_webpack\package.json:

{
  "name": "tut_react_ts_webpack",
  "version": "1.0.0",
  "description": "Tutorial of how to develop a react SPA with typescript and webpack.",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "repository": {
    "type": "git",
    "url": "git+https://github.com/Useurmind/tut_react_ts_webpack.git"
  },
  "author": "Jochen Grün <jochen.gruen2@mhp.com>",
  "license": "ISC",
  "bugs": {
    "url": "https://github.com/Useurmind/tut_react_ts_webpack/issues"
  },
  "homepage": "https://github.com/Useurmind/tut_react_ts_webpack#readme"
}


Is this OK? (yes)
```

## Generate an SSL certificate for localhost (not required)

https://ram.k0a1a.net/self-signed_https_cert_after_chrome_58

Download OpenSSL (> 1.1.0) and install it. Check that it is available in your console:

    # check version
    openssl version

    # check version
    openssl req -x509 -newkey rsa:4096 -sha256 -days 3650 -nodes -keyout localhost.key -out localhost.crt -subj /CN=localhost -addext subjectAltName=DNS:localhost,IP:127.0.0.1

    # generate key for root CA
    openssl genrsa -out localhost_rootCA.key 2048
    # generate root ca cert
    openssl req -x509 -new -nodes -key localhost_rootCA.key -sha256 -days 3650 -out localhost_rootCA.pem

    # generate cert request for localhost
    openssl req -new -sha256 -nodes -out localhost.csr -newkey rsa:2048 -keyout localhost.key -config .\localhost_rootCA.csr.cnf

    # generate localhost cert
    openssl x509 -req -in localhost.csr -CA localhost_rootCA.pem -CAkey localhost_rootCA.key -CAcreateserial -out localhost.crt -days 3650 -sha256 -extfile v3.ext

## Setup small website

Create an initial set of files:

__index.html__:
```html
<html>
    <head>
        <script src="https://unpkg.com/react@16/umd/react.development.js"></script>
        <script src="https://unpkg.com/react-dom@16/umd/react-dom.development.js"></script>
    </head>

    <body>
        <div id="root"></div>
        <script src="dist/app.bundle.js"></script>
    </body>
</html>
```

__src/index.js__:
```js
ReactDOM.render(
    React.createElement("span", null, "Hello World"),
    document.getElementById('root')
  );
```

Try to find out how to run `webpack-cli` correctly:

    npx webpack-cli --help

One of the usage patterns is:

    webpack-cli [options] <entries...> --output <output>

Try to pack `index.js` into an app bundle javascript file:

    npx webpack-cli .\src\index.js --output .\dist\app.bundle.js

Check that the output bundle was created and how it looks like.

## Run the initial website with some webserver

Install a webserver

    npm i local-web-server

Run the webserver to server the page

    npx local-web-server

See that chrome does not allow this and activate https

    npx local-web-server --https

See that chrome does not allow this and allow it by accessing the url chrome://flags/#allow-insecure-localhost and enabling the option.

Check that chrome allows the connection now
Check output is Hello World.
Look in the developer tools how the page is loaded.

## Install typescript, react and webpack in your project

Nice but ugly and small. To scale we need some additional stuff.

Install typescript and webpack as dev dependencies

    npm i --save-dev typescript webpack webpack-cli webpack-dev-server

Install react and react-dom as dependencies

    npm i --save react react-dom

This will add the dependencies to your `package.json` file as follows:

```json
  "devDependencies": {
    "typescript": "^3.3.3333",
    "webpack": "^4.29.6",
    "webpack-cli": "^3.2.3",
    "webpack-dev-server": "^3.1.14"
  },
  "dependencies": {
    "react": "^16.8.4",
    "react-dom": "^16.8.4"
  }
```

## Initialize the typescript project

Initialize the typescript project by executing:

    npx tsc --init

A `tsconfig.json` similar to this will be created:

```json
{
  "compilerOptions": {
    /* Basic Options */
    "target": "es5",                          /* Specify ECMAScript target version: 'ES3' (default), 'ES5', 'ES2015', 'ES2016', 'ES2017','ES2018' or 'ESNEXT'. */
    "module": "commonjs",                     /* Specify module code generation: 'none', 'commonjs', 'amd', 'system', 'umd', 'es2015', or 'ESNext'. */
    // "lib": [],                             /* Specify library files to be included in the compilation. */
    // "allowJs": true,                       /* Allow javascript files to be compiled. */
    // "checkJs": true,                       /* Report errors in .js files. */
    // "jsx": "preserve",                     /* Specify JSX code generation: 'preserve', 'react-native', or 'react'. */
    // "declaration": true,                   /* Generates corresponding '.d.ts' file. */
    // "declarationMap": true,                /* Generates a sourcemap for each corresponding '.d.ts' file. */
    // "sourceMap": true,                     /* Generates corresponding '.map' file. */
    // "outFile": "./",                       /* Concatenate and emit output to single file. */
    // "outDir": "./",                        /* Redirect output structure to the directory. */
    // "rootDir": "./",                       /* Specify the root directory of input files. Use to control the output directory structure with --outDir. */
    // "composite": true,                     /* Enable project compilation */
    // "removeComments": true,                /* Do not emit comments to output. */
    // "noEmit": true,                        /* Do not emit outputs. */
    // "importHelpers": true,                 /* Import emit helpers from 'tslib'. */
    // "downlevelIteration": true,            /* Provide full support for iterables in 'for-of', spread, and destructuring when targeting 'ES5' or 'ES3'. */
    // "isolatedModules": true,               /* Transpile each file as a separate module (similar to 'ts.transpileModule'). */

    /* Strict Type-Checking Options */
    "strict": true,                           /* Enable all strict type-checking options. */
    // "noImplicitAny": true,                 /* Raise error on expressions and declarations with an implied 'any' type. */
    // "strictNullChecks": true,              /* Enable strict null checks. */
    // "strictFunctionTypes": true,           /* Enable strict checking of function types. */
    // "strictBindCallApply": true,           /* Enable strict 'bind', 'call', and 'apply' methods on functions. */
    // "strictPropertyInitialization": true,  /* Enable strict checking of property initialization in classes. */
    // "noImplicitThis": true,                /* Raise error on 'this' expressions with an implied 'any' type. */
    // "alwaysStrict": true,                  /* Parse in strict mode and emit "use strict" for each source file. */

    /* Additional Checks */
    // "noUnusedLocals": true,                /* Report errors on unused locals. */
    // "noUnusedParameters": true,            /* Report errors on unused parameters. */
    // "noImplicitReturns": true,             /* Report error when not all code paths in function return a value. */
    // "noFallthroughCasesInSwitch": true,    /* Report errors for fallthrough cases in switch statement. */

    /* Module Resolution Options */
    // "moduleResolution": "node",            /* Specify module resolution strategy: 'node' (Node.js) or 'classic' (TypeScript pre-1.6). */
    // "baseUrl": "./",                       /* Base directory to resolve non-absolute module names. */
    // "paths": {},                           /* A series of entries which re-map imports to lookup locations relative to the 'baseUrl'. */
    // "rootDirs": [],                        /* List of root folders whose combined content represents the structure of the project at runtime. */
    // "typeRoots": [],                       /* List of folders to include type definitions from. */
    // "types": [],                           /* Type declaration files to be included in compilation. */
    // "allowSyntheticDefaultImports": true,  /* Allow default imports from modules with no default export. This does not affect code emit, just typechecking. */
    "esModuleInterop": true                   /* Enables emit interoperability between CommonJS and ES Modules via creation of namespace objects for all imports. Implies 'allowSyntheticDefaultImports'. */
    // "preserveSymlinks": true,              /* Do not resolve the real path of symlinks. */

    /* Source Map Options */
    // "sourceRoot": "",                      /* Specify the location where debugger should locate TypeScript files instead of source locations. */
    // "mapRoot": "",                         /* Specify the location where debugger should locate map files instead of generated locations. */
    // "inlineSourceMap": true,               /* Emit a single file with source maps instead of having a separate file. */
    // "inlineSources": true,                 /* Emit the source alongside the sourcemaps within a single file; requires '--inlineSourceMap' or '--sourceMap' to be set. */

    /* Experimental Options */
    // "experimentalDecorators": true,        /* Enables experimental support for ES7 decorators. */
    // "emitDecoratorMetadata": true,         /* Enables experimental support for emitting type metadata for decorators. */
  }
}
```