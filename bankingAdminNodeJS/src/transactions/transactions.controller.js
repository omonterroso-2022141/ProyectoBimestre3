'use strict'

import Transaction from './transactions.model.js'
import Account from '../account/account.model.js'
import Decimal from 'decimal.js'
import mongoose from 'mongoose'

export const makeTransaction = async(req, res)=>{
    try {
        let data = req.body
        //Buscaamos la cuenta del emisor
        let toAccount = await Account.findById(data.toAccount)
        if(!toAccount) return res.status(404).send({message: 'Recipient account not found.'})
        //Buscamos la cuenta del receptor
        let fromAccount = await Account.findById(data.fromAccount)
        if(!fromAccount) return res.status(404).send({message: 'Your account not found'})
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
        return res.send({message:  `Transaction successfully. Your account with 
        name ${fromAccount.name} ${fromAccount.surname} I made a transfer successfully. Your now 
        found is ${fromAccount.balance}, The amount to transference is ${transferAmount} And the 
        name of the account it was transferred to is ${toAccount.name} ${toAccount.surname}`})
    } catch (err) {
        console.error(err);
        return res.status(500).send({message: 'Error when completing the transaction'})
    }
}

export const listTransaction = async(req, res)=>{
    try {
        const list_transactions = await Transaction.find()
        if(list_transactions.length == 0) return res.status(404).send({message: 'List transactions not found'})
        return res.send({message: 'List transactions', list_transactions})
    } catch (err) {
        console.error(err);
        return res.status(500).send({message: 'Error to list transaction'})
    }
}