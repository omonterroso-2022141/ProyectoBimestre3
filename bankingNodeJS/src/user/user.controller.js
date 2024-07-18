'use strict';

import { checkPassword } from '../utils/validator.js'
import User from './user.model.js'
import AccountType from '../accountType/accountType.model.js';
import { generateJWT } from '../utils/jwt.js'

export const test = (req, res) => {
    return res.send('Hello world')
};

//# Modified By: Yerick Aguilar
export const login = async (req, res) => {
    try {
        let { username, password } = req.body
        let user = await User.findOne({ username })
        if (!user) return res.status(409).send({ message: 'Username not found' })
        if (user && await checkPassword(password, user.password)) {
            let loggedUser = {
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
            return res.send({ message: `Welcome ${user.name}`, loggedUser, token })
        }
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: 'Error to login' })
    }
}

//# GetByToken
export const getUserByToken = async (req, res) => {
    try {
        return res.send(req.user)
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: 'Error, user not found' })
    }
}

//# Get 3rd P. Account
export const getThirdPAccount = async (req, res) => {
    try {
        const user = await User.findById(req.user.uid)

        if (!user || !user.thirdPAccounts) {
            return res.status(404).send({ message: 'Usuario no encontrado o No Tiene Cuentas de Terceros' })
        }

        const accounts = await Promise.all(user.thirdPAccounts.map(async account => {
            const { favorite, account: accountNumber, alias, accountType } = account
            const accountObj = await AccountType.findById(accountType)
            const accountTypeName = accountObj ? accountObj.name : 'Tipo de Cuenta No Encontrado'

            return { favorite, account: accountNumber, alias, accountType: accountTypeName }
        }))
        return res.send(accounts)
    } catch (err) {
        console.error(err)
        return res.status(500).send({ message: 'Error, Invalid Data' })
    }
}

//# Update Favorite 3rd P. Account
export const favorite = async (req, res) => {
    try {
        const {accountNumber} = req.body
        let data = req.body

        let updateAccount = await User.findOneAndUpdate(
            {account: accountNumber},
            data,
            {new: true}
        )

        if(!updateAccount)return res.status(404).send({message:'Invalid Data'})

        return res.send(updateAccount)
    } catch (err) {
        console.error(err)
        return res.status(500).send({message: 'Error, Invalid Data'})
    }
}