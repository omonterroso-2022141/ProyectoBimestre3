'use strict';

import { checkPassword, encrypt } from '../utils/validator.js'
import User from './user.model.js'
import { generateJWT } from '../utils/jwt.js'
import generatePassword from 'generate-password'

export const test = (req, res) => {
    return res.send('Hello world')
};

export const createUser = async (req, res) => {
    try {
        let data = req.body
        const code = generatePassword.generate({
            length: 12,
            numbers: true,
            symbols: true,
        })
        data.password = await encrypt(code)
        let user = new User(data)
        await user.save()
        console.log('La contraseña es '+code);
        return res.send({ message: 'User created successfully, The password is '+code })
    } catch (err) {
        console.error(err)
        return res.status(500).send({ message: 'Error to create account' })
    }
}

export const initAdmin = async () => {
    try {
      const adminExists = await User.exists({ role: 'ADMIN' });
  
      if (!adminExists) {
        const defaultAdminData = {
          name: 'ADMINB',
          surname: 'ADMINB',
          username: 'ADMINB',
          DPI: '1234567891234',
          address: 'xxxxxxx',
          phone: 'xxxxxxxx',
          email: 'xxxxxxxx',
          job: 'xxxxxxxx',
          income: 'xxxxxxxx'
        };

        defaultAdminData.password = await encrypt('ADMINB');
  
        const defaultAdmin = new User(defaultAdminData);
        await defaultAdmin.save();
        console.log('Default admin created successfully.');
      }
    } catch (err) {
      console.error('Error creating default admin:', err);
    }
}

export const login = async(req, res)=>{
    try {
        let {username, password} = req.body
        let user = await User.findOne({username})
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
                role: user.role
            }
            let token = await generateJWT(loggedUser)
            return res.send({message: `Welcome ${user.name}`, token})
        }
    } catch (err) {
        console.error(err);
        return res.status(500).send({message: 'Error to login'})
    }
}
