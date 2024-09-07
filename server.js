require("dotenv").config();
require("express-async-errors");
const methodOverride = require("method-override");
const express = require("express");
const app = express();
const cors = require("cors");
const connectDB = require("./db/connect");
const ms = require("ms");
const productsRouter = require("./routes/products");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const notFoundMiddleware = require("./middleware/not-found");
const errorMiddleware = require("./middleware/error-handler");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const session = require("express-session");
const { createClient } = require("redis");
const RedisStore = require("connect-redis").default;

const corsOptions = {
  origin: [`${process.env.FRONTEND_URL}`],
  credentials: true,
  optionSuccessStatus: 200,
};

// Middleware setup
const setupMiddleware = async () => {
  const setupRedis = async () => {
    let redisClient = createClient({
      url: process.env.REDIS_URL,
      legacyMode: true,
    });

    redisClient.on("error", (err) => {
      console.error("Redis Client Error", err);
    });

    try {
      await redisClient.connect();
      console.log("Connected to Redis");
    } catch (err) {
      console.error("Error connecting to Redis:", err);
    }

    return redisClient;
  };

  const setupSession = (redisClient) => {
    return new RedisStore({
      client: redisClient,
      prefix: "myapp:",
    });
  };
  const redisClient = async () => {
    await setupRedis();
  };
  const redisStore = setupSession(redisClient);
  const sessionOptions = {
    store: redisStore,
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

  // Middleware
  const uploadDir = path.join(__dirname, "uploads");
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
  }
  app.use(cors(corsOptions));
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use(session(sessionOptions));
  app.use(cookieParser("ab231"));
  app.use(methodOverride("_method"));
  app.use("/uploads", express.static(uploadDir));
  app.use("/images", express.static(path.join(__dirname, "public/images")));

  // Routes
  app.use("/api/v1/products", productsRouter);

  // Error handling
  app.use(notFoundMiddleware);
  app.use(errorMiddleware);

  try {
    await connectDB(process.env.MONGODB_URL);

    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("DB connection error:", error);
    process.exit(1);
  }
};

setupMiddleware().catch((error) => {
  console.error("Setup Error:", error);
  process.exit(1);
});
module.exports = app;
// const PORT = 8000;
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });
