'use strict';

import { checkPassword } from '../utils/validator.js'
import User from './user.model.js'
import { generateJWT } from '../utils/jwt.js'

export const test = (req, res) => {
    return res.send('Hello world')
};

export const login = async(req, res)=>{
    try {
        let {username, password} = req.body
        let user = await User.findOne({username})
        if(!user) return res.status(409).send({message: 'Username not found'})
        if(user && await checkPassword(password, user.password)){
            let loggedUser ={
                uid: user._id,
                name: user.name,
                surname: user.surname,
                username: user.username,
                account: user.account,
                DPI: user.DPI,
                address: user.address,
                phone: user.phone,
                email: user.email,
                job: user.job,
                income: user.income,
            }
            let token = await generateJWT(loggedUser)
            return res.send({message: `Welcome ${user.name}`, token})
        }else{
            return res.status(409).send({message: 'The password or user not coincident'})
        }
    } catch (err) {
        console.error(err);
        return res.status(500).send({message: 'Error to login'})
    }
}
