'use strict';

import Card from './card.model.js'
import User from '../user/user.model.js';
import Account from '../account/account.model.js'

export const createCard = async (req, res) => {
    try {
        let data = req.body
        let dataAccount = await Account.findOne(data.cardNumber)
        if(!dataAccount) return res.status(404).send({message: ''})
        let today = new Date();
        let dueDate = new Date(today.getFullYear() + 4, today.getMonth(), today.getDate());
        dueDate.setHours(0, 0, 0, 0);
        console.log("Fecha de vencimiento dentro de 4 años:", dueDate);

        return res.send({message: 'La fecha de hoy es '+today+', y la fecha de vencimiento es '+dueDate})
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: 'Error creating card' });
    }
}

