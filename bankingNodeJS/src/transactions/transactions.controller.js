'use strict'

import Transaction from './transactions.model.js'
import Account from '../account/account.model.js'
import User from '../user/user.model.js'
import { validateJwt } from '../../../bankingAdminNodeJS/src/middlewares/validate.jwt.js'
import Decimal from 'decimal.js'
import mongoose from 'mongoose'

export const makeTransaction = async(req, res)=>{
    try {
        let data = req.body
        //Buscaamos la cuenta del emisor
        let toAccount = await Account.findById(data.toAccount)
        if(!toAccount) return res.status(404).send({message: 'Recipient account not found.'})
        //Buscamos los datos del usuario, esto con el fin de dar datos al final
        let toUsuario = await User.findById(toAccount.userId)
        if(!toUsuario) return res.status(404).send({message: "User not found."})
        //Antes de buscar al receptor, verificamos que el ID del token sea igual al del emisor
        let idToken = req.uid
        if(data.toAccount != idToken) return res.status(401).send({message: 'Please verify your account.'})
        //Buscamos la cuenta del receptor
        let fromAccount = await Account.findById(data.fromAccount)
        if(!fromAccount) return res.status(404).send({message: 'Your account not found'})
        //Buscamos los datos del usuario, esto con el fin de dar datos al final
        let fromUsuario = await User.findById(fromAccount.userId)
        if(!fromUsuario) return res.status(404).send({message: "User not found."})
        //Cantidad de transaccion controlada arbitrariamente.
        const transferAmount = new Decimal(data.amount)
        //Validar si el remitente tiene suficientes fondos
        if(new Decimal(fromAccount.balance.toString()).lessThan(transferAmount))
            return res.status(400).send({message: `Insufficient founds for transfer, your found is ${fromAccount.balance}`})
        //Actualizar saldo de ambas cuentas
        fromAccount.balance = new Decimal(fromAccount.balance.toString()).minus(transferAmount).toFixed(2);
        toAccount.balance = new Decimal(toAccount.balance.toString()).plus(transferAmount).toFixed(2);
        //Guardar datos de cuentas actualizadas.
        await fromAccount.save();
        await toAccount.save();
        //Registar la transaccion
        const transaction = new Transaction({
            emitionDate: new Date(),
            fromAccount,
            toAccount,
            amount: new mongoose.Types.Decimal128(transferAmount.toFixed(2)),
        });
        await transaction.save();
        return res.send({message:  `Transaction successfully. Your account with name ${fromUsuario.name} ${fromUsuario.surname} I made a transfer successfully. Your now found is ${fromAccount.balance}, The amount to transference is ${transferAmount} And the name of the account it was transferred to is ${toUsuario.name} ${toUsuario.surname}`})
    } catch (err) {
        console.error(err);
        return res.status(500).send({message: 'Error when completing the transaction'})
    }
}

export const listMyTransactions = async(req,res)=>{
    try {
        let idToken = req.uid
        console.log('El token de usuario es ',idToken);
        let user = await User.findById(idToken)
        if(!user) return res.status(404).send({message: 'The user not found'})
        let dataAccount = await Account.findOne({userId: idToken})
        if(!dataAccount) return res.status(404).send({message: 'Account not found'})
        const myTransactions = await Transaction.find({toAccount: dataAccount._id})
        if(myTransactions.length == 0) return res.status(404).send({message: 'Your account has no transactions'})
        return res.send({message: 'Your account transactions are: ',myTransactions})
    } catch (err) {
        console.error(err);
        return res.status(500).send({message: 'Error to list your transactions'})
    }
}
