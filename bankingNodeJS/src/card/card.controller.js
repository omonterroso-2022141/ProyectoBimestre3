'use strict'

import Card from './card.model.js'
import User from '../user/user.model.js'
import Account from '../account/account.model.js'
import crypto from 'crypto'

/**
 * Generamos un CVV seguro de 3 dígitos
 * @param {number} length
 * @returns {string}
 */
function generateSecureCVV(length = 3) {
    if (length !== 3 && length !== 4) {
        throw new Error('La longitud del CVV debe ser 3 o 4')
    }

    const randomBytes = crypto.randomBytes(length)
    const cvv = parseInt(randomBytes.toString('hex'), 16).toString().slice(0, length)
    return cvv.padStart(length, '0')
}

export const createCard = async (req, res) => {
    try {
        let data = req.body
        let dataAccount = await Account.findById( data.account )
        if (!dataAccount) return res.status(404).send({ message: 'Account not found' })
        console.log('Account found: '+dataAccount);
        data.account = dataAccount.account
        // Buscamos los datos del usuario ligado a la cuenta para validar la propiedad de la cuenta.
        let dataUser = await User.findOne(dataAccount.userId)
        if(!dataUser) return res.status(404).send({message: 'User not found'})
        console.log('User found: '+dataUser);
        // El usuario ligado a la cuenta se ligara tambien a la tarjeta
        data.userId = dataAccount.userId 
        // Generamos un CVV seguro de 3 dígitos automáticamente
        data.CVV = generateSecureCVV(3)
        // Creamos una nueva fecha de vencimiento con solo día, mes y año
        let today = new Date()
        let dueDate = new Date(today.getFullYear() + 4, today.getMonth(), today.getDate())
        dueDate.setHours(0, 0, 0, 0)
        data.dueDate = dueDate
        // Usamos la variable anterior que contiene la fecha actual
        data.issued = today
        // Ligamos la cantidad de dinero de la cuenta a la tarjeta
        data.balance = dataAccount.balance
        console.log('El saldo de la cuenta es '+dataAccount.balance+' y el saldo de la tarjeta es '+data.balance);
        // Finalizamos el proceso de creacion de una nueva tarjeta con los datos proporcionados
        const newCard = new Card(data)
        await newCard.save()
        return res.status(201).send({ message: 'Card created successfully', card: newCard })
    } catch (err) {
        console.error(err)
        return res.status(500).send({ message: 'Error creating card' })
    }
}

