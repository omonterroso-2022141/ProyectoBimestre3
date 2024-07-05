'use strict'

import Transaction from './transactions.model.js'
import Account from '../account/account.model.js'
import Card from '../card/card.model.js'
import User from '../user/user.model.js'
import Decimal from 'decimal.js'
import mongoose from 'mongoose'

export const makeTransaction = async (req, res) => {
    try {
        let data = req.body

        // Buscamos la cuenta del receptor por número de cuenta
        let toAccount = await Account.findOne({ account: data.toAccount })
        if (!toAccount) return res.status(404).send({ message: 'Recipient account not found.' })

        // Buscamos los datos del usuario receptor
        let toUsuario = await User.findById(toAccount.userId)
        if (!toUsuario) return res.status(404).send({ message: "User not found." })

        // Verificamos que el ID del token sea igual al del emisor
        let idToken = req.uid
        let fromAccount = await Account.findOne({ account: data.fromAccount, userId: idToken })
        if (!fromAccount) return res.status(404).send({ message: 'Your account not found' })

        // Buscamos los datos del usuario emisor
        let fromUsuario = await User.findById(fromAccount.userId)
        if (!fromUsuario) return res.status(404).send({ message: "User not found." })

        // Cantidad de transacción controlada arbitrariamente
        const transferAmount = new Decimal(data.amount)

        // Validar si el remitente tiene suficientes fondos
        if (new Decimal(fromAccount.balance.toString()).lessThan(transferAmount))
            return res.status(400).send({ message: `Insufficient funds for transfer, your fund is ${fromAccount.balance}` })

        // Actualizar saldo de ambas cuentas
        fromAccount.balance = new Decimal(fromAccount.balance.toString()).minus(transferAmount).toFixed(2)
        toAccount.balance = new Decimal(toAccount.balance.toString()).plus(transferAmount).toFixed(2)

        // Guardar datos de cuentas actualizadas
        await fromAccount.save()
        await toAccount.save()

        // Actualizamos el saldo de las tarjetas ligadas a estas cuentas si es que hay
        let fromCards = await Card.find({ account: fromAccount._id })
        if (fromCards.length > 0) {
            for (let card of fromCards) {
                card.balance = fromAccount.balance
                await card.save()
            }
        }

        let toCards = await Card.find({ account: toAccount._id })
        if (toCards.length > 0) {
            for (let card of toCards) {
                card.balance = toAccount.balance
                await card.save()
            }
        }

        // Registrar la transacción
        const transaction = new Transaction({
            emitionDate: new Date(),
            fromAccount: data.fromAccount,
            toAccount: data.toAccount,
            amount: new mongoose.Types.Decimal128(transferAmount.toFixed(2))
        })
        await transaction.save()

        return res.send({
            message: `Transaction successful. Your account with name ${fromUsuario.name} ${fromUsuario.surname} made a transfer successfully. Your new balance is ${fromAccount.balance}. The amount transferred is ${transferAmount}. The name of the account it was transferred to is ${toUsuario.name} ${toUsuario.surname}`
        })
    } catch (err) {
        console.error(err)
        return res.status(500).send({ message: 'Error when completing the transaction' })
    }
}

export const listMyTransactions = async (req, res) => {
    try {
        let idToken = req.uid
        console.log('El token de usuario es ', idToken)
        let user = await User.findById(idToken)
        if (!user) return res.status(404).send({ message: 'User not found' })

        let dataAccount = await Account.findOne({ userId: idToken })
        if (!dataAccount) return res.status(404).send({ message: 'Account not found' })

        const myTransactions = await Transaction.find({ toAccount: dataAccount._id })
        if (myTransactions.length == 0) return res.status(404).send({ message: 'Your account has no transactions' })

        return res.send({ message: 'Your account transactions are: ', myTransactions })
    } catch (err) {
        console.error(err)
        return res.status(500).send({ message: 'Error to list your transactions' })
    }
}
