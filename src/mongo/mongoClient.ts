import { MongoClient } from "mongodb";
import { mariaUser } from "./schema/user";
import * as dotenv from 'dotenv';
dotenv.config();

export const mongoClient = new MongoClient(`${process.env.MONGO_URI}`);

export const mariaDB = mongoClient.db('maria');

export const UserCollection = mariaDB.collection<mariaUser>('users');



