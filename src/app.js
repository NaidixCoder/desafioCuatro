import express from 'express';
import { PORT } from './config/config.js'; 

import productRouter from './routes/products-router.js';
import cartRouter from './routes/carts-router.js';

import __dirname from './utils.js';
import handlebars from 'express-handlebars';
import viewsRouter from './routes/views-router.js'

import { Server } from 'socket.io';
import sockets from './sockets.js';

const app = express();

//Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(`${__dirname}/../public`));

//Handlebars
app.engine('handlebars', handlebars.engine());
app.set('views', `${__dirname}/views`);
app.set('view engine', 'handlebars');

//Rutas
app.use('/api/products', productRouter);
app.use('/api/carts', cartRouter)
app.use("/", viewsRouter);


// Start server
const server = app.listen(PORT, () =>
    console.log(`Servidor corriendo en http://localhost:${PORT}`)
);

// Set up WebSocket server
const io = new Server(server);
sockets(io);