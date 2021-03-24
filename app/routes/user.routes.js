import Router from 'express'
import {verifyToken, isModerator, isAdmin} from '../middlewares/index.js'
import {allAccess, userBoard, adminBoard, moderatorBoard} from '../controllers/user.controller.js'

export const UserRoutes = Router((req,res, next)=>{
	res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
})

UserRoutes.get('/all', allAccess)
UserRoutes.get('/user', [verifyToken], userBoard)

UserRoutes.get(
	'/mod',
	[verifyToken,isModerator],
    moderatorBoard
)

UserRoutes.get(
	'/admin',
	[verifyToken, isAdmin],
    adminBoard
)