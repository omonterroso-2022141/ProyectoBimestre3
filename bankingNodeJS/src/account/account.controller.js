'use strict';

import Account from './account.model.js'
import AccountType from '../accountType/accountType.model.js'
import User from '../user/user.model.js'
import Decimal from 'decimal.js'
import mongoose from 'mongoose';

export const test = (req, res) => {
    return res.send('Hello world')
};

//# created By: Yerick Aguilar
export const getAccounts = async (req, res) => {
    try {
        let { uid } = req.user
        console.log('uid:', uid)
        let accountsData = await Account.find({ userId: uid })
        console.log('accountsData:', accountsData);

        //% Obtener nombre del tipo de Cuenta
        const accountTypeName = await Promise.all(accountsData.map(async (account) => {
            const accountType = await AccountType.findById(account.accountType)
            return accountType ? accountType.name : 'Tipo de Cuenta no Encontrado'
        }))

        const accounts = accountsData.map((account, index) => ({
            _id: account._id,
            account: account.account,
            balance: account.balance,
            accountType: accountTypeName[index]
        }))
        return res.status(200).json({
            accounts
        })
    } catch (err) {
        console.log(err)
        return res.status(500).send({ message: err })
    }
}

//# UpdateBalance
export const updateBalance = async (req, res) => {
    try {
        let { uid } = req.params
        let { balance } = req.body
        let updatedBalance = await Account.findOneAndUpdate(
            { _id: uid },
            { balance: balance },
            { new: true }
        )
        if (!updateBalance) return res.status(404).send({ message: 'Missing Data' })
        return res.send({ message: 'Balance Updated !!!', updatedBalance })
    } catch (err) {
        console.error(err)
        return res.status(500).send({ message: err })
    }
}

//# GetByID
export const getAccountByID = async (req, res) => {
    try {
        let { uid } = req.params
        let data = await Account.findById(uid)

        //% Buscar el tipo de Cuenta Por ID
        const accountType = await AccountType.findById(data.accountType)
        const accountTypeName = accountType ? accountType.name : 'Tipo de Cuenta No Encontrada'

        const accountData = {
            account: data.account,
            balance: data.balance,
            status: data.status,
            accountType: accountTypeName
        }

        return res.send(accountData)
    } catch (err) {
        console.error(err)
        return res.status(500).send({ message: err })
    }
}
