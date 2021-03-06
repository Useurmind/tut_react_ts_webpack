# Developing a SPA React application with typescript and webpack

## Setting up a typescript project for development with react and webpack

### Init npm

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

### Generate an SSL certificate for localhost (not required)

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

### Setup small website

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
        <script src="src/index.js"></script>
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

### Run the initial website with some webserver

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

### Commit your changes

One step done and working, please commit your changes.

### Install typescript, react types

Nice but ugly and small.

- No javacscript modules used
- No type checking
- No jsx used

To scale we need some additional stuff. We will start with typescript

Install typescript dev dependencies

    npm i --save-dev typescript

Install react and react-dom types as dev dependencies

    npm i --save-dev @types/react @types/react-dom    

This will add the following dev dependencies to your `package.json` file as follows:

```json
  "devDependencies": {
    "typescript": "^3.3.3333",
    "@types/react": "^16.8.8",
    "@types/react-dom": "^16.8.2",
  }
```

### Initialize the typescript project

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

As we want to be able to compile a jsx file we need to configure it similar to this

```json
{
  "compilerOptions": {
    "target": "es5",                         
    "moduleResolution": "node",
    "module": "es2015",
    "jsx": "react", 

    "strict": true,
  },
  "exclude": [
    "node_modules",
    "dist"
  ]
}
```

This means:

- Output is placed beside the source files
- tsx files will be compiled for react
- find the dependencies using node resolution strategy
  
Change `index.js` to `index.tsx` and make the following changes:

__index.tsx__
```typescript
import * as React from "react";
import * as ReactDOM from "react-dom";

ReactDOM.render(
  <span>Hello World</span>,
  document.getElementById('root')
);
```

Run typescript compiler to compile `index.tsx`:

    npx tsc

Look at output in `src/index.js`.

Open browser and navigate to page. Look for error in console.

### Initial webpack usage

Problem is that we do not have a way to load modules yet. You need some sort of module loader to work properly with typescript.
Therefore, install webpack:

    npm i --save-dev webpack webpack-cli webpack-dev-server

Also install the javascript modules for `react` and `react-dom`:

    npm i --save react react-dom

Try to find out how to run `webpack-cli` correctly:

    npx webpack-cli --help

One of the usage patterns is:

    webpack-cli [options] <entries...> --output <output>

Try to pack `index.tsx` into an app bundle javascript file:

    npx webpack-cli .\src\index.js --output .\dist\app.bundle.js

Check that the output bundle was created and how it looks like in `dist/app.bundle.js`.

Adapt `index.html` to load the new app bundle:

__index.html__:
```html
<html>
    <head>
    </head>

    <body>
        <div id="root"></div>
        <script src="dist/app.bundle.js"></script>
    </body>
</html>
```

Note that we do not need the script tags anymore. Its all in the app bundle now.

### Setup webpack configuration

Always using this command line is not very nice to use. We will add a file `webpack.config.js`:

__webpack.config.js__
```javascript
var path = require("path");

module.exports = {
    entry: "./src/index.js",
    output: {
        filename: "app.bundle.js",
        path: path.resolve(__dirname, "dist")
    }
}
```

This does the same as before and you can just execute:

    npx webpack-cli

See it everything works again. Now start webpack in watch mode

    npx webpack-cli --watch

Change something in `index.tsx` compile it and see that it will automatically be bundled.

Pretty tedious to always execute tsc and webpack separately.

### Setup typescript compilation in webpack

To enable typescript compilation directly from webpack we need to include a typescript loader e.g. `ts-loader`:

    npm i --save-dev ts-loader

Configure the typescript loader in the `webpack.config.js`:

```javascript
module.exports = {
    // ...

    resolve: {
        // Add `.ts` and `.tsx` as a resolvable extension.
        extensions: [".ts", ".tsx", ".js"]
    },

    module: {
        rules: [
            // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
            { test: /\.tsx?$/, loader: "ts-loader" }
        ]
    },

    // ...
}
```

Execute webpack in watch modus:

    npx webpack-cli --watch

Perform some changes and see that everything is automatically updated after a refresh.

Add some npm commands for the given command lines.

