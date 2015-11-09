# tic-tac-toe

A demo/learning project for OneRef.

## How To Run

Clone the repo:

```
git clone git@github.com:ariutta/oneref-tictactoe.git
```

`cd` into the new directory and install the server dependencies:

```
npm install
```

`cd` into the `public` subdirectory and install the front-end dependencies:

```
npm install
```

`cd` back up to the parent directory and start the server:

```
node server.js
```

You should now be able to visit [http://localhost:8080](http://localhost:8080) and
use the site. You can play against yourself by opening a second browser tab and
visiting the same address. Sign in using Google in both tabs, then in one tab, invite
yourself and in the other tab, accept the invitation. You can now make a move in
the first tab.

To re-build the JS files whenever you make any changes, you can `cd` to the `public` directory
and run webpack:

```
webpack -d --watch
```

You can test the front-end by visiting [http://localhost:8080/viewTest.html](http://localhost:8080/viewTest.html)
and ensuring that the upper-left box is checked.

To run the server tests, call Mocha from the top-level directory:

```
mocha
```
