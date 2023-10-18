import express, { Application, Router } from 'express'
import {routes} from './src/routes';

const app: Application = express();
const port = 3000;

// routes
app.use('/', routes);

// start the server
app.listen(port, () => {
    console.log(`server started at http://localhost:${port}`);
})