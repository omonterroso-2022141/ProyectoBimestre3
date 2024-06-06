'use strict';

import { checkPassword, encrypt } from '../utils/validator.js'
import Admin from './admin.model.js'
import { generateJWT } from '../utils/jwt.js'
import generatePassword from 'generate-password'

export const test = (req, res) => {
    return res.send('Hello world')
};

export const createAdmin = async (req, res) => {
    try {
        let data = req.body
        const code = generatePassword.generate({
            length: 12,
            numbers: true,
            symbols: false,
        })
        data.role = 'ADMIN'
        data.password = await encrypt(code)
        let admin = new Admin(data)
        await admin.save()
        console.log('La contraseña es '+code);
        return res.send({ message: 'Admin created successfully, The password is '+code })
    } catch (err) {
        console.error(err)
        return res.status(500).send({ message: 'Error to create account' })
    }
}



export const initAdmin = async () => {
    try {
      const adminExists = await Admin.exists({ username: 'ADMINB' });
  
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
          income: 'xxxxxxxx',
          role: 'ADMIN',
        };

        defaultAdminData.password = await encrypt('ADMINB');
  
        const defaultAdmin = new Admin(defaultAdminData);
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
        let admin = await Admin.findOne({username})
        if(admin && await checkPassword(password, admin.password)){
            let loggedAdmin ={
                uid: admin._id,
                name: admin.name,
                surname: admin.surname,
                username: admin.adminname,
                account: admin.account,
                DPI: admin.DPI,
                address: admin.address,
                phone: admin.phone,
                email: admin.email,
                job: admin.job,
                income: admin.income,
                role: admin.role
            }
            let token = await generateJWT(loggedAdmin)
            return res.send({message: `Welcome ${admin.name}`, token})
        }
    } catch (err) {
        console.error(err);
        return res.status(500).send({message: 'Error to login'})
    }
}
