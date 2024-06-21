'use strict';

import { checkPassword, encrypt, checkUpdate } from '../utils/validator.js'
import User from './user.model.js'
import Account from '../account/account.model.js'
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

export const listUser = async(req, res)=>{
    try {
        const listData = await User.find()
        if(listData.length == 0) return res.status(404).send({message: 'Users not found.'})
        return res.send({message: 'The list users: ', listData})
    } catch (err) {
        console.error(err);
        return res.status(500).send({message: 'Error to list users'})       
    }
}

export const updateUser = async(req, res)=>{
    try {
        let { id } = req.params
        let data = req.body
        let dataNoEditableFound = false
        if(data.DPI || data.password){
            dataNoEditableFound = true
        }else{
            dataNoEditableFound= false
        }
        if(dataNoEditableFound == true) return res.status(400).send({message: 'You dont have update DPI or Password.'})
        let updateUser = await User.findOneAndUpdate(
            {_id: id},
            data,
            {new: true}
        )
        if(!updateUser) return res.status(400).send({message: 'User not found and not update'})
        return res.send({message: 'Updated user successfully', updateUser})
    } catch (err) {
        console.error(err);
        return res.status(500).send({message: 'Error to update user'})
    }
}

export const deleteUser = async(req, res)=>{
    try {
        let { id } = req.params
        let searchUser = await User.findById(id)
        if(!searchUser) return res.status(404).send({message: 'User not found'})
        let searchAccount = await Account.findById({userId: id})
        if(searchAccount) return res.status(409).send({message: 'Before deleting the user, delete the account linked to this user.'});
        let deleteUser = await User.findOneAndDelete({_id: id})
        return res.send({message: `User with name ${searchUser.name} ${searchUser.surname} deleted successfully`})
    } catch (err) {
        console.error(err);
        return res.status(500).send({message: 'Error to delete user.'})
    }
}