__package.json__
```json
    "scripts": {
        "build": "webpack-cli",
        "watch": "webpack-cli --watch",
        "test": "echo \"Error: no test specified\" && exit 1"
    },
```

### Use webpack dev server

Currently we are using local web server and webpack cli separately. Combine this into using webpack dev server.
Stop local web server and start webpack dev server:

    npx webpack-dev-server

Forgot https:

    npx webpack-dev-server --https

Change something and check that it is upgraded after refresh.
Not upgraded why? 
Delete app.bundle.js from dist. Page is now throwing an error.

Access https://localhost:8080/webpack-dev-server to see that app.bundle.js is served from root folder.

Configure dev server to serve webpack output from dist folder:

__webpack.config.js__:
```javascript
    // ...

    devServer: {
        publicPath: "/dist/",
    },

    // ...
```

See that pages automatically refreshes after update.

### Debugging source code

Open the `app.bundle.js` in chrome source. You cannot really debug it because its big and contains a lot of code.

Configure webpack to server source maps.

https://webpack.js.org/configuration

__webpack.config.js__:
```javascript
    // ...

    devtool: "inline-source-map"

    // ...
```

Source map for `index.tsx` looks like javascript code. Configure tsconfig to output source map files.

__tsconfig.json__
```json
{
    "compilerOptions": {
        // ...
        "sourceMap": true,
        // ...
    }
}
```

Btw. configure nodemon to watch changes of `webpack.config.js` and `tsconfig.json` restart dev server.

    npm install --save-dev nodemon

    npx nodemon -w .\webpack.config.js --exec "npx webpack-dev-server --https"

Task: Add this as npm script.

Open chrome source again and see still javascript.
Set the webpack mode to development.

__webpack.config.js__:
```javascript
    // ...

    mode: "development"

    // ...
```

## Using the rfluxx framework

### Install rfluxx

We will be using the rfluxx framework to show how the flux pattern that is popular with react can be implemented.

    npm i --save-dev rfluxx

### Create first component

Create your first component:

__src/components/MyFirstComponent.tsx__
```typescript
import * as React from "react";

export interface IMyFirstComponentState
{

}

export interface IMyFirstComponentProps
{
    greeting: string;
}

export class MyFirstComponent extends React.Component<IMyFirstComponentProps, IMyFirstComponentState> 
{
    constructor(props: IMyFirstComponentProps)
    {
        super(props);

        this.state = {

        };
    }

    public render(): any
    {
        return <div>
            MyFirstComponent is here.
            {this.props.greeting}
        </div>;
    }
}
```

__src/index.tsx__
```typescript
import * as React from "react";
import * as ReactDOM from "react-dom";

import { MyFirstComponent } from "./components/MyFirstComponent";

ReactDOM.render(
  <MyFirstComponent greeting="Hello team!"/>,
  document.getElementById('root')
);
```

### Control state with a store

Make state vanish

__src/components/ComponentSwitch.tsx__
```typescript
import * as React from "react";

export interface IComponentSwitchState
{
    activeComponentIndex?: number;
}

export interface IComponentSwitchProps
{
    childTitles: string[];
}

export class ComponentSwitch extends React.Component<IComponentSwitchProps, IComponentSwitchState> 
{
    constructor(props: IComponentSwitchProps)
    {
        super(props);

        this.state = {
        };
    }

    private handlePageSelect(x: any): void
    {
        this.setState({
            ...this.state,
            activeComponentIndex: x.target.value
        });
    }

    public render(): any
    {
        const childArray = this.props.children as any[];

        return <div>
            <div>
            <span>Select page</span>
            <select value={this.state.activeComponentIndex} onChange={x => this.handlePageSelect(x)}>
            {
                this.props.childTitles.map((x, i) => {
                    return <option value={i}>{x}</option>
                })
            }
            </select>
            </div>
            <div>
                { this.state.activeComponentIndex != null && childArray[this.state.activeComponentIndex] }
            </div>
        </div>;
    }
}
```

