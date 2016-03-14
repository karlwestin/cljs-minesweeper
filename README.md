# ClojureScript Minesweeper

Minesweeper written in ClojureScript using [reagent](http://reagent-project.github.io/) which uses [React](https://facebook.github.io/react/) in the background.

[http://karlwestin.github.io/cljs-minesweeper/](http://karlwestin.github.io/cljs-minesweeper/)

## Run Application

```
lein cljsbuild once app
lein run
```
This serves the application on [localhost:5555](http://localhost:5555)

## Reading the Source

The source consists of 3 parts, `src/clj, src/cljc, and src/cljs`. Cljc is a way to write clojure
so it can be included from both your clojure and your clojurescript code.

* `src/cljc/cljs_minesweeper/game.cljc`
  This is the core game logic. It's written in cljc so it could be used for [server rendering](https://github.com/karlwestin/reagent-server-rendering) if we'd want to.

* `src/cljs/cljs_minesweeper/components.cljs`
  Reagent components for rendering a game board

* `src/cljs/cljs_minesweeper/game.cljs`
  Component for the game ui. Defines the actions (click, mark) to pass into the board component. Defines the main game state holder - A clojure atom. This has the same function as a redux store in this case.

* `src/clj/cljs_minesweeper/server.clj`
  A standard ring server handler. This comes from the [chestnut application template](http://plexus.github.io/chestnut/).

### Running tests

ClojureScript tests are ran with
```
lein doo phantom test
```

Clojure tests are ran with
```
lein test
```


## Development

Open a terminal and type `lein repl` to start a Clojure REPL
(interactive prompt).

In the REPL, type

```clojure
(run)
(browser-repl)
```

The call to `(run)` starts the Figwheel server at port 3449, which takes care of
live reloading ClojureScript code and CSS. Figwheel's server will also act as
your app server, so requests are correctly forwarded to the http-handler you
define.

Running `(browser-repl)` starts the Weasel REPL server, and drops you into a
ClojureScript REPL. Evaluating expressions here will only work once you've
loaded the page, so the browser can connect to Weasel.

When you see the line `Successfully compiled "resources/public/app.js" in 21.36
seconds.`, you're ready to go. Browse to `http://localhost:3449` and enjoy.

**Attention: It is not needed to run `lein figwheel` separately. Instead we
launch Figwheel directly from the REPL**

## Trying it out

If all is well you now have a browser window with a minesweeper game
and a REPL prompt that looks like `cljs.user=>`.

Open `resources/public/css/style.css` and change some styling of the
H1 element. Notice how it's updated instantly in the browser.

### Emacs/Cider

Start a repl in the context of your project with `M-x cider-jack-in`.

Switch to repl-buffer with `C-c C-z` and start web and figwheel servers with
`(run)`, and weasel server with `(browser-repl`). Load
[http://localhost:3449](http://localhost:3449) on an external browser, which
connects to weasel, and start evaluating cljs inside Cider.

## Chestnut

Created with [Chestnut](http://plexus.github.io/chestnut/) 0.9.1 (3a675806).
