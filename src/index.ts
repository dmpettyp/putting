// const { Game } = require("./domain/game.js");

import express from 'express'
import * as dotenv from 'dotenv'
import { User } from './domain/user'

dotenv.config()

let f = new User('dave')
console.log(f.id)
console.log(f.username)
