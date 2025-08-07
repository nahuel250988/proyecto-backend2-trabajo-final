import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { engine } from 'express-handlebars';
import { Server } from 'socket.io';
import http from 'http';
import passport from 'passport';


import usersRouter from './routes/users.router.js'; 
import productsRouter from './routes/products.router.js';
import cartsRouter from './routes/carts.router.js';
import sessionsRouter from './routes/sessions.router.js';
import viewsRouter from './routes/views.router.js';
import initializePassport from './config/passport.config.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;


app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './src/views');


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('./src/public'));


initializePassport(passport);
app.use(passport.initialize());


mongoose.connect(process.env.MONGO_URL)
.then(() => {
    console.log('✅ Conectado a la base de datos de MongoDB');
})
.catch(err => {
    console.error('❌ Error al conectar a MongoDB', err);
});


app.use('/api/users', usersRouter); 
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);
app.use('/api/sessions', sessionsRouter);
app.use('/', viewsRouter);


const server = http.createServer(app);
const io = new Server(server);

io.on('connection', socket => {
    console.log('Nuevo cliente conectado');
});


server.listen(PORT, () => {
    console.log(`🚀 Servidor escuchando en el puerto ${PORT}`);
});