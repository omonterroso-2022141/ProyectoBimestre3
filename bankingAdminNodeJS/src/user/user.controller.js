'use strict';

import { checkPassword, encrypt, checkUpdate } from '../utils/validator.js'
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
            symbols: false,
        })
        data.password = await encrypt(code)
        let user = new User(data)
        await user.save()
        console.log('La contraseña es '+code);
        return res.send({ message: 'User created successfully, The password is '+code, user})
    } catch (err) {
        console.error(err)
        return res.status(500).send({ message: 'Error to create account' })
    }
}

export const login = async(req, res)=>{
    try {
        let {username, password, role} = req.body
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

export const getUsers = async(req, res)=>{
    try {
        const data = await User.find()
        return res.send({message: 'Users found', data})
    } catch (err) {
        console.error(err);
        return res.status(500).send({message: 'Error to get users'})
    }
}

export const editUser = async(req, res)=>{
    try {
        let {id} = req.params
        let data = req.body
        let bandera = false
        if(data.password.length > 0 || data.DPI.length > 0) {
            bandera = false
            console.log('Datos encontrados');
        }else{
            bandera = true
            console.log('Datos no encontrados');
        }
        if(bandera == false) return res.status(400).send({message: 'You dont have permission to edit this data'})
        let update = checkUpdate(data, id)
        let updateUser = await User.findOneAndUpdate(
            {_id: id},
            data,
            {new : true}
        )
        if(!updateUser) if(!update) return res.status(400).send({message: 'User not found and not updated'})
        return res.send({message: 'User updated successfully', updateUser})
    } catch (err) {
        console.error(err);
        return res.status(500).send({message: 'Error to edit user'})
    }
}