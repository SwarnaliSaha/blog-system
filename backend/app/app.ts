import express from 'express'
import { connectToMongo } from './connections/connection'
import { registerRoutes } from './router/routes';
import cors from 'cors';
import path from 'path'

export const startServer = async() => {
    try{
        const app = express();
        app.use(cors());
        app.use(express.json());
        app.use(express.urlencoded({ extended: true }));
        app.use(express.static(path.join(__dirname, 'public')));
        await connectToMongo();
        registerRoutes(app)

        const {PORT} = process.env;

        app.get('/', (req, res) => {
            res.sendFile(path.join(__dirname, 'public', 'index.html'));
          });
      
        app.listen(PORT||3000,()=>console.log(`listeing at port ${PORT||3000}`))
    }
    catch(e){
        console.error("could not start server");
        process.exit(1)
    }
}