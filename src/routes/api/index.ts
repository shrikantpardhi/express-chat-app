import express, { Router } from "express";
import {threads} from "./threads";

export const apis: Router = express.Router();
apis.use(threads);
