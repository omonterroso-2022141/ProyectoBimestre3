'use strict'

import jwt from 'jsonwebtoken'
import User from '../user/user.model.js'

//# Modified By: Yerick Aguilar
export const validateJwt = (req, res, next) => {

    let token = req.body.token || req.query.token || req.headers['authorization'] || req.headers.token

    if (!token){
        return res.status(401).send('A token is required for authentication')
    }

    try{
        token = token.replace(/^Bearer\s+/, '')
        const decoded = jwt.verify(token, process.env.SECRET_KEY)

        req.user = decoded //en req.user está la info del usuario
    }catch(e){
        console.log(e)
        return res.status(401).send('Invalid Token')
    }

    return next()
}
//# --------------------------------------

export const isAdmin = async (req, res, next) => {
    try {
        let { role } = req.user
        if (!role || role !== 'ADMIN') return res.status(403).send({ message: `You don't have access | username ${username}` })
        next()
    } catch (err) {
        console.error(err)
        return res.status(401).send({ message: 'Unauthorized role' })
    }
}