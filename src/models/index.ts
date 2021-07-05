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
const PORT:number = +(process.env.DB_PORT as string);
const HOST:string = process.env.DB_HOST as string ;