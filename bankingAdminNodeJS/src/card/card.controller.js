'use strict';

import Card from '../card/card.model.js';
import User from '../user/user.model.js';

export const createCard = async (req, res) => {
    try {
        let data = req.body;
        // cardNumber, userId, dueDate, CVV, issued
        data.userId = req.uid
        //Se agrega la fecha de vencimiento de la tarjeta
        let due = new Date(data.dueDate)
        dueDate.setHours(0,0,0,0)
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: 'Error creating card' });
    }
}
