import Router from 'express'
import {checkRolesExisted, checkDuplicateUsernameOrEmail} from '../middlewares/index.js'
import {signup, signin} from '../controllers/auth.controller.js'


export const AuthRoutes = Router((req, res, next) => {
	res.header(
		"Access-Control-Allow-Headers",
      	"x-access-token, Origin, Content-Type, Accept"
	)
	next()
})


AuthRoutes.post(
	'/signup', 
	[checkDuplicateUsernameOrEmail,checkRolesExisted
    ],
    signup
)

AuthRoutes.post('/signin', signin)