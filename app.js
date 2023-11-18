import express from 'express';
import Hello from './hello.js';
import Lab5 from "./lab5.js";

import "dotenv/config.js";


import cors from 'cors';
import CourseRoutes from "./courses/routes.js";
import ModuleRoutes from "./modules/routes.js";



const app = express();
app.use(express.json());

// cors allows cross-origin requests(localhost:3000 to localhost:4000)
app.use(cors({
  credentials: true,
  origin: process.env.FRONTEND_URL

}));

ModuleRoutes(app);
CourseRoutes(app);
Lab5(app);  
Hello(app); 


// listen to http://localhost:4000
app.listen(process.env.PORT || 4000);