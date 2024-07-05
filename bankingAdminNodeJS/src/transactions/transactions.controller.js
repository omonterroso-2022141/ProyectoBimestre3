'use strict';

import Transaction from './transactions.model.js';
import Account from '../account/account.model.js';
import Card from '../card/card.model.js';
import Decimal from 'decimal.js';
import mongoose from 'mongoose';

export const makeTransaction = async (req, res) => {
    try {
        let data = req.body;

        // Buscar cuenta por número de cuenta
        let toAccount = await Account.findOne({ accountNumber: data.toAccount });
        if (!toAccount) return res.status(404).send({ message: 'Recipient account not found.' });

        let fromAccount = await Account.findOne({ accountNumber: data.fromAccount });
        if (!fromAccount) return res.status(404).send({ message: 'Your account not found' });

        const transferAmount = new Decimal(data.amount);

        if (new Decimal(fromAccount.balance.toString()).lessThan(transferAmount))
            return res.status(400).send({ message: `Insufficient funds for transfer, your fund is ${fromAccount.balance}` });

        fromAccount.balance = new Decimal(fromAccount.balance.toString()).minus(transferAmount).toFixed(2);
        toAccount.balance = new Decimal(toAccount.balance.toString()).plus(transferAmount).toFixed(2);

        await fromAccount.save();
        await toAccount.save();

        let fromCards = await Card.find({ account: fromAccount._id });
        if (fromCards.length > 0) {
            for (let card of fromCards) {
                card.balance = fromAccount.balance;
                await card.save();
            }
        }

        let toCards = await Card.find({ account: toAccount._id });
        if (toCards.length > 0) {
            for (let card of toCards) {
                card.balance = toAccount.balance;
                await card.save();
            }
        }

        const transaction = new Transaction({
            emitionDate: new Date(),
            fromAccount: fromAccount._id,
            toAccount: toAccount._id,
            amount: new mongoose.Types.Decimal128(transferAmount.toFixed(2)),
        });
        await transaction.save();

        return res.send({
            message: `Transaction successfully. Your account with name ${fromAccount.name} ${fromAccount.surname} made a transfer successfully. Your now fund is ${fromAccount.balance}. The amount to transfer is ${transferAmount}. And the name of the account it was transferred to is ${toAccount.name} ${toAccount.surname}`
        });
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: 'Error when completing the transaction' });
    }
};

export const listTransactions = async (req, res) => {
    try {
        const transactions = await Transaction.find();
        return res.send({ message: 'Transactions found', transactions });
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: 'Error to list transactions.' });
    }
};
