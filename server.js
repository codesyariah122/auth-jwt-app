import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import db from './app/models/index.js'
import {dbConfig} from './app/config/db.config.js'
import {AuthRoutes} from './app/routes/auth.routes.js'
import {UserRoutes} from './app/routes/user.routes.js'

dotenv.config()
const app = express()
const port = process.env.PORT
const Role = db.role


db.mongoose
.connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`, {
	useNewUrlParser: true,
	useUnifiedTopology: true
})
.then(() => {
	console.log("Successfully connect to MongoDB")
	initial()
})

.catch(err => {
	console.error("connection error", err)
	process.exit()
})


const corsOptions = {
	origin: process.env.ORIGIN
}

app.use(cors(corsOptions))

app.use(bodyParser.json())

app.use(bodyParser.urlencoded({
	extended: true
}))

app.use('/api/auth', AuthRoutes)
app.use('/api/test', UserRoutes)

app.get('/', (req, res) => {
	res.json({
		message: 'Welcome in my JWT Application'
	})
})

app.listen(port, () => {
	console.log(`Server is running on port ${port}`)
})


function initial() {
	Role.estimatedDocumentCount((err, count) => {
		if(!err && count === 0){
			new Role({
				name: "user"
			}).save(err => {
				if(err){
					console.log("error", err)
				}

				console.log("Addedd 'user' to roles collection")
			})

			new Role({
				name: "moderator"
			}).save(err => {
				if(err){
					console.log("error", err)
				}
				console.log("Added 'moderator' to roles collection")
			})

			new Role({
				name: "admin"
			}).save(err => {
				if(err){
					console.log("error", err)
				}
				console.log("Addedd 'admin' to roles collection")
			})
		}
	})
}