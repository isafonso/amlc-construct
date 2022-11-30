import http from "node:http";
import path from "node:path";
import routes from "./src/routes";
import express from "express";
import morgan from "morgan";
import cors from "cors";
import { sequelize as database } from "./src/database";
import dotenv from "dotenv";
import session from "express-session";

dotenv.config();

const app = express();
const server = http.createServer(app);
const port = process.env.PORT || 5050;
const host = process.env.HOST;

//Basic setup
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(routes);

//Static files
app.use(express.static(path.join(__dirname, "./public")));

//View engine
app.set("views", path.join(__dirname, "./src/views"));
app.set("view engine", "ejs");

//Turn on the server
server.listen("3333", async () => {
  try {
    await database.sync();
  } catch (error) {
    console.log("error: " + error);
  }
  console.log(`server running on ${host}:${port}`);
});

//Express-session setup
app.use(
  session({
    secret: "q1w2e3r4t5y6u7i8o9p0",
    name: "user",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 3600000,
    },
  })
);
app.use((req, res, next) => {
  console.log(req.session.cookie);
  next();
});
