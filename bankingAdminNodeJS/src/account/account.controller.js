'use strict';

import Account from './account.model.js'
import User from '../user/user.model.js'
import Admin from '../admin/admin.model.js'
import Decimal from 'decimal.js'
import mongoose from 'mongoose';

export const test = (req, res) => {
    return res.send('Hello world')
};

export const createAccount = async (req, res) => {
    try {
        let dataAccount = req.body
        
        // Busca el usuario por DPI para obtener su _id
        const dataUser = await User.findOne({ DPI: dataAccount.userId })
        if (!dataUser) return res.status(404).send({ message: 'User not found' })

        // Se crea el número de cuenta.
        let firstPart = Math.floor(100 + Math.random() * 900)
        let secondPart = dataUser.DPI.substring(0, 9)
        dataAccount.account = firstPart + secondPart
        console.log('Numero de cuenta ' + dataAccount.account)
        dataAccount.status = 'ACTIVO'

        // Se le da una fecha de creación de la cuenta
        dataAccount.created = new Date(new Date().setHours(0, 0, 0, 0))

        // Se usa Decimal.js para manejar los valores de forma precisa
        let balance = new Decimal(dataAccount.balance || 0).toFixed(2)
        dataAccount.balance = new mongoose.Types.Decimal128(balance)

        // Se verifica que haya mínimo Q100.00 para aperturar la cuenta   
        if (parseFloat(balance) < 100.00) return res.status(401).send({ message: 'The balance isn\'t enough' })

        // Asigna el _id del usuario encontrado al campo userId en dataAccount
        dataAccount.userId = dataUser._id;

        let account = new Account(dataAccount)
        await account.save()
        return res.send({ message: `Account created successfully for client ${dataUser.name} ${dataUser.surname}.` })
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: 'Error to create account.' })
    }
}