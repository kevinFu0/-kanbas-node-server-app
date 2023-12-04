import express from 'express';
import Hello from './hello.js';
import Lab5 from "./lab5.js";

import "dotenv/config.js";


import cors from 'cors';
import CourseRoutes from "./courses/routes.js";
import ModuleRoutes from "./modules/routes.js";

import mongoose from "mongoose";

import UserRoutes from "./users/routes.js";

import session from 'express-session';


const CONNECTION_STRING = process.env.DB_CONNECTION_STRING || 'mongodb://127.0.0.1:27017/kanbas';

// connecting to db
mongoose.connect(CONNECTION_STRING);



const app = express();




// cors allows cross-origin requests(localhost:3000 to localhost:4000)
// app.use(cors({
//   credentials: true,
//   origin: process.env.FRONTEND_URL
//   //origin: process.env.FRONTEND_URL

// }));

app.use(cors({
  credentials: true, // support cookies 
  origin: "https://a6--wonderful-truffle-403350.netlify.app" // restrict cross origin resource sharing to the react application

}));



const sessionOptions = {
  secret: "any string",
  resave: false,
  saveUninitialized: false,
};
if (process.env.NODE_ENV !== "development") {
  sessionOptions.proxy = true;
  sessionOptions.cookie = {
    sameSite: "none",
    secure: true,
  };
}
app.use(session(sessionOptions));


app.use(express.json());


UserRoutes(app);
ModuleRoutes(app);
CourseRoutes(app);
Lab5(app);  
Hello(app); 


// listen to http://localhost:4000
app.listen(process.env.PORT || 4000);