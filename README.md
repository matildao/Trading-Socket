# Trading Pokémon Socket

This is a websocket server made from node.js, express and socket.io. It fetches data from the API Trading-API and manipulates prices to show on graphs.

To view the graphs, open the index.html file that exists in the repo.


Following scripts are available:

#### To bundle or to build
```javascript
"bundle": "npm run bundle"
```
```javascript
"build": "npm run build"
```

#### To start server as local

```javascript
"node": "node index.js"
```

To make the repo work you need to add a .env file with the environment variable:

API_BASE=[Your api here] or create a list of objects directly in the project that the socket can fetch from.


#### Socket
I chose to use socket.io since I used it previously and I liked the way it worked. For the application I chose to use the data from the trading-api to get the prices of the products in the database to make it possible to manipulate them in the future for a realtime buy and sell functionality.