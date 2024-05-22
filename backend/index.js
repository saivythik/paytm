import express from 'express';
import {router as routeRouter} from "./routes/index.js"
import cors from 'cors';

const app = express();
const port = 3000;

app.use(cors({
    origin: '*',
}));
app.use(express.json());

app.use('/api/v1', routeRouter);


app.listen(port),()=>{
    console.log('app is running')
};

console.log('app is running');




