import express, { Application } from 'express';
import routesTareas from '../routes/tarea.routes';
import connection from '../db/connection';
import cors from 'cors';

class Server {
    private app: Application;
    private port: string;

    constructor() {
        this.app = express();
        this.port = process.env.PORT || '4000';
        this.middlewares();
        this.routes();
        this.conectarDB();
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Corriendo la aplicacion', this.port);
        })
    } 

    middlewares(){
        //Parseo del body
        this.app.use(express.json());

        //Cors
        this.app.use(cors());
    }

    routes(){
        this.app.use('/api/tareas',routesTareas);
    }

    conectarDB() {
        connection.connect((err) => {
           if(err){
                console.log(err);
           }else{
            console.log('Conectado a la base datos')
           }
            
        })
    }
}

export default Server;