import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";

import User from './routes/index.js';
import Posts from './routes/index.js';
import Coments  from './routes/index.js'


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: "true" }));
app.use(bodyParser.json());
app.use(cors());
app.use(cookieParser());


app.get("/", (req, res) => {
  res.send("BLOG HUB API");
});

app.get("/health", (req, res) => {
  res.status(200).json({
    status : "BLOGHUB SERVER HEALTH RUNNING SUCCESSFULLY"
  })
});


app.use('/auth', User);
app.use('/posts', Posts);
app.use('/coments', Coments);


app.all("*", (req, res) => {
  res.status(404).json({ message: "Route Not Found" });
});


export default app;