__src/components/Incrementor.tsx__
```typescript
import * as React from "react";

export interface IIncrementorState
{
    currentCount: number;
}

export interface IIncrementorProps
{
    initialCount: number;
}

export class Incrementor extends React.Component<IIncrementorProps, IIncrementorState> 
{
    constructor(props: IIncrementorProps)
    {
        super(props);

        this.state = {
            currentCount: props.initialCount
        };
    }

    private handleIncrement(x: any): void
    {
        this.setState({
            ...this.state,
            currentCount: this.state.currentCount + 1
        });
    }

    public render(): any
    {
        return <div>
            <div>Current count: {this.state.currentCount}</div>
            <div>
                <button onClick={x => this.handleIncrement(x)}>Increment</button>
            </div>
        </div>;
    }
}
```

__src/components/app.tsx__
```typescript
import * as React from "react";

import { MyFirstComponent } from "./MyFirstComponent";
import { Incrementor } from "./Incrementor";
import { ComponentSwitch } from "./ComponentSwitch";

export interface IAppState
{
    
}

export interface IAppProps
{
    
}

export class App extends React.Component<IAppProps, IAppState> 
{
    constructor(props: IAppProps)
    {
        super(props);

        this.state = {
        };
    }

    public render(): any
    {
        const titles = [
            "My First Component",
            "Incrementor"
        ]

        return <ComponentSwitch childTitles={titles}>
           <MyFirstComponent greeting="Hello Team!" />
           <Incrementor initialCount={0} />
        </ComponentSwitch>;
    }
}
```

Show how state is preserved using a store

    npm i --save rfluxx

Create a store for the incrementor:

__src/stores/CounterStore.ts__
```typescript
import { IAction, IStoreOptions, Store, IStore } from "rfluxx";

export interface ICounterStoreState
{
    counter: number;
}

export interface ICounterStoreOptions
{

}

export interface ICounterStore extends IStore<ICounterStoreState> 
{
    incrementCounter: IAction<any>;
}

export class CounterStore extends Store<ICounterStoreState> implements ICounterStore
{
    public readonly incrementCounter: IAction<any>;

    constructor(private options: ICounterStoreOptions)
    {
        super({
            ...options,
            initialState: {
                counter: 0
            }
        });

        this.incrementCounter = this.createActionAndSubscribe<any>(x => this.onIncrementCounter());
    }

    private onIncrementCounter(): void 
    {
        this.setState({
            ...this.state,
            counter: this.state.counter + 1
        })
    }
}
```
Update the incrementor component to use the store.

__src/components/Incrementor.tsx__
```typescript
import * as React from "react";
import { StoreSubscription } from "rfluxx";

import { CounterStore, ICounterStore, ICounterStoreState } from "../store/CounterStore";

const store = new CounterStore({});

export interface IIncrementorState
{
    currentCount: number;
}

export interface IIncrementorProps
{
    initialCount: number;
}

export class Incrementor extends React.Component<IIncrementorProps, IIncrementorState> 
{
    private subscription: StoreSubscription<ICounterStore, ICounterStoreState> = new StoreSubscription();

    constructor(props: IIncrementorProps)
    {
        super(props);

        this.state = {
            currentCount: props.initialCount
        };
    }

    public componentDidMount()
    {
        this.subscription.subscribeStore(
            store,
            state =>
            {
                this.setState({
                    ...this.state,
                    currentCount: state.counter
                });
            });
    }

    public componentWillUnmount()
    {
        this.subscription.unsubscribe();
    }

    private handleIncrement(x: any): void
    {
        this.subscription.store.incrementCounter.trigger(null);
    }

    public render(): any
    {
        return <div>
            <div>Current count: {this.state.currentCount}</div>
            <div>
                <button onClick={x => this.handleIncrement(x)}>Increment</button>
            </div>
        </div>;
    }
}
```

Check that the state is preserved when switching the component.

### Show the same state in different components

Add a component `CounterPresentation` to show the same counter one more time

