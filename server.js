require('dotenv').config();
require('express-async-errors');
const methodOverride = require("method-override");
const express = require('express');
const app = express();
const cors = require("cors");
const connectDB = require('./db/connect');
const ms = require("ms");
const productsRouter = require('./routes/products');
const session = require("express-session");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const notFoundMiddleware = require('./middleware/not-found');
const errorMiddleware = require('./middleware/error-handler');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const corsOptions = {
  origin: ["http://localhost:3000"],
  credentials: true,
  optionSuccessStatus: 200,
};
const sessionOptions = {
  secret: process.env.SECRET_URL,
  cookie: {
    httpOnly: true,
    secure: true,
    maxAge: ms("3d"),
  },
  rolling: true,
  resave: false,
  saveUninitialized: false,
};
// middleware
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}
app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(session(sessionOptions));
app.use(cookieParser("ab231"));
app.use(methodOverride("_method"));
app.use('/uploads', express.static(uploadDir));
app.use('/images', express.static(path.join(__dirname, 'public/images')));
// routes

app.use('/api/v1/products', productsRouter);

// products route

app.use(notFoundMiddleware);
app.use(errorMiddleware);
const port =  8000;

const start = async () => {
  try {
    // connectDB
    await connectDB(process.env.MONGODB_URL);
    app.listen(port, () => console.log(`Server is listening port ${port}...`));
  } catch (error) {
    console.log(error);
  }
};

start();