import Card from './card.model.js'
import Account from '../account/account.model.js'
import Decimal from 'decimal.js'
import User from '../user/user.model.js'

export const createCard = async(req,res)=>{
    try {
        let data = req.body
        let card = new Card(data)
        let dataUser = await User.findById(data.userId)
        if(!dataUser) return res.status(404).send({message: 'User not found'})
        let account = await Account.findById(data.userId)
        if(!account) return res.status(404).send({message: 'Account not found'})
        return res.send({message: 'Account found', account})
    } catch (err) {
        console.error(err);
        return res.status(500).send({message: 'Error creating card'})
    }
}