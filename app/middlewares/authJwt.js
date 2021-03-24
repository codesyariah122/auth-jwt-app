import jwt from 'jsonwebtoken'
import {authConfig} from '../config/auth.config.js'
import db from '../models/index.js'

const User = db.user
const Role = db.role

export const verifyToken = (req, res, next) => {
	let token = req.headers["X-access-token"]

	if(!token){
		return res.status(403).send({
			message: "No token provided!"
		})
	}

	jwt.verify(token, config.secret, (err, decoded) => {
		if(err){
			return res.status(401).send({
				message: 'Unauthorized'
			})
		}
		req.userId = decoded.id
		next()
	})
}


export const isAdmin = (req, res, next) => {
  User.findById(req.userId).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err })
      return
    }

    Role.find(
      {
        _id: { $in: user.roles }
      },
      (err, roles) => {
        if (err) {
          res.status(500).send({ message: err })
          return
        }

        for (let i = 0; i < roles.length; i++) {
          if (roles[i].name === "admin") {
            next()
            return
          }
        }

        res.status(403).send({ message: "Require Admin Role!" })
        return
      }
    )
  })
}

export const isModerator = (req, res, next) => {
  User.findById(req.userId).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err })
      return
    }

    Role.find(
      {
        _id: { $in: user.roles }
      },
      (err, roles) => {
        if (err) {
          res.status(500).send({ message: err })
          return
        }

        for (let i = 0; i < roles.length; i++) {
          if (roles[i].name === "moderator") {
            next()
            return
          }
        }

        res.status(403).send({ message: "Require Moderator Role!" })
        return
      }
    )
  })
}
