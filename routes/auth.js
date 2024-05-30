import { Router } from "express";
import userSchema from "../models/userModel.js";
import nedb from 'nedb-promises'

const db = new nedb({ filename: 'users.db', autoload: true });
const router = Router();