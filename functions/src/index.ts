import * as functions from "firebase-functions";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

// Handlers
import authHandler from "./handlers/auth";
import accountHandler from "./handlers/account";

const app = express();

// App setting
app.use(cors({origin: true}));
app.use(bodyParser.json());

// Routes
app.use("/auth", authHandler);
app.use("/account", accountHandler);

export const v0 = functions.region("asia-southeast2").https.onRequest(app);