__src/components/CounterPresentation.tsx__:
```typescript
import * as React from "react";
import { StoreSubscription, resolveStore, ObservableFetcher } from "rfluxx";

import { CounterStore, ICounterStore, ICounterStoreState } from "../store/CounterStore";

const store = new CounterStore({
    fetcher: new ObservableFetcher()
});

export interface ICounterPresentationState
{
    currentCount?: number;
}

export interface ICounterPresentationProps
{
}

export class CounterPresentation extends React.Component<ICounterPresentationProps, ICounterPresentationState> 
{
    private subscription: StoreSubscription<ICounterStore, ICounterStoreState> = new StoreSubscription();

    constructor(props: ICounterPresentationProps)
    {
        super(props);

        this.state = {
        };
    }

    public componentDidMount()
    {
        this.subscription.subscribeStore(
            store,
            storeState =>
            {
                this.setState({
                    ...this.state,
                    currentCount: storeState.counter
                });
            });
    }

    public componentWillUnmount()
    {
        this.subscription.unsubscribe();
    }

    public render(): any
    {
        return <div>
            <div>Current count: {this.state.currentCount}</div>
        </div>;
    }
}
```

Add the counter presentation to your `App`:

__src/components/App.tsx__:
```typescript
export class App // ...
{
    // ...

    public render(): any
    {
        // ...

        return <div>
            <CounterPresentation />
            <ComponentSwitch childTitles={titles}>
                <MyFirstComponent greeting="Hello Team!" />
                <Incrementor initialCount={0} />
            </ComponentSwitch>
        </div>;
    }
}
```

See how the state still differs.

Extract store as injected prop into the app.

__src/components/App.tsx__:
```typescript
const store = new CounterStore({
    fetcher: new ObservableFetcher()
});

// ...

export class App // ...
{
    // ...

    public render(): any
    {
        // ...

        return <div>
            <CounterPresentation store={store} />
            <ComponentSwitch childTitles={titles}>
                <MyFirstComponent greeting="Hello Team!" />
                <Incrementor initialCount={0} store={store} />
            </ComponentSwitch>
        </div>;
    }
}
```

__src/components/Incrementor.tsx__:
```typescript
// ...

export interface IIncrementorProps
{
    store: ICounterStore;
    initialCount: number;
}

export class Incrementor // ...
{
    // ...

    public componentDidMount()
    {
        this.subscription.subscribeStore(
            this.props.store,
            state =>
            {
                this.setState({
                    ...this.state,
                    currentCount: state.counter
                });
            });
    }

    // ...
}
```

__src/components/CounterPresentation.tsx__:
```typescript
// ...

export interface ICounterPresentationProps
{
    store: ICounterStore;
}

export class CounterPresentation // ...
{
    // ...

    public componentDidMount()
    {
        this.subscription.subscribeStore(
            this.props.store,
            storeState =>
            {
                this.setState({
                    ...this.state,
                    currentCount: storeState.counter
                });
            });
    }
    
    // ...
}
```

See how both components show the same counter.

### Fetch 

Fetch the initial count from a random api via https://www.random.org/integers/?num=1&min=1&max=50&col=1&base=10&format=plain&rnd=new

See https://developer.mozilla.org/de/docs/Web/API/Fetch_API.

__src/components/Incrementor.tsx__
```typescript
// ...

const store = new CounterStore({
    fetcher: new ObservableFetcher()
});

// ...

```

__src/store/CounterStore.ts__
```typescript
// ...

export interface ICounterStoreOptions extends IInjectedStoreOptions
{

}

// ...

export class CounterStore extends Store<ICounterStoreState> implements ICounterStore
{    
    // ...

    constructor(private options: ICounterStoreOptions)
    {        
        // ...

        // load initial random value for counter
        this.fetch("https://www.random.org/integers/?num=1&min=1&max=50&col=1&base=10&format=plain&rnd=new")
            .subscribe(response => {
                response.json()
                        .then(json => {
                            this.setState({
                                ...this.state,
                                counter: json
                            })
                        });
            });
    }

```

## Styling with CSS

### Classic CSS style sheets

Add a css stylesheet in `assets/styles.css`.

__assets/styles.css:__
```css
body {
    font-family: Arial, Helvetica, sans-serif;
    background-color: blanchedalmond;
}

/*CSS for CounterPresentation.tsx*/
.CounterPresentation{
    background-color: aqua;
}

.Counter {
    font-weight: bolder;
    font-size: 20px;
}

/*CSS for Incrementor.tsx*/
.Incrementor {
    padding: 5px;
    background-color: red;
}

.Counter {
    font-weight: bold;
}

.Button {
    margin: 5px;
}
```

__index.html:__
```html
<html>
    <head>
        <link rel="stylesheet" type="text/css" href="assets/styles.css">
    </head>

    // ..
</html>
```

__src/components/Incrementor.tsx:__
```typescript
// ...

export class Incrementor // ...
{
    // ...

    public render(): any
    {
        return <div className="Incrementor">
            <div className="Counter">Current count: {this.state.currentCount}</div>
            <div>
                <button className="Button" onClick={x => this.handleIncrement(x)}>Increment</button>
            </div>
        </div>;
    }
}
```

__src/components/CounterPresentation.tsx:__
```typescript
// ...


export class CounterPresentation // ...
{
    // ...

    public render(): any
    {
        return <div className="CounterPresentation">
            <div className="Counter">Current count: {this.state.currentCount}</div>
        </div>;
    }
}
```

See that the app is styled but that classes with the same name overwrite each other.

### CSS Modules

Distribute the CSS into three separate modules.

__src/components/App.css:__
```css
body {
    font-family: Arial, Helvetica, sans-serif;
    background-color: blanchedalmond;
}
```

__src/components/CounterPresentation.css:__
```css
.CounterPresentation{
    background-color: aqua;
}

.Counter {
    font-weight: bolder;
    font-size: 20px;
}
```

__src/components/Incrementor.css:__
```css
.Incrementor {
    padding: 5px;
    background-color: red;
}

.Counter {
    font-weight: bold;
}

.Button {
    margin: 5px;
}
```

Remove the global stylesheet from `index.html`.
Require the style sheets in each module.

__src/components/App.tsx:__
```typescript
// ...

declare const require: any;
const styles = require("./App.css"); 

// ...
```

__src/components/CounterPresentation.tsx:__
```typescript
// ...

declare const require: any;
const styles = require("./CounterPresentation.css"); 

// ...
```

__src/components/Incrementor.tsx:__
```typescript
// ...

declare const require: any;
const styles = require("./Incrementor.css"); 

// ...
```

Configure webpack to load css.

Install https://github.com/webpack-contrib/css-loader   

    npm i --save-dev css-loader style-loader

__webpack.config.js:__
```javascript
var path = require("path");

module.exports = {
    // ...

    module: {
        rules: [
            // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
            { test: /\.tsx?$/, loader: "ts-loader" },
            { 
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            }
        ]
    },
    
    // ...
}
```

See how classes are added as style elements into the head of the website.
Check that classes are still global.

Introduce css module by configuring `css-loader`:

__webpack.config.js:__
```javascript
// ...

module.exports = {
    // ...

    module: {
        rules: [
            // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
            { test: /\.tsx?$/, loader: "ts-loader" },
            { 
                test: /\.css$/,
                use: [
                    'style-loader', 
                    {
                        loader: 'css-loader',
                        query: {
                            modules: true,
                            localIdentName: '[name]__[local]___[hash:base64:5]'
                        }
                    }
                ],
            }
        ]
    },
    
    // ...
}
```

Check that classes dont work anymore.

Use styles object in code.

__src/components/CounterPresentation.tsx:__
```typescript
// ...

export class CounterPresentation // ...
{
    // ...

    public render(): any
    {
        return <div className={styles.CounterPresentation}>
            <div className={styles.Counter}>Current count: {this.state.currentCount}</div>
        </div>;
    }
}
```

__src/components/Incrementor.tsx:__
```typescript
// ...

export class Incrementor // ...
{
    // ...

    public render(): any
    {
        return <div className={styles.Incrementor}>
            <div className={styles.Counter}>Current count: {this.state.currentCount}</div>
            <div>
                <button className={styles.Button} onClick={x => this.handleIncrement(x)}>Increment</button>
            </div>
        </div>;
    }
}
```

Check that styles are applied correctly.

- Classes are not global anymore
- Classes have name prefixes and hashes

### Introduce typings for css modules

Currently no code completion and type checking for css modules.

Configure webpack with *.d.ts generation for css modules.

    npm i --save-dev css-modules-typescript-loader

