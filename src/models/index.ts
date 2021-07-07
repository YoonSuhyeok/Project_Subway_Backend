import { Sequelize } from 'sequelize';
import * as dotenv from "dotenv";
import { config } from '../config/config'
import express,{Request, Response, NextFunction} from "express";

dotenv.config();

export const sequelize = new Sequelize(
    config.development.database,
    config.development.username,
    config.development.password,
    {
        host: config.development.host,
        dialect: "mariadb"
    }
)
const PORT:number = parseInt(process.env.PORT as string, 10) || 5000;
const HOST:string = process.env.HOST || 'localhost';
const app = express();
