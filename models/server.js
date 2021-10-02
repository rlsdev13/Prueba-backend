const express  = require('express');
const cors = require('cors');

const { dbConnection } = require('../database/config')

class Server{

    constructor(){
        this.app = express();
        this.port = process.env.PORT;

        this.paths = {
            auth : '/api/auth',
            calendar : '/api/calendar'
        }

        this.dbConnect();

        this.middlewares();

        this.routes();

    }

    async dbConnect(){
        await dbConnection();
    }

    

    middlewares() {
        //Public directory
        this.app.use( express.static('public') );

        //body parse
        this.app.use(express.json());

        //CORS
        this.app.use( cors() );

    }

    routes() {
        this.app.use(this.paths.auth, require('../routes/auth')); 
        this.app.use(this.paths.calendar, require('../routes/calendar'));       
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log("Server on:", this.port);
        });
    }
    
}

module.exports = Server;