__webpack.config.js:__
```javascript
// ...

module.exports = {
    // ...

    module: {
        rules: [
            // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
            { test: /\.tsx?$/, loader: "ts-loader" },
            { 
                test: /\.css$/,
                use: [
                    'style-loader', 
                    { loader: "css-modules-typescript-loader" },
                    {
                        loader: 'css-loader',
                        query: {
                            modules: true,
                            localIdentName: '[name]__[local]___[hash:base64:5]'
                        }
                    }
                ],
            }
        ]
    },
    
    // ...
}
```

Change require statements to typescript imports and check that code completion works.

__src/components/CounterPresentation.tsx:__
```typescript
// ...

import * as styles from "./CounterPresentation.css";

// ...
```

__src/components/Incrementor.tsx:__
```typescript
// ...

import * as styles from "./Incrementor.css";

// ...
```

## Unit testing with karma

### Install and configure karma

Install the karma unit test runner

    npm i --save-dev karma karma-chrome-launcher karma-jasmine karma-spec-reporter karma-webpack jasmine @types/jasmine

Create a karma config file:

__karma.conf.js__
```javascript
var webpack = require("webpack");

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],

    // add mime type for typescript so chrome will load it
    mime: {
      'text/x-typescript': ['ts','tsx']
    },

    // list of files / patterns to load in the browser
    files: [
      'test/**/*Spec.ts'
    ],


    // list of files / patterns to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      // add webpack as preprocessor
      'test/**/*Spec.ts': [ 'webpack' ]
    },

    webpack: require("./webpack.config.js"),

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ["spec"],

    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ["Chrome"],

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
  })
}
```

Add a first test file:

__test/MySpec.ts:__
```typescript
describe("My Test", () => {
    it("should be so", () => {
        expect(2 + 2).toEqual(4);
    });

    it("but not so", () => {
        expect(2 + 2).toEqual(3);
    });
});
```

In `package.json` configure the test script

__package.json:__
```json
{
  // ...
  "scripts": {
    "build": "webpack-cli",
    "watch": "webpack-cli --watch",
    "start": "webpack-dev-server --https",
    "test": "karma start"
  },
  // ...
}
```

The following error will be thrown

```
ERROR in chunk test\MySpec [entry]
app.bundle.js
Conflict: Multiple chunks emit assets to the same filename app.bundle.js (chunks main and test\MySpec)
```

This means we need to make the bundle creation name aware.

__webpack.config.js:__
```javascript
// ...

module.exports = {
    entry: {
        app: "./src/index.tsx"
    },

    // ...

    output: {
        filename: "[name].bundle.js",
        path: path.resolve(__dirname, "dist")
    }
}
```

See that karma now executes the test and shows the results.

### Test your store

Create a test spec for the store we created

__test/CounterStoreSpec:__
```typescript
import { CounterStore } from "../src/store/CounterStore";

describe("CounterStore", () => {
    let store: CounterStore = new CounterStore({});
    beforeEach(()=> {
        store = new CounterStore({
            turnOffInitOnStart: true
        });
    })    

    it("initial counter should be zero", () => {
        store.subscribe(x => {
            expect(x.counter).toEqual(0);
        });
    });

    it("after calling increment counter is one", () => {
        store.incrementCounter.trigger(null);
        store.subscribe(x => {
            expect(x.counter).toEqual(1);
        });
    });
});
```

Make store configurable to not load random counter at start:

__src/store/CounterStore.ts:__
```typescript
// ...

export interface ICounterStoreOptions extends IInjectedStoreOptions
{
    turnOffInitOnStart?: boolean;
}

// ...

export class CounterStore // ...
{
    // ...

    constructor(private options: ICounterStoreOptions)
    {
        // ...

        if(!this.options || !this.options.turnOffInitOnStart) {
            this.onInitialize();
        }
    }

    private onInitialize(): void 
    {
        // load initial random value for counter
        this.fetch("https://www.random.org/integers/?num=1&min=1&max=50&col=1&base=10&format=plain&rnd=new")
            .subscribe(response => {
                response.json()
                        .then(json => {
                            this.setState({
                                ...this.state,
                                counter: json
                            })
                        });
            });
    }
}
```