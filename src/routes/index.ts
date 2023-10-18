import express, { Router } from "express";
import {apis} from "./api";

export const routes: Router = express.Router();

routes.use('/api', apis);
