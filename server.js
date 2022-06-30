//Imports
const express = require( 'express' );
const fs = require( 'fs' );
const http = require( 'http' );
const { Server } = require( 'socket.io' );

const productsRoutes = require('./routes/routes');

const sqlite = require( './containerMensajes' );

//inicializar express y socket.io:
const app = express();
const httpServer = http.createServer( app );
const io = new Server( httpServer );

//Settings
const PORT = process.env.PORT || 8080;
app.use( express.json() );
app.use( express.urlencoded({ extended: true }) );
app.use( express.static( './public' ) )

//view engine:
app.set( 'view engine', 'ejs' );
app.set( 'views', __dirname + '/views' );

//websockets:
let date = new Date();


io.on( 'connection', ( socket ) => {
  console.log( 'Usuario conectado, ID: ' + socket.id );

  sqlite.getAll().then( messages => {
    socket.emit( 'messages', messages );
  } );

	socket.on( 'newMessage', ( newMessage ) => {
		sqlite.newMessage( newMessage )
      .then( sqlite.getAll()
        .then( messages => io.sockets.emit( 'messages', messages ) ) );
    });
});


//Routes
//Router
app.use( '/', productsRoutes );

//Server listening
const server = httpServer.listen( PORT, () => {
    console.log( `Server on PORT: ${ PORT }` );
});
server.on( 'error', err => console.log( 'Error en el server: ' + err ) );

